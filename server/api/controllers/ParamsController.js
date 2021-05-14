import connectDB from './../../mysqlConnect.js';

class ParamsController {
    async getParams(req, res) {
        try {
            const { component } = req.params;
            const db = await connectDB();
            const [params] = await db.execute(
                `SELECT * FROM ${component}_params`
            );
            res.status(200).send(params);
        } catch (e) {
            console.error(e);
            res.status(500).send(e.message);
        }
    }
}
export default new ParamsController();
