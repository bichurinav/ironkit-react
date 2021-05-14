import mysql from 'mysql2/promise';

async function startDB() {
    try {
        return await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'ironkit',
            password: '1097',
        });
    } catch (e) {
        console.error(e);
    }
}

export default startDB;
