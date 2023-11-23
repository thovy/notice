import React, { useMemo } from 'react'
import './Home.css'
import { Post } from '../components/post/dummyJob';
import JobPostThumb from '../components/post/list/JobPostThumb';

const Home = () => {

  // post list localStorage
  const postList:Post[] = JSON.parse(localStorage.getItem('postListData') || '[]');
  // 유저 데이터 sessionStorage
  const userData = JSON.parse(sessionStorage.getItem('userData') || '{}');

  // 리스트 보여주기
  const filteredPostList = useMemo(()=>{
    if (!postList) return [];
    // 유저가 없으면 그냥 최신순
    if (!userData || Object.keys(userData).length == 0) {
      const result = postList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      return result.slice(0, 3);
    };
    // 유저가 있지만 기업이라면 그냥 최신순
    if (userData.isEnt) {
      const result = postList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      return result.slice(0, 3);}
    // 유저가 있고 일반회원이라면 매칭율 높은 순
    else{
      const result = postList.sort((a, b) => b.matchRate[userData.id] - a.matchRate[userData.id]);
      return result.slice(0, 3);
    }
  }, [postList, userData])

  return (
    <>
      <div className="main-home-container">
        <div className="main-wrapper">
          <div className="main-desc-container">
            <div className="main-desc-image">
            </div>
            <div className="main-desc-word">
              <div className="main-title">
                <p>NOTICE</p>
              </div>
              <div className="main-desc">
                <p>나의 역량에 맞는 회사를 손쉽게!</p>
                <p>회사 직무에 맞는 사람을 손쉽게!</p>
              </div>
            </div>
          </div>
          <div className="post-list-container">
            <div className="post-list-title-container">
              <div className="title-wrapper">
                <p>채용공고 리스트</p>
              </div>
              <div className="more-wrapper">
                <a href="/job">더보기 👉</a>
              </div>
            </div>
            <div className="post-list-contents-container">
            {filteredPostList.map((post) => (
              post.isPublic && <JobPostThumb key={post.id} postData={post} />
            ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home