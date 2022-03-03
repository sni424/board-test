import axios from "axios";
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Profile from "../img/profile.png"

function ReplyShow({ setNewReply, newReply, setid, sameId, newid, index, comment }) {

    const [inputvalue, setinputvalue] = useState("");
    const [showButton, setShowButton] = useState(false);

    function removeReply(e) {
        const { value } = e.target
        console.log(typeof value);
        if (newReply.length > 0) {
            if (window.confirm("삭제 하시겠습니까?")) {
                axios({
                    method: 'DELETE',
                    url: `http://localhost:3001/boardsreply/${parseInt(newReply[index].id)}`,
                }).then(() => {
                    setShowButton(!showButton);
                    setNewReply(newReply.filter(a => a.id !== parseInt(value)));
                }).catch(err => {
                    return alert(err.message);
                })
            }
        }
    }

    function ShowTwoButton() {
        setShowButton(!showButton);
    }

    return (
        <FirstDiv>
            {sameId === parseInt(setid) && <>
                <ProfileImg src={Profile}></ProfileImg>
                <SecondDiv>
                    <ThirdDiv>
                        <NameDiv>
                            <ATag href="#">sni424</ATag>
                            <PTag>Feb 23</PTag>
                        </NameDiv>
                        <div>
                            <NewButton><SpanTag href="#" onClick={ShowTwoButton}>...</SpanTag></NewButton>
                        </div>
                    </ThirdDiv>
                    <LastDiv>{comment}
                        <div>
                            {showButton === true &&
                                <div>
                                    <button value={newid} onClick={removeReply}>❌</button>
                                    <Link to={`/edit/${newid}`}>
                                        <button>수정</button>
                                    </Link>
                                </div>
                            }
                        </div>
                    </LastDiv>
                </SecondDiv>
            </>
            }
        </FirstDiv>
    );
};

const FirstDiv = styled.div`
display: flex;
align-items: center;
justify-content: start;
`;
const ProfileImg = styled.img`
border-radius: 70%;
width: 24px;
height: 24px;
margin: -50px 3px 0 0; 
`;
const SecondDiv = styled.div`
border:2px solid #EFEFEF;
border-radius:5px;
width: 100%;
height: 100%;
margin-bottom:5px;
padding: 10px
`;
const ThirdDiv = styled.div`
display:flex;
align-items: center;
justify-content: space-between;
`;
const NameDiv = styled.div`
display:flex;
align-items: center;
justify-content: start;
padding-bottom:10px;
`;
const ATag = styled.a`
color:#3d3d3d;
font-size:18px;
font-weight:600;
padding-rigt:5px;
`;
const PTag = styled.p`
font-size:12px;
margin: 0 0 0 5px;
`;
const NewButton = styled.button`
background-color:transparent;
border:none;
text-align: center;
`;
const SpanTag = styled.a`
font-size:24px
`;
const LastDiv = styled.div`
display:flex;
`;

export default ReplyShow;