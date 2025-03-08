import { useState, useEffect, useRef, createRef } from 'react';
import { Link } from 'react-router';
import { CSSTransition } from "react-transition-group";

import './homeComps.scss'

const images = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1730128270068-2fa777dc20a8?q=80&w=2941&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1617939533073-6c94c709370c?q=80&w=3872&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1507534192483-69914c0692d7?q=80&w=2748&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1733165152829-24fc83913eb2?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }
];

function BannerSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const nodeRefs = useRef(images.map(() => createRef()));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3800);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="banner position-relative overflow-hidden">
      {images.map((image, index) => (
        <div key={image.id}>
        <CSSTransition
          in={currentImageIndex === index}
          timeout={3500} // 過渡時間
          classNames="slideshow-image" // 使用統一的類名前綴
          unmountOnExit
          nodeRef={nodeRefs.current[index]}
        >
          <div
            ref={nodeRefs.current[index]}
            className="slideshow-image"
            style={{
              backgroundImage: `url(${image.image})`,
              zIndex: index,
            }}
          />
          
        </CSSTransition>
        <img
        src="https://firebasestorage.googleapis.com/v0/b/homework-b5f67.appspot.com/o/Rectangle%2030.svg?alt=media&token=54561703-cab9-4812-8483-019b85bb0cdc"
        alt="overlay"
        className="position-absolute bottom-0 start-0 w-100 z-3"
      />
      </div>
      ))}

      {/* 深色遮罩 */}
      <div
        className="position-absolute top-0 end-0 start-0 bottom-0 z-1"
        style={{
          background: "rgba(28, 28, 28, 0.3)",
        }}
      ></div>

      <div className='container text-white d-flex flex-column justify-content-center vh-100'>
        <div className="mb-3 z-3" data-aos="fade-right">
          <h1 className="text-lg bg-brand-01 d-inline-block px-2 py-1 border-2 border-bottom border-white typing-effect">想滑雪？</h1>
        </div>
        <div className="mb-5 z-3" data-aos="fade-right">
          <h2 className="h1 bg-brand-01 d-inline-block px-2 py-1 border-2 border-bottom border-white typing-effect">找到你最貼心的雪地夥伴</h2>
        </div>
        <div className="z-3" data-aos="fade-right">
          <Link to="/" className="btn btn-outline-brand-01 home-btn-hover bg-white rounded-pill fs-4 fw-bold px-middle py-3 z-3">
            <span className="material-symbols-outlined icon-unfill align-bottom me-3 mb-1">arrow_circle_right</span>馬上預約
          </Link>
        </div>
      </div>


    </section>
  );
}

export default BannerSection;
