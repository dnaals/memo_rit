"use client";
import React, { useEffect, useState } from 'react';
import "../../style/note.scss";
import AddNote from './AddNote';
import { useStore } from "../../store/note_store";
import NoteComp from './NoteComp';
import NoteSearch from './NoteSearch';

function Note() {
    let {data2,dataFetch2} = useStore();
    const [addnote,setAddNote] = useState(false);
    const [searchNote,setSearchNote] = useState([]);
    const [searchBtn,setSearchBtn] = useState(false);


    useEffect(()=>{
        dataFetch2("all")
    },[])
    
    useEffect(()=>{
        setSearchNote(data2)
    },[data2])


    const sortedData = [...searchNote].sort((a: any, b: any) => {
        const dateA = new Date(a.date.replace(/\./g, '/'));
        const dateB = new Date(b.date.replace(/\./g, '/'));
        return dateB.getTime() - dateA.getTime();
    });
    const sorteDataBook = sortedData.sort((a:any, b:any) => (a.bookmark == "true" && b.bookmark == "false") ? -1 : 0);

    





    return (
        <>
        {addnote? <AddNote dataFetch2={dataFetch2} setAddNote={setAddNote} /> : ''}   
        <div className='note'>
            <NoteSearch data2={data2} setSearchNote={setSearchNote} searchBtn={searchBtn}  /> 
            <figure className='note_screen'>
                <figcaption className='note_add' onClick={()=>setAddNote(true)}>
                    <img src="/images/add.png" alt="aa" />
                    <div className='note_contents_day'>
                    </div>
                </figcaption>
                {
                    sorteDataBook.map((obj:any,k:number)=>(
                        <NoteComp dataFetch2={dataFetch2} obj={obj} key={k}/>
                    ))
                }
            </figure>
            <img src={searchBtn?"/images/search_btn_off.png":"/images/search_btn.png"} alt="" className='search_btn' onClick={()=>setSearchBtn(!searchBtn)}/>
        </div>
        </>
    );
}

export default Note;