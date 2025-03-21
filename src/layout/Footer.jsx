import { NavLink } from 'react-router';

import './Footer.scss';

function Footer() {
  

  return (
    <>
      <footer className='bg-gray-04 py-4'>
        <div className="container py-lg-4">
          <div className='row row-cols-1 row-cols-lg-2'>
            <div className="col-lg-3 d-flex justify-content-center justify-content-lg-start align-items-lg-center">
              <NavLink to=''>
                  <img src="logo.png" alt="logo" style={{width:'150px'}}/>
              </NavLink>
            </div>
            <div className='col-lg-9'>
              <div className='d-flex flex-column my-4 py-2 my-lg-0 py-lg-0'>
                <div className='d-flex flex-column justify-content-between align-items-center flex-lg-row'>
                  <ul className="grid gap-3 d-flex flex-column flex-lg-row mb-5 mb-lg-4">
                    <li>
                      <NavLink
                        className="text-brand-01" 
                        to='coach'
                        >
                        教練介紹
                      </NavLink>
                    </li>
                    <li><NavLink className="text-brand-01" to='ski-house'>雪場介紹</NavLink></li>
                    <li><NavLink className="text-brand-01" to='article'>推薦文章</NavLink></li>
                    <li><NavLink className="text-brand-01" to='about-us'>關於我們</NavLink></li>
                    <li><NavLink className="text-brand-01" to='adminLogin'>後台登入</NavLink></li>
                  </ul>
                  <ul className='d-flex justify-content-start grid gap-0 column-gap-4 mb-lg-4'>
                    <li><NavLink><i className="fs-4 text-brand-01 bi bi-facebook"></i></NavLink></li>
                    <li> <NavLink><i className="fs-4 text-brand-01 bi bi-instagram"></i></NavLink></li>
                    <li><NavLink><i className="fs-4 text-brand-01 bi bi-line"></i></NavLink></li>
                  </ul>
                </div>
              </div>

              <div className='text-start px-5 px-lg-0'>
                <div className='d-flex flex-column-reverse align-self-start flex-lg-row justify-content-lg-between align-items-lg-end'>
                  <div className='text-brand-01 text-small me-lg-5'>
                    <p className="mb-2">Copyright@2025 Search for SnowBuddy All rights reserved.</p>
                    <p>本專題僅為學習用途，不做任何商業使用。</p>
                  </div>
                  <div className='d-none d-sm-flex flex-column grid gap-0 row-gap-1 text-brand-01 mb-4 mb-lg-0'> 
                    <a className="text-brand-01" href="tel:+0800123456">客服專線：0800-123-456</a>
                    <a className="text-brand-01" href="mailto:service@snowbuddy.com">客服信箱：service@snowbuddy.com</a>
                    <span>服務時間：週一至週日 08:00~17:00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer