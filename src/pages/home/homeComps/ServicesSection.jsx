import AOS from 'aos';
import 'aos/dist/aos.css'; 
AOS.init();

import './homeComps.scss'

function ServicesSection() {
  
  const services = [
    {
      icon: "accessibility_new", 
      title: "個性化教學",
      describe: "根據學員的水平與需求量身定制課程，讓學習更高效且充滿樂趣"
    },{
      icon: "trending_up", 
      title: "技術提升",
      describe: "教練熟悉雪場環境，能確保學員在滑雪過程中的安全，降低意外風險"
    },{
      icon: "health_and_safety", 
      title: "安全保障",
      describe: "專業教練能指導正確的滑雪技巧，幫助快速進步並避免錯誤習慣" 
    }
  ]

  return (
    <section className="services container my-3">
        <div className="d-flex flex-column justify-content-center align-items-center border border-gray-03 rounded-5 p-5">
          <div className="border-1 border-bottom border-gray-03 mb-5 w-md-50">
            <h3 className="text-center text-brand-01 pb-4">我們提供的服務</h3>
          </div>
          <div className="d-flex flex-column flex-md-row justify-content-between gap-5">
            { services.map((item) => {
              return (          
                <div key={item.title} className="d-flex flex-column" 
                  data-aos="flip-left"
                  data-aos-duration="800">
                  <span className="material-symbols-outlined align-bottom text-center mb-4">{item.icon}</span>
                  <div className="text-center mt-2">
                    <h4 className="mb-4">{item.title}</h4>
                    <p className="text-gray-01">{item.describe}</p>
                  </div>
                </div>)
                })
                }
          </div>
        </div>
      </section>
  )
}

export default ServicesSection;