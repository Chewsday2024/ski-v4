import { NavLink } from 'react-router';

import './Footer.scss';

function Footer() {
  

  return (
    <>
      <footer className='bg-gray-05 py-4'>
        <div className='container d-flex flex-column flex-md-row my-1'>
          <NavLink className="d-flex align-items-center justify-content-center" to=''>
              <img src="../src/assets/images/logo.png" alt="logo" style={{width:'150px'}}/>
          </NavLink>
          <div className='d-flex flex-column w-100 w-md-75 ms-auto'>

            <div className='d-flex flex-column flex-md-row justify-content-between align-items-center w-100 mb-5'>
              <ul className="grid gap-3 d-flex flex-column flex-md-row column-gap-5 p-0 m-0 my-5 my-md-0">
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
              
              <ul className='d-flex justify-content-start grid gap-0 column-gap-4 p-0 m-0'>
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

            <div className='d-flex flex-column-reverse flex-md-row align-items-center justify-content-md-between align-items-md-end text-center text-md-start w-100'>
              <div className='text-brand-01 text-small'>
                <p>Copyright@2024 Search for SnowBuddy All rights reserved.</p>
                <p>本專題僅為學習用途，不做任何商業使用。</p>
              </div>

              <div className='d-flex flex-column grid gap-0 row-gap-1 text-brand-01 mb-4 mb-md-0'>
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