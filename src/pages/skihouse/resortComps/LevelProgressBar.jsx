import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../skihouse/SkiHouse.scss';
import { useParams } from 'react-router';
import Swal from "sweetalert2";

export default function LevelProgressBar(){
  const [skiResorts, setSkiResorts] = useState({});
  const{ id } = useParams(); 

  useEffect(() =>{
    const fetchResort = async(id) =>{
      try {
        const res = await axios.get(`https://ski-api-m9x9.onrender.com/skiResorts/${id}`)
        setSkiResorts(res.data);
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: "取得雪道分級資料失敗",
          icon: "error",
          confirmButtonText: "確定"
        });
      }
    };
    fetchResort(id);
  },[id])
  
  return(
    <div data-aos="fade-up" data-aos-duration="2500" data-aos-delay="200">
      <h5 className="pisteLevel my-3 text-center text-brand-01 fs-2 fw-bold pt-5">雪道分級</h5>
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
    </div>
  )
}