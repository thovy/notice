import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './SignupEnt.css'

const SignupEnt = () => {
    
    // 희망 근무지 목록
    const locationList:any = ["서울", "경기", "인천", "부산", "대구", "광주", "대전", "울산", "세종", "기타",]


    const [signupFormData, setSignupFormData] = useState({
        account: '',
        password: '',
        passwordCheck: '',
        companyname: '',
        isEnt: true,
        location: "-1",
        companyDescription:"",
    })

    const checkForm = async () => {
        if (signupFormData.account === '') {
            alert('아이디를 입력해주세요.')
            return false;
        }
        if (signupFormData.password === '') {
            alert('비밀번호를 입력해주세요.')
            return false;
        }
        if (signupFormData.passwordCheck === '') {
            alert('비밀번호 한 번 더 입력해주세요.')
            return false;
        }
        if (signupFormData.password !== signupFormData.passwordCheck) {
            alert('비밀번호가 일치하지 않습니다.')
            return false;
        }
        if (signupFormData.companyname == "") {
            alert('기업명을 입력해주세요.')
            return false;
        }
        if (signupFormData.location === "-1") {
            alert('기업 위치를 선택해주세요.')
            return false;
        }
        return true;
    }

    const handleSignup = async (event:any) => {
        event.preventDefault();

        const checkResult:boolean = await checkForm();

        if (checkResult){
            console.log(signupFormData);

        // const response = await fetch('http://localhost:8000/api/login/', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(loginFormData),
        // }).then((res) => res.json())
        // .then((data) => {
        //     console.log(data);
        // })
        // .catch((err) => {
        //     console.error(err);
        // })

        }
              
    }

  return (
    <>
        <div className="signup-container ent">
            <form onSubmit={handleSignup}>
                <div className="signup-wrapper">
                    <div className="signup-title-wrapper">
                        <p>기업용 회원가입</p>
                    </div>
                    <div className="signup-input-wrapper">
                        <div className="signup-id-wrapper">
                            <label htmlFor="account">아이디</label>
                            <input
                                id='account'
                                className="signup-id"
                                type="text"
                                placeholder="아이디를 입력해주세요"
                                onChange={(e) => setSignupFormData({...signupFormData, account: e.target.value})}
                            />
                        </div>
                        <div className="signup-pw-wrapper">
                            <label htmlFor="password">비밀번호</label>
                            <input
                                id='password'
                                className="signup-pw"
                                type="password"
                                placeholder="비밀번호를 입력해주세요"
                                onChange={(e) => setSignupFormData({...signupFormData, password: e.target.value})}
                            />
                        </div>
                        <div className="signup-pw-check-wrapper">
                            <label htmlFor="password-check">비밀번호 확인</label>
                            <input
                                id='password-check'
                                className="signup-pw-check"
                                type="password"
                                placeholder="비밀번호를 다시 입력해주세요"
                                onChange={(e) => setSignupFormData({...signupFormData, passwordCheck: e.target.value})}
                            />
                        </div>
                        <div className="signup-username-wrapper">
                            <label htmlFor="username">기업명</label>
                            <input
                                id='username'
                                className="signup-username"
                                type="text"
                                placeholder="이름을 입력해주세요"
                                onChange={(e) => setSignupFormData({...signupFormData, companyname: e.target.value})}
                            />
                        </div>
                        {/* 희망 근무지 / 기업의 위치 */}
                        <div className="signup-location-wrapper">
                            <label htmlFor="location">기업의 위치를 선택해주세요</label>
                            <select name="location" id="location"
                                onChange={(e) => setSignupFormData({...signupFormData, location: e.target.value})}
                                >
                                <option key={0} value={""}>지역 선택</option>
                                {locationList.map((location:string) => (
                                    <option value={location}>{location}</option>
                                ))}
                            </select>
                            {/* 기업일 때 기업설명 추가 란을 추가 */}
                            <div className='companyDescription-wrapper'>
                                <label htmlFor="companyDescription">기업 설명</label>
                                <textarea
                                    id='companyDescription'
                                    className="companyDescription"
                                    onChange={(e) => setSignupFormData({...signupFormData, companyDescription: e.target.value})}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="signup-button-wrapper">
                        <button
                            className="signup-button"
                        >기업용 회원가입</button>
                    </div>
                </div>
            </form>
            {/* 로그인 페이지로 */}
            <div className="login-button-wrapper">
                <p>이미 회원이신가요?</p>
                <Link to={'/login'}>
                    <button
                        className="login-button"
                    >로그인
                    </button>
                </Link>
            </div>
        </div>
    </>
  )
}

export default SignupEnt