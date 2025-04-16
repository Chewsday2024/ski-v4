import Header from "../layout/Header";
import { Outlet } from "react-router-dom";

function FrontLayout() {
  return (
    <>
      <Header />
      <div className="front-container"> {/* 用來包住所有前台頁面 */}
        <Outlet />
      </div>
    </>
  );
}

export default FrontLayout;