"use client";
import React, { useState } from 'react';

function UpdateNote({upNote,setClick2,dataFetch2}:any) {
    const [noteTitle,setNoteTitle] = useState(upNote.title);
    const [noteContents,setNoteContents] = useState(upNote.contents);
    const [moreClick,setMoreClick]= useState(false);

    const delNote = (id:number)=>{
        dataFetch2("delete",id);
        setClick2(false);
    }

    const updateNote = (id:number)=>{
        let value = {
            title:noteTitle,
            contents : noteContents,
            id : id
        }
        
        dataFetch2('update',value);
        setClick2(false);
    }


    return (
        <>
        <div className='addBack' onClick={()=>setClick2(false)} ></div>
        <article className='addMemo'>
            <div className='addMemoC1'>
                <div className='more'>
                <img src="/images/more_gray.png" alt="more_gray" className={moreClick? 'more_more active':'more_more'} onClick={()=>setMoreClick(true)}/>
                <img src="/images/add_picture.png" alt="aa" className={moreClick? 'more_picture active': 'more_picture'}/>
                <img src="/images/note_del.png" alt="aa" className={moreClick? 'more_del active':'more_del'} onClick={()=>delNote(upNote.id)}/>
                </div>
                <p onClick={()=>{updateNote(upNote.id)}} style={{color:upNote.color}}>저장</p>
            </div>
            <div className='addMemoC2'>
                <form>
                    <input type="text" placeholder='제목을 입력하세요.' value={noteTitle} onChange={(e)=>{setNoteTitle(e.target.value)}} />
                    <textarea name="내용" placeholder='내용을 입력하세요.'value={noteContents} onChange={(e)=>{setNoteContents(e.target.value)}} ></textarea>
                </form>
                <div className='addMemoC3' style={{backgroundColor:upNote.color}} >
                    <div className='colorPalette' >
                        <img src="/images/colorp.png" alt="colorp" />
                    </div>
                    <div className='bookmark'>
                        <img src="/images/bookmark_large.png" alt="bookmarkLarge" />
                    </div>
                </div>
            </div>
    </article>
    </>
    );
}

export default UpdateNote;