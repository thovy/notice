import React, { useState } from 'react'
import './Update.css'
import { useNavigate } from 'react-router-dom';

const Update = () => {

  const navigate:any = useNavigate();

  const userData = JSON.parse(sessionStorage.getItem('userData') || '{}');

  // 일반/기업의 유저 형태가 달라서 일단은 이렇게 해놓음
  const initUser = () => {
    if(userData.isEnt){
      return {
        account: userData.account,
        username: userData.username,
        location: userData.location,

        companyDescription: userData.companyDescription,
        companyUrl: userData.companyUrl,
      }
    }
    else{
      return {
        account: userData.account,
        username: userData.username,
        location: userData.location,

        edu: userData.edu,
        career: userData.career,
      }
    }
  }

  const [editedUserData, setEditedUserData] = useState<any>(initUser());


  const handleSubmit = () => {
    // localStorage에 저장
    const userListData = JSON.parse(localStorage.getItem('userListData') || '[]');
    const modifyUser = userListData.find((user: any) => user.id === userData.id);
    modifyUser.username = editedUserData.username;
    modifyUser.location = editedUserData.location;
    if(userData.isEnt){
      modifyUser.companyDescription = editedUserData.companyDescription;
      modifyUser.companyUrl = editedUserData.companyUrl;
    }
    else{
      modifyUser.edu = editedUserData.edu;
      modifyUser.career = editedUserData.career;
    }
    localStorage.setItem('userListData', JSON.stringify(userListData));

    // sessionStorage에 저장
    sessionStorage.clear();
    sessionStorage.setItem('userData', JSON.stringify(modifyUser));

    window.location.reload();
    navigate(-1);
  }

  return (
    <>
      <div className="update-container">
        <div className="container-title-wrapper">
          <p>정보수정</p>
        </div>
        <div className="update-wrapper">
          <div className="account-wrapper">
            <label htmlFor="account">아이디</label>
            <input
              id='account'
              value={editedUserData.account}
              disabled
            />
          </div>
          <div className="username-wrapper">
            <label htmlFor="username">이름</label>
            <input
              id='username'
              value={editedUserData.username}
              onChange={(e) => setEditedUserData({...editedUserData, username: e.target.value})}
            />
          </div>
          <div className="location-wrapper">
            {userData.isEnt ?
            <label htmlFor="location">기업 위치</label>
            :<label htmlFor="location">희망 근무지</label>
            }
            <input
              id='location'
              value={editedUserData.location}
              onChange={(e) => setEditedUserData({...editedUserData, location: e.target.value})}
            />
          </div>
          {userData.isEnt ?
          <>
            <div className="company-url-wrapper">
              <label htmlFor="company-url">기업 URL</label>
              <input
                id='company-url'
                value={editedUserData.companyUrl}
                onChange={(e) => setEditedUserData({...editedUserData, companyUrl: e.target.value})}
              />
            </div>
            <div className="companyDescription-wrapper">
              <label htmlFor="companyDescription">기업 소개</label>
              <textarea
                id='companyDescription'
                value={editedUserData.companyDescription}
                onChange={(e) => setEditedUserData({...editedUserData, companyDescription: e.target.value})}
              />
            </div>
          </>
          :
          <>
            <div className="edu-wrapper">
              <label htmlFor="edu">학력</label>
              <select
                id='edu'
                value={editedUserData.edu}
                onChange={(e) => setEditedUserData({...editedUserData, edu: e.target.value})}
              >
                <option value="-1" disabled>학력을 선택해주세요</option>
                <option value="0">선택 안 함</option>
                <option value="1">고졸</option>
                <option value="2">초대졸</option>
                <option value="3">대졸</option>
                <option value="4">석사</option>
                <option value="5">박사</option>
              </select>
            </div>
            <div className="career-wrapper">
              <label htmlFor="career">경력</label>
              <select
                id='career'
                value={editedUserData.career}
                onChange={(e) => setEditedUserData({...editedUserData, career: e.target.value})}
              >
                <option value="-1" disabled>경력을 선택해주세요</option>
                <option value="0">선택 안 함</option>
                <option value="1">신입</option>
                <option value="2">경력 2년 이하</option>
                <option value="3">경력 5년 이하</option>
                <option value="4">경력 5년 이상</option>
                <option value="5">경력 10년 이상</option>
              </select>
            </div>
          </>
          }
        </div>
        <div className="submit-button-wrapper">
          <button
            className="submit-button"
            onClick={() => {handleSubmit()}}
          >수정하기</button>
        </div>
      </div>
    </>
  )
}

export default Update