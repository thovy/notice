import React from 'react'
import { useParams } from 'react-router-dom'
import { Post, dummyPost, dummyJob, JobContents, TaskContents, SkillContents, KnowledgeContents } from '../../components/post/dummyJob';
import './JobPostDetail.css'
import { log } from 'console';
import PostTSKList from '../../components/post/detail/PostTSKList';

const JobPostDetail = () => {
  
  // 현재 요청받은 공고의 id
  const {id} = useParams<{id: string}>();

  // 접속한 유저 정보
  const userData = JSON.parse(sessionStorage.getItem('userData') || '{}');

  // 공고 상세 정보
  const postListData = JSON.parse(localStorage.getItem('postListData') || '[]');
  const postData: Post | undefined = postListData.find((post: Post) => post.id === Number(id));

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

  // 포스트가 없다면
  if (!postData) {
    return <p>Post not found</p>;
  }

  // 공개되지 않은 정보일 땐 로그인 유저를 확인하고 페이지를 로드할 지 말 지 정하기.
  if(postData.isPublic === false && userData.account != postData.account){
    return <p>Post is not public</p>
  }

  const handleSubmit = () => {
    //localstorage에 있는 postListData.applicantId 에 userData.id추가, userListData.applyList 에 postData.id추가
    // 지원하기 버튼을 누르면 지원자 목록에 추가되고, 지원자가 지원한 공고 목록에 추가되어야 함.
    console.log(postData.applicantId);
    
    postData.applicantId.push(userData.id);
    localStorage.setItem('postListData', JSON.stringify(postListData));

    const userListData = JSON.parse(localStorage.getItem('userListData') || '[]');
    const modifyUser = userListData.find((user: any) => user.id === userData.id);
    modifyUser.applyList.push(postData.id);
    localStorage.setItem('userListData', JSON.stringify(userListData));

    console.log(postListData);
    console.log(userListData);
    
    alert('지원이 완료되었습니다.');
    window.location.reload();
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

      if(!userData.applyList.includes(postData.id)){
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
          <button>수정하기</button>
        </>
      )
    }
  }

  return (
    <>
      <div className="post-container">
        <div className="header-wrapper">
          <p className="container-title">채용공고</p>
          <button
            onClick={() => window.history.back()}
            className="go-list"
          >목록으로</button>
        </div>

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

        <p className="container-title">분석 결과</p>
        <div className="analyze-container">
          <p>{postData.analyzeResult}</p>
        </div>

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

        <div className="submit-container">
          {handleApply()}
        </div>

      </div>
    </>
  )
}

export default JobPostDetail