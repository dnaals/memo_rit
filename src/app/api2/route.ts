import { NextRequest, NextResponse } from 'next/server';
import {queryExecute} from '@/lib/db';

const sql = 'select * from note';

export async function GET(){
    const data = await queryExecute(sql,"");
    // const data = JSON.parse(JSON.stringify(getData))
    return NextResponse.json(data);
}

export async function POST(req:any){
    const d = await req.json();
    const data = await queryExecute('insert into note (id,title,contents,date,color,bookmark,url) values (?,?,?,?,?,?,?)', [d.id,d.title,d.contents,d.date,d.color,d.bookmark,d.url]);
    // const data = JSON.parse(JSON.stringify(getData))
    return NextResponse.json(data);
}