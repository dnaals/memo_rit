"use client";
import React, { useState } from 'react';
import { format } from 'date-fns'; 

function AddNote({setAddNote,dataFetch2}:any) {

    
    const today = new Date();
    let formatToday = (format(today,"yyyy.MM.dd"));

    let [title,setTitle] = useState('');
    let [contents,setContents] = useState('');
    let [color,setColor] = useState('#4385F5');

    const submit = (e:any)=>{
        e.preventDefault();
    }
    const offClick=()=>{
        setAddNote(false);
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


    const saveBtn= ()=>{
        let data = {
            id : Date.now(),
            title : title,
            contents : contents,
            date : formatToday,
            color: color,
            bookmark : false,
            url : "",
        }
        dataFetch2("post",data)
        setAddNote(false);
    }

    const [moreClick,setMoreClick]= useState(false);

  return (
    <>
    <div className='addBack' onClick={offClick}></div>
    <article className='addMemo'>
        <div className='addMemoC1'>
            <div className='more'>
            <img src="/images/more_gray.png" alt="more_gray" className={moreClick? 'more_more active':'more_more'} onClick={()=>setMoreClick(true)}/>
            <img src="/images/add_picture.png" alt="aa" className={moreClick? 'more_picture active': 'more_picture'}/>
            </div>
            <p onClick={()=>saveBtn()} style={{color:color}}  >저장</p>
        </div>
        <div className='addMemoC2'>
            <form onSubmit={(e)=>submit(e)}>
                <input type="text" placeholder='제목을 입력하세요.' onChange={(e)=>setTitle(e.target.value)}/>
                <textarea name="내용" placeholder='내용을 입력하세요.' onChange={(e)=>setContents(e.target.value)}></textarea>
            </form>
            <div className='addMemoC3' style={{backgroundColor:color}}>
                <div className='colorPalette' onClick={colorClick}>
                    <img src="/images/colorp.png" alt="colorp" />
                </div>
                {/* <div className='bookmark'>
                    <img src="/images/bookmark_large.png" alt="bookmarkLarge" />
                </div> */}
            </div>
        </div>
</article>
</>
  );
}

export default AddNote;