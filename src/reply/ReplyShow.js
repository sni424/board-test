import React, { useState, useRef } from "react";

function ReplyShow({ setCheckUseEffect, checkUseEffect, setNewReply, newReply, setid, sameId, newid, index, comment }) {
    const [changeReply, setChangeReply] = useState(true);
    const putReply = useRef(null);
    const [inputvalue, setinputvalue] = useState("");

    function removeReply(e) {
        const { value } = e.target
        console.log(typeof value);
        if (newReply.length > 0) {
            if (window.confirm("삭제 하시겠습니까?")) {
                fetch(`http://localhost:3001/boardsreply/${newReply[index].id}`,
                    {
                        method: 'DELETE',
                    }).then(res => {
                        if (res.ok) {
                            setNewReply(newReply.filter(a => a.id !== parseInt(value)));
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

    function changeComment() {
        fetch(`http://localhost:3001/boardsreply/${newReply[index].id}`, {
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
                setChangeReply(!changeReply);
                setCheckUseEffect(!checkUseEffect);
                alert("댓글 수정완료.");
            }
        })
    }

    return (
        <div>
            {sameId === parseInt(setid) &&
                <div>{comment}
                    {comment &&
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