import './AdminLayout.scss';
import { NavLink, Outlet } from "react-router";

export default function AdminLayout(){

    const routes = [
        {path: "/admin/orders",name: "預約訂單"}
    ]

    return(
    <div className="d-flex">
        <aside className="aside-navbar navbar navbar-expand-lg bg-body-tertiary align-items-start vh-100">
            <div className="navbar-content container-fluid flex-column align-items-start">
                <NavLink to="/" className="navbar-brand mb-3">
                    <img src="logo-2.png" className="img-fluid" alt="雪伴 LOGO" />
                </NavLink>
                <ul className="navbar-nav flex-column">
                    {
                        routes.map((route) => {
                            return(
                                <li className="nav-item" key={route.path}>
                                    <NavLink to={route.path} className="nav-link fs-4 text-brand-02 active border-start border-brand-02 border-5">{route.name}</NavLink>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <div className="d-flex">
                <div className="flex-shrink-0 head-shot">
                    <img src="member-sherry.png" className="img-fluid" alt="雪粒"/>
                </div>
                <div className="flex-grow-1 ms-3">
                    This is some content from a media component. You can replace this with any content and adjust it as needed.
                </div>
            </div>
        </aside>
        <Outlet />
    </div>)
}