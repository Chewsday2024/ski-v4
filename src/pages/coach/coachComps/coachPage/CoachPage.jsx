import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import listPlugin from "@fullcalendar/list";
import { useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';




import { getCoach, getIsMarkStatus, getOneCoach, setIsMark } from './coachpageSlice';


import './CoachPage.scss';




function CoachPage () {

  const calendarRef = useRef();

  const dispatch = useDispatch();

  const isMark = useSelector(getIsMarkStatus);

  const coach = useSelector(getCoach);

  const { id } = useParams();


  





  const fullStars = Math.floor(coach.rate?.stars);
  const halfStar = coach.rate?.stars % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);





  useEffect(() => {
    dispatch(getOneCoach(id));
  }, [dispatch, id]);




  const openCalendar = () => {
      calendarRef.current.getApi().updateSize();
    }




  return (
    <div className='bg-gray-05'>
      <div className='container mt-3'>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className='breadcrumb-item'>
              <Link className='text-gray-03 coach-page-breadcrumb' to="/coach">教練介紹</Link>
            </li>
            
            <li className="breadcrumb-item text-brand-02">
              {coach.name}
            </li>
          </ol>
        </nav>

        <div className="row row-cols-1 m-auto mt-3  page-box">
          <div className="col ">
            <div className='profile-col'>
              <div className="d-sm-flex m-auto gap-4 h-100 coach-profile-container">
                <div className='position-relative'>
                  <img
                    className='w-100  rounded-4  coach-profile-img'
                    src={coach.profileImg}
                    
                    />
                      
                    <i
                      onClick={() => dispatch(setIsMark())}
                      className={`
                        bi
                        ${ isMark ? 'bi-bookmark-fill' : 'bi-bookmark'}
                        fs-3
                        position-absolute

                        coach-bookmark
                      `} 
                    />
                </div>

                <ul className="d-flex flex-column justify-content-between gap-3 gap-sm-0 p-0 m-0 mt-3 mt-sm-0 w-100 list-unstyled coach-profile-list">
                  <li>
                    <h1 className='fw-bold'>{coach.name}</h1>
                  </li>

                  <li className='d-flex gap-3'>
                    <p className='bg-brand-02 text-white px-2 rounded-1'>類型</p>
                    <p className='fw-bold'>
                      {coach.skills?.map((skill, index) => (
                        <span key={index}>
                          {skill}{index !== coach.skills.length - 1 && " , "}
                        </span>
                      ))}
                    </p>
                  </li>

                  <li className='d-flex gap-3'>
                    <p className='bg-brand-02 text-white px-2 rounded-1'>性別</p>
                    <p className='fw-bold'>{coach.sex}</p>
                  </li>

                  <li className='d-flex gap-3'>
                    <p className='bg-brand-02 text-white px-2 rounded-1'>證照</p>
                    <p className='fw-bold'>證照等級 {coach.LV}</p>
                  </li>

                  <li className='d-flex gap-3'>
                    <p className='bg-brand-02 text-white px-2 rounded-1'>語言</p>

                    <p className='fw-bold'>
                      {coach.lang?.map((lang, index) => (
                        <span key={index}>
                          {lang}{index !== coach.lang.length - 1 && " / "}
                        </span>
                      ))}
                    </p>
                  </li>

                  <li className='d-flex gap-3'>
                    <p className='bg-brand-02 text-white px-2 rounded-1'>評價</p>
                    <p className='fw-bold'>
                      {Array.from({ length: fullStars }).map((_, i) => (
                        <i key={i} className="bi bi-star-fill text-brand-02 me-1" />
                      ))}

                      {halfStar && <i className="bi bi-star-half text-brand-02 me-1"></i>}

                      {Array.from({ length: emptyStars }).map((_, i) => (
                        <i key={i} className="bi bi-star text-brand-02 me-1" />
                      ))}

                      {coach.rate?.stars} ({coach.rate?.rateNum})
                    </p>
                  </li>

                  <li>
                    <p className='fw-bold d-inline'>JPY <span className='fs-2 mx-2'>{coach.charge?.toLocaleString()}</span> /hr 起</p>
                  </li>

                  <li>
                    <Link
                      className='
                      fw-bold
                      border-2
                      border-brand-01
                      rounded-pill
                      btn
                      
                      order-coach
                      '
                      to='/booking'>
                        預約教練
                    </Link>
                  </li>

                </ul>
              </div>

              <ul className='d-flex gap-3 text-gray-02 list-unstyled tag-ul'>
                {coach.tag?.map(tag => <li key={tag}>#{tag}</li>)}
              </ul>
            </div>
            

          </div>



          <hr className='my-5' />



          <div className='col about-coach-col'>
            <ul className="nav row row-cols-2 row-cols-md-5 g-4 m-auto mb-5 text-center">
              <li className='col'>
                <a className="active coach-detail-tab" data-bs-toggle="tab" href="#member">會員中心</a>
              </li>

              <li className='col'>
                <a className="coach-detail-tab" onClick={openCalendar} data-bs-toggle="tab" href="#classes">預約課表</a>
              </li>

              <li className='col'>
                <a className="coach-detail-tab" data-bs-toggle="tab" href="#exp">教練經歷</a>
              </li>

              <li className='col'>
                <a className="coach-detail-tab" data-bs-toggle="tab" href="#license">教練證照</a>
              </li>

              <li className='col'>
                <a className="coach-detail-tab" data-bs-toggle="tab" href="#photo">教學日常</a>
              </li>
            </ul>


            <div className="tab-content mt-3">
              <div id="member" className="tab-pane bg-white rounded-4 active tab-p">
                <h6 className='lh-base'>
                  &emsp;&emsp;{coach.description}
                </h6>
              </div>

              <div id="classes" className="tab-pane fade">
                <FullCalendar
                  ref={calendarRef}
                  plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin, bootstrap5Plugin]}
                  headerToolbar={{
                    left: "prev,next",
                    center: "title",
                    right: "today",
                  }}
                  events={coach.teachingSchedule}
                  eventBackgroundColor='rgb(4, 59, 107)'
                  aspectRatio={window.innerWidth < 768 ? 1 : 1.8}
                />
              </div>

              <div id="exp" className="tab-pane bg-white rounded-4 tab-p fade">
                
                
                <ul className='d-flex flex-column gap-2 m-0 exp-ul'>
                  <li className='list-unstyled'>
                    <h4 className='text-brand-01'>教練經歷</h4>
                  </li>

                  {coach.exp?.map(exp => <li key={exp}><h6 className='d-inline'>{exp}</h6></li>)}
                </ul>
              </div>




              <div id="license" className="tab-pane fade">
                <div className='d-flex flex-column flex-sm-row gap-3'>
                  {coach.license?.map(license => {
                    return (
                      <div key={license.licenseName} className='d-flex flex-column justify-content-center align-items-center gap-3'>
                        <img src={license.licenseImg} className='w-100' alt="#" />

                        <h3>{license.licenseName}</h3>
                      </div>
                    )
                  })}
                </div>
              </div>





              <div id="photo" className="tab-pane fade">
                <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-2'>
                  {coach.img?.map((img, index) => {
                    return (
                      <div key={index} className='col daily-imges-col'> 
                        <img src={img} className='w-100 h-100 daily-imges' alt="#" />
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>


          <div className='col mt-5'>
            <h3 className='text-center fw-bold mb-4'>學員評價</h3>

            <ul className='mt-3 list-unstyled'>
              {coach.reviews?.map(review => {
                const reviewfullStars = Math.floor(review.student.rate);
                const reviewhalfStar = review.student.rate % 1 !== 0;
                const reviewemptyStars = 5 - reviewfullStars - (reviewhalfStar ? 1 : 0);


                return (
                  <li key={review.id} className='d-flex flex-column gap-3 bg-white p-3 mb-4 rounded-4'>
                    <p>
                      {Array.from({ length: reviewfullStars }).map((_, i) => (
                        <i key={i} className="bi bi-star-fill text-brand-02 me-1" />
                      ))}

                      {reviewhalfStar && <i className="bi bi-star-half text-brand-02 me-1" />}

                      {Array.from({ length: reviewemptyStars }).map((_, i) => (
                        <i key={i} className="bi bi-star text-brand-02 me-1" />
                      ))}
                    </p>

                    <div className='d-flex flex-column gap-3'>
                      <h4>{review.student.comment}</h4>

                      <div className='d-flex align-items-center gap-3'>
                        <div className='rounded-circle rate-profileImg' style={{backgroundImage: `url(${review.student.profileImg})`}}></div>

                        <div>
                          <p>{review.student.name}<span className='ms-3 bg-brand-02 text-white py-1 px-3 rounded-3'>學員</span></p>

                          <p className='mt-3 text-gray-03'>2025/12/25</p>
                        </div>
                      </div>
                    </div>

                    <div className='d-flex flex-column gap-3 border-start border-error ps-3'>
                      <p className='text-gray-03'>教練回覆</p>

                      <h3>{review.response.comment}</h3>

                      <div className='d-flex align-items-center gap-3'>
                        <div className='rounded-circle rate-profileImg' style={{backgroundImage: `url(${coach.profileImg})`}}></div>

                        <div>
                          <p>{coach.name}<span className='ms-3 bg-error text-white py-1 px-3 rounded-3'>教練</span></p>

                          <p className='mt-3 text-gray-03'>2025/12/25</p>
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachPage;