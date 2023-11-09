import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import JobPosting from './pages/post/JobPosting';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posting/job" element={<JobPosting />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
