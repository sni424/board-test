import React, { useEffect, useRef, useState } from "react";
import useFetch from "../hooks/useFetch";

function Creply({ setid,nReply }) {

    const [nContents, setnContents] = useState("");

    function onChange(e) {
        const { value } = e.target;
        setnContents(value);
    }

    function CreateReply(event) {
        event.preventDefault();
        fetch(`http://localhost:3001/boardsreply`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    sameId: parseInt(setid),
                    comment: nContents,
                    like: 0
                }),
            }).then(res => {
                if (res.ok) {
                    setnContents("");
                    alert("생성이 완료되었습니다.");
                }
            })
    };
    return (
        <div>
            <form onSubmit={CreateReply}>
                <input type="text" placeholder="댓글" value={nContents} onChange={onChange}></input>
                <button >입력</button>
            </form>
        </div>
    );
};

export default Creply;