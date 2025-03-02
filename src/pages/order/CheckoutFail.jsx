import { Link } from "react-router"

export default function CheckoutFail(){
    return(
        <div className="container vh-100">
            <div className="h-100 d-flex flex-column justify-content-center mt-4">
                <div className="d-flex flex-column gap-3 justify-content-center align-items-center">
                    {/* <span className="material-symbols-outlined icon-unfilled">Cancel</span> */}
                    <img src="/images/booking-fail.png" className="result-error-img" alt="預約失敗" />
                    <h3 className="fs-2 error-text">預約失敗</h3>
                    <p className="text-md-20">404 網路連線問題，請重新嘗試</p>
                </div>
                <div className="d-flex justify-content-center flex-wrap gap-3 mt-4 mt-lg-5 mb-5 mb-lg-60">
                    <Link to='/' className="btn-custom btn-custom-filled w-lg-25 w-md-50 w-xs-100 text-nowrap">回首頁</Link>
                </div>
            </div>            
        </div>
    )
}