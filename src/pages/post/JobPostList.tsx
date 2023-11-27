import React, { useMemo, useState } from 'react'
import JobPostThumb from '../../components/post/list/JobPostThumb'
import { Post, dummyPost, JobContents, dummyJob } from '../../components/post/dummyJob'
import './JobPostList.css'
import { Link } from 'react-router-dom'
import { useUserStore } from '../../store/user/UserDataStore'

const JobPostList = () => {

    const postList:Post[] = JSON.parse(localStorage.getItem('postListData') || '[]');

    const jobData:JobContents[] = dummyJob;

    const userData = JSON.parse(sessionStorage.getItem('userData') || '{}');
    const isEnt = useUserStore(state => state.isEnt);

    // 전체보기 / 직무별보기 선택 상태
    const [selectedView, setSelectedView] = useState('matchRate');

    // 직무별보기에서 직무 선택 버튼
    const [selectedJob, setSelectedJob] = useState("-1")

    // 전체 TSK 데이터

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
        const commonSkills:Set<string> = new Set(userSkills.filter((skill:string) => postSkills?.includes(skill)));
        const commonKnowledges:Set<string> = new Set(userKnowledges.filter((knowledge:string) => postKnowledges?.includes(knowledge)));

        // 공통 sk 갯수
        const commonSkillsCount:number = commonSkills.size;
        const commonKnowledgesCount:number = commonKnowledges.size;

        // 게시글의 sk 합
        const postSKlength = postSkills.length + postKnowledges.length;
        
        // 게시글의 sk 합이 0이 아니면 계산
        const similarity:number = postSKlength == 0 ? 0 : (commonSkillsCount + commonKnowledgesCount) / (postSkills.length + postKnowledges.length) * 100;
        
        // localstorage에 저장된 게시글의 매칭율 업데이트
        // jobdetail 에 사용하기 위함임.
        postData.matchRate[userData.id] = similarity;
        localStorage.setItem('postListData', JSON.stringify(postList));

        return similarity;
    }

    // 전체보기 / 직무별보기 선택에 따른 데이터 필터링
    const filteredPostList = useMemo(()=>{
        if (!postList) return [];
        // 매칭율 높은 순
        if (selectedView === 'matchRate'){
            const userData = JSON.parse(sessionStorage.getItem('userData') || '{}');
            // 유저가 없으면 그냥 최신순
            if (!userData || Object.keys(userData).length == 0) return postList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            // 유저가 있지만 기업이라면 그냥 최신순
            if (userData.isEnt) return postList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            // 유저가 있고 일반회원이라면 매칭율 높은 순
            else{
                return postList.sort((a, b) => analyzePercent(b) - analyzePercent(a));
            }
        }
        // 최신 순
        if (selectedView === 'recent') return postList.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        
        // 단순히 직무를 선택했을 때 직무만 보이는 게 아니라
        // tsk를 선택했을 때도 선택된 직무와 일정확률 이상이면 리스트에 보여지도록?
        if (selectedView === 'job') {
            if (selectedJob === '-1') return postList.filter((post) => post.isJob === 'job')
            else{
                return postList.filter((post) => post.isJob === 'job' && post.jobContentsId === selectedJob)
            }
        }
    }, [postList, selectedView, selectedJob])


  return (
    <>
        <div className="post-list-container">
            <div className="post-list-title-container">
                <div className="title-wrapper">
                    <p>채용공고 리스트</p>
                </div>
                {isEnt && Object.keys(userData).length != 0 ?
                <div className="regist-post-button-wrapper">
                    <Link to={'/job/posting'}>
                    <button
                        className="regist-post"
                    >
                    채용공고 등록
                    </button>
                    </Link>
                </div>
                :<></>}
            </div>
            <div className="view-button-container">
                <div className="view-button-wrapper">
                    <button
                        className={`view-button ${selectedView === 'matchRate' ? 'active' : ''}`}
                        onClick={()=>setSelectedView('matchRate')}
                    >매칭율 높은 순
                    </button>
                    <button
                        className={`view-button ${selectedView === 'recent' ? 'active' : ''}`}
                        onClick={()=>setSelectedView('recent')}
                    >최신순</button>
                    <button
                        className={`view-button ${selectedView === 'job' ? 'active' : ''}`}
                        onClick={()=>setSelectedView('job')}
                    >직무별</button>
                </div>
            </div>

            {/* 직무별일때 직무 선택 드롭다운메뉴 */}
            {selectedView === 'job' &&
            <div className="job-drop-down-wrapper">
                <select 
                    className='job-drop-down'
                    onChange={(e) => setSelectedJob(e.target.value)}
                >
                    <option value={"-1"} >직무를 선택해주세요.</option>
                    {jobData.map((jobContent:any) => (
                        <option key={jobContent.id} value={jobContent.id}>
                            {jobContent.title}
                        </option>
                    ))}
                </select>
            </div>
            }

            {/* 직무별일때 선택된 직무에 대한 설명 */}

            <div className="post-list-contents-container">
                {/* 스크롤을 내리면 더 많은 로딩을 하는 무한스크롤 적용해보기 */}
                { !filteredPostList ?
                <div className="nullPostList">
                    <p>채용공고가 없습니다.</p>
                </div>
                :filteredPostList.map((postData)=> (
                    // 게시글 미리보기 카드
                    // ispublic 이 true 인 postData만 보여주기
                    postData.isPublic && <JobPostThumb postData={postData} similarity={analyzePercent(postData)} />
                ))
                }
            </div>
        </div>
    </>
  )
}

export default JobPostList