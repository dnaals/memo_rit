"use client";
import { useEffect, useRef, useState } from "react";
import "../../style/todo.scss";
import { useStore } from "../../store/todo_store";
import { format } from 'date-fns'; 
import TodoComp from "./TodoComp";
import PastComp from "./PastComp";

function Todolist() {
    let {data,dataFetch} = useStore();
    
    const today = new Date();
    let formatToday = (format(today,"yyyy.MM.dd"));
    let todayMonth=format(today, "MM");
    let todayDay = format(today,"dd");
    let todayDOW = format(today,"EEE");

    const inputRef = useRef<any>(null);

    let [inpuvalue,setInputValue] = useState("");
    
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

    useEffect(()=>{
        dataFetch("all")
    },[])
    

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
    let pData = Object.keys(d);

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
            <div className="screenDiv">
            {
                todayData.map((obj:any,k:number)=>(
                    <TodoComp obj={obj} key={k} />
                ))
            }
            </div>
            <PastComp pData={pData} d={d}/>
        </div>
    );
}

export default Todolist;