import { Link } from "react-router"
import StepFlow from "./orderComps/StepFlow"

export default function CheckoutSuccess(){
  return(
    <div className="container h-100">
      <StepFlow currentStep={3}/>
      <div className="d-flex flex-column justify-content-center">
        <div className="d-flex flex-column gap-3 justify-content-center align-items-center">
          <img src="booking-success.png" className="result-success-img" alt="預約成功" />
          <h3 className="fs-2 success-text">預約成功</h3>
        </div>
        <div className='d-flex justify-content-center flex-wrap gap-3 mt-4 mt-lg-5 mb-5 mb-lg-60'>
          {/* <Link to='/' className="btn-custom btn-custom-unfilled w-lg-25 w-md-50 w-xs-100 text-nowrap">查看預約訂單</Link> */}
          <Link to='/' className="btn-custom btn-custom-filled w-lg-25 w-md-50 w-xs-100 text-nowrap">回首頁</Link>
        </div>
      </div>
    </div>
  )
}