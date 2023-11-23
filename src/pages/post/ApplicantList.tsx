import React from 'react'
import './ApplicantList.css'
import { useNavigate, useParams } from 'react-router-dom';
import { Post } from '../../components/post/dummyJob';
import ApplicantThumb from '../../components/post/user/ApplicantThumb';

const ApplicantList = () => {

    const navigate = useNavigate();

    // 현재 요청받은 공고의 id
    const {id} = useParams<{id: string}>();
    // 공고 상세 정보
    const postListData = JSON.parse(localStorage.getItem('postListData') || '[]');
    const postData: Post | undefined = postListData.find((post: Post) => post.id === Number(id));
  
    // 유저 상세 정보
    const userListData = JSON.parse(localStorage.getItem('userListData') || '[]');
    const applicantList = userListData.filter((user: any) => postData?.applicantId.includes(user.id));

    // 로그인 한 기업 정보
    const currentUserData = JSON.parse(sessionStorage.getItem('userData') || '{}');


    // 포스트데이터가 없거나, 로그인 유저가 없거나, 로그인유저와 포스트작성자가 다르다면
    if (!postData || !currentUserData || Object.keys(currentUserData).length == 0 || currentUserData.account != postData.account) {
        navigate('/job');
    }
    
  return (
    <>
        <div className="applicant-list-container">
            <div className="applicant-title-wrapper">
                <div className="title-wrapper">
                    <p>지원자 리스트</p>
                    <p>{postData?.title}</p>
                </div>
            </div>
            <div className="applicant-list-contents-container">
                {!applicantList.length ? <p>지원자가 없습니다.</p> :
                <>
                    {applicantList.map((applicant: any) => (
                        <ApplicantThumb userData={applicant} postData={postData} />
                    ))}
                </>
                }
            </div>
        </div>
    </>
  )
}

export default ApplicantList