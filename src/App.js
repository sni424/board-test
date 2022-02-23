/*eslint-disable */
import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Left from './Board-View/Left';
import Create from './Board-Crud/Create';
import Update from './Board-Crud/Update';
import Read from './Board-Crud/Read';


function App() {

  let [community, setCommunity] = useState(true);

  function showCommnutiy() {
    setCommunity(!community);
  };

  const [newDatas, setNewDatas] = useState([]);
  const fetchData = async () => {
    const res = await fetch('http://localhost:3001/boards')
    const Data = await res.json()
    return setNewDatas(Data)
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Left community={community} showCommnutiy={showCommnutiy}></Left>}>
        </Route>
        <Route path="/write" element={<Create newDatas={newDatas} setNewDatas={setNewDatas} fetchData={fetchData}></Create>}></Route>
        <Route path="/putndelete/:setid" element={<Update newDatas={newDatas} setNewDatas={setNewDatas} fetchData={fetchData}></Update>}></Route>
        <Route path='/:setid' element={<Read fetchData={fetchData} newDatas={newDatas} setNewDatas={setNewDatas}></Read>}></Route>
      </Routes>
    </div >
  );
}

export default App;