import React, { useMemo } from 'react'
import './Home.css'
import { JobContents, Post, dummyJob } from '../components/post/dummyJob';
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

  
  const jobData:JobContents[] = dummyJob;

  // 유저와 기업이 가진 sk를 비교해서 매칭율 계산
  const analyzePercent = (postData:Post) => {
        
    // 유저의 sk
    const userSkills:string[] = userData.skills;
    const userKnowledges:string[] = userData.knowledges;

    // 게시글의 job 데이터
    const currentJob = jobData.filter((jobContent) => jobContent.id === postData.jobContentsId);
    // 게시글의 job에 포함된 sk 혹은 선택한 sk 데이터
    const postSkills = postData.isJob == "job" 
        ? currentJob.flatMap((jobContent) => jobContent.tasks.flatMap((task) => task.skills?.flatMap((skill)=>skill.id)) || []) || []
        : postData.tskContentsDict.skills || [];
    const postKnowledges = postData.isJob == "job"
        ? currentJob.flatMap((jobContent) => jobContent.tasks.flatMap((task) => task.knowledges?.flatMap((knowledge)=>knowledge.id)) || []) || []
        : postData.tskContentsDict.knowledges || [];

    // 공통적인 sk
    // user 가 isEnt 일 때 userskills와 userKnowledges가 없어서 분리해줘야합니다.
    const commonSkills:Set<string> = !userSkills
        ? new Set()
        : new Set(userSkills.filter((skill:string) => postSkills?.includes(skill)))

    const commonKnowledges:Set<string> = !userKnowledges
        ? new Set()
        : new Set(userKnowledges.filter((knowledge:string) => postKnowledges?.includes(knowledge)))

    // 공통 sk 갯수
    const commonSkillsCount:number = commonSkills.size;
    const commonKnowledgesCount:number = commonKnowledges.size;

    // 게시글의 sk 합
    const postSKlength = postSkills.length + postKnowledges.length;
    
    // 게시글의 sk 합이 0이 아니면 계산
    const similarity:number = postSKlength == 0 ? 0 : (commonSkillsCount + commonKnowledgesCount) / (postSkills.length + postKnowledges.length) * 100;    
    
    // localstorage에 저장된 게시글의 매칭율 업데이트
    // jobdetail 에 사용하기 위함임.
    postData.matchRate[userData.id] = Math.round(similarity * 10^2) / 10^2;
    localStorage.setItem('postListData', JSON.stringify(postList));

    return postData.matchRate[userData.id];
  }


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
              post.isPublic && <JobPostThumb key={post.id} postData={post} similarity={analyzePercent(post)}/>
            ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home