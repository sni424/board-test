import React, { useEffect, useState } from "react";
import styled from "styled-components";

function PageNum({ currentPage, postPage, newDatas, setCurrentPage, checkTrue, setcheckTrue }) {

    const pageNumbers = [];
    const setNumber = 11;
    const [saveNumber, setSaveNumber] = useState(0);
    const [pageI, setPageI] = useState(1);
    for (let i = pageI; i <= Math.ceil(newDatas.length / postPage); i++) {
        pageNumbers.push(i + saveNumber);
    }

    const [currentPaging, setCurrentPaging] = useState(1);//현재 페이지
    const [postPaging] = useState(10)//포스트 개수
    const lastPaging = currentPaging * postPaging //1*10 =10
    const firstPaging = lastPaging - postPaging  // 10-10 =0
    const newPaging = pageNumbers.slice(firstPaging, lastPaging);

    const changePage = pageNumber => {
        return setCurrentPage(pageNumber)
    }

    const addPagin = () => {
        setCurrentPage(setNumber);
        setSaveNumber(saveNumber + 10);
        if (currentPage === 11) {
            setCurrentPage(currentPage + 10);
            setSaveNumber(saveNumber + 10);
        }
        setcheckTrue(!checkTrue)
    }


    return (
        <>
            <PageUl>
                {pageNumbers.includes(1) === false &&
                    <button>pre</button>
                }
                {
                    newPaging.map((a, i) => {
                        return <PageLi key={i}>
                            <PageA onClick={() => changePage(parseInt(a))}>{a}</PageA>
                        </PageLi>
                    })}
                {
                    <button onClick={() => addPagin()}>next</button>
                }
            </PageUl>
        </>
    )
}

const PageUl = styled.ul`
display: flex;
align-items: center;
justify-content: center;
`;
const PageLi = styled.li`
list-style: none;
`;
const PageA = styled.button`
color: green;
`;

export default PageNum