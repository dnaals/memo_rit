"use client";
import React, { useState } from 'react';
import UpdateNote from './UpdateNote';


function NoteComp({obj,dataFetch2}:any) {
    let [click2,setClick2] = useState(false);
    let [upNote,setUpNote] = useState([]);
    const listToday = obj.date.split(' ')[0];
    const note_detail = (obj:any)=>{
        setClick2(true);
        setUpNote(obj);
    }

    

 


    
    
    return (
        <>
            {
                click2? <UpdateNote dataFetch2={dataFetch2} upNote={upNote} setClick2={setClick2} /> : ""
            }
            <figcaption className='note_contents' onClick={()=>note_detail(obj)}>
                    <p>   {obj.title?  obj.title : "제목이 없네용" }</p>
                    <div className='note_contents_back'>
                        <p>{obj.contents? obj.contents : "내용이 없네용" }</p>
                    </div>
                    <img src={obj.bookmark=="false"? "/images/bookmark.png" : "/images/bookmark_on.png" } alt="aa" />
                    <div className='note_contents_day' style={{backgroundColor:`${obj.color}`}}>
                        <p>{listToday}</p>
                    </div>
                    {obj.url? <img src="/images/img_check.png" alt="" className='imgCheck'/>:"" }
            </figcaption>
        </>
    );
}

export default NoteComp;