import React, { useEffect, useMemo, useState } from 'react'
import './Profile.css'
import { useUserStore } from '../../store/user/UserDataStore'
import ApplyContentsList from '../../components/post/user/ApplyContentsList';
import ApplycontentsListEnt from '../../components/post/user/ApplycontentsListEnt';
import { log } from 'console';

const Profile = () => {

    // ID
    const userId = useUserStore(state => state.id)
    // 아이디
    const userAccount = useUserStore(state => state.account)
    // 유저 이름/기업명
    const userUsername = useUserStore(state => state.username);
    // 희망 근무지/기업위치
    const userLocation = useUserStore(state => state.location);
    // 경력/학력
    const userCareer = useUserStore(state => state.career);
    const userEdu = useUserStore(state => state.edu);
    // 비밀번호 수정은 어떻게하지?

    // user가 기업인지 일반회원인지
    const userIsEnt = useUserStore(state => state.isEnt);
    const userCompanyDesc = useUserStore(state => state.companyDescription);
    const userCompanyUrl = useUserStore(state => state.companyUrl);
    // 기업일 땐 작성한 공고, 일반회원일 땐 지원한 공고
    const userApplyList = useUserStore(state => state.applyList);

    const userBookmarkList = useUserStore(state => state.bookmarkList);

    
    const careerString = ['미기입', '신입', '경력 2년 이하', '경력 5년 이하', '경력 5년 이상', '경력 10년 이상'];
    const eduString = ['미기입', '고졸', '초대졸', '대졸', '석사', '박사'];

    const userDetail = useMemo(() => {
        if (userIsEnt){
            return(
            <>
                <div className="user-location">
                    <p>기업 위치: {userLocation}</p>
                </div>

                <div className="user-url">
                    <p>기업 홈페이지 : {userCompanyUrl}</p>
                </div>

                <div className="user-desc">
                    <p>기업 소개 : {userCompanyDesc}</p>
                </div>
            </>
        )}
        else{
            return (
            <>
                <div className="user-location">
                    <p>희망 근무지 : {userLocation}</p>
                </div>

                <div className="user-career">
                    <p>경력 : {careerString[userCareer]}</p>
                </div>

                <div className="user-edu">
                    <p>학력 : {eduString[userEdu]}</p>
                </div>
            </>
        )}
    }, [userIsEnt, userLocation, userCompanyDesc, userCompanyUrl, userCareer, userEdu])

    const userPostList = useMemo(() => {
        if (userIsEnt){
            return (
                <ApplycontentsListEnt account={userAccount}/>
            )
        }
        else{
            return (
                <ApplyContentsList userId={userId}/>
            )
        }
    }, [userIsEnt, userAccount, userId])

  return (
    <>
        <div className="main-profile-container">
            <div className="container-title-wrapper">
                <p>회원 정보</p>
            </div>

            <div className="user-info-container">
                <div className="user-detail-wrapper">
                    <div className="user-subtitle">
                        <div className="username">
                            <p>{userUsername} 님</p>
                            <a href="/profile/edit"
                                className='edit'
                            >정보 수정</a>
                        </div>
                        <div className="info-button-wrapper">
                            {userIsEnt?
                            <></>
                            :
                            <a href="/profile/sk"
                             className="skRegist">
                                <button>
                                    나의 기술/지식 수정
                                </button>
                            </a>
                            }
                        </div>
                    </div>
                    <div className="user-info-wrapper">
                        {/* {userDetail} */}
                        <div className="user-info">
                            <div className="user-account">
                                <p>아이디 : {userAccount}</p>
                            </div>
                            {userDetail}
                        </div>
                    </div>
                </div>

                <div className="user-post-wrapper">
                    
                    <div className="ab-list-container">
                        {userPostList}
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Profile