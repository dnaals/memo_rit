"use client";
import React, { useState } from 'react';
import { useStore } from '../../store/todo_store';

function PastComp({pData,d}:any) {
    let [check, setCheck] = useState(false);
    const checkHandle =  (obj:any)=>{
        setCheck(!check)
        let upCheckValue ={
            id:obj.idx,
            complete : String(!check)
        }
        dataFetch('update',upCheckValue)
    }
    let {dataFetch} = useStore();

    const sortedData = [...pData].sort((a: any, b: any) => new Date(b).getTime() - new Date(a).getTime());


    
    return (
        <div className="past">
            {
                sortedData.map((obj: any, k: number) => (
                    <div key={k}>
                        <p>{obj}</p>
                        {Array.from(new Set(d[obj])).map((item: any, k: number) => (
                            <div key={k} className='past_data'>
                                <img src={item.complete=="false" ? "/images/no_complete.png":"/images/complete.png" } onClick={()=>checkHandle(item)} alt="aa" />
                                <p>{item.contents}</p>
                            </div>
                        ))}
                    </div>
                ))
            }
        </div>
    );
}

export default PastComp;