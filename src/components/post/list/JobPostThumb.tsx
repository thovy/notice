import React, { useState } from 'react'
import { Post } from '../dummyJob'
import { Link } from 'react-router-dom';
import JobPostListModal from './JobPostListModal';
import './JobPostThumb.css'

interface ChildCompoenentProps {
  postData: Post;
}

const JobPostThumb:React.FC<ChildCompoenentProps> = ({postData}) => {
    // 모달 상태 관리
    const [isModalOpen, setIsModalOpen] = useState(false);

    
    const careerString = ['경력 무관', '신입', '경력'];
    const eduString = ['학력 무관', '고졸 이상', '대졸 이상', '석사 이상', '박사 이상'];

    const formatDate = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        return `${year}년 ${month}월 ${day}일`;
    }
    
    const handleModalOpen = () => {
        setIsModalOpen(!isModalOpen);
    }
    
    if (!postData) return null;

  return (
    <>
        <div className="card-container">
            <div className="author-title-container">
                <div className="title-detail-wrapper">
                    <div className="author-wrapper">
                        <p>{postData.author}</p>
                    </div>
                    <div className="go-detail">
                        {/* 전체보기라는 글자를 누르면 /job/post/:id 로 이동 */}
                        <Link to={`/job/post/${postData.id}`}>전체보기 👉</Link>
                    </div>
                </div>
                <div className="title-wrapper">
                    <p>{postData.title}</p>
                </div>
            </div>
            <div className="post-basic-wrapper">
                <div className="location">
                    <p>근무지 : </p>
                </div>
                <div className="newbie">
                    <p>{careerString[postData.career]}</p>
                </div>
                <div className="school">
                    <p>{eduString[postData.edu]}</p>
                </div>
                {postData.startDate && postData.endDate ?
                <div className="date">
                    <p>{formatDate(postData.startDate)}</p>
                    <p>~</p>
                    <p>{formatDate(postData.endDate)}</p>
                </div>
                :
                <div className="date">
                    <p>상시모집</p>
                </div>
                }
            </div>
            <div className="post-analyze-container">
                <div className="analyze-wrapper">
                    <div className="analyze-result">
                        {postData.isJob == 'job'
                        ? <p>직무 100%</p>
                        : <p>{postData.analyzeResult}</p>
                        }
                    </div>
                </div>
            </div>
            <div className="open-job-detail">
                <button onClick={()=>handleModalOpen()}>직무 상세보기</button>
            </div>
        </div>
        {isModalOpen &&
            <JobPostListModal handleModal={handleModalOpen} postData={postData} />
        }
    </>
  )
}

export default JobPostThumb