import React from 'react'
import { useParams } from 'react-router-dom'
import { Post, dummyPost } from '../../components/post/dummyJob';
import './JobPostDetail.css'

const JobPostDetail = () => {
  const {id} = useParams<{id: string}>();

  const postData: Post | undefined = dummyPost.find((post) => post.id === Number(id));

  const careerString = ['경력 무관', '신입', '경력'];
  const eduString = ['학력 무관', '고졸 이상', '대졸 이상', '석사 이상', '박사 이상'];
  const dDay = () => {
    const day = postData?.endDate ? Math.floor((new Date(postData.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 0;
    if (day < 0){
      return "+ " + -day
    }
    else {
      return day
    }
  }

  if (!postData) {
    return <p>Post not found</p>;
  }

  // 공개되지 않은 정보일 땐 로그인 유저를 확인하고 페이지를 로드할 지 말 지 정하기.
  if (postData.isPublic === false) {
    return <p>Post is not public</p>;
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
          <div className="post-author">{postData.author}</div>
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

        <p className="container-title">직무 상세</p>
        <div className="job-tsk-detail-container">
          {postData.isJob == "job" ?
            <p>{postData.jobContentsId}</p>
            :
            <p></p>
          }
        </div>

        <p className="container-title">자격 요건</p>
        <div className="post-basic-container">
          <p>{careerString[postData.career]}</p>
          <p>{eduString[postData.edu]}</p>
        </div>

        <p className="container-title">분석 결과</p>
        <div className="analyze-container">
          <p>{postData.analyzeResult}</p>
        </div>

        <p className="container-title">기타 공고 내용</p>
        <div className="post-etc-container">
          <p>{postData.etcContents}</p>
        </div>

        <div className="submit-container">
          {/* 일반사용자라면 */}
          <button>지원하기</button>
          {/* 공고를 쓴 기업사용자라면 */}
          <button>수정하기</button>
          {/* 공고를 쓰지 않은 기업사용자라면 */}
          <button disabled>수정하기</button>
        </div>

      </div>
    </>
  )
}

export default JobPostDetail