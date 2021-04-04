import SQLite from '../../SQLite.js';
import uniqid from 'uniqid';

class ComponentController {
    async addComponent(req, res) {
        try {
            const name = req.body['Название'];
            const price = req.body['Цена'];
            const component = req.body.component;
            const params = {};

            for (let key in req.body) {
                if (
                    key !== 'component' &&
                    key !== 'Название' &&
                    key !== 'Цена'
                ) {
                    params[key] = req.body[key];
                }
            }

            const { image } = req.files;
            const imageName = uniqid() + image.name;
            await image.mv('static/' + imageName);

            const db = new SQLite();
            await db.run(
                `INSERT INTO ${component}_components (name, price, params, image) VALUES (?, ?, ?, ?)`,
                [name, price, JSON.stringify(params), imageName]
            );
            await db.close();
            res.status(200).send(`${name} успешно добавлен!`);
        } catch (e) {
            console.error(e);
            res.status(500).send(e.message);
        }
    }
}

export default new ComponentController();
