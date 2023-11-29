import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Post, dummyPost, dummyJob, JobContents, TaskContents, SkillContents, KnowledgeContents } from '../../components/post/dummyJob';
import './JobPostDetail.css'
import { log } from 'console';
import PostTSKList from '../../components/post/detail/PostTSKList';
import { useUserStore } from '../../store/user/UserDataStore';

const JobPostDetail = () => {

  // dummyJob 데이터
  const dummyJobData:JobContents[] = dummyJob;
  
  // 현재 요청받은 공고의 id
  const {id} = useParams<{id: string}>();

  // 접속한 유저 정보
  const userData = JSON.parse(sessionStorage.getItem('userData') || '{}');
  const userApplyList = useUserStore(state => state.applyList)

  // 공고 상세 정보
  const postListData = JSON.parse(localStorage.getItem('postListData') || '[]');
  const postData: Post | undefined = postListData.find((post: Post) => post.id === Number(id));

  // 포스트가 없다면
  if (!postData) {
    return <p>Post not found</p>;
  }
  
  // 공개되지 않은 정보일 땐 로그인 유저를 확인하고 페이지를 로드할 지 말 지 정하기.
  if(postData.isPublic === false && userData.account != postData.account){
    return <p>Post is not public</p>
  }

  // 경력, 학력
  const careerString = ['경력 무관', '신입', '경력'];
  const eduString = ['학력 무관', '고졸 이상', '초대졸 이상', '대졸 이상', '석사 이상', '박사 이상'];

  // D-day 계산/출력
  const dDay = () => {
    const day = postData?.endDate ? Math.floor((new Date(postData.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 0;
    if (day < 0){
      return "+ " + -day
    }
    else {
      return "- " + day
    }
  }

  const handleSubmit = () => {
    //localstorage에 있는 postListData.applicantId 에 userData.id추가, userListData.applyList 에 postData.id추가
    // 지원하기 버튼을 누르면 지원자 목록에 추가되고, 지원자가 지원한 공고 목록에 추가되어야 함.
    console.log(postData.applicantId);

    // 지원할 것인지 안 할 것인지 confirm 띄우기
    const submitResult = window.confirm(`${userData.username}님의 직무적합도는 ${postData.matchRate[userData.id]}% 입니다. 지원하시겠습니까?`);
    
    if (submitResult) {
    postData.applicantId.push(userData.id);
    localStorage.setItem('postListData', JSON.stringify(postListData));

    const userListData = JSON.parse(localStorage.getItem('userListData') || '[]');
    const modifyUser = userListData.find((user: any) => user.id === userData.id);
    modifyUser.applyList.push(postData.id);
    localStorage.setItem('userListData', JSON.stringify(userListData));

    sessionStorage.clear();
    sessionStorage.setItem('userData', JSON.stringify(modifyUser));

    alert('지원이 완료되었습니다.');
    window.location.reload();
    }
  }

  const handleApply = () => {
    if (!userData || Object.keys(userData).length == 0){
      return(
        <>
          <button onClick={()=> alert('로그인이 필요합니다.')}>지원하기</button>
        </>
      )
    }
    if (!userData.isEnt) {

      if(!userApplyList.includes(postData.id)){
        
        return (
          <>
            <button onClick={()=> handleSubmit()}>지원하기</button>
          </>
        )
      }
      else{
        return(
          <>
            <button className='already' disabled>지원완료</button>
          </>
        )
      }
    }
    if (userData.isEnt && userData.account === postData.account) {
      return (
        <>
          <Link to={`/job/post/${postData.id}/applicant`}>
          <button>지원자 확인하기</button>
          </Link>
        </>
      )
    }
  }

  const displayPercent = () => {
    if (!userData || Object.keys(userData).length == 0) {return(
      <>
        <p className="container-title analyze-result">직무 적합도 분석 결과</p>
        <div className="analyze-container">
          <p>로그인 후 확인할 수 있습니다</p>
        </div>
        </>
      )}
    if (userData.isEnt) return <></>;
    else{

      const rate:number = postData.matchRate[userData.id]

      return (
        <>
          <p className="container-title analyze-result">직무 적합도 분석 결과</p>
          <div className="analyze-container">
            <div>
              <p>나와의 직무 적합도 : </p>
            </div>
            <div className="rate">
              <p> {rate} %</p>
            </div>
          </div>
        </>
      )
    }
  }


  const displayJobContents = () => {
    if (postData.isJob == 'job') {
      return (
        <>
          <p className="container-title analyze-title">공고 분석 결과</p>
          <div className="job-contents-wrapper">
          {/* dummyJobData에서 postData의 jobContentsId 와 같은 항목의 title 출력 */}
          {dummyJobData.map((jobContent) => (
            jobContent.id === postData.jobContentsId &&
            <div className="job-title">
              <div className="job-content-wrapper">
                <p>{jobContent.title}</p>
                <p className='value'>100%</p>
              </div>
            </div>
          ))}
          </div>
        </>
      )
    }
    else{
      const selectedTasks:string [] = postData.tskContentsDict.tasks || [];
      const jobData = dummyJob;
      const taskData = dummyJobData.flatMap((jobContent) => jobContent.tasks) || [];

      // 뤼튼이 만들어줌. 아직 이해는 못 함.
      interface JobPercentage {
        jobTitle: string;
        percentage: number;
      }
      
      const calculatePercentage = (selectedTasks: string[], tasks: TaskContents[], jobs:JobContents[]): { [key: string]: string } => {
        // 사용자가 선택한 task가 속한 job의 개수를 계산
        const selectedJobTitleCounts: Map<string, number> = new Map();
        for (const job of jobs) {
          for (const task of job.tasks) {
            if (selectedTasks.includes(task.id)) {
              const jobTitle = job.title;
              selectedJobTitleCounts.set(jobTitle, (selectedJobTitleCounts.get(jobTitle) || 0) + 1);
            }
          }
        }

        // 전체 job의 개수를 계산
        const totalJobTitleCounts: Map<string, number> = new Map();
        for (const job of jobs) {
          totalJobTitleCounts.set(job.title, (totalJobTitleCounts.get(job.title) || 0) + job.tasks.length);
        }

        // 각 job의 백분율을 계산 (0에서 1로 정규화)
        const jobPercentages: JobPercentage[] = [];
        for (const [jobTitle, selectedCount] of selectedJobTitleCounts.entries()) {
          const totalCount = totalJobTitleCounts.get(jobTitle) || 0;
          const percentage = totalCount !== 0 ? selectedCount / totalCount : 0;
          jobPercentages.push({ jobTitle, percentage });
        }

        // 상위 3개의 job과 해당 백분율을 반환
        const sortedJobPercentages = jobPercentages.sort((a, b) => b.percentage - a.percentage);
        const top3Jobs = sortedJobPercentages.slice(0, 3);

        // 백분율을 퍼센트 형식으로 변환
        const resultWithPercent: { [key: string]: string } = {};
        for (const { jobTitle, percentage } of top3Jobs) {
          const percentageFormatted = (percentage * 100).toFixed(0);
          resultWithPercent[jobTitle] = `${percentageFormatted}%`;
        }

        return resultWithPercent;
      }
      
      const resultList = calculatePercentage(selectedTasks, taskData, jobData);

      return (
        <>
          <p className="container-title analyze-title">공고 분석 결과</p>
          <div className="job-contents-wrapper">
            <div className="job-title">
              {Object.entries(resultList).map(([key, value]) => (
                <div className="job-content-wrapper">
                  <p>{key}</p>
                  <p className='value'>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )
    }
  }


  return (
    <>
      <div className="post-container">
        <div className="post-side-wrapper">
          <div className="post-title-container">
            <div className="post-author">{postData.username}</div>
            <div className="post-title">{postData.title}</div>
            <div className="dday-apply-wrapper">
              <div className="post-date">
                {postData.startDate && postData.endDate ? 
                  `D ${dDay()}`
                  : <p>상시</p>}
              </div>
              <div className="apply-count">
                <p>지원자 수: {postData.applicantId.length}</p>
              </div>
            </div>
          </div>

          {displayPercent()}
          <div className="submit-container">
            {handleApply()}
          </div>
        </div>
        <div className="post-contents-wrapper">
          {displayJobContents()}

          <PostTSKList postData={postData} />

          <p className="container-title">자격 요건</p>
          <div className="post-basic-container">
            <p>{careerString[postData.career]}</p>
            <p>{eduString[postData.edu]}</p>
          </div>

          <p className="container-title">기타 공고 내용</p>
          <div className="post-etc-container">
            <p>{postData.etcContents}</p>
          </div>

          <div className="submit-container bottom-submit">
            {handleApply()}
          </div>
        </div>
      </div>
    </>
  )
}

export default JobPostDetail