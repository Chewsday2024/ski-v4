import { Link } from "react-router"

export default function CheckoutSuccess(){
    return(
        <div className="container h-100">
            {/* PC Step flow */}
            <div className="row justify-content-center">
                <div className="col-lg-8 col">
                    <div className="d-none d-md-block">
                        <div className="d-flex justify-content-between step-sec">
                            <div className="d-flex">
                                <span className="step-circle d-flex justify-content-center align-items-center">1</span>
                                <h2 className="fs-4 ms-3 text-gray-03">填寫預約資料</h2>
                            </div>
                            <span className="material-symbols-outlined d-flex justify-content-center align-items-center  text-gray-03">play_arrow</span>
                            <div className="d-flex">
                                <span className="step-circle d-flex justify-content-center align-items-center">2</span>
                                <h2 className="fs-4 ms-3 text-gray-03">填寫聯繫方式與付款</h2>
                            </div>
                            <span className="material-symbols-outlined d-flex justify-content-center align-items-center text-gray-03">play_arrow</span>
                            <div className="d-flex">
                                <span className="step-circle active d-flex justify-content-center align-items-center">3</span>
                                <h2 className="fs-4 ms-3 text-brand-01">預約完成</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Mobile Step Flow */}
            <div className="row">
                <div className="col">
                    <div className="d-md-none">
                        <ul className="mobile-steps d-flex mt-20 mb-32">
                            <li className="d-flex flex-column align-items-center">
                                <span className="step-circle mobile-step-number d-flex justify-content-center align-items-center mb-3">1</span>
                                <h2 className="fs-6 text-gray-03 text-nowrap d-none">填寫預約資料</h2>
                            </li>
                            <li className="d-flex flex-column align-items-center">
                                <span className="step-circle d-flex justify-content-center align-items-center mb-3">2</span>
                                <h2 className="fs-6  text-gray-03 text-nowrap d-none">填寫聯繫方式與付款</h2>
                            </li>
                            <li className="d-flex flex-column align-items-center step-active">
                                <span className="step-circle active d-flex justify-content-center align-items-center mb-3">3</span>
                                <h2 className="fs-6 text-brand-01 text-nowrap">預約完成</h2>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-column justify-content-center">
                <div className="d-flex flex-column gap-3 justify-content-center align-items-center">
                    {/* <span className="material-symbols-outlined icon-unfilled">check_circle</span> */}
                    <img src="https://firebasestorage.googleapis.com/v0/b/kayismeblog.appspot.com/o/Side-Project%2F2025-SnowBuddy%2Fbooking-success.png?alt=media&token=0fc4c233-1367-4473-b24a-69ce8e306114" className="result-success-img" alt="預約成功" />
                    <h3 className="fs-2 success-text">預約成功</h3>
                </div>
                <div className='d-flex justify-content-center flex-wrap gap-3 mt-4 mt-lg-5 mb-5 mb-lg-60'>
                    <Link to='/' className="btn-custom btn-custom-unfilled w-lg-25 w-md-50 w-xs-100 text-nowrap">查看預約訂單</Link>
                    <Link to='/' className="btn-custom btn-custom-filled w-lg-25 w-md-50 w-xs-100 text-nowrap">回首頁</Link>
                </div>
            </div>
            
        </div>
    )
}