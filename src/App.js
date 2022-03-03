/*eslint-disable */
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Left from './Board-View/Left';
import Create from './Board-Crud/Create';
import Update from './Board-Crud/Update';
import Read from './Board-Crud/Read';
import EditReply from './reply/EditReply';
import axios from 'axios';


function App() {

  let [community, setCommunity] = useState(true);
  const [loaDing, setLoaDing] = useState(true);
  const [newDatas, setNewDatas] = useState([]);
  const fetchData = async () => {
    try {
      const res = await axios('http://localhost:3001/boards')
      const Data = await res.data;
      return setNewDatas(Data)
    }
    catch (err) {
      console.log(err.message);
    }
  }

  function showCommnutiy() {
    setCommunity(!community);
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Left community={community} showCommnutiy={showCommnutiy} newDatas={newDatas} fetchData={fetchData}></Left>}>
        </Route>
        <Route path="/write" element={<Create newDatas={newDatas} setNewDatas={setNewDatas} fetchData={fetchData}></Create>}></Route>
        <Route path="/putndelete/:setid" element={<Update newDatas={newDatas} fetchData={fetchData} loaDing={loaDing} setLoaDing={setLoaDing}></Update>}></Route>
        <Route path='/Board/:setid' element={<Read fetchData={fetchData} newDatas={newDatas}></Read>}></Route>
        <Route path='/edit/:setid' element={<EditReply></EditReply>}></Route>
        <Route path='/Board' MainCommunity></Route>
      </Routes>
    </div >
  );
}

export default App;