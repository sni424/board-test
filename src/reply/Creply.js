import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Profile from "../img/profile.png"

const FirstDiv = styled.div`
display: flex;
align-items: center;
justify-content:start
`;
const ProfileImg = styled.img`
border-radius:70%;
width: 24px;
height: 24px;
margin: -80px 8px 0 0px;
`;
const Formdiv = styled.form`
padding-top:30px
`;
const TextArea = styled.textarea`
width: 500%;
height: 6.25em;
resize: none;
padding:8px;
`;
const DivButton = styled.button`
background-color:transparent;
border:none;
`;
const ButtonA = styled.a`
background-color:#3b49df;
color:#f9f9f9;
display:flex;
width:83px;
height:40px;
border-radius:5px;
align-items: center;
justify-content: center;
font-size:16px;
margin: 0 0 5px -7px;
`;

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
        fetch(`http://localhost:3001/boardsreply`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    sameId: parseInt(setid),
                    comment: newConmment,
                    like: 0
                }),
            }).then(res => {
                if (res.ok) {
                    setNewReply([...newReply, res]);
                    setCheckUseEffect(!checkUseEffect);
                    setNewConmment("");
                    console.log()
                    alert("생성이 완료되었습니다.");
                }
            })
    };
    return (
        <FirstDiv>
            <ProfileImg src={Profile}></ProfileImg>
            <Formdiv onSubmit={CreateReply}>
                <TextArea type="text" placeholder="Add to the discussion" value={newConmment} onChange={onChange}></TextArea>
                <div>
                    <DivButton ><ButtonA href="#">Submit</ButtonA></DivButton>
                </div>
            </Formdiv>
        </FirstDiv>
    );
};

export default Creply;