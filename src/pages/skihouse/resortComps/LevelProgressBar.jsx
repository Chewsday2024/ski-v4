import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../skihouse/SkiHouse.scss';
import { useParams } from 'react-router';

export default function(){
  const [skiResorts, setSkiResorts] = useState({});
  const{ id } = useParams(); 

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

  return(
    <>
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
    </>
  )
}