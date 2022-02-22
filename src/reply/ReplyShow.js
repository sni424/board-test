import React, { useState, useRef } from "react";

function ReplyShow({ setCheckUseEffect, checkUseEffect, nReply, setid, sameId, newid, comment, index }) {
    const [changeReply, setChangeReply] = useState(true);
    const putReply = useRef(null);
    const [inputvalue, setinputvalue] = useState("");
    const [newComment, setNewComment] = useState(comment);

    function removeReply(e) {
        const { value } = e.target
        if (nReply.length > 0) {
            if (window.confirm("삭제 하시겠습니까?")) {
                fetch(`http://localhost:3001/boardsreply/${nReply[index].id}`,
                    {
                        method: 'DELETE',
                    }).then(res => {
                        if (res.ok) {
                            setNewComment(nReply.filter(a => a.id !== value).comment);
                        }
                    })
            }
        }
    }
    function valueChange(e) {
        const replyValue = e.target.value;
        setinputvalue(replyValue);
    }

    function changetrue() {
        setChangeReply(!changeReply);
    };

    function changeComment(event) {
        const { target } = event.target
        fetch(`http://localhost:3001/boardsreply/${nReply[index].id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                sameId: parseInt(setid),
                comment: inputvalue,
                like: 0,
            }),
        }).then(res => {
            if (res.ok) {
                setNewComment(inputvalue);
                setChangeReply(!changeReply);
                setCheckUseEffect(!checkUseEffect);
                alert("댓글 수정완료.");
            }
        })
    }

    return (
        <div>
            {sameId === parseInt(setid) &&
                <div>{newComment}
                    {newComment &&
                        <>
                            <button value={newid} onClick={removeReply}>❌</button><button onClick={changetrue}>수정</button>
                        </>
                    }{
                        changeReply === true
                            ? null
                            : <>
                                <input value={inputvalue} type="text" placeholder="댓글수정" onChange={valueChange} /><button onClick={changeComment}>수정완료</button>
                            </>
                    }</div>
            }
        </div>
    );
};

export default ReplyShow;