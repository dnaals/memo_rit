import Todolist from '@/comp/UIUX/Todolist';
import React from 'react';
import executeQuery from "@/app/lib/db";

function Page() {
    const connect = async()=>{
        const sql = 'select * from todo';
        const data = await executeQuery(sql, '');
        const getdata = JSON.parse(JSON.stringify(data));
        console.log(getdata);
    }
    connect();
    return (
        <div>
            <Todolist  />
        </div>
    );
}

export default Page;