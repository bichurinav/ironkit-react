import connectDB from './../../mysqlConnect.js';

class BuilderController {
    async create(req, res) {
        try {
            const { components, price, user, name, desc } = req.body;
            const db = await connectDB();

            const [userBuilders] = await db.execute(
                `SELECT * FROM builders WHERE user = ?`,
                [user.login]
            );

            if (userBuilders.length >= 3 && user.admin < 1) {
                return res.status(200).json({ message: 'Лимит 3 сборки' });
            }

            await db.execute(
                `INSERT INTO builders (user, name, description, components, price) VALUES (?, ?, ?, ?, ?)`,
                [user.login, name, desc, JSON.stringify(components), price]
            );

            res.status(200).json({ message: 'Сборка добавлена!' });
        } catch (e) {
            console.error(e);
            res.status(500).send(e.message);
        }
    }

    async get(req, res) {
        try {
            const db = await connectDB();
            const [builders] = await db.execute(`SELECT * FROM builders`);
            res.status(200).json(builders);
        } catch (e) {
            console.error(e);
            res.status(500).send(e.message);
        }
    }

    async getDetailBuilder(req, res) {
        try {
            const { user, id } = req.params;
            const db = await connectDB();
            const [builders] = await db.execute(
                `SELECT * FROM builders WHERE user = ? AND id = ?`,
                [user, id]
            );

            if (!builders.length)
                return res.status(200).json({ success: false });
            if (builders.length) {
                res.status(200).json({
                    name: builders[0].name,
                    description: builders[0].description,
                    price: builders[0].price,
                    builder: JSON.parse(builders[0].components),
                    success: true,
                });
            }
        } catch (e) {
            console.error(e);
            res.status(500).send(e.message);
        }
    }

    async removeBuilder(req, res) {
        try {
            const { user, id } = req.params;
            const db = await connectDB();
            await db.execute(`DELETE FROM builders WHERE user = ? AND id = ?`, [
                user,
                id,
            ]);
            const [builders] = await db.execute('SELECT * FROM builders');
            res.status(200).json(builders);
        } catch (e) {
            console.error(e);
            res.status(500).send(e.message);
        }
    }
}
export default new BuilderController();
