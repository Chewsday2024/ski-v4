import { useEffect } from "react";
import { useNavigate } from "react-router";

function NotFound() {
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
          <img className="w-50 mb-4 px-md-5" src="public/choju93_0030_9.png" alt="error" />
          <h6>啊呀。･ﾟ･(つд`ﾟ)･ﾟ･雪道路線錯誤。即將為您傳送回到山頂重新導航...</h6>
        </div>
      </div>
    </>
  )
}

export default NotFound;