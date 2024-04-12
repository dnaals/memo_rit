"use client";
import { useEffect, useRef, useState } from "react";
import "../style/todo.scss";
import { useStore } from "../store/todo_store";
import { format } from 'date-fns'; 

function Todolist({connect}:any) {
    const today = new Date();
    let todayMonth=format(today, "MM");
    let todayDay = format(today,"dd");
    let todayDOW = format(today,"EEE");
    let [activenum, setActiveNum] = useState(-1);
    let {data,dataFetch} = useStore();
    const inputRef = useRef<any>(null);
    let [inpuvalue,setInputValue] = useState("");

    const addTodo = (value:string)=>{
        setInputValue(value);
        
        // console.log(inputRef.current.value)
    }
    function submit (e:any){
        e.preventDefault();
        console.log(inpuvalue);
        const aa = {
            "idx":11,
            "complete":"11",
            "contents":"11",
            "date":"11"
        }
        dataFetch("post",aa)
    }

    const listOn = (key:number)=>{
        setActiveNum(key === activenum ? -1 : key);
    }

    const delData = (key:number)=>{
        dataFetch("delete",key)
    }
    useEffect(()=>{
        dataFetch("all")
    },[])
    if(data.length=='') return "로딩중"
    
 

    return (
        <div className='todo'>
            <div className="days">
                <p>Today</p>
                <p>{todayMonth}.{todayDay}</p>
                <p>{todayDOW}</p>

            </div>
            <form className="todo_text" onSubmit={submit}>
                <input type="text" placeholder="할 일을 입력해주세요" ref={inputRef} onChange={(e)=>addTodo(e.target.value)} />
                <img src="/images/todo_add.png" alt="" onClick={submit} />
            </form>
            <h2>남은할일 : {data.length}개</h2>
            <figure className="todo_screen">
                {
                    data.map((obj:any,key:number)=>(
                        <figcaption key={key}>
                            <img src={obj.complete ? "/images/no_complete.png":"/images/complete.png" } alt="aa" />
                            <div onClick={()=>listOn(key)}  className={key === activenum ? "todo_list active" : "todo_list"}>
                                <p>{obj.contents}</p>
                            </div>
                            <div className={key === activenum ? "menu active" : "menu"}>
                                <img src="/images/write.png" alt="a" />
                                <img src="/images/delete.png" onClick={()=>delData(obj.idx)} alt="a" />
                            </div>
                        </figcaption>
                    ))
                }
            </figure>
            <div className="past">
                <p>2024.04.11</p>
                <div className="past_data">
                    <img src="/images/no_complete.png" alt="aa" />
                    <p>과거 데이타</p>
                </div>
            </div>
        </div>
    );
}

export default Todolist;