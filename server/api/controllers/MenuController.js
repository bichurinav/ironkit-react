import connectDB from './../../mysqlConnect.js';

class MenuController {
    async getMenu(req, res) {
        try {
            const db = await connectDB();
            const [menu] = await db.execute(`SELECT * FROM menu`);
            res.status(200).send(menu);
        } catch (e) {
            console.error(e);
            res.status(500).send(e.message);
        }
    }
}
export default new MenuController();
