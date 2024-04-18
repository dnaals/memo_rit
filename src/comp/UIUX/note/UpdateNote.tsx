"use client";
import React, { useState } from 'react';

function UpdateNote({upNote,setClick2,dataFetch2}:any) {
    const [noteTitle,setNoteTitle] = useState(upNote.title);
    const [noteContents,setNoteContents] = useState(upNote.contents);
    const [color,setColor] = useState(upNote.color);
    const [bookmark,setBookmark] = useState(upNote.bookmark);

    const delNote = (id:number)=>{
        dataFetch2("delete",id);
        setClick2(false);
    }

    const updateNote = (id:number)=>{
        let value = {
            title:noteTitle,
            contents : noteContents,
            id : id,
            color:color,
            bookmark:bookmark
        }
        
        dataFetch2('update',value);
        setClick2(false);
    }


    let colorArr = ['#4385F5',"#34A853","#FCBC05","#E8463B"]
    let [colorIdx,setColorIdx] = useState(1);
    const colorClick = ()=>{
        setColor(colorArr[colorIdx]);
        setColorIdx(++colorIdx);
        if(colorIdx==4){
            setColorIdx(0);
        }
    }

    const bookmarkOn = ()=>{
        setBookmark('true')
        if(bookmark=="true"){
            setBookmark('false')
        }
    }

    return (
        <>
        <div className='addBack' onClick={()=>setClick2(false)} ></div>
        <article className='addMemo'>
            <div className='addMemoC1'>
                <div className='more'>
                    <img src="/images/add_picture.png" alt="aa"/>
                    <img src="/images/note_del.png" alt="aa" onClick={()=>delNote(upNote.id)}/>
                </div>
                <p onClick={()=>{updateNote(upNote.id)}} style={{color:color}}>저장</p>
            </div>
            <div className='addMemoC2'>
                {upNote.url? <p  className='upload_img'><img src={upNote.url} alt="" /></p>:""}
                <form>
                    <input type="text" placeholder='제목을 입력하세요.' value={noteTitle} onChange={(e)=>{setNoteTitle(e.target.value)}} />
                    <textarea name="내용" placeholder='내용을 입력하세요.'value={noteContents} onChange={(e)=>{setNoteContents(e.target.value)}} ></textarea>
                </form>
                <div className='addMemoC3' style={{backgroundColor:color}} >
                    <div className='colorPalette' onClick={()=>colorClick()}>
                        <img src="/images/colorp.png" alt="colorp" />
                    </div>
                    <div className='bookmark'>
                        <img src={bookmark=="false"? "/images/bookmark_large_off.png" :"/images/bookmark_large_on.png"} alt="bookmarkLarge" onClick={bookmarkOn}/>
                    </div>
                </div>
            </div>
    </article>
    </>
    );
}

export default UpdateNote;