import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import JobComponent from '../../components/post/posting/JobComponent'
import TSKContents from '../../components/post/posting/TSKContents'
import { useJobTSKButtonStore } from '../../store/post/JobTSKButtonStore'
import { JobContents, dummyJob } from '../../components/post/dummyJob'

const JobPosting: React.FC = () => {
    
    const jobData:JobContents[] = dummyJob;

    // 직무/TSK 선택 버튼 상태 관리
    const { selectedButton, setSelectedButton } = useJobTSKButtonStore();

    const [postingData, setPostingData] = useState({
        // 기본 공고 정보
        author: '',
        title: '',
        etcContents: '',
        // 공고 등록 날짜가 시작날짜
        startDate: "",
        // 종료 날짜를 설정하지 않으면 무기한.
        endDate: "",
        isJob: selectedButton,
        career: 0,
        edu: 0,
        // 분석 결과
        analyzeResult: '',
        // 직무/tsk 정보
        jobContentsId: '',
        tskContentsDict: {},
        // 공고 공개 여부
        isPublic: false,
        // 지원자 정보
        applicantId: [],
    })

    // 선택된 직무/TSK 내용 저장
    const handleJobTskContents = (jobTskContents: string) => {
        setPostingData({...postingData, jobContentsId: jobTskContents});
    }

    const handleTSKContents = (tskContents: any) => {
        setPostingData({...postingData, tskContentsDict: tskContents});
    }

    // 공고 등록 버튼
    const handlePostingButton = () => {
        try{
            // server api 가 완성되면 fetch api로 바꿔야합니다
            console.log('postingData', postingData);
        }
        catch (e){
            console.error(e, '공고 등록 실패')
        }
    }

    // 공고 취소 버튼 - 취소 시 이전 화면으로 이동 or 이전화면이 없을 시 메인화면으로 이동
    const navigate:any = useNavigate();
    const handleCancelButton = () => {
        // 뒤로가기
        navigate(-1);
        // 뒤로 갈 페이지가 없으면 메인으로
        if(navigate() == null || navigate() == undefined) {
            navigate('/');
        }
    }


    return (
        <>
            <div className="main-posting-container">
                {/* 공고 제목 입력 창  title */}
                <div className="posting-title-wrapper">
                    <label htmlFor="posting-title">공고 제목</label>
                    <input id="posting-title" type="text" 
                        onChange={(e) => setPostingData({...postingData, title: e.target.value})}
                    />
                </div>
                {/* 직무/TSK 선택 버튼 */}
                <div className='job-tsk-select-button-wrapper'>
                    <button 
                        onClick={() => {
                            setSelectedButton('job')
                            setPostingData({...postingData, isJob: 'job'})
                        }}
                    >직무 선택</button>
                    <button 
                        onClick={() => {
                            setSelectedButton('tsk')
                            setPostingData({...postingData, isJob: 'tsk'})
                        }}
                    >업무/스킬/지식 선택</button>
                </div>
                {/* 직무/TSK 선택 컴포넌트 - 버튼에 따라 다른 표시*/}
                <div className='job-tsk-contents-container'>
                    {selectedButton === "tsk"
                    ? <TSKContents onJobSelected={handleTSKContents} jobData={jobData}/> 
                    : <JobComponent onJobSelected={handleJobTskContents} jobData={jobData} />}
                </div>
                {/* 기본 공고 정보 - startDate, endDate, career, edu, isPublic */}

                <div className="basic-contents-container">
                    <div className="basic-contents-wrapper">
                        <div className="select-date-wrapper">
                            <label htmlFor="posting-start-date">공고 시작일</label>
                            <input id="posting-start-date" type="date"
                                value={postingData.startDate}
                                onChange={(e) => {
                                    setPostingData({...postingData, startDate: String(e.target.value)})
                                    // 공고 만료일이 공고 시작일 이전이 되면, 공고만료일을 공고시작일로.
                                    if (postingData.endDate != "" && new Date(e.target.value) > new Date(postingData.endDate)) {
                                        setPostingData({...postingData, startDate: String(e.target.value), endDate: String(e.target.value)});
                                    }
                                    }}
                                    />
                            <label htmlFor="posting-end-date">공고 만료일</label>
                            <input id="posting-end-date" type="date"
                                value={postingData.endDate}
                                min={postingData.startDate}
                                onChange={(e) => setPostingData({...postingData, endDate: String(e.target.value)})}
                                />
                        </div>
                        <div className="select-career-wrapper">
                            <label htmlFor="posting-career">경력</label>
                            <select id="posting-career" 
                                onChange={(e) => setPostingData({...postingData, career: Number(e.target.value)})}
                                >
                                <option value={0}>무관</option>
                                <option value={1}>신입</option>
                                <option value={2}>경력</option>
                            </select>
                        </div>
                        <div className="select-edu-wrapper">
                            <label htmlFor="posting-edu">학력</label>
                            <select id="posting-edu" 
                                onChange={(e) => setPostingData({...postingData, edu: Number(e.target.value)})}
                            >
                                <option value={0}>무관</option>
                                <option value={1}>학력무관</option>
                                <option value={2}>고졸</option>
                                <option value={3}>대졸</option>
                                <option value={4}>대학원졸</option>
                            </select>
                        </div>
                        <div className="select-public-wrapper">
                            <label htmlFor="posting-ispublic">공개 여부</label>
                            <select id="posting-ispublic" 
                                onChange={(e) => setPostingData({...postingData, isPublic: Boolean(e.target.value)})}
                                >
                                <option value="false">비공개</option>
                                <option value="true">공개</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* 기타 공고 내용 - 기타 공고에 필요한 내용 */}
                <div className="etc-contents-container">
                    <div className="etc-contents-wrapper">
                        <label htmlFor="posting-etc-contents">기타 내용</label>
                        <textarea id="posting-etc-contents" 
                            onChange={(e) => setPostingData({...postingData, etcContents: e.target.value})}                        
                        />
                    </div>
                </div>
                {/* 분석결과 - tsk 를 선택했을 때만 표시 */}
                <div className="analyze-result-container">
                    {selectedButton === "tsk" ? 
                    <div className="analyze-result">
                        분석결과계산컴포넌트
                    </div>
                    : <></>}
                </div>

                {/* 공고 등록/취소 버튼 */}
                <div className="posting-button-wrapper">
                    <button onClick={handlePostingButton}>공고 등록</button>
                    <button onClick={handleCancelButton}>취소</button>
                </div>
            </div>
        </>
    )
}

export default JobPosting