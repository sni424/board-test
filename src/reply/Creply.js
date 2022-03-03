import React, { useState } from "react";
import styled from "styled-components";
import Profile from "../img/profile.png"
import axios from "axios";

function Creply({ setid, setNewReply, newReply, setCheckUseEffect, checkUseEffect }) {

    const [newConmment, setNewConmment] = useState("");

    function onChange(e) {
        const { value } = e.target;
        setNewConmment(value);
    }

    function CreateReply(event) {
        event.preventDefault();
        if (newConmment === "") {
            return alert("댓글의 내용을 적어주세요.")
        }
        axios({
            method: "POST",
            url: `http://localhost:3001/boardsreply`,
            data: {
                sameId: parseInt(setid),
                comment: newConmment,
                like: 0,
            }
        })
            .then(res => {
                setNewReply([...newReply, res]);
                setCheckUseEffect(!checkUseEffect);
                setNewConmment("");
                alert("생성이 완료되었습니다.");
            })
            .catch(err => {
                return alert(err.message);
            })
    };
    const newArray = newReply.filter(a => a.sameId === parseInt(setid));//댓글 갯수

    return (
        <div>
            <DiscussionDiv>
                Comments ({newReply.length > 1
                    ? newArray.length
                    : 0})
                <DivButton  ><ButtonA href="#" onClick={CreateReply}>등록</ButtonA></DivButton>
            </DiscussionDiv>
            <FirstDiv>
                <ProfileImg src={Profile}></ProfileImg>
                <Formdiv>
                    <TextArea type="text" placeholder="댓글을 입력해 주세요." value={newConmment} onChange={onChange}></TextArea>
                </Formdiv>
            </FirstDiv>
        </div>
    );
};

const FirstDiv = styled.div`
display: flex;
align-items: center;
justify-content:start
`;
const DiscussionDiv = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
color:#242424;
font-size:24px;
font-weight: 700;
`;
const ProfileImg = styled.img`
border-radius:70%;
width: 24px;
height: 24px;
margin-right:4px;
`;
const Formdiv = styled.form`
padding-top:30px;
width:100%;
`;
const TextArea = styled.textarea`
width: 100%;
height: 70px;
resize: none;
padding:8px;
border-radius:5px;
border:2px solid #EFEFEF;
outline:none;
`;
const DivButton = styled.button`
background-color:transparent;
border:none;
`;
const ButtonA = styled.a`
background-color:white;
color:black;
border: 1px solid #6550FF;
border-radius:5px;
font-size:16px;
padding:10px 15px;
`;

export default Creply;