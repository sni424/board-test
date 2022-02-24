import React from "react";
import styled from "styled-components";

function PageNum({ postPage, totalPost, setCurrentPage }) {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPost / postPage); i++) {
        pageNumbers.push(i);
    }
    const changePage = pageNumber => {
        return setCurrentPage(pageNumber)
    }

    return (
        <>
            <PageUl>
                {pageNumbers.map((a, i) => {
                    return <PageLi key={i}>
                        <PageA onClick={() => changePage(i + 1)}>{a}</PageA>
                    </PageLi>
                })}
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