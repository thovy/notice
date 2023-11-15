import React from 'react'
import { Post } from '../dummyJob'

interface ChildCompoenentProps {
  postData: Post;
}

const JobPostThumb:React.FC<ChildCompoenentProps> = ({postData}) => {
    if (!postData) return null;

    const careerString = ['경력 무관', '신입', '경력'];
    const eduString = ['학력 무관', '고졸 이상', '대졸 이상', '석사 이상', '박사 이상'];

  return (
    <>
        <div className="author-title-container">
            <div className="author-wrapper">
                <p>{postData.author}</p>
            </div>
            <div className="title-wrapper">
                <p>{postData.title}</p>
            </div>
            <div className="go-detail">
                <p>전체보기</p>
            </div>
        </div>
        <div className="post-basic-wrapper">
            <div className="location">
                <p>위치</p>
            </div>
            <div className="newbie">
                <p>{careerString[postData.career]}</p>
            </div>
            <div className="school">
                <p>{eduString[postData.edu]}</p>
            </div>
                {postData.startDate && postData.endDate ?
                <div className="date">
                    <p>{postData.startDate?.toString()}</p>
                    <p>~</p>
                    <p>{postData.endDate?.toString()}</p>
                </div>
                :
                <div className="date">
                    <p>상시모집</p>
                </div>
                }
            </div>
            <div className="post-main-container">
                <div className="main-wrapper">
                    <div className="analyze-result">
                        {postData.isJob == 'job'
                        ? <p>직무 100%</p>
                        : <p>{postData.analyzeResult}</p>
                        }
                    </div>
                    <div className="open-job-detail">
                        <button>상세보기</button>
                    </div>
            </div>
        </div>
    </>
  )
}

export default JobPostThumb