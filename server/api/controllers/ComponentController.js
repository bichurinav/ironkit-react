import connectDB from '../../mysqlConnect.js';
import uniqid from 'uniqid';
import fs from 'fs';
import path from 'path';

class ComponentController {
    async getNeededComponent(req, res) {
        try {
            const { id, component } = req.params;
            const db = await connectDB();
            const [neededComponent] = await db.execute(
                `SELECT * FROM ${component}_components WHERE id = ${id}`
            );
            if (!neededComponent.length) throw 'Такого компонента нету!';
            res.status(200).json(neededComponent[0]);
        } catch (e) {
            res.status(500).send({ error: e });
        }
    }

    async getComponent(req, res) {
        try {
            const { component } = req.params;
            //const { limit } = req.query;
            const db = await connectDB();
            let count = 0;
            const [components] = await db.execute(
                `SELECT * FROM ${component}_components`
            );
            const [countComponents] = await db.execute(
                `SELECT COUNT(*) FROM ${component}_components`
            );
            count = countComponents[0]['COUNT(*)'];
            res.status(200).json({ components, count });
        } catch (e) {
            res.status(500).send(e.message);
        }
    }

    async addComponent(req, res) {
        try {
            const name = req.body['Название'];
            const price = req.body['Цена'];
            const component = req.body.component;
            let params = [];
            const arParams = Object.entries(req.body);
            for (let i = 0; i < arParams.length; i++) {
                if (
                    arParams[i][0] === 'component' ||
                    arParams[i][0] === 'Название' ||
                    arParams[i][0] === 'Цена'
                ) {
                    continue;
                }
                params.push({
                    id: i,
                    name: arParams[i][0],
                    value: arParams[i][1],
                });
            }

            const { image } = req.files;
            const imageName = uniqid() + image.name;
            await image.mv('static/' + imageName);

            const db = await connectDB();
            await db.execute(
                `INSERT INTO ${component}_components (component, name, price, params, image) VALUES (?, ?, ?, ?, ?)`,
                [component, name, price, JSON.stringify(params), imageName]
            );
            res.status(200).send(`${name} успешно добавлен!`);
        } catch (e) {
            console.error(e);
            res.status(500).send(e.message);
        }
    }

    async removeComponent(req, res) {
        try {
            const { id, component } = req.params;
            const { imageName } = req.body;
            const pathRemove = path.join(path.resolve(), 'static', imageName);
            const db = await connectDB();
            await db.execute(
                `DELETE FROM ${component}_components WHERE id = ${id}`
            );
            fs.unlink(pathRemove, (err) => {
                if (err) throw err;
                return res.status(200).json({ message: 'Компонент удалён!' });
            });
        } catch (e) {
            res.status(500).json({
                message: e,
            });
        }
    }

    async updateImage(req, res) {
        try {
            const { imageName } = req.body;
            const { image } = req.files;
            await image.mv('static/' + imageName);
            res.status(200).json({ message: 'Изображение изменено!' });
        } catch (e) {
            console.error(e);
        }
    }

    async updatePrice(req, res) {
        try {
            const { component, id } = req.params;
            const { price } = req.body;
            const db = await connectDB();
            await db.execute(
                `UPDATE ${component}_components SET price = ${+price} WHERE id = ${id}`
            );
            res.status(200).json({ message: 'Цена изменена!' });
        } catch (e) {
            console.error(e);
        }
    }
    // async updateCount(req, res) {
    //     try {
    //         const { component, id } = req.params;
    //         const { count } = req.body;
    //         const db = new SQLite();
    //         const updatedCount = await db.run(
    //             `UPDATE ${component}_components SET count = ${+count} WHERE id = ${id}`
    //         );
    //         if (updatedCount.changes) {
    //             return res.status(200).json({
    //                 message: 'Количество комплектующих на складе изменено!',
    //             });
    //         }
    //     } catch (e) {
    //         console.error(e);
    //     }
    // }
}

export default new ComponentController();
