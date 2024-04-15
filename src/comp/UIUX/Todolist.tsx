"use client";
import { useEffect, useRef, useState } from "react";
import "../style/todo.scss";
import { useStore } from "../store/todo_store";
import { format } from 'date-fns'; 

function Todolist() {
    let {data,dataFetch} = useStore();
    
    const today = new Date();
    let formatToday = (format(today,"yyyy.MM.dd"));
    let todayMonth=format(today, "MM");
    let todayDay = format(today,"dd");
    let todayDOW = format(today,"EEE");

    let [activenum, setActiveNum] = useState(-1);
    let [activeUp,setActiveUp] = useState(-1);

    const inputRef = useRef<any>(null);
    const upinputRef = useRef<any>(null);

    let [inpuvalue,setInputValue] = useState("");
    let [upinpuvalue,setupInputValue] = useState<any>([]);
    
    const addTodo = (value:string)=>{
        setInputValue(value);
    }
    function submit (e:any){
        e.preventDefault();
        const value = {
            "idx":Date.now(),
            "complete": "false",
            "contents":inpuvalue,
            "date":formatToday
        };
        inputRef.current.value ="";
        dataFetch("post",value)
    }

    const listOn = (key:number)=>{
        setActiveNum(key === activenum ? -1 : key);
    }

    const delData = (key:number)=>{
        dataFetch("delete",key)
    }



    const update = (e:any,key:number)=>{
        e.preventDefault();
        const value = {
            idx:key,
            contents : upinpuvalue
        }
        dataFetch('update',value);
        setActiveUp(-1);
    }
    const updateData = (key:number,data:any)=>{
        setupInputValue(data)
        setActiveUp(key === activeUp ? -1 : key);
        setActiveNum(-1);
    }

    const complete_btn = (key:number,com:string)=>{
        const value = {
            idx : key,
            contents : com
        }
        dataFetch('update',value);
    }

    useEffect(()=>{
        dataFetch("all")
    },[])
    useEffect(() => {
        setActiveNum(-1);
    }, [data.length]);
    
    
    const todayData =  data.filter((obj:any)=>obj.date == formatToday);
    let pastData = data.filter((obj:any)=>obj.date !== formatToday);

    let d:any = {}
    pastData.forEach((obj:any)=>{
        const {date,complete,contents,idx} = obj;
        if(Object.keys(d).includes(date)){
            d[date] = [ ...d[date],{idx,complete,contents}]
        }else{
            d[date] = [{idx,complete,contents}]
        }
    })
    /* 
    Object.keys(d).map((obj:any)=>{
        console.log(obj) //날짜
        d[obj].map((item:any)=>{
            console.log(item.contents) //내용반복
        })
    }) */

    let dataEa = todayData.filter((obj:any)=> obj.complete == 'false');

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
            <h2>오늘 할일 : {dataEa.length}개</h2>
            <figure className="todo_screen">
                {
                    todayData.map((obj:any,key:number)=>(
                        <figcaption key={key}>
                            <img src={obj.complete=="false" ? "/images/no_complete.png":"/images/complete.png" } onClick={()=>complete_btn(obj.idx,obj.complete)} alt="aa" />
                            <div onClick={()=>listOn(key)}  className={key === activenum ? "todo_list active" : "todo_list"}>
                                <p>{obj.contents}</p>
                            </div>
                            <div className={key === activenum ? "menu active" : "menu"}>
                                <img src="/images/write.png" onClick={()=>updateData(key,obj.contents)} alt="a" />
                                <img src="/images/delete.png" onClick={()=>delData(obj.idx)} alt="a" />
                            </div>
                            <form className={key === activeUp ? "update_todo active":"update_todo"} onSubmit={(e)=>update(e,obj.idx)}>
                                <input type="text" placeholder={obj.contents} ref={upinputRef} value={upinpuvalue} onChange={(e)=>setupInputValue(e.target.value)} />
                                <button>저장</button>
                            </form>
                        </figcaption>
                    ))
                }
            </figure>
                {
                    pastData.map((obj:any,key:number)=>(
                        <div className="past" key={key}>
                            <p>{obj.date}</p>
                            <div className="past_data">
                            <img src={obj.complete=="false" ? "/images/no_complete.png":"/images/complete.png" } onClick={()=>complete_btn(obj.idx,obj.complete)} alt="aa" />
                                <p>{obj.contents}</p>
                            </div>
                        </div>
                    
                    ))
                }

                
        </div>
    );
}

export default Todolist;