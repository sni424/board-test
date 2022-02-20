import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Creply from "../reply/Creply";

function Read() {
    const data = useFetch("http://localhost:3001/boards");
    const nReply = useFetch("http://localhost:3001/boardsreply");

    let { setid } = useParams();
    let [put, setPut] = useState(`/putndelete/${setid}`);
    const navi = useNavigate();
    const [checkUseEffect,setCheckUseEffect] = useState(true);
    
    function removeText() {
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
            console.log("hello");      
    }, [data.title, data.content,checkUseEffect])


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
            <Creply setid={setid}></Creply>
            {nReply.length > 0 &&
                nReply.map((a, i) => {
                    return <ReplyShow navi={navi} nReply={nReply} setCheckUseEffect={setCheckUseEffect} checkUseEffect={checkUseEffect} setid={setid} key={i} index={i} sameId={a.sameId} comment={a.comment} newid={a.id} like={a.like}></ReplyShow>
                })
            }
        </div>
    );
};

function ReplyShow({navi,setCheckUseEffect,checkUseEffect,nReply, setid, sameId, newid, comment, index, like }) {
    const [changeReply, setChangeReply] = useState(true);
    const putReply = useRef(null);
    const [inputvalue, setinputvalue] = useState("");
    const [newHello,setNewhello] = useState(comment);

    function removeReply() {
        if (nReply.length > 0) {
            if (window.confirm("삭제 하시겠습니까?")) {
                fetch(`http://localhost:3001/boardsreply/${nReply[index].id}`,
                    {
                        method: 'DELETE',
                    }).then(res => {
                        if (res.ok) {
                            navi(`/`);
                        }
                    })
            }
        }
    }
    function valueChange(e){
        const replyValue = e.target.value;
        setinputvalue(replyValue);
    }

    function changetrue() {
        setChangeReply(!changeReply);
    };

    function changeComment(event) {
        const {target} = event.target
        fetch(`http://localhost:3001/boardsreply/${nReply[index].id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                sameId: parseInt(setid),
                comment: inputvalue,
                like: 0,
            }),
        }).then(res => {
            if (res.ok) {
                setNewhello(inputvalue);
                setChangeReply(!changeReply);
                setCheckUseEffect(!checkUseEffect);
                alert("댓글 수정완료.");    
            }
        })
    }

    return (
        <div>
            {sameId === parseInt(setid) &&
                <div>{newHello}<button value={newid} onClick={removeReply}>❌</button><button onClick={changetrue}>수정</button>{
                    changeReply === true
                        ? null
                        : <>
                        <input value={inputvalue} type="text" placeholder="댓글수정" onChange={valueChange}/><button onClick={changeComment}>수정완료</button>
                    </>
                }</div>
            }
        </div>
    );
};


export default Read;

