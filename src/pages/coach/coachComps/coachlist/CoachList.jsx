import { useEffect, useContext, useMemo} from 'react';
import { Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';






import { InputValue } from '../SearchInput';

import './CoachList.scss';

import { getallcoaches, getAllCoaches } from './coachlistSlice';



function CoachList() {

  const dispatch = useDispatch();

  const allCoaches = useSelector(getallcoaches);



  const { allValue } = useContext(InputValue);
  // const [allCoaches, setAllCoaches] = useState([]);
  

  

  useEffect(() => {
    dispatch(getAllCoaches());
  }, []);
    
  

  const filteredCoaches = useMemo(() => {
    return [...allCoaches].filter(coach => 
          (!allValue.sex || coach.sex === allValue.sex) &&
          (!allValue.charge || coach.chargeLv === allValue.charge) &&
          (!allValue.board || coach.skills.some(skill => skill === allValue.board)) &&
          (!allValue.house || coach.houses.some(house => house === allValue.house)) &&
          (!allValue.keyWord || coach.name.includes(allValue.keyWord))
        )
  },[allValue, allCoaches]);

  
  

  return (
    <div className='row row-cols-1 row-cols-sm-2 row-cols-lg-3 w-100'>
      {filteredCoaches.length <= 0 
        ? <div className='d-flex flex-column align-items-center gap-5 m-auto mt-5'>
            <h1>目前沒有符合的教練！</h1>
            <img className='w-50' src="/coach-notfound.png" alt="coach-notfound" />
          </div>
        : filteredCoaches.map((coach, index) => {

        const coachListfullStars = Math.floor(coach.rate?.stars);
        const coachListhalfStar = coach.rate?.stars % 1 !== 0;
        const coachListemptyStars = 5 - coachListfullStars - (coachListhalfStar ? 1 : 0);


        return (
          <div key={index} className='col d-flex justify-content-center coach-col'>
            <Link
              type='button'
              className='text-decoration-none p-0 border-0 text-dark rounded-5 col col-sm-10'
              to={`/${coach.id}`}
              >
              <div
                className='
                  d-flex
                  flex-column
                  justify-content-end
                  align-items-center
                  gap-2
                  rounded-5
                  m-auto
                  p-3
                  h-100
                  bg-brand-02
                  position-relative

                  co-card
                '>
                

                <div
                  className='
                    position-absolute
                    translate-middle
                    start-50
                    rounded-circle

                    co-img'
                  style={{backgroundImage: `url('${coach.profileImg}')`}}
                />


                <h2>{coach.name}</h2>

                <p>
                  {Array.from({ length: coachListfullStars }).map((_, i) => (
                    <i key={i} className="bi bi-star-fill text-warning me-1" />
                  ))}

                  {coachListhalfStar && <i className="bi bi-star-half text-warning me-1"></i>}

                  {Array.from({ length: coachListemptyStars }).map((_, i) => (
                    <i key={i} className="bi bi-star text-warning me-1" />
                  ))}
                  
                  {coach.rate.stars}({coach.rate.rateNum})
                </p>

                <p>{coach.skills}教練</p>

                <p>¥ {coach.charge} /hr 起</p>
              </div>
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default CoachList