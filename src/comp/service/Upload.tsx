"use client";
import React, {  useRef } from 'react';


function Upload({setFile,file,setPreImg}:any) {
    let photo = useRef<any>(null);
    const refClick = ()=>{
        
        if(file != undefined){
            alert("이미지는 1개만 저장할 수 있습니다.");
        } else{
            photo.current.click();
        }
    }

    const imgUp = async ()=>{
        const preview = photo.current.files[0];
        setFile(preview);
        if (preview && preview.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreImg(reader.result as string);
            };
            reader.readAsDataURL(preview);
    }
}
    return (
        <div className='more'>
                <form>
                    <img src="/images/add_picture.png" alt="" onClick={refClick}/>
                    <input className='upload' ref={photo} type="file" style={{display:"none"}} name='photo' onChange={()=>{imgUp()}} />
                </form>
            </div>
    );
}

export default Upload;