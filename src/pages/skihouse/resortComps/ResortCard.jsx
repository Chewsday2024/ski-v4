import '../../skihouse/SkiHouse.scss';
import { Navigate, useNavigate } from 'react-router';


export default function ResortCard({skiResorts}) {
  const navigate = useNavigate();

  const handleClick = () =>{
    navigate(`/ski-house/{id}`)
  }


  return(
    <>
      {skiResorts.map((skiResort) => (
        <div key={skiResort.id}
        className="col d-flex justify-content-center"
        onClick={() =>handleClick(skiResort.id)}>
          <div className="resortCard card my-3">
            <span className="label bg-brand-02 text-white text-center text-brand-01 fs-5">
              {skiResort.area}
            </span>
            <img
              className="card-img-top"
              src={skiResort.image}
              alt={skiResort.chineseName}
            />
            <div className="card-body">
              <p className="card-text text-center text-brand-01 fs-4 fw-bolder">
                {skiResort.chineseName}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}