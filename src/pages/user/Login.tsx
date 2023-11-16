import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Login.css'

const Login = () => {

    const [loginFormData, setLoginFormData] = useState({
        account: '',
        password: '',
    })

    const checkForm = async () => {
        if (loginFormData.account === '') {
            alert('아이디를 입력해주세요.')
            return false;
        }
        if (loginFormData.password === '') {
            alert('비밀번호를 입력해주세요.')
            return false;
        }
        return true;
    }

    const handleLogin = async (event:any) => {
        event.preventDefault();

        const checkResult:boolean = await checkForm();

        if (checkResult){
            console.log(loginFormData);
        
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
        <div className="login-container">
            {/* form을 사용해서 login 데이터 보내기 */}
            <form onSubmit={handleLogin} >
                <div className="login-wrapper">
                    <div className="login-title-wrapper">
                        <p>로그인</p>
                    </div>
                    <div className="login-input-wrapper">
                        <div className="login-id-wrapper">
                            <label htmlFor="account">아이디</label>
                            <input
                                id='account'
                                className="login-id"
                                type="text"
                                placeholder="아이디를 입력해주세요"
                                onChange={(e) => setLoginFormData({...loginFormData, account: e.target.value})}
                            />
                        </div>
                        <div className="login-pw-wrapper">
                            <label htmlFor="password">비밀번호</label>
                            <input
                                id='password'
                                className="login-pw"
                                type="password"
                                placeholder="비밀번호를 입력해주세요"
                                onChange={(e) => setLoginFormData({...loginFormData, password: e.target.value})}
                            />
                        </div>
                    </div>
                    <div className="login-button-wrapper">
                        <button
                            className="login-button"
                        >로그인</button>
                    </div>
                </div>
            </form>
            {/* 회원가입 페이지로 */}
            <div className="regist-button-wrapper">
                <p>아직 회원이 아니신가요?</p>
                <Link to={'/signup'}>
                    <button
                        className="regist-button"
                    >회원가입
                    </button>
                </Link>
            </div>
        </div>
    </>
  )
}

export default Login