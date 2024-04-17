"use client";
import React from 'react';
import { useStore } from '../../store/todo_store';
import { useState } from 'react';

function TodoComp({obj}:any) {
    let {dataFetch} = useStore();

    let [check, setCheck] = useState(false);
    let [activeNum,setActiveNum] = useState(false);
    let [activePut,setActivePut] = useState(false);
    let [upInput,setUpInput] = useState<any>([]);

    const todoContrl = {
        
        todoClick : ()=>{
            setActiveNum(!activeNum) 
        },

        putClick : ()=>{
            setUpInput(obj.contents)
            setActivePut(!activePut)
        },

        dataDelete : ()=>{
            dataFetch('delete',obj.idx)
            setActiveNum(!activeNum) 
        },

        updateInput : (e:any)=>{
            e.preventDefault();
            
            let upInputValue = {
                id:obj.idx,
                contents: upInput
            }
            dataFetch('update',upInputValue)
            setActivePut(false);
            setActiveNum(false);
        },
        
        checkHandle : ()=>{
            setCheck(!check)
            let upCheckValue ={
                id:obj.idx,
                complete : String(!check)
            }
            dataFetch('update',upCheckValue)
        }
    }
    

    return (

        <figure className="todo_screen">
                <figcaption>
                    <img src={obj.complete=="false" ? "/images/no_complete.png":"/images/complete.png" } onClick={()=>todoContrl.checkHandle()} alt="aa" />
                    <div onClick={()=>todoContrl.todoClick()}  className={activeNum ? "todo_list active" : "todo_list"}>
                        <p>{obj.contents}</p>
                    </div>
                    <div className={activeNum ? "menu active" : "menu"}>
                        <img src="/images/write.png" onClick={()=>todoContrl.putClick()} alt="a" />
                        <img src="/images/delete.png" onClick={()=>todoContrl.dataDelete()} alt="a" />
                    </div>
                    <form className={activePut ? "update_todo active":"update_todo"} onSubmit={(e)=>todoContrl.updateInput(e)}>
                        <input type="text" placeholder={obj.contents} value={upInput} onChange={(e)=>setUpInput(e.target.value)} />
                        <button>저장</button>
                    </form>
                </figcaption>
    </figure> 
    );
}

export default TodoComp;