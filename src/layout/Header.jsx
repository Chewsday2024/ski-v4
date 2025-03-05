import { useState, useEffect } from "react";
import { NavLink } from 'react-router';
import { useDispatch } from 'react-redux';

import { setPageIsOpen } from '../pages/coach/coachComps/coachPage/coachpageSlice';

import './Header.scss';

function Header() {
  const activeClass = ({ isActive }) => `nav-link text-brand-01 ${isActive ? "text-brand-02" : ""}`;

  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const dispatch = useDispatch();

  const handleLinkClick = () => {
    setIsNavbarOpen(false);
  };

  // 監聽窗口大小的變化
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setIsNavbarOpen(true); // 在桌面斷點時強制展開
      } else {
        setIsNavbarOpen(false); // 在移動設備上折疊
      }
    };

    // 初始檢查
    handleResize();

    // 添加事件監聽器
    window.addEventListener("resize", handleResize);

    // 清除事件監聽器
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg py-4">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            <img src="public/logo-2.png" alt="logo" style={{ width: '200px' }} />
          </NavLink>

          <button
            className="navbar-toggler border-0"
            type="button"
            onClick={toggleNavbar}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={`navbar-collapse ${isNavbarOpen ? "show" : ""}`}
            id="navbarNav"
          >
            <ul className="navbar-nav ms-auto mt-5 mt-md-0 gap-4 text-center text-lg-start">
              <li className="nav-item">
                <NavLink
                  className={ activeClass }
                  to='coach'
                  onClick={() => dispatch(setPageIsOpen(false))}
                  >
                    <span className="material-symbols-outlined align-bottom me-1">
                      downhill_skiing
                    </span>
                    教練介紹
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className={activeClass} to="ski-House" onClick={handleLinkClick}>
                  <span className="material-symbols-outlined align-bottom me-1">Mountain_flag</span>雪場介紹
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className={activeClass} to="article" onClick={handleLinkClick}>
                  <span className="material-symbols-outlined align-bottom me-1">book_5</span>推薦文章
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className={activeClass} to="about-us" onClick={handleLinkClick}><span className="material-symbols-outlined align-bottom me-1"><span className="material-symbols-outlined">group</span></span>關於我們
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link text-brand-01" to="sign-in" onClick={handleLinkClick}>登入</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;