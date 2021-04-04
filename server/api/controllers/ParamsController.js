import SQLite from '../../SQLite.js';

class ParamsController {
    async getParams(req, res) {
        try {
            const { component } = req.params;
            const db = new SQLite();
            const params = await db.all(`SELECT * FROM ${component}_params`);
            await db.close();
            res.status(200).send(params);
        } catch (e) {
            console.error(e);
            res.status(500).send(e.message);
        }
    }
}
export default new ParamsController();
