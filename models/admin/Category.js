const db  = require('../../utils/db')
const tbName = 'category';

module.exports = {
    all: async() => {
        var sql = `SELECT * FROM ${tbName}`;
        var rows = await db.load(sql);
        return rows;
    },
    add: async (category) => {
        var id = await db.add(tbName,category);
        return id;
    },
    find: async(id) => {
        var sql = `SELECT * FROM ${tbName} WHERE ID = ${id}`;
        var rows = await db.load(sql);
        return rows;
    }
}

