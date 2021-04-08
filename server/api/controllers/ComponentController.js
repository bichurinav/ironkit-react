import SQLite from '../../SQLite.js';
import uniqid from 'uniqid';

class ComponentController {
    async getNeededComponent(req, res) {
        try {
            const { id, component } = req.params;
            const db = new SQLite();
            const neededComponent = await db.all(
                `SELECT * FROM ${component}_components WHERE id = ${id}`
            );
            await db.close();
            if (!neededComponent.length) throw 'Такого компонента нету!';
            res.status(200).json(neededComponent[0]);
        } catch (e) {
            res.status(500).send({ error: e });
        }
    }

    async getComponent(req, res) {
        try {
            const { component } = req.params;
            const db = new SQLite();
            const components = await db.all(
                `SELECT * FROM ${component}_components`
            );
            await db.close();
            res.status(200).json(components);
        } catch (e) {
            res.status(500).send(e.message);
        }
    }

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
                `INSERT INTO ${component}_components (component, name, price, params, image) VALUES (?, ?, ?, ?, ?)`,
                [component, name, price, JSON.stringify(params), imageName]
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
