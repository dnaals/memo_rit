"use client";
import React, {  useState } from 'react';
import { ref, listAll, getDownloadURL, deleteObject,uploadBytes } from "firebase/storage";
import { storage } from "@/lib/firebase";
import UpdateUpload from '@/comp/service/UpdateUpload';

function UpdateNote({upNote,setClick2,dataFetch2}:any) {
    let [noteTitle,setNoteTitle] = useState(upNote.title);
    let [noteContents,setNoteContents] = useState(upNote.contents);
    let [color,setColor] = useState(upNote.color);
    let [bookmark,setBookmark] = useState(upNote.bookmark);
    let [upDetail,setupDetail]= useState(false);
    let [file,setFile] = useState<any>(null);
    let [preImg,setPreImg] = useState('');

    const delNote = (id:number)=>{
        dataFetch2("delete",id);
        setClick2(false);
    }
    const updateNote = async(id:number)=>{
        let url='';
        if(file){
            const storageRef = ref(storage, upNote.id + "/"+file.name);   
            const a = await uploadBytes(storageRef, file)       
            url = await getDownloadURL(ref(storage, a.metadata.fullPath));
        }
        let value = {
            title:noteTitle,
            contents : noteContents,
            id : id,
            color:color,
            bookmark:bookmark,
            url:url
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
    const detail_del=()=>{
        deleteObject(ref(storage, imgList[0].fullPath));
        upNote.url = '';
        setupDetail(false);
        setImgList((item:any) => {
        return item.filter((obj:any) => obj.fullPath != imgList[0].fullPath)
    })
    }
    const [imgList, setImgList] = useState<any>([]);

    async function getImages() {
        setupDetail(true)
        const storageRef = ref(storage, String(upNote.id));
        listAll(storageRef)
        .then(async (res) => {
            let imgArr:any = [];
            for (let value of res.items) {
            const url = await getDownloadURL(value);
            imgArr.push({ url, fullPath: value.fullPath })
            }
            setImgList(imgArr)
            if(imgList[0]==undefined){
                return <p>로딩중</p>
            }
        });
    }

    
    
    return (
        <>
        {
            upDetail? 
            <>
                <div className='img_detail_back' onClick={()=>{setupDetail(false)}}>
                </div> 
                    <div className='img_detail'>
                    <p><img src={upNote.url} onClick={()=>{setupDetail(false)}}/></p>
                    <img src="/images/del_white.png" alt="" onClick={detail_del} />
                </div>
            </>
                : ''
        }
        <div className='addBack' onClick={()=>{updateNote(upNote.id)}} ></div>
        <article className='addMemo'>
            <div className='addMemoC1'>
                <div className='more'>
                    <UpdateUpload setFile={setFile} upNote2={upNote.url} file={file} setPreImg={setPreImg} />
                    <img src="/images/note_del.png" alt="aa" onClick={()=>delNote(upNote.id)}/>
                </div>
                <p onClick={()=>{updateNote(upNote.id)}} style={{color:color}}>저장</p>
            </div>
            <div className='addMemoC2'>
                {upNote.url? <p  className='upload_img'><img src={upNote.url} alt="" onClick={()=>getImages()} /></p>:""}
                {preImg ? <p  className='upload_img'><img src={preImg} alt="" onClick={()=>getImages()} /></p> : ''}
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