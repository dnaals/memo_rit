import executeQuery from "@/app/lib/db";

const connect = async()=>{
    const sql = 'select * from todo';
    const data = await executeQuery(sql, '');
    const getdata = JSON.parse(JSON.stringify(data));
    console.log(getdata);
}
connect();