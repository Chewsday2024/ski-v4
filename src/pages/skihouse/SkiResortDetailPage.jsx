import { useEffect, useState } from 'react';
import './SkiHouse.scss';
import axios from 'axios';
import { NavLink, useParams, useNavigate } from 'react-router';
import LevelProgressBar from './resortComps/LevelProgressBar';
import BackToTopButton from '../../components/BackToTopButton';
import AOS from "aos";
import "aos/dist/aos.css"; // 引入 AOS 的 CSS 样式
import BlurText from './resortComps/BlurText';



export default  function SkiResortDetailPage() {
  const [skiResorts, setSkiResorts] = useState({});
  const [coaches, setCoaches] = useState([]);
  const{ id } = useParams(); 
  const navigate = useNavigate();
  
  useEffect(() =>{
    const fetchResort = async(id) =>{
      try {
        const res = await axios.get(`https://ski-api-m9x9.onrender.com/skiResorts/${id}`)
        setSkiResorts(res.data);
      } catch (error) {
        alert(`Error: ${error.message}`);
      }
    };
    fetchResort(id);
  },[id])

  useEffect(() =>{
    const getCoaches = async() =>{
      try {
        const res = await axios.get(`https://ski-api-m9x9.onrender.com/coaches`)
        setCoaches(res.data);
        
      } catch (error) {
        alert(`Error: ${error.message}`);
      }
    };
    getCoaches(id);
  },[])

  AOS.init();

  //格式化tag名稱
  const formatTagName = (key) => {
    const tag = {
      isBeginnerFriendly: "初學者友善",
      isSkiInOut: "SkiInOut",
      isTouristHotel: "觀光飯店",
      isStuntPark: "特技公園",
      isWildSnowForest: "野雪樹林",
      hasNightSki: "NightSki",
      hasNaturalOnsen: "天然溫泉",
      hasChildCareServices: "托兒服務",
      hasChildPark: "親子樂園",
    };
    return tag[key] || key; 
  }

  // 根據 skiResorts.selectCoach 過濾教練
  const filteredCoaches = coaches.filter(coach => skiResorts.selectCoach?.includes(coach.id));

  const handleBookingCoach =(id) =>{
    navigate(`/${id}`);
  }
  
  const handleSeeMore = () =>{
    navigate(`/coach`);
  }





  return (
    <div className="container mt-4 ">
      <BackToTopButton />
      <div className="breadcrumb">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item text-gray-03"><NavLink to="/ski-house">雪場總覽</NavLink></li>
            <li className="breadcrumb-item text-gray-03"><NavLink to={`/ski-house?area=${encodeURIComponent(skiResorts.area)}`}>{skiResorts.area}</NavLink></li>
            <li className="breadcrumb-item active text-brand-02" aria-current="page">{skiResorts.chineseName}
            </li>
          </ol>
        </nav>
      </div>
      <img className="resortImg img-fluid vw-100 rounded object-fit-cover" data-aos="flip-left"
        src={skiResorts.image} alt={skiResorts.chineseName} />

      <div className="resortDetail ">
        <BlurText
          text={skiResorts.chineseName}
          delay={150}
          animateBy="words"
          direction="top"
          className="resortName text-center my-4 fs-1 fw-bolder pt-3 text-brand-01"
        />
        <div className="resortTag d-flex flex-wrap justify-content-center gap-2 mb-3 "
          data-aos="fade-right" data-aos-duration="2500" data-aos-delay="300">
          {Object.entries(skiResorts.tag || {}).filter(([, value]) => value).map(([key]) =>(<h2 key={key}><span className="badge border border-brand-02 text-brand-02">{formatTagName(key)}</span></h2>
            /*<button key={key} type="button" className="tagBtn btn btn-outline-brand-02 fs-6 fw-bolder">{formatTagName(key)}</button>*/
          ))}
        </div>
        <p className="my-3 fs-5 m-3" data-aos="fade-left" data-aos-duration="2500" data-aos-delay="200">{skiResorts.description}</p>
        <div className="infoRow row row-cols-2 row-cols-lg-6 gy-1 my-3">
          <div className="col" data-aos="flip-down" data-aos-duration="2500"
            data-aos-delay="100">
            <div className="card border-brand-02 mb-3 text-center" >
              <h5 className="cardHeader card-header bg-brand-02 text-light">滑雪道數量</h5>
              <div className="card-body text-dark">
                <h5 className="card-title">{skiResorts.pisteNum}</h5>
              </div>
            </div>
          </div>
          <div className="col" data-aos="flip-down" data-aos-duration="2500"
            data-aos-delay="200">
            <div className="card border-brand-02 mb-3 text-center" >
              <h5 className="cardHeader card-header bg-brand-02 text-light">纜車數量</h5>
              <div className="card-body text-dark">
                <h5 className="card-title">{skiResorts.cableCarNum}</h5>
              </div>
            </div>
          </div>
          <div className="col" data-aos="flip-down" data-aos-duration="2500"
            data-aos-delay="300">
            <div className="card border-brand-02 mb-3 text-center" >
              <h5 className="cardHeader card-header bg-brand-02 text-light">最長坡道</h5>
              <div className="card-body text-dark">
                <h5 className="card-title">{skiResorts.theLongestRamp}m</h5>
              </div>
            </div>
          </div> 
          <div className="col" data-aos="flip-down" data-aos-duration="2500"
            data-aos-delay="400">
            <div className="card border-brand-02 mb-3 text-center" >
              <h5 className="cardHeader card-header bg-brand-02 text-light">最大斜度</h5>
              <div className="card-body text-dark">
                <h5 className="card-title">{skiResorts.maxSlope}度</h5>
              </div>
            </div>
          </div>
          <div className="col" data-aos="flip-down" data-aos-duration="2500"
            data-aos-delay="500">
            <div className="card border-brand-02 mb-3 text-center" >
              <h5 className="cardHeader card-header bg-brand-02 text-light">最低海拔</h5>
              <div className="card-body text-dark">
                <h5 className="card-title">{skiResorts.lowestAltitude}m</h5>
              </div>
            </div>
          </div>
          <div className="col" data-aos="flip-down" data-aos-duration="2500"
            data-aos-delay="600">
            <div className="card border-brand-02 mb-3 text-center" >
              <h5 className="cardHeader card-header bg-brand-02 text-light">最高海拔</h5>
              <div className="card-body text-dark">
                <h5 className="card-title">{skiResorts.highestAltitude}m</h5>
              </div>
            </div>
          </div>          
        </div>
        
        <LevelProgressBar />

        <h3 className="orderCoach my-3 pt-5 text-center text-brand-01 fs-2 fw-bold" data-aos="zoom-out-up" data-aos-duration="2500" data-aos-delay="200">快來預約我們滑雪場的教練吧！</h3>
        <div className="bookingRow row row-cols-1 row-cols-lg-3 justify-content-center pt-3">
          {filteredCoaches.map(coach =>(
            <div key={coach.id} 
              className="col-md-4 d-flex justify-content-around flex-column align-items-center my-4 position-relative coachCard"
              data-aos="zoom-out-up" 
              data-aos-duration="2500" 
              data-aos-delay="200"
            >
              <div className="imgWrapper position-relative">
                <img 
                  src={coach.profileImg} 
                  className="coachProfileImg img-fluid rounded-circle object-fit-cover mb-3" 
                  alt={coach.name} 
                  style={{ height: "200px", width: "200px"}} 
                />
                <div className="coachNameOverlay position-absolute start-50 translate-middle-x">
                  {coach.name}
                </div>
              </div>
              <button 
                onClick={() => handleBookingCoach(coach.id)}
                type="button" 
                className="orderCoachBtn btn btn-brand-01 rounded-5 fs-5" 
                style={{ width: "150px" }}
              >
                預約教練
              </button>
            </div>
          ))}
          <button onClick={handleSeeMore}
            type="button" className="seeMore btn btn-outline-brand-01 rounded-5 m-5
          text-center fs-4 fw-bold" data-aos="zoom-out-down" data-aos-duration="2500" data-aos-delay="200" style={{width: "200px"}}>查看更多<span className="material-symbols-outlined align-bottom ms-3 mb-1">arrow_circle_right</span></button>
        </div>
      </div>
    </div>
  )
}