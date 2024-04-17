import {queryExecute} from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req:any,{params}:any){
    const data = await queryExecute('delete from note where id=?',[params.seq]);
    return NextResponse.json(data);
}

export async function PUT(req:any,{params}:any){
    let d = await req.json();
    let value = params.seq;
    let data:any = {}
    data = await queryExecute('update note set title=?,contents=? where id=?',[d.title,d.contents,value]);
    // if(d.complete){
    //     data = await queryExecute('update todo set complete=? where id=?',[d.complete,value]);
    // } else{
    //     data = await queryExecute('update todo set contents=? where id=?',[d.contents,value]);
    // }

    
    return NextResponse.json(data);
}