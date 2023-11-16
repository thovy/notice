import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import JobPosting from './pages/post/JobPosting';
import JobPostList from './pages/post/JobPostList';
import JobPostDetail from './pages/post/JobPostDetail';
import Login from './pages/user/Login';
import Signup from './pages/user/Signup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/job" element={<JobPostList />}/>
        <Route path="/job/post/:id" element={<JobPostDetail />}/>
        <Route path="/job/posting" element={<JobPosting />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
