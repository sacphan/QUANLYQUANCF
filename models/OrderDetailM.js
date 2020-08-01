const db = require('../utils/db');
const tbName = 'orderdetail';

const idField="Id";
module.exports = {
    add: async user => {
        const id = await db.add(tbName, user);
        return id;
    },
    all: async() => {
        const sql = `SELECT * FROM ${tbName}`;
        const rows = await db.load(sql);
        return rows;
    },
    del:async (ProID)=>{
        const sql=`DELETE FROM ${tbName} WHERE Id =${ProID}`;
        const rows=await db.load(sql);
    
        return rows;
    },
    update:async entity=>{
        const resultinfo=await db.update(tbName,idField,entity);
        return resultinfo;
       
    }
   
}