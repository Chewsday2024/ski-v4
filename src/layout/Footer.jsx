import { NavLink } from 'react-router';

import './Footer.scss';

function Footer() {
  

  return (
    <>
      <footer className='bg-gray-05 py-4'>
        <div className='container d-flex my-1'>
          <NavLink className="d-flex align-items-center" to=''>
              <img src="../src/assets/images/logo.png" alt="logo" style={{width:'150px'}}/>
          </NavLink>
          <div className='d-flex flex-column w-75 ms-auto'>

            <div className='d-flex justify-content-between align-items-center w-100 mb-5'>
              <ul className="d-flex grid gap-0 column-gap-5 p-0 m-0 w-75">
                <li>
                  <NavLink className="text-brand-01 text-decoration-none" to='coach'>教練介紹</NavLink>
                </li>
                <li>
                  <NavLink className="text-brand-01 text-decoration-none" to='skiHouse'>雪場介紹</NavLink>
                </li>
                <li>
                  <NavLink className="text-brand-01 text-decoration-none" to=''>推薦文章</NavLink>
                </li>
                <li>
                  <NavLink className="text-brand-01 text-decoration-none" to=''>安全知識</NavLink>
                </li>
              </ul>
              
              <ul className='d-flex grid gap-0 column-gap-3 p-0 m-0 w-50 ms-5 ps-5'>
                <li>
                  <NavLink>
                    <i className="fs-4 text-brand-01 bi bi-facebook"></i>
                  </NavLink>
                </li>
                <li>
                  <NavLink>
                    <i className="fs-4 text-brand-01 bi bi-instagram"></i>
                  </NavLink>
                </li>
                <li>
                  <NavLink>
                    <i className="fs-4 text-brand-01 bi bi-line"></i>
                  </NavLink>
                </li>
              </ul>
            </div>

            <div className='d-flex justify-content-between align-items-end w-100'>
              <div className='text-brand-01 text-small w-75'>
                <p>Copyright@2024 Search for SnowBuddy All rights reserved.</p>
                <p>本專題僅為學習用途，不做任何商業使用。</p>
              </div>

              <div className='d-flex flex-column grid gap-0 row-gap-1 text-brand-01 w-50 ms-5 ps-5'>
              {/* 標籤和屬性還需要調整 */}
                <span>客服專線：0800-123-456</span>
                <span>客服信箱：service@snowbuddy.com</span>
                <span>服務時間：週一至週日 08:00~17:00</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer