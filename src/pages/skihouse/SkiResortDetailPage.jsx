import { useEffect, useState } from 'react';
import './SkiHouse.scss';
import axios from 'axios';
import { NavLink, useParams, useNavigate  } from 'react-router';
import LevelProgressBar from './resortComps/LevelProgressBar';



export default  function SkiResortDetailPage() {
  const [skiResorts, setSkiResorts] = useState({});
  const [coaches, setCoaches] = useState([]);
  const{ id } = useParams(); 
  const navigate = useNavigate();
  
  useEffect(() =>{
    const fetchResort = async(id) =>{
      try {
        const res = await axios.get(`http://localhost:3000/skiResorts/${id}`)
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
        const res = await axios.get(`http://localhost:3000/coaches`)
        setCoaches(res.data);
        
      } catch (error) {
        alert(`Error: ${error.message}`);
      }
    };
    getCoaches();
  },[])

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
    navigate(`/coach/${id}`);
  }
  
  const handleSeeMore = () =>{
    navigate(`/coach`);
  }





  return (
    <>
      <div className="container mt-4">
        <div className="breadcrumb">
          <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><NavLink to="/ski-house">雪場總覽</NavLink></li>
                <li className="breadcrumb-item"><NavLink to={`/ski-house?area=${encodeURIComponent(skiResorts.area)}`}>{skiResorts.area}</NavLink></li>
                <li className="breadcrumb-item active" aria-current="page">{skiResorts.chineseName}
                </li>
              </ol>
          </nav>
        </div>
        <img className="resortImg img-fluid vw-100  rounded object-fit-cover"
        src={skiResorts.image} alt={skiResorts.chineseName} />

        <div className="resortDetail ">
          <h1 className="resortName text-center my-4 fs-1 fw-bolder">{skiResorts.chineseName}</h1>
          <div className="resortTag d-flex flex-wrap justify-content-center gap-2 mb-3">
            {Object.entries(skiResorts.tag || {}).filter(([_, value]) => value).map(([key]) =>(<button key={key} type="button" className="tagBtn btn btn-outline-brand-02 fs-6 fw-bolder">{formatTagName(key)}</button>
            ))}
            
        </div>
          <p className="my-3 fs-5">{skiResorts.description}</p>
          <div className="row row-cols-2 row-cols-lg-6 gy-1 my-3">
            <div className="col">
            <div className="card border-brand-02 mb-3 text-center" >
              <h5 className="cardHeader card-header bg-brand-02 text-light">滑雪道數量</h5>
              <div className="card-body text-dark">
                <h5 className="card-title">{skiResorts.pisteNum}</h5>
              </div>
            </div>
            </div>
            <div className="col">
            <div className="card border-brand-02 mb-3 text-center" >
              <h5 className="cardHeader card-header bg-brand-02 text-light">纜車數量</h5>
              <div className="card-body text-dark">
                <h5 className="card-title">{skiResorts.cableCarNum}</h5>
              </div>
            </div>
            </div>
            <div className="col">
            <div className="card border-brand-02 mb-3 text-center" >
              <h5 className="cardHeader card-header bg-brand-02 text-light">最長坡道</h5>
              <div className="card-body text-dark">
                <h5 className="card-title">{skiResorts.theLongestRamp}m</h5>
              </div>
            </div>
            </div> 
            <div className="col">
            <div className="card border-brand-02 mb-3 text-center" >
              <h5 className="cardHeader card-header bg-brand-02 text-light">最大斜度</h5>
              <div className="card-body text-dark">
                <h5 className="card-title">{skiResorts.maxSlope}度</h5>
              </div>
            </div>
            </div>
            <div className="col">
            <div className="card border-brand-02 mb-3 text-center" >
              <h5 className="cardHeader card-header bg-brand-02 text-light">最低海拔</h5>
              <div className="card-body text-dark">
                <h5 className="card-title">{skiResorts.lowestAltitude}m</h5>
              </div>
            </div>
            </div>
            <div className="col">
            <div className="card border-brand-02 mb-3 text-center" >
              <h5 className="cardHeader card-header bg-brand-02 text-light">最高海拔</h5>
              <div className="card-body text-dark">
                <h5 className="card-title">{skiResorts.highestAltitude}m</h5>
              </div>
            </div>
            </div>          
          </div>
          
          <LevelProgressBar />


          <h3 className="orderCoach my-3 pt-5 text-center fs-2 fw-bold">快來預約我們滑雪場的教練吧！</h3>
          <div className="row row-cols-1 row-cols-lg-3 justify-content-center pt-3">
              {filteredCoaches.map(coach =>(
                <div key={coach.id} className="col-md-4 d-flex justify-content-around flex-column align-items-center my-4">
                <img src={coach.profileImg} className="img-fluid rounded-circle object-fit-cover  mb-3" alt={coach.name} style={{height:"200px", width:"200px"}} />
                <button onClick={handleBookingCoach}
                type="button" className="orderCoachBtn btn btn-brand-01 rounded-5 fs-5" style={{width: "150px"}}>預約教練</button>
              </div>
            ))}
            <button onClick={handleSeeMore}
            type="button" className="seeMore btn btn-outline-brand-01 rounded-5 m-5
            text-center fs-4 fw-bold" style={{width: "200px"}}>查看更多<span className="material-symbols-outlined align-bottom ms-3 mb-1">arrow_circle_right</span></button>
          </div>
        </div>

      </div>
    </>
  )
}