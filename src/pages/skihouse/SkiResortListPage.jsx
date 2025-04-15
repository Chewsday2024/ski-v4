import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import './SkiHouse.scss';
import axios from 'axios';
import ResortCard from './resortComps/ResortCard';
import BackToTopButton from '../../components/BackToTopButton';

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
    const value = e.target.value;
    setResortSelect(value);
  }

  //根據所選區域篩選雪場
  const filteredSkiResorts = !resortSelect || resortSelect === "all"
    ? skiResorts
    : skiResorts.filter((resort) => resort.area.trim() === resortSelect.trim());

  return(
    <div className="container d-flex flex-column align-items-center pb-5">
      <BackToTopButton />
      <h1 className="allResort text-brand-01 fw-bolder p-3
      ">雪場總覽</h1>
      <div className="w-100 d-flex justify-content-center">
        <select value={resortSelect}
          onChange={handleChange} className="resortFormSelect form-select form-select-lg mb-3" aria-label=".form-select-lg example">
          <option value="" disabled>🔎︎ 選擇雪場地區</option>
          <option value="all">所有雪場</option>
          {areas.map((area) =>{
            return(  
              <option value={area} key={area}>{area}</option>
            )
          })}
        </select>
      </div>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
        {filteredSkiResorts.length > 0 ? (<ResortCard skiResorts={filteredSkiResorts} />) : (
          <div className="d-flex flex-column align-items-center justify-content-center">
            <img className="w-100" src="loading.gif" alt="loading" />
            <p className="fs-5 text-brand-01">loading</p>
          </div>
        )}
      </div>
    </div>
  )
}