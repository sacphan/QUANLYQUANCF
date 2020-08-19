const db = require("../../utils/db.js");
const tbName = "purchaseorder";
const idField="Id";
const mysql = require("mysql");
const moment = require("moment");
const purchaseorderstatusM = require('./purchaseorderstatusM');
const supplierM = require('./SupplierM');
module.exports = {
    all: async() => {
        const sql = `SELECT * FROM ${tbName} where StatusDelete!= -1 order by Id desc`;   
     
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
    filter: async (KeyWord,Status,StartDate,EndDate,Top)=>
    {
       
        if (StartDate=="")
        {
            StartDate =moment().add('days', -100).format("YYYY-MM-DD");
        }
        else
        {
            
            var StartDate = moment(StartDate,"DD-MM-YYYY").format("YYYY-MM-DD")
            
        }
        if (EndDate=="")
        {
            EndDate=moment().format("YYYY-MM-DD");
        }
        else
        {
            EndDate =  moment(EndDate,"DD-MM-YYYY").format("YYYY-MM-DD")
        }
       
        
        
     
        var sql;
        if (Status != 0)
        {
             sql = `SELECT * FROM ${tbName}  where StatusDelete!= -1 and Code like '%${KeyWord}%' and Status=${Status} and date(CreateDate) BETWEEN '${StartDate}' and '${EndDate}' order by Id desc`;   
        }
        else{
             sql = `SELECT * FROM ${tbName}  where StatusDelete!= -1 and Code like '%${KeyWord}%'  and date(CreateDate) BETWEEN '${StartDate}' and '${EndDate}' order by Id desc`;   
        }
        
     
        const rows = await db.load(sql);
        rows.forEach(element => {
            element.CreateDate = moment(element.CreateDate).format("DD-MM-YYYY");
        });
        return rows;
    }
}