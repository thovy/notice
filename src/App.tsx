import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import JobPosting from './pages/post/JobPosting';
import JobPostList from './pages/post/JobPostList';
import JobPostDetail from './pages/post/JobPostDetail';
import Login from './pages/user/Login';
import Signup from './pages/user/Signup';
import SignupEnt from './pages/user/SignupEnt';
import { useTSKDataStore } from './store/TSKDataStore';
import SkRegist from './pages/user/SkRegist';
import Profile from './pages/user/Profile';
import { useUserListStore, useUserStore } from './store/user/UserDataStore';
import { usePostListStore } from './store/PostStore';
import Update from './pages/user/Update';
import ApplicantList from './pages/post/ApplicantList';
import ApplicantDetail from './pages/post/ApplicantDetail';
import Notification from './pages/user/Notification';

function App() {

  const fetchUserData = useUserStore(state => state.fetchUserData);
  const fetchUserList = useUserListStore(state => state.fetchUserList);
  const fetchPostList = usePostListStore(state => state.fetchPostList);

  useEffect(() => {
    fetchUserData();
    fetchUserList();
    fetchPostList();
  }, [fetchUserData, sessionStorage.getItem('userData')
    , fetchUserList, fetchPostList
    , localStorage.getItem('userListData'), localStorage.getItem('postListData')])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/job" element={<JobPostList />}/>
        <Route path="/job/post/:id" element={<JobPostDetail />}/>
        <Route path="/job/post/:id/applicant" element={<ApplicantList />}/>
        <Route path="/job/post/:postId/applicant/:applicantId" element={<ApplicantDetail/>}/>
        <Route path="/job/posting" element={<JobPosting />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/ent/signup" element={<SignupEnt />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/profile/sk" element={<SkRegist />}/>
        <Route path="/profile/edit" element={<Update />}/>
        <Route path="/notification" element={<Notification />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
