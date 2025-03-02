import { Link } from 'react-router';
import './Order.scss';

export default function CheckoutPage(){
    return (
        <div className="container">
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
                                <span className="step-circle active d-flex justify-content-center align-items-center">2</span>
                                <h2 className="fs-4 ms-3 text-brand-01">填寫聯繫方式與付款</h2>
                            </div>
                            <span className="material-symbols-outlined d-flex justify-content-center align-items-center text-brand-01">play_arrow</span>
                            <div className="d-flex">
                                <span className="step-circle d-flex justify-content-center align-items-center">3</span>
                                <h2 className="fs-4 ms-3 text-gray-03">預約完成</h2>
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
                            <li className="d-flex flex-column align-items-center step-active">
                                <span className="step-circle active d-flex justify-content-center align-items-center mb-3">2</span>
                                <h2 className="fs-6 text-brand-01 text-nowrap">填寫聯繫方式與付款</h2>
                            </li>
                            <li className="d-flex flex-column align-items-center">
                                <span className="step-circle d-flex justify-content-center align-items-center mb-3">3</span>
                                <h2 className="fs-6 text-gray-03 text-nowrap d-none">預約完成</h2>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div className="row">
                <div className="col-12">
                    <form action="" className="d-flex flex-column gap-5">
                        {/* 區塊：預約課程 */}
                        <div className="d-flex flex-column gap-4">
                            <h3 className="form-title text-brand-02 ps-4">預約課程</h3>
                            <div className="d-flex justify-content-between flex-wrap gap-4">
                                <div className="w-xs-100 w-lg-40 d-flex flex-column gap-4">
                                    <div className="mb-3 form-section">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <label htmlFor="" className="form-label mb-0">日期</label>
                                            <p className="form-control-plaintext w-70 w-md-80  fw-bold">2025-01-25 (六) ～ 2025-01-27 (一)</p>
                                        </div>
                                    </div>
                                    <div className="mb-3 form-section">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <label htmlFor="" className="form-label mb-0">時間</label>
                                            <p className="form-control-plaintext w-70 w-md-80  fw-bold">整天 5hr (09:30 -12:00) (13:00-15:30)</p>
                                        </div>
                                    </div>
                                    <div className="mb-3 form-section">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <label htmlFor="" className="form-label mb-0">天數</label>
                                            <p className="form-control-plaintext w-70 w-md-80  fw-bold">3 天</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-xs-100 w-lg-40 d-flex flex-column gap-4 lower-part">
                                    <div className="mb-3 form-section">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <label htmlFor="" className="form-label mb-0">雪場</label>
                                            <p className="form-control-plaintext w-70 w-md-80  fw-bold">妙高 休暇村妙高 RunRun滑雪場</p>
                                        </div>
                                    </div>
                                    <div className="mb-3 form-section">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <label htmlFor="" className="form-label mb-0">類型</label>
                                            <p className="form-control-plaintext w-70 w-md-80  fw-bold">單板</p>
                                        </div>
                                    </div>
                                    <div className="mb-3 form-section">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <label htmlFor="" className="form-label mb-0">教練</label>
                                            <p className="form-control-plaintext w-70 w-md-80  fw-bold">木村拓哉</p>
                                        </div>
                                    </div>
                                </div>
                            </div>   
                        </div>
                        {/* 區塊：學員資料 */}
                        <div className="d-flex flex-column gap-4">
                            <div>    
                                <h3 className="form-title text-brand-02 ps-4 mb-3">學員資料</h3>
                                <p className="">同班學員程度需一致，若有明顯差異，教練將以較初階程度為授課基準。</p>
                            </div>
                            <div className="mb-3 form-section">
                                <div className="d-flex justify-content-between align-items-center">
                                    <label htmlFor="" className="form-label mb-0">上課人數</label>
                                    <p className="form-control-plaintext w-70 w-md-80  fw-bold">2 人</p>
                                </div>
                            </div>
                            <div className="mb-3 form-section">
                                <div className="d-flex justify-content-between align-items-center">
                                    <label htmlFor="" className="form-label mb-0">滑行程度</label>
                                    <p className="form-control-plaintext w-70 w-md-80  fw-bold">初中階</p>
                                </div>
                            </div>
                            {/* 區塊：學員資料明細 */}
                            <div className="mb-3 form-section">
                                <div className="row g-3">
                                    <div className="col-12 col-md-6 col-lg-4">
                                        <div className="card border-0">
                                            <h5 className="card-title text-center border border-brand-02 bg-brand-02 text-white border-radius-top-20 p-3 mb-0">學員 1</h5>
                                            <div className="card-body border border-brand-02">
                                                <div className="card-text d-flex justify-content-between align-items-center mb-2">
                                                    <label htmlFor="" className="form-label mb-0">姓名</label>
                                                    <p className="form-control-plaintext w-50 fw-bold">周秉倫</p>
                                                </div>
                                                <div className="card-text d-flex justify-content-between align-items-center mb-2">
                                                    <label htmlFor="" className="form-label mb-0">性別</label>
                                                    <p className="form-control-plaintext w-50 fw-bold">男</p>
                                                </div>
                                                <div className="card-text d-flex justify-content-between align-items-center mb-2">
                                                    <label htmlFor="" className="form-label mb-0">年齡</label>
                                                    <p className="form-control-plaintext w-50 fw-bold">33</p>
                                                </div>
                                                <div className="card-text d-flex justify-content-between align-items-center mb-2">
                                                    <label htmlFor="" className="form-label mb-0">聯絡電話</label>
                                                    <p className="form-control-plaintext w-50 fw-bold">0988123456</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-4">
                                        <div className="card border-0">
                                            <h5 className="card-title text-center border border-brand-02 bg-brand-02 text-white border-radius-top-20 p-3 mb-0">學員 1</h5>
                                            <div className="card-body border border-brand-02">
                                                <div className='card-text d-flex justify-content-between align-items-center mb-2'>
                                                    <label htmlFor="" className="form-label mb-0">姓名</label>
                                                    <p className='form-control-plaintext w-50 fw-bold'>周秉倫</p>
                                                </div>
                                                <div className='card-text d-flex justify-content-between align-items-center mb-2'>
                                                    <label htmlFor="" className="form-label mb-0">性別</label>
                                                    <p className='form-control-plaintext w-50 fw-bold'>男</p>
                                                </div>
                                                <div className='card-text d-flex justify-content-between align-items-center mb-2'>
                                                    <label htmlFor="" className="form-label mb-0">年齡</label>
                                                    <p className='form-control-plaintext w-50 fw-bold'>33</p>
                                                </div>
                                                <div className='card-text d-flex justify-content-between align-items-center mb-2'>
                                                    <label htmlFor="" className="form-label mb-0">聯絡電話</label>
                                                    <p className='form-control-plaintext w-50 fw-bold'>0988123456</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-4">
                                        <div className="card border-0">
                                            <h5 className="card-title text-center border border-brand-02 bg-brand-02 text-white border-radius-top-20 p-3 mb-0">學員 1</h5>
                                            <div className="card-body border border-brand-02">
                                                <div className='card-text d-flex justify-content-between align-items-center mb-2'>
                                                    <label htmlFor="" className="form-label mb-0">姓名</label>
                                                    <p className='form-control-plaintext w-50 fw-bold'>周秉倫</p>
                                                </div>
                                                <div className='card-text d-flex justify-content-between align-items-center mb-2'>
                                                    <label htmlFor="" className="form-label mb-0">性別</label>
                                                    <p className='form-control-plaintext w-50 fw-bold'>男</p>
                                                </div>
                                                <div className='card-text d-flex justify-content-between align-items-center mb-2'>
                                                    <label htmlFor="" className="form-label mb-0">年齡</label>
                                                    <p className='form-control-plaintext w-50 fw-bold'>33</p>
                                                </div>
                                                <div className='card-text d-flex justify-content-between align-items-center mb-2'>
                                                    <label htmlFor="" className="form-label mb-0">聯絡電話</label>
                                                    <p className='form-control-plaintext w-50 fw-bold'>0988123456</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-4">
                                        <div className="card border-0">
                                            <h5 className="card-title text-center border border-brand-02 bg-brand-02 text-white border-radius-top-20 p-3 mb-0">學員 1</h5>
                                            <div className="card-body border border-brand-02">
                                                <div className='card-text d-flex justify-content-between align-items-center mb-2'>
                                                    <label htmlFor="" className="form-label mb-0">姓名</label>
                                                    <p className='form-control-plaintext w-50 fw-bold'>周秉倫</p>
                                                </div>
                                                <div className='card-text d-flex justify-content-between align-items-center mb-2'>
                                                    <label htmlFor="" className="form-label mb-0">性別</label>
                                                    <p className='form-control-plaintext w-50 fw-bold'>男</p>
                                                </div>
                                                <div className='card-text d-flex justify-content-between align-items-center mb-2'>
                                                    <label htmlFor="" className="form-label mb-0">年齡</label>
                                                    <p className='form-control-plaintext w-50 fw-bold'>33</p>
                                                </div>
                                                <div className='card-text d-flex justify-content-between align-items-center mb-2'>
                                                    <label htmlFor="" className="form-label mb-0">聯絡電話</label>
                                                    <p className='form-control-plaintext w-50 fw-bold'>0988123456</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            
                        </div>
                        {/* 區塊：付款 */}
                        <div className="row gap-4">
                            {/* 付款明細 */}
                            <div className="col-lg-8 col-12">
                                <div className='d-flex flex-column gap-4'> 
                                    <h3 className="form-title text-brand-02 ps-4">付款明細</h3>
                                    <div className="mb-3 form-section">
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <label htmlFor="" className="form-label mb-0">價格/每小時</label>
                                            <p className='form-control-plaintext w-70 w-md-80  fw-bold'>JPY 20,000</p>
                                        </div>
                                    </div>
                                    <div className="mb-3 form-section">
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <label htmlFor="" className="form-label mb-0">時數</label>
                                            <p className='form-control-plaintext w-70 w-md-80  fw-bold'>15 小時</p>
                                        </div>
                                    </div>
                                    <div className="mb-3 form-section">
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <label htmlFor="" className="form-label mb-0">人數</label>
                                            <p className='form-control-plaintext w-70 w-md-80  fw-bold'>2 人</p>
                                        </div>
                                    </div>
                                    <div className="mb-3 form-section">
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <label htmlFor="" className="form-label mb-0 fs-4">總金額</label>
                                            <p className='form-control-plaintext w-70 w-md-80  fw-bold fs-3 text-brand-01'>JPY 600,000</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* 區塊：付款方式 */}
                            <div className="col-lg-4 col-12">
                                <div className='d-flex flex-column gap-4'> 
                                    <h3 className="form-title text-brand-02 ps-4">付款方式</h3>
                                    <div className="mb-3 form-section">
                                        <div className="form-check mb-3">
                                            <input className="form-check-input" type="radio" name="payments" id="payment1" />
                                            <label className="form-check-label" htmlFor="payment1">
                                                信用卡
                                            </label>
                                        </div>
                                        <div className="form-check mb-3">
                                            <input className="form-check-input" type="radio" name="payments" id="payment2" />
                                            <label className="form-check-label" htmlFor="payment2">
                                                銀行轉帳
                                            </label>
                                        </div>
                                    </div>
                                </div>    
                            </div>
                        </div>
                        {/* 區塊：聯繫方式 */}
                        <div className="row">
                            <div className="col-lg-8 col-12">
                                <div className='d-flex flex-column gap-4'>
                                    <h3 className="form-title text-brand-02 ps-4">聯繫方式</h3>
                                    <div className="mb-3 form-section">
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <label htmlFor="contactLastName" className="form-label mb-0">姓名</label>
                                            <div className='w-70 w-md-80  d-flex'>
                                                <input type="text" className="form-control w-25 me-3 " id="contactLastName" placeholder="姓氏" />
                                                <input type="text" className="form-control w-75" placeholder="姓名" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3 form-section">
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <label htmlFor="contactPhone" className="form-label mb-0">聯絡電話</label>
                                            <input type="tel" className="form-control w-70 w-md-80 " name="contactPhone" id="contactPhone" placeholder="09xxxxxxxx" />
                                        </div>
                                    </div>
                                    <div className="mb-3 form-section">
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <label htmlFor="email" className="form-label mb-0">E-mail</label>
                                            <input type="email" className="form-control w-70 w-md-80 " name="email" id="email" placeholder="xxx@xxx.xxx" />
                                        </div>
                                    </div>
                                    <div className="mb-3 form-section">
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <label htmlFor="lineID" className="form-label mb-0">LINE ID</label>
                                            <input type="text" className="form-control w-70 w-md-80 " name="lineID" id="lineID" placeholder="" />
                                        </div>
                                    </div>
                                    <div className="mb-3 form-section">
                                        <div className='d-flex justify-content-between align-items-start'>
                                            <label htmlFor="note" className="form-label mb-0">備註</label>
                                            <textarea className="form-control w-70 w-md-80 " id="note" rows="3" placeholder="如有其他特殊需求，可以跟我們說唷！"></textarea>
                                        </div>
                                    </div>
                                    <div className="mb-3 form-section">
                                        <div className='d-flex align-items-center'>
                                            <input className="form-check-input mt-0 me-3" type="checkbox" value="" id="isAgreed" />
                                            <label htmlFor="isAgreed" className="form-label mb-0 w-70 w-md-80 text-nowrap">本人已詳閱並同意
                                                <Link to='/' className='text-brand-02 text-md-20' >預約訂單注意事項</Link>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        
                    </form>
                    
                </div>  
            </div>
            <div className='d-flex justify-content-center flex-wrap gap-3 mt-4 mt-lg-5 mb-5 mb-lg-60'>
                <Link to='/booking' className="btn-custom btn-custom-unfilled w-lg-25 w-md-50 w-xs-100 text-nowrap">上一步</Link>
                <Link to='/checkout-success' className="btn-custom btn-custom-filled w-lg-25 w-md-50 w-xs-100 text-nowrap">付款去</Link>
            </div>
        </div>
    )
}