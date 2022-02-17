/*eslint-disable */
import React from "react";
import Logo from "../img/okjsp_logo.png"
import "../css/Left.css"
import Community from "./Community";
import MainCommunity from "./MainCommunity";

function Left({ showCommnutiy, community }) {

    return (
        <div className="flex">
            <div className="main">
                <div className='leftbar-ca leftbar'>
                    <div className='logo'><a href='/'><img src={Logo} alt='logo'></img></a></div>
                    <div className='search'><a href='#'><i className="fa fa-search"></i></a></div>
                    <div className='second-icon'>
                        <div className='login-icon'><a href='#'><i className="fa fa-sign-in"></i></a></div>
                        <div className='signin-icon'><a href='#'><i className="fa fa-user"></i></a></div>
                    </div>
                    <div>
                        <ul className='ulfirst-tag'>
                            <li><a><i className="nav-icon fa fa-database"></i></a></li>
                            <li><a><i className="nav-icon nav-icon fa fa-code"></i></a></li>
                            <li><a onClick={showCommnutiy}><i className="nav-icon fa fa-comments"></i></a></li>
                            <li><a><i className="nav-icon fa fa-quote-left"></i></a></li>
                            <li><a><i className="nav-icon fa fa-group"></i></a></li>
                        </ul>
                    </div>
                    <div className='github-logo'>
                        <a href='#'><i className="fa fa-github"></i></a>
                    </div>
                </div>
            </div>
            <div className="start"></div>
            {community === true
                ?
                <div className="start">
                    <Community></Community>
                </div>
                : null
            }
            <div>
                <MainCommunity></MainCommunity>
            </div>
        </div>
    );
};

export default Left;