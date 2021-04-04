import SQLite from '../../SQLite.js';

class MenuController {
    async getMenu(req, res) {
        try {
            const db = new SQLite();
            const menu = await db.all(`SELECT * FROM menu`);
            await db.close();
            res.status(200).send(menu);
        } catch (e) {
            console.error(e);
            res.status(500).send(e.message);
        }
    }
}
export default new MenuController();
