import { useEffect, useState } from 'react';
import './SkiHouse.scss';
import axios from 'axios';
import { NavLink, useParams, useNavigate  } from 'react-router';



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
        console.log("教練數據:", res.data);
        
      } catch (error) {
        alert(`Error: ${error.message}`);
      }
    };
    getCoaches();
  },[])

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
            <button type="button" className="tagBtn btn btn-outline-brand-02 fs-6 fw-bolder">Skin&Out</button>
            <button type="button" className="tagBtn btn btn-outline-brand-02 fs-6 fw-bolder">觀光設施</button>
            <button type="button" className="tagBtn btn btn-outline-brand-02 fs-6 fw-bolder">特殊公園</button>
            <button type="button" className="tagBtn btn btn-outline-brand-02 fs-6 fw-bolder">野雪樹林</button>
            <button type="button" className="tagBtn btn btn-outline-brand-02 fs-6 fw-bolder">NightSki</button>
            <button type="button" className="tagBtn btn btn-outline-brand-02 fs-6 fw-bolder">NightSki</button>
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
          
          <h5 className="pisteLevel my-3 text-center fs-2 fw-bold">雪道分級</h5>
          <div className="progress m-3" style={{height: "30px"}}>
            <div className="progress-bar progress-bar-striped bg-success" role="progressbar" style={{ width: `${skiResorts.pisteClassification?.beginner}%` }} 
    aria-valuenow={skiResorts.pisteClassification?.beginner} aria-valuemin="0" aria-valuemax="100"></div>
            <div className="progress-bar progress-bar-striped bg-warning" role="progressbar" style={{ width: `${skiResorts.pisteClassification?.intermediate}%` }} 
    aria-valuenow={skiResorts.pisteClassification?.intermediate} aria-valuemin="0" aria-valuemax="100"></div>
            <div className="progress-bar progress-bar-striped bg-danger" role="progressbar" style={{ width: `${skiResorts.pisteClassification?.advanced}%` }} 
    aria-valuenow={skiResorts.pisteClassification?.advanced} aria-valuemin="0" aria-valuemax="100"></div>
          </div>


          <div className="progress m-3" style={{height: "30px"}}>
            <div className="progressText progress-bar bg-white text-dark fs-5" role="progressbar" style={{ width: `${skiResorts.pisteClassification?.beginner}%` }} 
    aria-valuenow={skiResorts.pisteClassification?.beginner} aria-valuemin="0" aria-valuemax="100">{skiResorts.pisteClassification?.beginner}% 初級</div>
            <div className="progressText progress-bar bg-white text-dark fs-5" role="progressbar" style={{ width: `${skiResorts.pisteClassification?.intermediate}%` }} 
    aria-valuenow={skiResorts.pisteClassification?.intermediate} aria-valuemin="0" aria-valuemax="100">{skiResorts.pisteClassification?.intermediate}% 中級</div>
            <div className="progressText progress-bar bg-white text-dark fs-5" role="progressbar" style={{ width: `${skiResorts.pisteClassification?.advanced}%` }} 
    aria-valuenow={skiResorts.pisteClassification?.advanced} aria-valuemin="0" aria-valuemax="100">{skiResorts.pisteClassification?.advanced}% 高級</div>
          </div>


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