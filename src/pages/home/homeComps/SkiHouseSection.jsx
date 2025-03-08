import AOS from 'aos';
import 'aos/dist/aos.css'; 
AOS.init();
import './homeComps.scss'

import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from 'react-router';

function SkiHouseSection() {
  const [skiHouse , setSkiHouse] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get('http://localhost:3000/skiResorts');
        setSkiHouse(res.data)
      } catch (error) {
        alert(`Error: ${error.message}`);
      }
    };
    getData();
  }, []);

  return (<>
    <section className="container d-flex flex-column mb-xxl">
        <div className="align-self-center border-1 border-bottom border-gray-03 w-50 mb-5">
          <h3 className="text-center text-brand-01 pb-4">推薦雪場</h3>
        </div>
        <div>
          <div className="d-flex flex-column flex-md-row justify-content-around align-items-center mt-4">
          {
            skiHouse.slice(0, 3).map((item, index) => {
              return (
                <div className="card border-0 bg-gray-05 position-relative w-md-25 w-75" key={item.id} 
                  data-aos="fade-up"
                  data-aos-easing="linear"
                  data-aos-duration="800">
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-brand-02 fs-6 fw-normal p-3">{item.area}</span>
                  <img src={item.image} className="card-img-top rounded-bottom" alt={item.englishName} />
                  <div className="card-body p-3 mb-2">
                  <h5 className="mt-1 mb-3">{item.chineseName}</h5>
                  <p className="card-text" style={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    height: "3rem"
                  }}>
                    {item.description}
                  </p>
                  </div>
                </div>
              );
            })
          }
          </div>
        </div>
        <div className="text-center mt-5">
          <Link to="/" className="btn btn-outline-brand-01 home-btn-hover bg-white rounded-pill fs-4 fw-bold px-middle py-3 z-3"><span className="material-symbols-outlined icon-unfill align-bottom me-3 mb-1">arrow_circle_right</span>查看更多雪場</Link>
        </div>
      </section>
  </>)
}

export default SkiHouseSection;