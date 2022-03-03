import React, { useEffect, useState } from "react";
import styled from "styled-components";

function PageNum({ currentPage, postPage, newDatas, setCurrentPage }) {

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(newDatas.length / postPage); i++) {
        pageNumbers.push(i);
    }

    const [startPagin, setStartPagin] = useState(0);
    const [lastPagin, setLastPagin] = useState(10);
    const newPaging = pageNumbers.slice(startPagin, lastPagin);
    const [minusN, setMinusN] = useState(0);

    const changePage = pageNumber => {
        setCurrentPage(pageNumber)
    }

    const addPagin = () => {
        setCurrentPage(Math.ceil(currentPage / 10) * 11 - minusN); //11,22,33,44,55,66씩 늘어서 -를 추가
        setMinusN(minusN + 1)
        setStartPagin(startPagin + 10);
        setLastPagin(lastPagin + 10);
    }

    function prePage() {
        setCurrentPage(currentPage - 10);
        setMinusN(minusN - 1)
        setStartPagin(startPagin - 10);
        setLastPagin(lastPagin - 10);
    }

    useEffect(() => {

    }, [pageNumbers, minusN])


    return (
        <>
            <PageUl>
                {newPaging.includes(1) === false &&
                    <PageA onClick={prePage}>◀</PageA>
                }
                {
                    newPaging.map((a, i) => {
                        return <PageLi key={i}>
                            <PageA onClick={() => changePage(parseInt(a))}
                                aria-current={currentPage === i + 1 || currentPage === (i + 1) + 10 ? "page" : null}
                            >{a}</PageA>
                        </PageLi>
                    })}
                {newPaging.includes(Math.ceil(newDatas.length / postPage)) === false &&
                    <PageA onClick={() => addPagin()}>▶</PageA>
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
background-color:transparent;
border:none;
&[aria-current] {
    color: red;
    font-weight: bold;
  }
&:hover{
    color:blue;
}
`;

export default PageNum