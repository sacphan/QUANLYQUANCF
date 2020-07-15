const db = require("../utils/db.js");
const tbName = "staff";
const idField="Id";
const mysql = require("mysql");

module.exports = {
    all: async() => {
<<<<<<< Updated upstream
        const sql = `SELECT * FROM ${tbName}`;
=======
        const sql = `SELECT * FROM ${tbName}`;   
     
>>>>>>> Stashed changes
        const rows = await db.load(sql);
        return rows;
    },
    add: async user => {
        const id = await db.add(tbName, user);
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
    getByUsername: async username => {
        let sql = 'SELECT * FROM ?? WHERE ??=?';
        const params = [tbName, 'UserName', username];
        sql = mysql.format(sql, params);
        const rs = await db.load(sql);
        if (rs.length > 0) {
            return rs[0];
        }
        return null;
    },
    getByEmail: async email => {
        let sql = 'SELECT * FROM ?? WHERE ??=?';
        const params = [tbName, 'Email', email];
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