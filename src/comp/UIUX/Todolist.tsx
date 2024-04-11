import React from 'react';
import "../style/todo.scss";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
function Todolist() {
    return (
        <div className='todo'>
            <Calendar  />
        
        </div>
    );
}

export default Todolist;