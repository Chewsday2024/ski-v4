import { useEffect, useState } from 'react';

import { useLocation } from 'react-router';
import './SkiHouse.scss';
import axios from 'axios';
import ResortCard from './resortComps/ResortCard';




export default function SkiResortListPage() {
  const [skiResorts, setSkiResorts] = useState([]); 
  const [resortSelect, setResortSelect]= useState("");
  const areas = ["北海道", "東北", "新潟", "長野"];
  const location = useLocation();

  //分析 URL 篩選出該區域雪場
  useEffect(() =>{
    const sameAreaResort = new URLSearchParams(location.search);
    const areaFromURL = sameAreaResort.get("area");
    if (areaFromURL){
      setResortSelect(areaFromURL);
    }
  },[location.search]);

  useEffect(() =>{
    const getSkiResorts = async() =>{
      try {
        const res = await axios.get('https://ski-api-m9x9.onrender.com/skiResorts');
        setSkiResorts(res.data);
      } catch (error) {
        alert(`Error: ${error.message}`)
      }
    };
    getSkiResorts();
  },[]);

  const handleChange =(e) =>{
    setResortSelect(e.target.value);
    
  }

  //根據所選區域篩選雪場
  const filteredSkiResorts = resortSelect ?skiResorts.filter((resort) => resort.area.trim() === resortSelect.trim()) : skiResorts;

  return(
    <>
      <div className="container d-flex flex-column align-items-center">
        <div className="w-100 d-flex justify-content-center">
          <select value={resortSelect}
          onChange={handleChange} className="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
            <option value="" disabled>🔎︎ 搜尋雪場</option>
            {areas.map((area) =>{
              return(  
                <option value={area} key={area}>{area}</option>
              )
            })}
          </select>
        </div>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mx-0 overflow-hidden">
        {filteredSkiResorts.length > 0 ? (<ResortCard skiResorts={filteredSkiResorts} />) : (
            <p className="text-center">❄️ 找不到符合條件的雪場 ❄️</p>
          )}
        </div>
      </div>
      
    </>
  )
}