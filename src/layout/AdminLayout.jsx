import './AdminLayout.scss';
import { useState, useEffect } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";

export default function AdminLayout(){

  //  會員列表目前沒有該頁面，先隨便寫一個，可以自己調整，新增一個 path
  const routes = [
    {path: "/admin/orders",name: "預約訂單"},
    {path: "/admin/member-list",name: "會員列表"},
  ]

  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/adminLogin");
      setTimeout(()=> {
        Swal.fire({
          title: "請先登入！",
          icon: "error",
          confirmButtonText: "確定"
        });  
      }, 0);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/adminLogin");
  };

  return(
    <div className="d-flex">
      <aside className="aside-navbar navbar bg-body-tertiary align-items-start vh-100 position-fixed">
        <div className="navbar-content container-fluid flex-column align-items-start h-100">
          <div className="w-100">
            <NavLink to="/" className="navbar-brand">
              <img src="logo-2.png" className="img-fluid mb-5" alt="雪伴 LOGO" />
            </NavLink>
            <ul className="navbar-nav flex-column gap-1">
              {
                routes.map((route,index) => {
                  return(
                    <li className="nav-item" key={route.path}>
                      <NavLink 
                        to={route.path} 
                        className={
                          `nav-link fs-5 ps-3 border-start border-5 border-light 
                            ${ location.pathname === route.path || (location.pathname === '/admin' && index === 0) 
                      ? "text-brand-02 active border-brand-02": ""}`
                        }>
                        {route.name}
                      </NavLink>
                    </li>
                  )
                })
              }
            </ul>
          </div>
          <div className="admin-user d-flex align-items-center mb-4">
            <div className="flex-shrink-0">
              <img src="member-sherry.svg" className="rounded-circle img-fluid admin-head-shot" alt="host"/>
            </div>
            <div className="flex-grow-1 ms-3">
              <div className="dropdown dropend">
                <Link className="dropdown-toggle text-black text-decoration-none" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {user && user.user}
                </Link>
                <ul className="dropdown-menu">
                  <li><Link onClick={handleLogout} className="dropdown-item">登出</Link></li>
                </ul>
              </div>
              <Link className="text-secondary login-user-email" to="mailto:jerry@gmail.com">{ user && user.email}</Link>
            </div>
          </div>
        </div>
      </aside>
      <Outlet />
    </div>)
}