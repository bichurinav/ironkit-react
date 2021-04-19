import SQLite from '../../SQLite.js';
import bcrypt from 'bcrypt';

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
                    .status(200)
                    .json({ message: 'Неверный логин или пароль :(' });
            }
            const isEqualPassword = await bcrypt.compare(
                password,
                existUser.password
            );
            if (!isEqualPassword)
                return res
                    .status(200)
                    .json({ message: 'Неверный логин или пароль :(' });

            res.status(200).json({ login, password });
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: e });
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
                    .status(200)
                    .json({ message: 'Этот логин уже занят :(' });
            }
            await db.run(
                `INSERT INTO users (login, password, admin) VALUES (?, ?, ?)`,
                [login, hashPassword, 0]
            );
            await db.close();
            res.status(200).json({ login, password });
        } catch (e) {
            res.status(500).json({ message: e });
        }
    }
}

export default new UsersController();
