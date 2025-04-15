import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from 'react-router';

import './Header.scss';
import { Toaster } from "react-hot-toast";

function Header() {
  const activeClass = ({ isActive }) => `nav-link text-brand-01 ${isActive ? "text-brand-02" : ""}`;

  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [user, setUser] = useState(null); 
  const location = useLocation();

  const navigate = useNavigate();

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

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

  useEffect(() => {
    // 检查是否有存储的用户信息
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("user"); // 清除登录信息
    localStorage.removeItem("orderData"); // 清除預約資料
    setUser(null); // 更新状态
    navigate("/");  //登出後回到首頁
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg py-4 fixed-top bg-white shadow-sm">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            <img src="logo-2.png" alt="logo" style={{ width: '200px' }} />
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
            <ul className="navbar-nav ms-auto mt-5 mt-md-0 gap-3 text-center text-lg-start">
              <li className="nav-item">
                <NavLink
                  className={ activeClass }
                  onClick={handleLinkClick}
                  to='coach'
                >
                  <span className="material-symbols-outlined align-bottom me-1">
                    downhill_skiing
                  </span>
                    教練介紹
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className={activeClass} to="ski-house" onClick={handleLinkClick}>
                  <span className="material-symbols-outlined align-bottom me-1">Mountain_flag</span>雪場介紹
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className={activeClass} to="article" onClick={handleLinkClick}>
                  <span className="material-symbols-outlined align-bottom me-1">book_5</span>推薦文章
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className={activeClass} to="about-us" onClick={handleLinkClick}>
                  <span className="material-symbols-outlined align-bottom me-1">group</span>關於我們
                </NavLink>
              </li>

              {user ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link text-brand-01" to="user-center" onClick={handleLinkClick}>
                      <span className="material-symbols-outlined align-bottom me-1">home</span>會員中心
                    </NavLink>
                  </li>
                  <li className="nav-item align-self-center">
                    <button className="btn btn-link nav-link text-brand-01" onClick={handleLogout}>
                      <span className="material-symbols-outlined align-bottom me-1">exit_to_app</span>登出
                    </button>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <NavLink className="nav-link text-brand-01" to="sign-in" onClick={handleLinkClick}>
                    登入
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>


      <Toaster />
    </>
  );
}

export default Header;