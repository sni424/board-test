/*eslint-disable */
import React, { useEffect, useState } from "react";
import { Link, } from "react-router-dom";
import "../css/maincommunity.css"
import Second_logo from "../img/second-logo.png"
import PageNum from "./PageNum";
import styled from "styled-components";
import { tab } from "@testing-library/user-event/dist/tab";

function MainCommunity({ newDatas, fetchData }) {

    const [currentPage, setCurrentPage] = useState(1);//현재 페이지
    const [postPage] = useState(10)//포스트 개수
    const lastPost = currentPage * postPage //1*10 =10
    const firstPast = lastPost - postPage  // 10-10 =0
    const currentPosts = newDatas.slice(firstPast, lastPost);

    const [checkTrue, setcheckTrue] = useState(true);
    useEffect(() => {
        fetchData();
    }, [newDatas, currentPage, checkTrue])


    return (
        <Full>
            <FirstDiv>
                <h2>커뮤니티</h2>
                <h3>All</h3>
            </FirstDiv>
            <SecondDiv>
                <FirstInput placeholder="Serch..." />
                <SerchButton>
                    <SerchA href="#">
                        {/* <i className="fa fa-search"></i> */}
                        검색
                    </SerchA>
                </SerchButton>
            </SecondDiv>
            <Table>
                <Thead >
                    <tr>
                        <Th>번호</Th>
                        <Th>구분</Th>
                        <Th>제목</Th>
                        <Th>작성자</Th>
                        <Th>작성일</Th>
                        <Th>조회수</Th>
                    </tr>
                </Thead>
                <Tbody>
                    {
                        currentPosts.map((a, i) => {
                            return <Newli title={a.title} key={i} index={a.id}></Newli>
                        })
                    }
                </Tbody>
            </Table>
            <LastDiv>
                <PageNum currentPage={currentPage} checkTrue={checkTrue} setcheckTrue={setcheckTrue} postPage={postPage} newDatas={newDatas} setCurrentPage={setCurrentPage}></PageNum>
                <Link to="/write">
                    <SerchButton>
                        <ButtonA href="#">
                            글쓰기
                        </ButtonA>
                    </SerchButton>
                </Link>
            </LastDiv>

        </Full >
    );
};

function Newli({ title, index }) {

    let [newindex, setNewIndex] = useState(`/${index}`);

    return (
        <tr>
            <Td>{index}</Td>
            <Td>
                7
            </Td>
            <Td>
                <a href={newindex}>
                    {/* {Data.find(x => x.id).title} */}
                    {title}
                </a>
            </Td>
            <Td>
                user
            </Td>
            <Td>
                data
            </Td>
            <Td>
                1
            </Td>
        </tr>
    );
};
Newli.defaultProps = {
    title: "[okky] Clone Coding 어렵지 않아요~!"
}

const Full = styled.div`
background-color: #f8f8f8;
width: 835px;
padding-left: 30px;
`;
const FirstDiv = styled.div`
padding-bottom: -10px;
`;
const SecondDiv = styled.div`
display: flex;
align-items: center;
justify-content: end;
`;
const FirstInput = styled.input`
width:200px;
padding:14px 10px;
background-color:#f8f8f8;
border: 1px solid #BFBFBF;
border-radius:5px;
margin-right:5px;
outline:none;
&::placeholder{
font-size: 15px;
}
`;
const SerchButton = styled.button`
background-color:transparent;
border:none;
`;
const SerchA = styled.a`
border: 1px solid #6550FF;
border-radius:5px;
padding : 10px 20px;
font-size:15px;
color:black;
font-weight:800;
`;
const LastDiv = styled.div`
display: flex;
align-items: center;
justify-content: center;
`;
const ButtonA = styled.a`
background-color:#6550FF;
color:white;
border:1px solide #6550FF;
border-radius:3px;
padding:10px 15px;
font-size:14px;
font-weight:800;
`;

const Table = styled.table`
width:100%;
text-align: center;
border-collapse: collapse;
margin-top:15px;
`;
const Thead = styled.thead`
background-color:#F4ECFF;
border-top: 2px solid #6550FF;
`;
const Th = styled.th`
padding:10px;
`;
const Tbody = styled.tbody`
background-color:white;
`;
const Td = styled.td`
border-bottom: 2px solid #f8f8f8;
padding:15px 10px;
`;

export default MainCommunity;