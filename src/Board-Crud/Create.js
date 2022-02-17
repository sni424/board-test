import React, { ref, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../CRUDcss/Create.css"

function Create() {

    const navi = useNavigate();
    const writeTitle = useRef("");
    const newcontent = useRef("");
    const newId = useRef("");

    function CreateWrite(event) {
        event.preventDefault();
        fetch("http://localhost:3001/boards", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: parseInt(newId.current.value),
                title: writeTitle.current.value,
                contents: newcontent.current.value,
            }),
        }).then(res => {
            if (res.ok) {
                alert("생성이 완료되었습니다.");
                navi('/');
            }
        })
    };

    function returnPage() {
        navi(-1);
    }
    return (
        <div className="panel-body">
            <h1>Movie Review</h1>
            <h3>제목</h3>
            <div className='form-wrapper'>
                <input className="title-input" type='text' placeholder='제목'
                    ref={writeTitle} />
                <h3>내용</h3>
                <textarea className="text-area" placeholder='내용' ref={newcontent}></textarea>
            </div>
            <input type="password" placeholder="비밀번호를 입력해주세요" ref={newId}></input>
            <div className="flex">
                <button className="cancel-button" onClick={returnPage}>취소</button>
                <button className="submit-button" type="submit" onClick={CreateWrite}>등록</button>
            </div>
        </div>
    );
};


export default Create;