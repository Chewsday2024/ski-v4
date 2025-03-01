import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useEffect, useRef, useState } from 'react';



// import Calendar from './Calendar';

import './CoachPage.scss';
import { Link } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getPageIsOpenStatus, setPageIsOpen } from './coachpageSlice';


function CoachPage () {

  const calendarRef = useRef();

  const dispatch = useDispatch();

  const pageIsOpen = useSelector(getPageIsOpenStatus);


  const [events, setEvents] = useState([
    {
      title: "數位課程 - 9:00 AM",
      start: "2025-01-01",
      end: "2025-01-01",
    },
    {
      title: "線上研討會 - 2:00 PM",
      start: "2025-02-01",
      end: "2025-02-01",
    },
  ]);

  const openCalendar = () => {
      calendarRef.current.getApi().updateSize();
    }




  return (
    <div className={`container mt-3 ${pageIsOpen ? 'd-block' : 'd-none'}`}>
      <Link
        className='btn btn-brand-01'
        onClick={() => dispatch(setPageIsOpen(false))}
        to='..'>
          上一頁
      </Link>

      <div className="row row-cols-1 w-75 m-auto mt-3">
        <div className="col">
          <div className="d-flex gap-5">
            <div className=''>
              <img src="https://images.unsplash.com/photo-1739609579483-00b49437cc45?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="w-100 rounded-5" alt="#" />

              
              <svg
                xmlns="http://www.w3.org/2000/svg" 
                height="40px" 
                width="40px" 
                viewBox="0 -960 960 960" 
                fill="#779ECB">
                  <path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Zm0-518h400-400Z"/>
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="40px"
                width="40px"
                viewBox="0 -960 960 960"
                fill="#779ECB">
                  <path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Z"/>
              </svg>
              
            </div>

            <ul className="d-flex flex-column justify-content-between p-0 m-0 w-100 profile-ul ">
              <li>
                <h1>聖誕老人</h1>
              </li>

              <li className='d-flex gap-3'>
                <p className='bg-brand-02 text-white px-2 rounded-1'>類型</p>
                <p className='fw-bold'>單板教練</p>
              </li>

              <li className='d-flex gap-3'>
                <p className='bg-brand-02 text-white px-2 rounded-1'>性別</p>
                <p className='fw-bold'>男</p>
              </li>

              <li className='d-flex gap-3'>
                <p className='bg-brand-02 text-white px-2 rounded-1'>證照</p>
                <p className='fw-bold'>證照等級 5</p>
              </li>

              <li className='d-flex gap-3'>
                <p className='bg-brand-02 text-white px-2 rounded-1'>語言</p>
                <p className='fw-bold'>華語 / 英語 / 日語</p>
              </li>

              <li className='d-flex gap-3'>
                <p className='bg-brand-02 text-white px-2 rounded-1'>評價</p>
                <p className='fw-bold'>⭐⭐⭐⭐⭐ 4.5 (227)</p>
              </li>

              <li>
                <p className='fw-bold'>JPY <span className='fs-2'>17,666</span> /hr 起</p>
              </li>

              <li>
                <button className='btn btn-white text-brand-01 fw-bold border-2 border-brand-01 rounded-pill py-3 px-4 w-100'>預約教練</button>
              </li>

            </ul>
          </div>

          <p className='mt-4 text-gray-02'>#魔法教學 #親切 #適合乖小孩 #安全保障 #HoHoHo</p>
        </div>



        <hr className='my-5' />



        <div className='col'>
          <ul className="nav nav-pills nav-justified">
            <li className="nav-item">
              <a className="nav-link active" data-bs-toggle="tab" href="#member">會員中心</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={openCalendar} data-bs-toggle="tab" href="#classes">預約課表</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-bs-toggle="tab" href="#exp">教練經歷</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-bs-toggle="tab" href="#license">教練證照</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-bs-toggle="tab" href="#photo">教學日常</a>
            </li>
          </ul>


          <div className="tab-content mt-3">
            <div id="member" className="container tab-pane active">
              <p>
                作為聖誕老人，我原本從未想過滑雪對我來說會是一件必要的事情。起初，每當看到小精靈們在雪坡上靈活地滑行，我內心總是充滿羨慕，但又不免感到害怕：我這圓滾滾的身材，能做到這麼輕盈嗎？第一次嘗試滑雪時，我摔得鼻青臉腫，雪橇倒了，帽子也飛了，甚至覺得自己根本不適合這項運動。但內心深處有個聲音告訴我：「聖誕老人不能放棄挑戰，要讓孩子們相信，年齡永遠不是學習的阻礙！」
                <br />
                經過幾次失敗後，我開始尋找方法。我觀察小精靈如何保持平衡，聽取馴鹿魯道夫的建議，假裝自己是在駕馭雪橇，而不是滑雪板。慢慢地，我的信心逐漸建立，當我成功滑下第一個雪坡時，那迎面而來的寒風和自由感讓我欣喜若狂。這一刻，我不僅戰勝了自己的恐懼，還感受到了滑雪的純粹樂趣。
                <br />    
                當技術越來越熟練時，我決定與小精靈們分享這份快樂。教他們滑雪並不容易，許多小精靈害怕摔跤，甚至對滑雪板充滿疑問。但我用自己的故事告訴他們，每一次摔倒都是通向成功的必經之路。我耐心地陪伴他們克服恐懼，看著他們從害怕到勇敢地滑行，內心充滿自豪。這段過程讓我明白，滑雪不僅是一項技能，更是一種精神——敢於挑戰、分享快樂，並讓每個人都找到自己的突破口。
              </p>
            </div>

            <div id="classes" className="container tab-pane fade">
              <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                  left: "prev,next",
                  center: "title",
                  right: "today",
                }}
                events={events}
                
              />
            </div>

            <div id="exp" className="container tab-pane fade">
              <h2>教練經歷</h2>
              
              <ul>
                <li>2017 美國 紐約滑雪場</li>
                <li>2018 義大利 威尼斯滑雪場</li>
                <li>2019 中國 北京滑雪場</li>
                <li>2020 德國 漢堡滑雪場 ，法國 巴黎滑雪場，非洲 大草原滑雪場</li>
                <li>2021 北極圈 北極熊家旁邊滑雪場</li>
                <li>2022 太平洋 海洋中心滑雪場 ，加拿大 多倫多滑雪場</li>
                <li>2023 北海道 富良野 ，留壽都，二世谷，旭川神居</li>
              </ul>
            </div>

            <div id="license" className="container tab-pane fade">
              <div className='d-flex gap-3'>
                <div className='d-flex flex-column justify-content-center align-items-center gap-3'>
                  <img src="https://images.unsplash.com/photo-1735114238008-89c9355ef8c6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className='w-100' alt="#" />

                  <h3>指導證照 LV.3</h3>
                </div>


                <div className='d-flex flex-column justify-content-center align-items-center gap-3'>
                  <img src="https://images.unsplash.com/photo-1735114238008-89c9355ef8c6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className='w-100' alt="#" />

                  <h3>指導證照 LV.3</h3>
                </div>
              </div>
            </div>

            <div id="photo" className="container tab-pane fade">
              <div className='row row-cols-3 g-2'>
                <div className='col'> 
                  <img src="https://images.unsplash.com/photo-1737467016100-68cd7759d93c?q=80&w=1228&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className='w-100' alt="#" />
                </div>

                <div className='col'>
                  <img src="https://images.unsplash.com/photo-1737467016100-68cd7759d93c?q=80&w=1228&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className='w-100' alt="#" />
                </div>

                <div className='col'>
                  <img src="https://images.unsplash.com/photo-1737467016100-68cd7759d93c?q=80&w=1228&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className='w-100' alt="#" />
                </div>

                <div className='col'>
                  <img src="https://images.unsplash.com/photo-1737467016100-68cd7759d93c?q=80&w=1228&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className='w-100' alt="#" />
                </div>

                <div className='col'>
                  <img src="https://images.unsplash.com/photo-1737467016100-68cd7759d93c?q=80&w=1228&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className='w-100' alt="#" />
                </div>

                <div className='col'>
                  <img src="https://images.unsplash.com/photo-1737467016100-68cd7759d93c?q=80&w=1228&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className='w-100' alt="#" />
                </div>

                <div className='col'>
                  <img src="https://images.unsplash.com/photo-1737467016100-68cd7759d93c?q=80&w=1228&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className='w-100' alt="#" />
                </div>

                <div className='col'>
                  <img src="https://images.unsplash.com/photo-1737467016100-68cd7759d93c?q=80&w=1228&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className='w-100' alt="#" />
                </div>

                <div className='col'>
                  <img src="https://images.unsplash.com/photo-1737467016100-68cd7759d93c?q=80&w=1228&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className='w-100' alt="#" />
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className='col mt-5'>
          <h3 className='text-center'>學員評價</h3>

          <ul className='mt-3 rate-ul'>
            <li className='d-flex flex-column gap-3 bg-white p-3 rounded-4'>
              <p>⭐⭐⭐⭐⭐</p>

              <div className='d-flex flex-column gap-3'>
                <h4>教練教學有趣而且非常注意我的安全！</h4>

                <div className='d-flex align-items-center gap-3'>
                  <div className='rounded-circle rate-profileImg' style={{backgroundImage: `url(${'https://images.unsplash.com/photo-1459262838948-3e2de6c1ec80?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'})`}}></div>

                  <div>
                    <p>雪怪<span className='ms-3 bg-brand-02 text-white py-1 px-3 rounded-3'>學員</span></p>

                    <p className='mt-3 text-gray-03'>2025/12/25</p>
                  </div>
                </div>
              </div>

              <div className='d-flex flex-column gap-3 border-start border-error ps-3'>
                <p className='text-gray-03'>教練回覆</p>

                <h3>
                  Ho！Ho！Ho！<br />
                  我的學員絕對可以體會到滑雪的快樂！
                </h3>

                <div className='d-flex align-items-center gap-3'>
                  <div className='rounded-circle rate-profileImg' style={{backgroundImage: `url(${'https://images.unsplash.com/photo-1701273973387-8abff988bb88?q=80&w=986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'})`}}></div>

                  <div>
                    <p>聖誕老人<span className='ms-3 bg-error text-white py-1 px-3 rounded-3'>教練</span></p>

                    <p className='mt-3 text-gray-03'>2025/12/25</p>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CoachPage;