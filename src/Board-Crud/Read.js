import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Creply from "../reply/Creply";
import ReplyShow from "../reply/ReplyShow";
import styled from "styled-components";

const HeaderDiv = styled.div`
text-align: center;`;
const HeaderH1 = styled.h1`
color:#171717;
font-weight: 600;
margin-bottom: 8px;
`;
const LanguageTag = styled.div`
display: flex;
align-items: center;
justify-content: start;
`;
const LanguageA = styled.a`
padding: 4px 8px;
font-size: 16px;
`;
const SharpSpan = styled.span`
color:${props => props.color}
`;
const ContentP = styled.p`
font-weight: 500;
`;

function Read() {
    const data = useFetch("http://localhost:3001/boards");
    const [newReply, setNewReply] = useState([]);
    const fetchTasks = async () => {
        const res = await fetch('http://localhost:3001/boardsreply')
        const newData = await res.json()
        return setNewReply(newData)
    }
    let { setid } = useParams();
    let [put, setPut] = useState(`/putndelete/${setid}`);
    const navi = useNavigate();
    const [checkUseEffect, setCheckUseEffect] = useState(true);

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
        fetchTasks(); console.log(newReply);
    }, [data.title, data.content, checkUseEffect])


    return (
        <div>
            <HeaderDiv>
                {data.length > 0 &&
                    <HeaderH1>{data.find(a => a.id === parseInt(setid)).title}</HeaderH1>}
                <LanguageTag>
                    <LanguageA href="#">
                        <SharpSpan color="orange">#</SharpSpan>Java
                    </LanguageA>
                    <LanguageA href="#">
                        <SharpSpan color="green">#</SharpSpan>JavaScript
                    </LanguageA>
                    <LanguageA href="#">
                        <SharpSpan color="blue">#</SharpSpan>Python
                    </LanguageA>
                </LanguageTag>
            </HeaderDiv>
            <HeaderDiv>
                <ContentP>
                    {data.length > 0 &&
                        <>{data.find(x => x.id === parseInt(setid)).contents}</>}
                </ContentP>
            </HeaderDiv>
            <Link to={put}>
                <button className="submit-button" type="submit">수정</button>
            </Link>
            <button className="submit-button" type="submit" onClick={removeText}>삭제</button><br></br>
            <Creply setCheckUseEffect={setCheckUseEffect} checkUseEffect={checkUseEffect} setid={setid} newReply={newReply} setNewReply={setNewReply}></Creply>
            {newReply.length > 0 &&
                newReply.map((a, i) => {
                    return <ReplyShow setNewReply={setNewReply} newReply={newReply} setCheckUseEffect={setCheckUseEffect} checkUseEffect={checkUseEffect} setid={setid} key={i} index={i} sameId={a.sameId} comment={a.comment} newid={a.id} like={a.like}></ReplyShow>
                })
            }
        </div>
    );
};

export default Read;

