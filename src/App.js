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

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Left community={community} showCommnutiy={showCommnutiy}></Left>}>
        </Route>
        <Route path="/write" element={<Create></Create>}></Route>
        <Route path="/putndelete/:setid" element={<Update></Update>}></Route>
        <Route path='/:setid' element={<Read></Read>}></Route>
      </Routes>
    </div >
  );
}

export default App;