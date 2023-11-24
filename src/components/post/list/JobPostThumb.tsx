import React, { useMemo, useState } from 'react'
import { Post } from '../dummyJob'
import { Link } from 'react-router-dom';
import JobPostListModal from './JobPostListModal';
import './JobPostThumb.css'
import { useUserStore } from '../../../store/user/UserDataStore';
import { log } from 'console';

interface ChildComponentProps {
  postData: Post;
  similarity?: number;
}

const JobPostThumb:React.FC<ChildComponentProps> = ({postData, similarity}) => {
    
    const careerString = ['경력 무관', '신입', '경력 2년 이하', '경력 5년 이하', '경력 5년 이상', '경력 10년 이상'];
    const eduString = ['학력 무관', '고졸 이상', '초대졸 이상','대졸 이상', '석사 이상', '박사 이상'];

    const formatDate = (dateString: Date) => {
        // LocalStorage에 있어서 string으로 저장된 데이터를 string 에서 date 객체로 변환
        const date = new Date(dateString);
        
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        return `${year}년 ${month}월 ${day}일`;
    }

    const userData = JSON.parse(sessionStorage.getItem('userData') || '{}');

    const bookmarkList = useUserStore(state => state.bookmarkList);
    const handleBookmarkStore = useUserStore(state => state.handleBookmark);

    const handleBookmark = (event:any) => {
        event?.preventDefault();
        if (!userData || Object.keys(userData).length == 0) {
            alert('로그인 후 이용해주세요.');
            return;
        }
        else{
            if (bookmarkList.includes(postData.id)){
                alert('북마크에서 삭제되었습니다.');
                // userData.bookmarkList = userData.bookmarkList.filter((bookmark:any) => bookmark !== postData.id);
                // sessionStorage.setItem('userData', JSON.stringify(userData));
                handleBookmarkStore(postData.id)
            }
            else{
                alert('북마크에 추가되었습니다.');
                // userData.bookmarkList.push(postData.id);
                // sessionStorage.setItem('userData', JSON.stringify(userData));
                handleBookmarkStore(postData.id)
            }
        }
    }

    const isBookmarked = useMemo(() => {
        if (!userData || Object.keys(userData).length == 0) return <p onClick={(e)=>handleBookmark(e)}>🤍</p>;
        if (bookmarkList.includes(postData.id)) return <p onClick={(e)=>handleBookmark(e)}>💚</p>;
        else return <p onClick={(e)=>handleBookmark(e)}>🤍</p>;
    }, [userData, postData, bookmarkList])


    const analyzeResult = () => {
        // 로그인 안된 사용자는 확인할 수 없음
        if (!userData || Object.keys(userData).length == 0) return (
            <>
                <h4>역량 일치율</h4>
                <p>로그인 후 확인할 수 있습니다</p>
            </>
        )
        // 로그인 후 
        if (userData && !userData.isEnt) {

            return (
                <>
                    <h4>역량 일치율</h4>
                    <p>{similarity} %</p>
                </>
            )
        }
    }
    
    if (!postData) return null;

  return (
    <>
        <Link to={`/job/post/${postData.id}`} style={{ textDecoration: 'none' }}>
        <div className="card-container">
            <div className="author-title-container">
                <div className="title-bookmark-wrapper">
                    <div className="author-wrapper">
                        <p>{postData.username}</p>
                    </div>
                    <div className="go-bookmark">
                        {/* 전체보기라는 글자를 누르면 /job/post/:id 로 이동 */}
                        {/* <Link to={`/job/post/${postData.id}`}>전체보기 👉</Link> */}
                        {/* <p onClick={(e)=>handleBookmark(e)}>🤍💚</p> */}
                        {isBookmarked}
                    </div>
                </div>
                <div className="title-wrapper">
                    <p>{postData.title}</p>
                </div>
            </div>
            <div className="post-basic-wrapper">
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
                        {analyzeResult()}
                    </div>
                </div>
            </div>
        </div>
        </Link>
    </>
  )
}

export default JobPostThumb