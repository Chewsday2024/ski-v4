import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function UserCenter() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/')
    }, 4000)

    return  () => clearTimeout(timer);
  }, [])

  return (
    <>
      <div className='container'>
        <div className='d-flex flex-column align-items-center p-5'>
          <h6 className="mb-3">你已成功登入，但會員中心還沒做好...請你先回到首頁</h6>
          <img className="w-50 mb-4 px-md-5" src="choju32_0015_11.png" alt="error" />
        </div>
      </div>
    </>
  )
}