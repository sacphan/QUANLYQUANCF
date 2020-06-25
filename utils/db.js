const mysql = require("mysql");

function createConnection() {
    return mysql.createConnection({
        host: "localhost",
        port: '3306',
        user: 'root',
        password: '',
        database: 'quanlycoffe'
    });

}
exports.load = sql => {
    return new Promise((resole, reject) => {
        const con = createConnection();
        con.connect(err => {
            if (err) reject(err);
        })
        con.query(sql, (error, results, fields) => {
            if (error) {

                reject(error);
            }
            resole(results);

        })
        con.end();

    })
}
exports.add = (tbName, entity) => {
    return new Promise((resole, reject) => {
        const con = createConnection();
        con.connect(err => {
            if (err) {
                reject(err);
            }
        });


        const sql = `INSERT INTO ${tbName} SET ?`;
        con.query(sql, entity, (error, results, fields) => {
            if (error) {
                resole(false);
                reject(error);               
            }
            if (results)
                resole(results.insertId);
            else resole(true);

        })
        con.end();
    })
    
}
exports.update=(tbName,idField,entity)=>
{
    return new Promise((resole, reject) => {
        const con = createConnection();
        con.connect(err => {
            if (err) {
                reject(err);
            }
        });
        console.log(entity);
        const id=entity[idField];
        delete entity[idField];
        
        const sql=`UPDATE ${tbName} SET ? WHERE ${idField}=${id}`;
        con.query(sql,entity,(error,result,fields)=>{
            if (error) 
            {
                reject(error);
            }
            else 
            {
                resole(true);
            }
        });
        con.end();
    })
}
exports.update2=(tbName,idField1,idField2,entity)=>
{
    return new Promise((resole, reject) => {
        const con = createConnection();
        con.connect(err => {
            if (err) {
                reject(err);
            }
        });
        const id1=entity[idField1];
        delete entity[idField1];
        const id2=entity[idField2];
        delete entity[idField2];
        const sql=`UPDATE ${tbName} SET ? WHERE ${idField1}=${id1} AND ${idField2}=${id2}`;
        con.query(sql,entity,(error,result,fields)=>{
            if (error) 
            {
                reject(error);
            }
            else 
            {
                resole(true);
            }
        });
        con.end();
    })
}

exports.del = (tbName,idField, entity) => {
    return new Promise((resole, reject) => {
        const con = createConnection();
        con.connect(err => {
            if (err) {
                reject(err);
            }
        });


        const sql = `DELETE FROM ?? WHERE ?? = ?`;
        const params=[tbName,idField,fields];
        sql=mysql.format(sql,params);
        con.query(sql, (error, results, fields) => {
            if (error) {
                resole(false);
                reject(error);               
            }
            if (results)
                resole(results.affectedRows);
            else resole(true);

        })
        con.end();
    })
    
}

