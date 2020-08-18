const db  = require('../../utils/db')
const tbName = 'staff';

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
    },
    update: async(idField,category) => {
        var status = db.update(tbName,idField,category)
        return status;
    },
    delete: async(idField,category) => {
        var sql = `DELETE FROM ${tbName} WHERE ${idField} = ${category.Id}`
        var status = await db.load(sql)
        return status;
    }
}

