import {queryExecute} from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req:any,{params}:any){
    const data = await queryExecute('delete from todo where idx=?',[params.seq]);
    return NextResponse.json(data);
}

export async function PUT(req:any,{params}:any){
    let d = await req.json();
    let value = params.seq;

    let data:any = {}
    if(d.contents=='false'){
        data = await queryExecute('update todo set complete=? where idx=?',["true",value]);
    } else if(d.contents =='true'){
        data = await queryExecute('update todo set complete=? where idx=?',["false",value]);
    } else{
        data = await queryExecute('update todo set contents=? where idx=?',[d.contents,value]);
    }
    
    return NextResponse.json(data);
}



