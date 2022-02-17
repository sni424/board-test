import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

function Read() {
    const data = useFetch("http://localhost:3001/boards");

    let { setid } = useParams();
    let [put, setPut] = useState(`/putndelete/${setid}`);
    const navi = useNavigate();

    function removeText(e) {
        if (data.length > 0) {
            if (window.confirm("삭제 하시겠습니까?")) {
                fetch(`http://localhost:3001/boards/${parseInt(setid)}`,
                    {
                        method: 'DELETE',
                    }).then(res => {
                        if (res.ok) {
                            alert("삭제되었습니다.");
                            navi('/');
                        }
                    })
            }
        }
    }

    useEffect(() => {

    }, [data.title, data.content])

    return (
        <div>
            <h2>제목</h2>
            {data.length > 0 &&
                <h3>{data.find(a => a.id === parseInt(setid)).title}</h3>}
            <div className='form-wrapper'>
                <h3>내용</h3>
                <div>
                    {data.length > 0 &&
                        <h3>{data.find(x => x.id === parseInt(setid)).contents}</h3>}
                </div>
            </div>
            <Link to={put}>
                <button className="submit-button" type="submit">수정</button>
            </Link>
            <button className="submit-button" type="submit" onClick={removeText}>삭제</button><br></br>
        </div>
    );
};

export default Read;