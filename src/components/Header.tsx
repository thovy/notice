import React from 'react'
import './Header.css'

const Header = () => {
  return (
    <>
      <div className="header-container">
        <div className="header-wrapper">
          <div className="header-logo">
            <p>Logo</p>
          </div>
          <div className="header-menu-wrapper">
            <div className="header-menu">
              <a href="/job">채용공고</a>
            </div>
            <div className="header-menu">
              직무분석
            </div>
          </div>
          <div className="header-user">
            <div className="header-user">
              <a href="/login">로그인</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header