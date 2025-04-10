import PropTypes from 'prop-types';
import '../../skihouse/SkiHouse.scss';
import { useNavigate } from 'react-router';



export default function ResortCard({ skiResorts }) {
  const navigate = useNavigate();

  const handleClick = (id) =>{
    navigate(`/ski-house/${id}`);
  }


  return(
    <>
      {skiResorts.map((skiResort) => (
        <div key={skiResort.id}
          className="col"
          onClick={() =>handleClick(skiResort.id)}>
          <div className="resortCard card my-3 border border-3">
            <span className="label bg-brand-02 text-white text-center text-brand-01 fs-5">
              {skiResort.area}
            </span>
            <img
              className="card-img-top rounded-top"
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

// 加入 PropTypes 驗證
ResortCard.propTypes = {
  skiResorts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      area: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      chineseName: PropTypes.string.isRequired,
    })
  ).isRequired,
};