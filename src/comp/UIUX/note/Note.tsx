"use client";
import React, { useEffect, useState } from 'react';
import "../../style/note.scss";
import AddNote from './AddNote';
import { useStore } from "../../store/note_store";
import NoteComp from './NoteComp';

function Note() {
    let {data2,dataFetch2} = useStore();
    let [addnote,setAddNote] = useState(false);

    useEffect(()=>{
        dataFetch2("all")
    },[])
    const sortedData = [...data2].sort((a: any, b: any) => {
        const dateA = new Date(a.date.replace(/\./g, '/'));
        const dateB = new Date(b.date.replace(/\./g, '/'));
        return dateB.getTime() - dateA.getTime();
    });
    return (
        <>
        {addnote? <AddNote dataFetch2={dataFetch2} setAddNote={setAddNote}/> : ''}   
        <div className='note'>
            <form className='search'>
                <input type="text" placeholder='검색어를 입력하라' />
                <img src="/images/search.png" alt="aa" />
            </form>
            <figure className='note_screen'>
                <figcaption className='note_add' onClick={()=>setAddNote(true)}>
                    <img src="/images/add.png" alt="aa" />
                    <div className='note_contents_day'>
                    </div>
                </figcaption>
                {
                    sortedData.map((obj:any,k:number)=>(
                        <NoteComp dataFetch2={dataFetch2} obj={obj} key={k}/>
                    ))
                }
            </figure>

        </div>
        </>
    );
}

export default Note;