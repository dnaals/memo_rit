import { createPool } from 'mysql2'

let mysql = require('mysql2');
const pool = {
    host: "127.0.0.1",
    user: "root",
    password: "dnals153",
    database: "todolist",
    port: 3306,
}

export const queryExecute = async (query:any,values:any)=>{
        const connection = mysql.createConnection(pool);
        connection.connect();
        return await new Promise((resolve,reject)=>{
            connection.query(query,values, function(error:any, results:any, fields:any){
                if(error) console.log(error);
                else console.log('Connected to db...!')
                resolve(results);
                connection.end();
            })
        })
    }

