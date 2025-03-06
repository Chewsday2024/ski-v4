import { useState } from 'react';
import { Link } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css'
import './homeComps.scss'

function SwiperSection() {
  const [coaches] = useState([
    {
      id: 1,
      name: "Rocky Wang",
      image: "https://firebasestorage.googleapis.com/v0/b/homework-b5f67.appspot.com/o/skiing-coach-1.png?alt=media&token=ce325143-e55e-4ff1-a967-b3c398a1c745",
      description: "充滿活力的滑雪教練，用速度與挑戰點燃你的滑雪熱情，讓你越滑越快、越玩越嗨！",
      skills: ["單板","雙板"],
      place: "輕井澤王子飯店滑雪場"
    },
    {
      id: 2,
      name: "Luna Chen",
      image: "https://firebasestorage.googleapis.com/v0/b/homework-b5f67.appspot.com/o/skiing-coach-2.png?alt=media&token=2821bb5b-f26b-4b7a-9d7b-abf8a8a09640",
      description: "細心又有耐心的滑雪教練，專門幫助初學者建立自信，讓你優雅自在地享受滑雪！",
      skills: ["雙板"],
      place: "北海道二世谷滑雪場"
    },
    {
      id: 3,
      name: "Dash Liu",
      image: "https://firebasestorage.googleapis.com/v0/b/homework-b5f67.appspot.com/o/skiing-coach-3.png?alt=media&token=e3838116-e08e-4439-9c8b-8102501fa699",
      description: "穩扎穩打的滑雪教練，專長提升技巧與穩定性，讓你在雪道上更自信、更安全！",
      skills: ["單板"],
      place: "八甲田滑國際雪場滑雪場"
    },
    {
      id: 4,
      name: "Rocky Wang",
      image: "https://firebasestorage.googleapis.com/v0/b/homework-b5f67.appspot.com/o/skiing-coach-1.png?alt=media&token=ce325143-e55e-4ff1-a967-b3c398a1c745",
      description: "充滿活力的滑雪教練，用速度與挑戰點燃你的滑雪熱情，讓你越滑越快、越玩越嗨！",
      skills: ["單板","雙板"],
      place: "輕井澤王子飯店滑雪場"
    },
    {
      id: 5,
      name: "Luna Chen",
      image: "https://firebasestorage.googleapis.com/v0/b/homework-b5f67.appspot.com/o/skiing-coach-2.png?alt=media&token=2821bb5b-f26b-4b7a-9d7b-abf8a8a09640",
      description: "細心又有耐心的滑雪教練，專門幫助初學者建立自信，讓你優雅自在地享受滑雪！",
      skills: ["雙板"],
      place: "北海道二世谷滑雪場"
    },
    {
      id: 6,
      name: "Dash Liu",
      image: "https://firebasestorage.googleapis.com/v0/b/homework-b5f67.appspot.com/o/skiing-coach-3.png?alt=media&token=e3838116-e08e-4439-9c8b-8102501fa699",
      description: "穩扎穩打的滑雪教練，專長提升技巧與穩定性，讓你在雪道上更自信、更安全！",
      skills: ["單板"],
      place: "八甲田滑國際雪場滑雪場"
    }
   ])
  
  return (
    <>
    <div className="mt-xxl mb-xxl py-5" style={{background:"url('https://firebasestorage.googleapis.com/v0/b/homework-b5f67.appspot.com/o/homeSection3-bg.png?alt=media&token=99efd315-41d3-433c-8c2e-66bf9af483eb') no-repeat center center/cover"}}>
      <div className="container">
        <div className="row flex-column flex-md-row overflow-hidden">
          <div className="col-md-4 d-flex flex-column justify-content-center text-white ms-2 ms-md-0">
            <div className="mb-3">
                <h1 className="bg-brand-01 d-inline-block px-2 py-1 border-2 border-bottom border-white">預約專屬教練</h1>
            </div>
            <div>
                <h2 className="h1 bg-brand-01 d-inline-block px-2 py-1 border-2 border-bottom border-white">解鎖滑雪新玩法</h2>
            </div>
          </div>
          <div className="col-md-8 px-0">
            <section className="text-center my-5 swiper-container" style={{ overflow: 'visible' }}>
              <Swiper
               modules={[Autoplay]}
               slidesPerView={3}
               spaceBetween={30}
               autoplay={{
                delay: 2500
              }}
              breakpoints={{
                1200: { slidesPerView: 3 },
                573: { slidesPerView: 2 },
                0: { slidesPerView: 1 } 
              }}
              loop={true}
              slidesOffsetAfter={500}
              className="d-flex">
                {
                  coaches.map(item => (
                    <SwiperSlide className="" key={item.id}>
                      <div className="card bg-white bg-opacity-75 border-0 mb-3">
                        <div className="card-body text-start">
                          <h5 className="card-title h2">{item.name}</h5>
                          <p className="card-text">{item.place}</p>
                          <p className="card-text">
                            <small className="text-body-secondary">
                            {item.skills[0]}
                            {item.skills.length > 1 ? ` / ${item.skills[1]}` : ""}</small>
                          </p>
                        </div>
                        <img src={item.image} className="card-img-top rounded-end" alt="..." />
                      </div>
                    </SwiperSlide>
                  ))
                }
              </Swiper>
              
            </section>
          </div>
        </div>
        <div className="text-center mt-3">
          <Link to="/" className="btn btn-outline-brand-01 home-btn-hover bg-white rounded-pill fs-4 fw-bold px-middle py-3 z-3"><span className="material-symbols-outlined icon-unfill align-bottom me-3 mb-1">arrow_circle_right</span>找到最適合你的滑雪教練</Link>
        </div>
      </div>
    </div>
    </>
  )
}

export default SwiperSection;