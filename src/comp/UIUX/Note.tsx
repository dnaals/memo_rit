"use client";
import React from 'react';
import "../style/note.scss";
function Note() {
    return (
        <div className='note'>
            <form className='search'>
                <input type="text" placeholder='검색어를 입력하라' />
                <img src="/images/search.png" alt="aa" />
            </form>
            <figure className='note_screen'>
                <figcaption className='note_add'>
                    <img src="/images/add.png" alt="aa" />
                    <div className='note_contents_day'>
                    </div>
                </figcaption>

                <figcaption className='note_contents'>
                    <p>제목</p>
                    <p>동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세</p>
                    <img src="/images/bookmark.png" alt="aa" />
                    <div className='note_contents_day' style={{backgroundColor:"#4385F5"}}>
                        <p>2024.04.11</p>
                    </div>
                </figcaption>
                <figcaption className='note_contents'>
                    <p>제목</p>
                    <p>동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세</p>
                    <img src="/images/bookmark.png" alt="aa" />
                    <div className='note_contents_day' style={{backgroundColor:"#E8463B"}}>
                        <p>2024.04.11</p>
                    </div>
                </figcaption>
                <figcaption className='note_contents'>
                    <p>제목</p>
                    <p>동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세</p>
                    <img src="/images/bookmark.png" alt="aa" />
                    <div className='note_contents_day' style={{backgroundColor:"#34A853"}}>
                        <p>2024.04.11</p>
                    </div>
                </figcaption>
            </figure>
        
        </div>
    );
}

export default Note;