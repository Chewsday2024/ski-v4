import { NavLink } from 'react-router';

import './Footer.scss';

function Footer() {
  

  return (
    <footer className='container mt-3'>
      <div className='d-flex flex-column flex-sm-row justify-content-between gap-4 gap-sm-0 w-100'>
        <NavLink className='col-8 col-sm-2 m-auto' to='/'>
          <img src="../src/assets/images/logo.png" className='w-100 ' alt="#" />
        </NavLink>


        <div className='d-flex flex-column gap-5 col-sm-8'>
          <div className='d-flex flex-column flex-sm-row align-items-center justify-content-between gap-3'>
            <ul className='d-flex flex-column flex-sm-row justify-content-sm-between gap-4 gap-sm-5 fw-bold list-unstyled m-0'>
              <li>
                <NavLink className='text-decoration-none'>
                  教練介紹
                </NavLink>
              </li>

              <li>
                <NavLink className='text-decoration-none'>
                  雪場介紹
                </NavLink>
              </li>

              <li>
                <NavLink className='text-decoration-none'>
                  推薦文章
                </NavLink>
              </li>

              <li>
                <NavLink className='text-decoration-none'>
                  安全知識
                </NavLink>
              </li>
            </ul>

            <div className='d-flex align-items-center gap-4 col-sm-4 '>
              <i className='bi fs-2 fs-sm-1 bi-facebook' />
              <i className='bi fs-2 fs-sm-1 bi-instagram' />
              <i className='bi fs-2 fs-sm-1 bi-line' />
            </div>
          </div>

          <div className='d-flex flex-column flex-column-reverse flex-sm-row justify-content-between gap-4'>
            <div className='d-flex flex-column gap-2'>
              <p>
                Copyright@2024 Search for SnowBuddy All rights reserved.
              </p>

              <p>
                本專題僅為學習用途，不做任何商業使用，圖片來源請見Github repo
              </p>
            </div>

            <div className='d-flex flex-column gap-2 col-sm-4 fw-bold contect'>
              <p>
                客服專線：0800-123-456
              </p>

              <p>
                客服信箱：service@snowbuddy.com
              </p>

              <p>
                服務時間：週一至週日 08:00~17:00
              </p>
            </div>
          </div>
        </div>
      </div>

    </footer>
  )
}

export default Footer