
import { Fragment } from "react";
import PropTypes from "prop-types";
export default function StepFlow({currentStep}) {
  const steps = [
    "填寫預約資料",
    "填寫聯繫方式與付款",
    "預約完成"
  ]

  return (
    <>
      {/* PC Step flow */}
      <div className="row justify-content-center">
        <div className="col-lg-8 col">
          <div className="d-none d-md-block">
            <div className="d-flex justify-content-between step-sec">
              {
                steps.map((step,index)=>{
                  const stepNumber = index + 1;
                  const isActive = currentStep === stepNumber;

                  return (
                    <Fragment key={stepNumber}>
                      <div className="d-flex">
                        <span 
                          className={`step-circle d-flex justify-content-center align-items-center ${isActive ? "active":""}`}>
                          {stepNumber}
                        </span>
                        <h2 className={`fs-4 ms-3 ${isActive ? "text-brand-01":" text-gray-03"}`}>{step}</h2>
                      </div>
                      {
                        stepNumber < steps.length && (
                          <span className={`material-symbols-outlined d-flex justify-content-center align-items-center ${isActive ? "text-brand-01" : "text-gray-03"}`}>
                            play_arrow
                          </span>
                        )
                      }
                    </Fragment>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Step Flow */}
      <div className="row">
        <div className="col">
          <div className="d-md-none">
            <ul className="mobile-steps d-flex mt-20 mb-32">
              {
                steps.map((step,index)=>{
                  const stepNumber = index + 1;
                  const isActive = currentStep === stepNumber;
                  return (
                    <li key={stepNumber} className={`d-flex flex-column align-items-center ${isActive ? "step-active" : ""}`}>
                      <span className={`step-circle d-flex justify-content-center align-items-center mb-3 ${isActive ? "active": ""}`}>
                        {stepNumber}
                      </span>
                      <h2 className={`fs-6 text-nowrap ${isActive? "text-brand-01" : "text-gray-03 d-none" }`}>
                        {step}
                      </h2>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

StepFlow.propTypes = {
  currentStep: PropTypes.number.isRequired
}