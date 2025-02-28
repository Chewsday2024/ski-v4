import { useState, useEffect, useContext, useMemo} from 'react';
import { Link } from 'react-router';
import axios from 'axios';





import { InputValue } from '../SearchInput';

import './CoachList.scss';



function CoachList() {
  const { allValue } = useContext(InputValue);
  const [allCoaches, setAllCoaches] = useState([]);
  

  

  useEffect(() => {
    try {
      (async () => {
        const coachesData = (await axios.get('http://localhost:3000/coaches')).data;

        setAllCoaches(coachesData);
      })();
    } catch (err) {
      console.log(err);
    };
  }, []);
    
  

  const filteredCoaches = useMemo(() => {
    return [...allCoaches].filter(coach => 
          (!allValue.sex || coach.sex === allValue.sex) &&
          (!allValue.charge || coach.feeLv === allValue.charge) &&
          (!allValue.board || coach.skills.some(skill => skill === allValue.board)) &&
          (!allValue.house || coach.houses.some(house => house === allValue.house)) &&
          (!allValue.keyWord || coach.name.includes(allValue.keyWord))
        )
  },[allValue, allCoaches]);

  
  

  return (
    <div className='row row-cols-3 w-100 g-3 mt-1'>
      {filteredCoaches.map((coach, index) => {
        return (
          <div key={index} className='col d-flex justify-content-center text-white coach-col'>
            <Link type='button' className='btn d-flex justify-content-center p-0 border-0 coach-btn' to={String(coach.id)}>
              <div className='d-flex flex-column gap-2 border border-0 rounded-5 w-100 bg-brand-02 position-relative co-card'>
                <img src={coach.profileImg} className='position-absolute translate-middle start-50 co-img' alt="#" />
                <h2>{coach.name}</h2>
                <p>⭐⭐⭐{coach.rate.stars}({coach.rate.rateNum})</p>
                <p>{coach.skills}教練</p>
                <p>{coach.charge} /hr 起</p>
              </div>
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default CoachList