import React, { useEffect, useState } from "react";
import styled from "styled-components";

function PageNum({ currentPage, postPage, newDatas, setCurrentPage }) {

    const pageNumbers = [];
    const [pageI, setPageI] = useState(1);
    for (let i = pageI; i <= Math.ceil(newDatas.length / postPage); i++) {
        pageNumbers.push(i);
    }

    const newPaging = pageNumbers.slice(0, 10);
    const [minusN, setMinusN] = useState(0);

    const changePage = pageNumber => {
        return setCurrentPage(pageNumber)
    }

    const addPagin = () => {
        if (currentPage < 11) {
            setPageI(11);
            setCurrentPage(Math.ceil(currentPage / 10) * 11);
            setMinusN(minusN + 1)
        }
        else {
            setPageI(pageI + 10);
            setCurrentPage(Math.ceil(currentPage / 10) * 11 - minusN); //11,22,33,44,55,66씩 늘어서 -를 추가
            setMinusN(minusN + 1)
        }

    }

    function prePage() {
        setCurrentPage(currentPage - 10);
        setPageI(pageI - 10);
    }

    useEffect(() => {
        console.log(currentPage);
    }, [pageNumbers, minusN])


    return (
        <>
            <PageUl>
                {pageNumbers.includes(1) === false &&
                    <button onClick={prePage}>pre</button>
                }
                {
                    newPaging.map((a, i) => {
                        return <PageLi key={i}>
                            <PageA onClick={() => changePage(parseInt(a))}>{a}</PageA>
                        </PageLi>
                    })}
                {newPaging.includes(Math.ceil(newDatas.length / postPage)) === false &&
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