/*eslint-disable */
import React, { useEffect, useState } from "react";
import { Link, } from "react-router-dom";
import "../css/maincommunity.css"
import useFetch from "../hooks/useFetch";
import Second_logo from "../img/second-logo.png"
import PageNum from "./PageNum";

function MainCommunity({ newDatas, fetchData }) {

    const [currentPage, setCurrentPage] = useState(1);//현재 페이지
    const [postPage] = useState(10)//포스트 개수
    const lastPost = currentPage * postPage //1*10 =10
    const firstPast = lastPost - postPage  // 10-10 =0
    const currentPosts = newDatas.slice(firstPast, lastPost);

    console.log(currentPosts);
    useEffect(() => {
        fetchData();
    }, [newDatas.id, newDatas.contents, currentPage])


    return (
        <div className="full">
            <div className="firstdiv">
                <h4>커뮤니티</h4>
                <Link to="/write">
                    <button>
                        <i className="fa fa-pencil">
                        </i>
                        새 글 쓰기
                    </button>
                </Link>
            </div>
            <div className="seconddiv">
                <ul className="ul-tag">
                    <li><a href="#">최신순</a></li>
                    <li><a href="#">추천순</a></li>
                    <li><a href="#">댓글순</a></li>
                    <li><a href="#">스크랩순</a></li>
                    <li><a href="#">조회순</a></li>
                </ul>
                <div>
                    <input></input>
                    <span className="input-group-btn">
                        <button><i className="fa fa-search"></i></button>
                    </span>
                </div>
            </div>
            <div className="thirddiv">
                <ul className="third-ul">
                    <Newli></Newli>
                    <Newli></Newli>
                </ul>
            </div>
            <div className="lastdiv">
                <ul className="last-ul">
                    {
                        currentPosts.map((a, i) => {
                            return <Newli title={a.title} key={i} index={a.id}></Newli>
                        })
                    }
                </ul>
            </div>
            <div>
                <PageNum postPage={postPage} totalPost={newDatas.length} setCurrentPage={setCurrentPage}></PageNum>
            </div>
        </div>
    );
};

function Newli({ title, index }) {

    let [newindex, setNewIndex] = useState(`/${index}`);

    return (
        <>
            <li>
                <div className="first-notice">
                    <div>
                        <span>#1151540</span>
                        <a className="first-a" href="#">공지사항</a>
                    </div>
                    <span className="read-span">
                        <h5><a href={newindex}>
                            {/* {Data.find(x => x.id).title} */}
                            {title}
                        </a></h5>
                    </span>
                </div>
                <div className="second-notice">
                    <ul className="second-notice-ul">
                        <li><i className="item-icon fa fa-comment"></i>1</li>
                        <li><i className="item-icon fa fa-thumbs-up"></i>5</li>
                        <li><i className="item-icon fa fa-eye"></i>1k</li>
                    </ul>
                </div>
                <div className="third-notice">
                    <a><img src={Second_logo} alt="profile_img"></img></a>
                    <div className="name-like">
                        <div className="name-like-first">
                            <a href="#">OKKY</a>
                        </div>
                        <h4>2022-02-03 08:24:20</h4>
                    </div>
                </div>
            </li>
        </>
    );
};
Newli.defaultProps = {
    title: "[okky] Clone Coding 어렵지 않아요~!"
}

export default MainCommunity;