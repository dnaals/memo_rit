"use client";
import { useState } from "react";
import "../style/todo.scss";
// import { eachDayOfInterval, startOfYear, endOfYear, startOfWeek, endOfWeek, format } from 'date-fns'; 주석부분 전부 달력

function Todolist({connect}:any) {
    // const today = new Date();
    // const todayFormat = format(today, "MMM");
    // const startOfThisYear = startOfYear(today); 
    // const endOfThisYear = endOfYear(today); 
    // const daysOfThisYear = eachDayOfInterval({ start: startOfThisYear, end: endOfThisYear });
    // const startWeek = startOfWeek(today);
    // const endWeek = endOfWeek(today);
    // const week = eachDayOfInterval({ start: startWeek, end: endWeek });
    // week.map((obj:any)=>(
    //     console.log(format(obj,"yyyy MMM dd EEE"))
    // ))
    // const a = format(week[0] , "'yyyy MMM dd EEE'");
    // console.log(a)
    let [listClick,setlistClick] = useState(false);
    
    return (
        <div className='todo'>
            
            <form className="todo_text">
                <input type="text" placeholder="할 일을 입력해주세요" />
                <img src="/images/todo_add.png" alt="" />
            </form>
            <h2>남은할일 : 2개</h2>
            <figure className="todo_screen">
                
                <figcaption onClick={()=>setlistClick(!listClick)}>
                    <div className={listClick ? "todo_list active" : "todo_list"}>
                        <p>ㅎㅇ</p>
                    </div>
                    <div className={listClick ? "menu active" : "menu"}>
                        <img src="/images/no_complete.png" alt="aa" />
                        <img src="/images/write.png" alt="a" />
                        <img src="/images/delete.png" alt="a" />
                    </div>
                </figcaption>

                <figcaption>
                    <div className="todo_list">
                        <p>ㅎㅇ</p>
                    </div>
                    <div className="menu">
                        <img src="/images/no_complete.png" alt="aa" />
                        <img src="/images/write.png" alt="a" />
                        <img src="/images/delete.png" alt="a" />
                    </div>
                </figcaption>
                <figcaption>
                    <div className="todo_list">
                        <p>ㅎㅇ</p>
                    </div>
                    <div className="menu">
                        <img src="/images/no_complete.png" alt="aa" />
                        <img src="/images/write.png" alt="a" />
                        <img src="/images/delete.png" alt="a" />
                    </div>
                </figcaption>
            </figure>
        </div>
    );
}

export default Todolist;