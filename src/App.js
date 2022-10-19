import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './home1/Home';
import CoronavirusHome from "./coronavirus/Home";
import CoronavirusCountry from "./coronavirus/Country";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/coronavirus' element={<CoronavirusHome />} />
        <Route path='/coronavirus/countries/:id' element={<CoronavirusCountry />} />
        <Route path='/coronavirus/*' element={<CoronavirusHome />} />
        <Route path='*' element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
