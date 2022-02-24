import React, { useState, useRef } from "react";
import styled from "styled-components";
import Profile from "../img/profile.png"
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

function ReplyShow({ setCheckUseEffect, checkUseEffect, setNewReply, newReply, setid, sameId, newid, index, comment }) {
    const [changeReply, setChangeReply] = useState(true);
    const putReply = useRef(null);
    const [inputvalue, setinputvalue] = useState("");
    const [showButton, setShowButton] = useState(false);

    function removeReply(e) {
        const { value } = e.target
        console.log(typeof value);
        if (newReply.length > 0) {
            if (window.confirm("삭제 하시겠습니까?")) {
                fetch(`http://localhost:3001/boardsreply/${newReply[index].id}`,
                    {
                        method: 'DELETE',
                    }).then(res => {
                        if (res.ok) {
                            setNewReply(newReply.filter(a => a.id !== parseInt(value)));
                        }
                    })
            }
        }
    }
    function valueChange(e) {
        const replyValue = e.target.value;
        setinputvalue(replyValue);
    }

    function changetrue() {
        setChangeReply(!changeReply);
    };

    function changeComment() {
        fetch(`http://localhost:3001/boardsreply/${newReply[index].id}`, {
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
                setChangeReply(!changeReply);
                setCheckUseEffect(!checkUseEffect);
                alert("댓글 수정완료.");
            }
        })
    }

    function ShowTwoButton() {
        setShowButton(!showButton);
    }

    const EditReply = changeReply === true
        ? null
        : <div>
            <input value={inputvalue} type="text" placeholder="댓글수정" onChange={valueChange} /><button onClick={changeComment}>수정완료</button>
        </div>
    return (
        <FirstDiv>
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
                {sameId === parseInt(setid) &&
                    <LastDiv>{comment}
                        <div>
                            {showButton === true &&
                                <div>
                                    <button value={newid} onClick={removeReply}>❌</button><button onClick={changetrue}>수정</button>
                                    {EditReply}
                                </div>
                            }
                        </div>
                    </LastDiv>
                }
            </SecondDiv>
        </FirstDiv>
    );
};

export default ReplyShow;

// changeReply === true
//     ? null
//     : <>
//         <input value={inputvalue} type="text" placeholder="댓글수정" onChange={valueChange} /><button onClick={changeComment}>수정완료</button>
//     </>