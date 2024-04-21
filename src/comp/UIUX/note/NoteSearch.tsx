"use client";
import React, { useEffect, useState } from 'react';

function NoteSearch({data2,setSearchNote,searchBtn}:any) {

    const [searchData,setSearchData] = useState('');
    const [searchContents,setSearchContents] = useState([]);
    const searchNote = (e:any)=>{
        e.preventDefault();
        let d = data2.filter((obj:any)=>(
            (obj.contents.includes(searchData) || obj.title.includes(searchData))
            ));
        setSearchContents(d);

    }
    
    useEffect(() => {
        setSearchNote(searchContents);
    }, [searchContents]);
    
    return (
        <form className='search' onSubmit={(e)=>searchNote(e)} style={{display: searchBtn? 'block': 'none'}}>
            <input type="text" placeholder='검색어를 입력하라' value={searchData} onChange={(e)=>{setSearchData(e.target.value)}}/>
            <img src="/images/search.png" alt="aa" onClick={searchNote}/>
        </form>
    );
}

export default NoteSearch;