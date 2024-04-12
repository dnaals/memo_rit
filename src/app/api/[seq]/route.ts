import {queryExecute} from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req:any,{params}:any){
    const data = await queryExecute('delete from todo where idx=?',[params.seq]);
    return NextResponse.json(data);
}

