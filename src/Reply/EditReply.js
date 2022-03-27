import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { parseInt } from "lodash";

function EditReply() {

  let { setid } = useParams();
  const navi = useNavigate();

  const [loading, setLoading] = useState(true);
  const [newcontent, setNewContent] = useState("");
  const [boardId, setBoardId] = useState("");

  const [newReply, setNewReply] = useState([]);
  const fetchTasks = async () => {
    const ress = await axios('http://localhost:3001/boardsreply')
    const newDa = await ress.data
    return setNewReply(newDa);
  }

  function onChange(e) {
    setNewContent(e.target.value);
  }

  function changeComment() {
    axios({
      method: "PUT",
      url: `http://localhost:3001/boardsreply/${parseInt(setid)}`,
      data: {
        sameId: boardId,
        comment: newcontent,
        like: 0,
      },
    })
    alert("댓글 수정완료.");
    navi(`/${boardId}`);
  }

  useEffect(() => {
    if (newReply.length > 1) {
      setLoading(true);
      setNewContent(newReply.find((a) => a.id === parseInt(setid)).comment);
      setBoardId(newReply.find((a) => a.id === parseInt(setid)).sameId)
    } else if (newReply.length < 1) {
      setLoading(false);
      fetchTasks();
    }
  }, [newReply])
  return (
    <div>
      {loading === true
        ? <form>
          <input value={newcontent} onChange={onChange} />
          <input type="submit" value="Submit" onClick={changeComment} />
        </form>
        : <h3>안녕못해</h3>
      }
    </div>
  );
};

export default EditReply;