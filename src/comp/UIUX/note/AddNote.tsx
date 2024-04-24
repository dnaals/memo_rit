"use client";
import React, { useState } from 'react';
import { format } from 'date-fns'; 
import Upload from '@/comp/service/Upload';
import { ref, uploadBytes,  getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";
function AddNote({setAddNote,dataFetch2}:any) {

    
    const today = new Date();
    let formatToday = (format(today,"yyyy.MM.dd HH:mm:ss"));

    let [title,setTitle] = useState('');
    let [contents,setContents] = useState('');
    let [color,setColor] = useState('#4385F5');
    let [file,setFile] = useState<any>(null);
    let [preImg,setPreImg] = useState('');
    let [detail,setDetail]= useState(false);

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


    const saveBtn= async()=>{
        alert("저장중입니다. 확인을 누르고 잠시만 기다려주세요")
        let num = Date.now()
        let url='';
        if(file){
            const storageRef = ref(storage, num + "/"+file.name);   
            const a = await uploadBytes(storageRef, file)       
            url = await getDownloadURL(ref(storage, a.metadata.fullPath));
        }
        
        let data = {
            id : num,
            title : title,
            contents : contents,
            date : formatToday,
            color: color,
            bookmark : "false",
            url : url,
        }
        dataFetch2("post",data)
        setAddNote(false);
    }

const uploadClick = ()=>{
    setDetail(true)
}
const detail_del=()=>{
    setPreImg('')
    setDetail(false)
    setFile(null)
    
}
  return (
    <>
    {
    detail? 
    <>
        <div className='img_detail_back' onClick={()=>{setDetail(false)}}>
        </div> 
        <div className='img_detail'>
        <p><img src={preImg} onClick={()=>{setDetail(false)}}/></p>
        <img src="/images/del_white.png" alt="" onClick={detail_del} />
    </div>
    </>
        : ''
    }
    <div className='addBack' onClick={offClick}></div>
    <article className='addMemo'>
        <div className='addMemoC1'>
            <Upload setFile={setFile} file={file} setPreImg={setPreImg} />
            <p onClick={()=>saveBtn()} style={{color:color}}  >저장</p>
        </div>
        <div className='addMemoC2'>
        {preImg ? <p  className='upload_img'><img src={preImg} alt="" onClick={uploadClick} /></p> : ''}
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