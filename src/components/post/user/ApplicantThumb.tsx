import React from 'react'
import { Link } from 'react-router-dom';
import { Post } from '../dummyJob';

interface ChildComponentProps {
    userData: {
        id: number,
        account: string,
        username: string,
        location: string,
        edu: number,
        career: number,
    };
    postData: Post | undefined;
    similarity? : number;
}
const ApplicantThumb:React.FC<ChildComponentProps> = ({userData, postData, similarity}) => {

    const careerString = ['경력 무관', '신입', '경력 2년 이하', '경력 5년 이하', '경력 5년 이상', '경력 10년 이상'];
    const eduString = ['학력 무관', '고졸', '초대졸','대졸', '석사', '박사'];

  const analyzeResult = () => {
    if (!postData) return <></>

    return (
      <>
        <h4>역량 일치율</h4>
        <p>{similarity} %</p>
      </>
    )
  }

  return (
    <>
      <Link to={`/job/post/${postData?.id}/applicant/${userData.id}`} style={{ textDecoration: 'none' }}>
        <div className="card-container">
          <div className="author-title-container">
            <div className="title-bookmark-wrapper">
              <div className="title-wrapper">
                <p>{userData.username}</p>
              </div>
            </div>
          </div>

          <div className="post-basic-wrapper">
            <div className="newbie">
              <p>{careerString[userData.career]}</p>
            </div>
            <div className="school">
              <p>{eduString[userData.edu]}</p>
            </div>
          </div>
          <div className="post-analyze-container">
              <div className="analyze-wrapper">
                  <div className="analyze-result">
                      {analyzeResult()}
                  </div>
              </div>
          </div>
        </div>
      </Link>
    </>
  )
}

export default ApplicantThumb