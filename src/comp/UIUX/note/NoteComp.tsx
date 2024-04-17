"use client";
import React, { useState } from 'react';
import UpdateNote from './UpdateNote';

function NoteComp({obj,dataFetch2}:any) {
    let [click2,setClick2] = useState(false);
    let [upNote,setUpNote] = useState([]);
    const note_detail = (obj:any)=>{
        // console.log(obj)
        setClick2(true);
        setUpNote(obj);
    }

    return (
        <>
            {
                click2? <UpdateNote dataFetch2={dataFetch2} upNote={upNote} setClick2={setClick2} /> : ""
            }
            <figcaption className='note_contents' onClick={()=>note_detail(obj)}>
                    <p>{obj.title}</p>
                    <div className='note_contents_back'>
                        <p>{obj.contents}</p>
                    </div>
                    <img src="/images/bookmark.png" alt="aa" />
                    <div className='note_contents_day' style={{backgroundColor:`${obj.color}`}}>
                        <p>{obj.date}</p>
                    </div>
            </figcaption>
        </>
    );
}

export default NoteComp;