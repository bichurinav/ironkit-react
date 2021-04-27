import cookie from 'cookie';
import jwt from 'jsonwebtoken';
import config from './../../config.js';

export default function (req, res, next) {
    try {
        const cookies = cookie.parse(req.headers.cookie || '');
        const token = cookies.token;
        if (token) {
            const decoded = jwt.verify(token, config.key);
            const { admin } = decoded;
            if (!admin) {
                return res.status(403).json({
                    access: false,
                    message: 'Не администратор!',
                });
            }
            next();
        } else {
            throw 'Не авторизован!';
        }
    } catch (e) {
        return res.status(401).json({
            auth: false,
            message: e,
        });
    }
}
