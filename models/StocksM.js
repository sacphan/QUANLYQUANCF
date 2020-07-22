const db = require('../utils/db');
const tbName = 'stock';

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
        const sql=`DELETE FROM ${tbName} WHERE ProID =${ProID}`;
        const rows=await db.load(sql);
    
        return rows;
    },
    update:async entity=>{
        const resultinfo=await db.update(tbName,idField,entity);
        return resultinfo;
       
    },
    allByCatId: async(CatId, Page) => {     
        sql = `SELECT * FROM ${tbName} Where CatID=${CatId}  ORDER BY CreateDate DESC  LIMIT 6 OFFSET ${(Page-1)*6}`;
        const rows = await db.load(sql);     
        return rows;
    },

    getDetail: async(ProId) => {
        const sql = `select * from ${tbName} where ${ProId}=ProID`;
        const rows = await db.load(sql);
      
        return rows[0];
    },
    getpageTotal:async(CatId)=>{
        let sql=`SELECT * FROM ${tbName} Where CatID=${CatId}`;
        const rs=await db.load(sql);
        const totalP=rs.length;
        const pageTotal=Math.floor(totalP/6)-1;
        return pageTotal;
    }
}