import { createPool } from 'mysql2'

let mysql = require('mysql2');
const pool = {
    host:  process.env.HOST as string,
    user: process.env.USER as string,
    password: process.env.PASSWORD as string,
    database: process.env.DATABASE as string,
    port: process.env.PORT as string,
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

