import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import { useUserStore } from '../../store/user/UserDataStore';

const Login = () => {

    const navigate = useNavigate();


    // const {
    //     setAccount,
    //     setUsername,
    //     setIsEnt,
    //     setLocation,
    //     setCareer,
    //     setEdu,
    //     setCompanyDescription,
    //     setApplyList,
    //     setBookmarkList,
    //     setSkills,
    //     setKnowledges,
    // } = useUserStore();


    const [userType, setUserType] = useState("일반회원")

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

            var reqUrl = "";
            if (userType === "일반회원"){
                console.log("====user login");
                reqUrl = "/api/login/";
                
            } else {
                console.log("====ent login");
                reqUrl = "/api/ent/login/";
            }

            // server api 가 완성되면 fetch api로 바꿔야합니다.
            // const response = await fetch(`${process.env.REACT_APP_BASE_URL}`+reqUrl, {
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

            const userListData = JSON.parse(localStorage.getItem('userListData') || '[]');
            
            if (loginFormData.account === "test" && loginFormData.password === "test" && userType === "일반회원"){
                // localstorage에 있는 userListData에서 account가 test인 user를 찾아서 가져옵니다.
                const normalUser = userListData.find((user:any) => user.account === "test");
                console.log(userListData);
                
                console.log(normalUser);
                
                sessionStorage.setItem("userData", JSON.stringify(normalUser));
                alert("일반 회원 로그인 성공");
                navigate('/');
                // 새로고침 안 하니까 헤더가 안 바뀝니다.
                window.location.reload();
            }
            else if (loginFormData.account === "enttest" && loginFormData.password === "test" && userType === "기업회원"){
                const entUser = userListData.find((user:any) => user.account === "enttest");
                sessionStorage.setItem("userData", JSON.stringify(entUser));
                alert("기업 회원 로그인 성공")
                navigate('/');
                // 새로고침 안 하니까 헤더가 안 바뀝니다.
                window.location.reload();
            }
            else{
                alert("아이디 혹은 비밀번호가 틀렸습니다.")
            }


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
                        <div className="typeSelect-wrapper">
                            <select
                                value={userType}
                                onChange={(e) => setUserType(e.target.value)}
                            >
                                <option value="일반회원" >일반회원</option>
                                <option value="기업회원" >기업회원</option>
                            </select>
                        </div>

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
                <Link to={'/ent/signup'}>
                    <button
                        className="regist-button ent"
                    >기업용 회원가입
                    </button>
                </Link>
                
            </div>
        </div>
    </>
  )
}

export default Login