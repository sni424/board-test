import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

function Update() {
    const data = useFetch("http://localhost:3001/boards");
    let navi = useNavigate();
    let { setid } = useParams();
    // const hello = data.length > 0 && data.find(a => a.id === parseInt(setid)).title
    const [newTitle, setNewTitle] = useState("");
    const [newcontent, setNewContent] = useState("");

    function onChange(e) {
        const { value } = e.target;
        setNewTitle(value);
    }

    function onChange2(e) {
        const { value } = e.target;
        setNewContent(value);
    }

    function addTitle(event) {
        event.preventDefault();
        fetch(`http://localhost:3001/boards/${setid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: parseInt(setid),
                title: newTitle,
                contents: newcontent,
            }),
        }).then(res => {
            if (res.ok) {
                alert("생성이 완료되었습니다.");
                navi(`/${setid}`);
            }
        })
    }

    return (
        <div className="panel-body">
            <h1>Movie Review</h1>
            <h3>제목</h3>
            <div className='form-wrapper'>
                <input className="title-input" type='text' placeholder='제목'
                    value={newTitle} onChange={onChange} />
                <h3>내용</h3>
                <textarea
                    className="text-area"
                    placeholder='내용'
                    value={newcontent}
                    onChange={onChange2}></textarea>
            </div>
            <div className="flex">
                <button className="cancel-button" >취소</button>
                <button className="submit-button" type="submit" onClick={addTitle}>등록</button>
            </div>
        </div>
    );
};

export default Update;