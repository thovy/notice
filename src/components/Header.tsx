import React, { useMemo } from 'react'
import './Header.css'
import { useUserStore } from '../store/user/UserDataStore'

const Header = () => {

  const username = useUserStore(state => state.username);

  const handleLogin = useMemo(() => {
    if (username === '') {
      return (
        <a href="/login">
        <button>
        로그인
        </button>
        </a>
      )
    } else {
      return (
        <>
        <div className="header-username">
          <a href="/profile">{username} 님</a>
        </div>
        <button onClick={()=>{
          sessionStorage.clear();
          window.location.href = '/';
        }}> 로그아웃 </button>
        </>
      )
    }
  }, [username])

  return (
    <>
      <div className="header-container">
        <div className="header-wrapper">
          <div className="header-logo">
            <a href='/'>
              <p>
                NOTICE
              </p>
            </a>
          </div>
          <div className="header-menu-wrapper">
            {
              username === '' ?
              <>
              </>
            :
            <div className="header-menu">
              <a href="/job">채용공고</a>
            </div>
            }
            <div className="header-menu">
              직무분석
            </div>
          </div>
            <div className="header-user">
              {handleLogin}
            </div>
        </div>
      </div>
    </>
  )
}

export default Header