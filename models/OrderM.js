const db = require("../utils/db.js");
const tbName = "order";
const idField="Id";
const mysql = require("mysql");

module.exports = {
    all: async() => {
        const sql = `SELECT * FROM ${tbName}`;   
        const rows = await db.load(sql);
        return rows;
    },
    add: async order => {
        const id = await db.add(tbName, order);
        return id;
    },
    del:async (ID)=>{
        const sql=`DELETE FROM ${tbName} WHERE f_ID =${ID}`;
        const rows=await db.load(sql);
    
        return rows;
    },
    getById: async id=>
    {
        
        let sql = 'SELECT * FROM ?? WHERE ??=?';
        const params = [tbName, 'f_ID', id];
        sql = mysql.format(sql, params);
        const rs = await db.load(sql);
        if (rs.length > 0) {
            return rs[0];
        }
        return null;
    },
  
    update:async entity=>{
        const resultinfo=await db.update(tbName,idField,entity);
        return resultinfo;     
    }
}