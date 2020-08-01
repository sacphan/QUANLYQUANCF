const db = require("../utils/db.js");
const tbName = "customer";
const idField="Id";
const mysql = require("mysql");

module.exports = {
    all: async() => {
        const sql = `SELECT * FROM ${tbName}`;   
     
        const rows = await db.load(sql);
        return rows;
    },
    add: async user => {
        const id = await db.add(tbName, user);
        return id;
    },
    del:async (ID)=>{
        const sql=`DELETE FROM ${tbName} WHERE Id =${ID}`;
        const rows=await db.load(sql);
    
        return rows;
    },
    getById: async id=>
    {
        
        let sql = 'SELECT * FROM ?? WHERE ??=?';
        const params = [tbName, 'Id', id];
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
       
    },
    searchbyName:async(Name) => 
    {
        let sql=`SELECT * FROM ${tbName} Where Name like "%${Name}%"`;
        const rows = await db.load(sql); 
        return rows; 
    }
}