import React from 'react'
import './ApplicantList.css'
import { useNavigate, useParams } from 'react-router-dom';
import { JobContents, Post, dummyJob } from '../../components/post/dummyJob';
import ApplicantThumb from '../../components/post/user/ApplicantThumb';

const ApplicantList = () => {

    const navigate = useNavigate();

    // 현재 요청받은 공고의 id
    const {id} = useParams<{id: string}>();
    // 공고 상세 정보
    const postListData = JSON.parse(localStorage.getItem('postListData') || '[]');
    const postData: Post | undefined = postListData.find((post: Post) => post.id === Number(id));
  
    // 유저 상세 정보
    const userListData = JSON.parse(localStorage.getItem('userListData') || '[]');
    const applicantList = userListData.filter((user: any) => postData?.applicantId.includes(user.id));

    // 로그인 한 기업 정보
    const currentUserData = JSON.parse(sessionStorage.getItem('userData') || '{}');

    // 유사도 계산
    const postList:Post[] = JSON.parse(localStorage.getItem('postListData') || '[]');
    const jobData:JobContents[] = dummyJob;
    const analyzePercent = (userData:any) => {
        
        if (!postData) return 0;
        // 유저의 sk
        const userSkills:string[] = userData.skills;
        const userKnowledges:string[] = userData.knowledges;

        // 게시글의 job 데이터
        const currentJob = jobData.filter((jobContent) => jobContent.id === postData.jobContentsId);
        // 게시글의 job에 포함된 sk 혹은 선택한 sk 데이터
        const postSkills = postData.isJob == "job" 
            ? currentJob.flatMap((jobContent) => jobContent.tasks.flatMap((task) => task.skills?.flatMap((skill)=>skill.id)) || []) || []
            : postData.tskContentsDict.skills || [];
        const postKnowledges = postData?.isJob == "job"
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


    // 포스트데이터가 없거나, 로그인 유저가 없거나, 로그인유저와 포스트작성자가 다르다면
    if (!postData || !currentUserData || Object.keys(currentUserData).length == 0 || currentUserData.account != postData.account) {
        navigate('/job');
    }
    
  return (
    <>
        <div className="applicant-list-container">
            <div className="applicant-title-wrapper">
                <div className="title-wrapper">
                    <p>지원자 리스트</p>
                    <p>{postData?.title}</p>
                </div>
            </div>
            <div className="applicant-list-contents-container">
                {!applicantList.length ? <p>지원자가 없습니다.</p> :
                <>
                    {applicantList.map((applicant: any) => (
                        <ApplicantThumb 
                            userData={applicant} 
                            postData={postData}
                            similarity={analyzePercent(applicant)}
                        />
                    ))}
                </>
                }
            </div>
        </div>
    </>
  )
}

export default ApplicantList