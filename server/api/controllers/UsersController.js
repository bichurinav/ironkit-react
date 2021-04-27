import SQLite from '../../SQLite.js';
import bcrypt from 'bcrypt';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import config from '../../config.js';

class UsersController {
    static async getExistUser(db, login) {
        try {
            const existUser = await db.all(
                `SELECT * FROM users WHERE login = ?`,
                [login]
            );
            return existUser[0];
        } catch (e) {
            console.error(e);
        }
    }

    async getUser(req, res) {
        try {
            const { login, password } = req.body;
            const db = new SQLite();
            const existUser = await UsersController.getExistUser(db, login);
            await db.close();
            if (!existUser) {
                return res
                    .status(401)
                    .json({ message: 'Неверный логин или пароль :(' });
            }
            const isEqualPassword = await bcrypt.compare(
                password,
                existUser.password
            );
            if (!isEqualPassword) {
                return res
                    .status(401)
                    .json({ message: 'Неверный логин или пароль :(' });
            }
            const token = jwt.sign(
                {
                    login,
                    admin: existUser.admin ? true : false,
                },
                config.key,
                { expiresIn: '12h' }
            );
            res.setHeader(
                'Set-Cookie',
                cookie.serialize('token', token, {
                    httpOnly: true,
                    maxAge: 43200,
                    path: '/',
                })
            );
            res.status(200).json({ auth: true, message: 'Авторизован' });
        } catch (e) {
            res.status(401).json({ message: e });
        }
    }

    async addUser(req, res) {
        try {
            const { login, password, repeatedPassword } = req.body;
            if (password !== repeatedPassword) throw 'Пароли не совпадают!';
            const db = new SQLite();
            const hashPassword = await bcrypt.hash(password, 10);
            const existUser = await UsersController.getExistUser(db, login);
            if (existUser) {
                await db.close();
                return res
                    .status(401)
                    .json({ message: 'Этот логин уже занят :(' });
            }
            await db.run(
                `INSERT INTO users (login, password, admin) VALUES (?, ?, ?)`,
                [login, hashPassword, 0]
            );
            await db.close();
            const token = jwt.sign(
                {
                    login,
                    admin: false,
                },
                config.key,
                { expiresIn: '12h' }
            );
            res.setHeader(
                'Set-Cookie',
                cookie.serialize('token', token, {
                    httpOnly: true,
                    maxAge: 43200,
                    path: '/',
                })
            );
            res.status(200).json({ auth: true, message: 'Авторизован' });
        } catch (e) {
            res.status(401).json({ message: e });
        }
    }

    async checkAuth(req, res) {
        try {
            const cookies = cookie.parse(req.headers.cookie || '');
            const token = cookies.token;
            const decoded = jwt.verify(token, config.key);
            res.status(200).json(decoded);
        } catch (e) {
            res.status(200).json({
                auth: false,
                message: 'Не авторизован',
            });
        }
    }

    async removeAuth(req, res) {
        try {
            const cookies = cookie.parse(req.headers.cookie || '');
            const token = cookies.token;
            if (token) {
                res.setHeader(
                    'Set-Cookie',
                    cookie.serialize('token', '', {
                        httpOnly: true,
                        maxAge: 0,
                        path: '/',
                    })
                );
            }
            res.status(200).json({
                auth: false,
                message: 'Не авторизован',
            });
        } catch (e) {
            console.error(e);
        }
    }
}

export default new UsersController();
