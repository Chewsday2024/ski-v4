import { useSelector } from "react-redux";
import { Link } from "react-router";



import { getFavorites } from "../coachPage/coachpageSlice";


import './FavoritePage.scss';


function FavoritePage () {
  const favorites = useSelector(getFavorites);

  return (
    <div className="container py-5">
      <h1 className={`text-center text-brand-01 ${favorites.length <= 0 ? 'd-none' : 'd-block'}`}>
        收藏的教練
      </h1>

      <div className='row row-cols-1 row-cols-sm-2 row-cols-lg-3 w-100 mb-5'>
        {favorites.length <= 0 
          ? <div className='d-flex flex-column align-items-center gap-5 m-auto mt-5'>
            <h1 className="text-brand-01">目前沒有收藏的教練！</h1>
            <img className='w-50' src="no-favorites.png" alt="coach-notfound" />
          </div>
          : favorites.map((coach) => {

            const coachListfullStars = Math.floor(coach.rate?.stars);
            const coachListhalfStar = coach.rate?.stars % 1 !== 0;
            const coachListemptyStars = 5 - coachListfullStars - (coachListhalfStar ? 1 : 0);


            return (
              <div key={coach.id} className='col d-flex justify-content-center favoritePage-col'>
                <Link
                  type='button'
                  className='text-decoration-none p-0 border-0 text-dark rounded-5 col col-sm-10'
                  to={`/coach/${coach.id}`}
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

                    <p>¥ {coach.charge.toLocaleString()} /hr 起</p>
                  </div>
                </Link>
              </div>
            )})
        }
      </div>
    </div>
  );
};

export default FavoritePage;