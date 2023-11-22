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
                return postList.sort((a, b) => b.matchRate[userData.id] - a.matchRate[userData.id]);
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
                    postData.isPublic && <JobPostThumb postData={postData}/>
                ))}
            </div>
        </div>
    </>
  )
}

export default JobPostList