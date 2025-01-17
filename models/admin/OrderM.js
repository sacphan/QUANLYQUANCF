const db = require("../../utils/db.js");
const tbName = "`order`";
const idField="Id";
const mysql = require("mysql");
const moment = require("moment");
module.exports = {
    all: async() => {
        const sql = `SELECT * FROM ${tbName} order by createdate desc `;   
     
        const rows = await db.load(sql);
        rows.forEach(element => {
            element.CreateDate = moment(element.CreateDate).format("DD-MM-YYYY");
        });
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
    filter: async (KeyWord,Status,CreateDate,Top)=>
    {
        const sql = `SELECT * FROM ${tbName} where StatusDelete!= -1 and KeyWord like '%${KeyWord}%' order by Id desc`;   
     
        const rows = await db.load(sql);
        rows.forEach(element => {
            element.CreateDate = moment(element.CreateDate).format("DD-MM-YYYY");
        });
        return rows;
    }
}