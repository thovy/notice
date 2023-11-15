import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import JobPosting from './pages/post/JobPosting';
import JobPostList from './pages/post/JobPostList';
import JobPostDetail from './pages/post/JobPostDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/job" element={<JobPostList />}/>
        <Route path="/job/post/:id" element={<JobPostDetail />}/>
        <Route path="/job/posting" element={<JobPosting />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
