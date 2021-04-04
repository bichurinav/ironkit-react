import sqlite3 from 'sqlite3';

export default class SQLite {
    constructor(path = 'server/ironkit.db') {
        this.db = new sqlite3.Database(path);
    }

    async all(sql, params) {
        return new Promise((res, rej) => {
            this.db.all(sql, params, function (err, row) {
                if (err) rej(err);
                res(row);
            });
        });
    }

    async run(sql, params) {
        return new Promise((res, rej) => {
            this.db.run(sql, params, function (err) {
                if (err) rej(err);
                res(this);
            });
        });
    }

    async close() {
        return new Promise((res, rej) => {
            this.db.close(function (err) {
                if (err) rej(err);
                res();
            });
        });
    }
}
