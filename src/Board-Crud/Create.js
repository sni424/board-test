import axios from "axios";
import React, { ref, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


function Create({ newDatas, setNewDatas, fetchData }) {

    const navi = useNavigate();
    const writeTitle = useRef("");
    const newcontent = useRef("");
    const newId = useRef("");
    const [checkid, setCheckId] = useState(newDatas[newDatas.length - 1]);

    console.log(checkid);
    function CreateWrite(event) {
        event.preventDefault();
        if (writeTitle.current.value === "") {
            return alert("제목을 입력하세요.");
        } else if (newcontent.current.value === "") {
            return alert("내용을 입력하세요.");
        } else if (newId.current.value === "") {
            return alert("비밀번호를 입력하세요.");
        }
        axios({
            method: "POST",
            url: "http://localhost:3001/boards",
            data: {
                postid: parseInt(newId.current.value),
                title: writeTitle.current.value,
                contents: newcontent.current.value,
                id: checkid + 1
            },
        }).then(res => {
            setNewDatas([...newDatas, res])
            alert("생성이 완료되었습니다.");
            navi('/');
        }).catch(err => {
            return alert(err.message);
        })
    };

    function returnPage() {
        navi(-1);
    }

    useEffect(() => {
        if (newDatas.length > 1) {
            setCheckId(newDatas[newDatas.length - 1].id);
        }
        else if (newDatas.length < 1) {
            fetchData();
        }
    }, [newDatas])
    return (
        <BackDiv>
            <HeaderDiv>
                <DivButton><ButtonA href="#">Add a cover image</ButtonA></DivButton>
                <TextAreaFirst height="auto" type='text' placeholder='New Post title here'
                    ref={writeTitle} />
                <TagDiv>Add up to 4 tags...</TagDiv>
                <hr />
                <TextAreaFirst height="80%" placeholder='Write yout post content here...' ref={newcontent}></TextAreaFirst>
                <PasswordDiv>
                    <PasswordInput type="password" placeholder="Password Please" ref={newId}></PasswordInput>
                </PasswordDiv>
                <ButtonDiv>
                    <DivButton><ButtonB href="#" onClick={CreateWrite}>Publish</ButtonB></DivButton>
                    <DivButton><ButtonB href="#" onClick={returnPage}>Cancel</ButtonB></DivButton>
                </ButtonDiv>
            </HeaderDiv>
        </BackDiv>
    );
};

const BackDiv = styled.div`
background-color:#EFEFEF;
width:100%;
height:1000px;
position:relative;
display: flex;
align-items: center;
justify-content: center;
padding: 300px;
`;

const HeaderDiv = styled.div`
width:60%;
height:80%;
background:#ffffff;
position:absolute;
margin-top:50px;
padding: 50px;
`;

const TextAreaFirst = styled.textarea`
border: none;
resize: none;
outline:none;
width:100%;
height: ${props => props.height};
&::placeholder{
    font-size:28px;
    font-weight:700;
    color:gery;
}
`;
const DivButton = styled.button`
background-color:transparent;
border:none;
`;
const ButtonA = styled.a`
background-color:#FFFFFF;
color:#3d3d3d;
display:flex;
width:100%;
border:2px solid #717171;
border-radius:5px;
align-items: center;
justify-content: center;
font-size:16px;
margin: 0 0 5px -7px;
padding : 5px;
`;
const ButtonB = styled.a`
background-color:#3b49df;
color:#f9f9f9;
display:flex;
width:83px;
height:40px;
border-radius:5px;
align-items: center;
justify-content: center;
font-size:16px;
margin: 0 0 0 -7px;
`;
const PasswordInput = styled.input`
&::placeholder{
    font-size:12px;
    font-weight:700;
    color:red;
}
`;
const PasswordDiv = styled.div`
display:fles;
align-items: center;
justify-content: center;
`;

const ButtonDiv = styled.div`
display:fles;
align-items: center;
justify-content: center;
`;
const TagDiv = styled.div`
font-size:12px;
font-weight:400;
color:grey;
`;


export default Create;