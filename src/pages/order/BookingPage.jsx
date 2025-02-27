import './Order.scss';
import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function BookingPage(){

    const [allSkiHouses, setAllSkiHouses] = useState([]); //全部的雪場資料
    const [allCoaches, setAllCoaches] = useState([]); // 全部的教練資料

    const [selectedSkiHouse, setSelectedSkiHouse] = useState("");  // 下拉選單選中的雪場 value
    const [selectedCoach, setSelectedCoach] = useState("");        // 下拉選單選中的教練 value

    // const [classTime, setClassTime] = useState([]);

    console.log("全部的雪場資料",allSkiHouses);
    console.log("全部的教練資料",allCoaches);

    useEffect(()=>{
        const getSkiHouse = async()=>{
            try {
                const res = await axios.get("http://localhost:3000/skiResorts");             
                setAllSkiHouses(res.data);
            } catch (error) {
                console.log(error);
            }
        }

        const getCoaches = async()=>{
            try {
                const res = await axios.get(`http://localhost:3000/coaches`);
                setAllCoaches(res.data);
            } catch (error) {
                console.log(error);
            }
        }

        // const getClassTime = async()=>{
        //     try {
        //         const res = await axios.get("http://localhost:3000/classTimeType");             
        //         setClassTime(Object.entries(res.data));
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }
        getSkiHouse();
        getCoaches();
        // getClassTime();
        

    },[]);

    // Q: 這邊用 let 是合理的嗎？
    let coachesData = [];
    if (selectedSkiHouse){
        const filteredCoaches = allSkiHouses.filter((skiHouse)=>(skiHouse.id == selectedSkiHouse))[0].selectCoach;
        console.log("新的 filter",filteredCoaches);
        coachesData = allCoaches.filter((coach)=>filteredCoaches.includes(coach.id));
        console.log("篩選過的教練資料",coachesData);
    }

    console.log(selectedCoach);

    let coachImg = "";
    if (selectedCoach){
        coachImg = allCoaches.find((coach)=> coach.id == selectedCoach).profileImg;
        console.log("被選到的教練圖片",coachImg);
    }
    
    return (
        <div className="container">
            {/* PC Step flow */}
            <div className="row justify-content-center">
                <div className='col-lg-8 col'>
                    <div className='d-none d-md-block'>
                        <div className='d-flex justify-content-between step-sec'>
                            <div className='d-flex'>
                                <span className='step-circle active d-flex justify-content-center align-items-center'>1</span>
                                <h2 className='fs-4 ms-3 text-brand-01'>填寫預約資料</h2>
                            </div>
                            <span className="material-symbols-outlined text-brand-01 d-flex justify-content-center align-items-center">play_arrow</span>
                            <div className='d-flex'>
                                <span className='step-circle d-flex justify-content-center align-items-center'>2</span>
                                <h2 className='fs-4 ms-3 text-gray-03'>填寫聯繫方式與付款</h2>
                            </div>
                            <span className="material-symbols-outlined d-flex justify-content-center align-items-center text-gray-03">play_arrow</span>
                            <div className='d-flex'>
                                <span className='step-circle d-flex justify-content-center align-items-center'>3</span>
                                <h2 className='fs-4 ms-3 text-gray-03'>預約完成</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Mobile Step Flow */}
            <div className="row">
                <div className="col">
                    <div className='d-md-none'>
                        <ul className='mobile-steps d-flex mt-20 mb-32'>
                            <li className='d-flex flex-column align-items-center step-active'>
                                <span className='step-circle active mobile-step-number d-flex justify-content-center align-items-center mb-3'>1</span>
                                <h2 className='fs-6 text-brand-01 text-nowrap'>填寫預約資料</h2>
                            </li>
                            <li className='d-flex flex-column align-items-center'>
                                <span className='step-circle d-flex justify-content-center align-items-center mb-3'>2</span>
                                <h2 className='fs-6 text-gray-03 text-nowrap d-none'>填寫聯繫方式與付款</h2>
                            </li>
                            <li className='d-flex flex-column align-items-center'>
                                <span className='step-circle d-flex justify-content-center align-items-center mb-3'>3</span>
                                <h2 className='fs-6 text-gray-03 text-nowrap d-none'>預約完成</h2>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div className="row">
                <div className="col-lg-8 col-12">
                    <form action="" className="d-flex flex-column gap-5">
                        <div className="d-flex flex-column gap-4">
                            <h3 className="form-title text-brand-02 ps-4">預約課程</h3>
                            <div className="mb-3 form-section">
                                <div className="d-flex justify-content-between align-items-center">
                                    <label htmlFor="snowHouse" className="form-label mb-0">雪場</label>
                                    <select
                                        value={selectedSkiHouse}
                                        onChange={(e)=>{
                                            setSelectedSkiHouse(e.target.value);
                                        }}
                                        className="form-select w-70 w-md-80" 
                                        name="snowHouse" 
                                        id="snowHouse"
                                    >
                                        <option value="" disabled>請選擇雪場</option>
                                        {
                                            allSkiHouses.map((skiHouse)=>{
                                                return <option key={skiHouse.chineseName} value={skiHouse.id}>{skiHouse.chineseName}</option>        
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="form-text d-flex justify-content-end align-items-center select-info">
                                    <span className="material-symbols-outlined icon-unfilled text-brand-02">help</span>
                                    <Link to='/' className="select-info-link">查看雪場資訊</Link>
                                </div>
                            </div>
                            <div className="mb-3 form-section">
                                <div className="d-flex justify-content-between align-items-center">
                                    <label htmlFor="snowBoard" className="form-label mb-0">類型</label>
                                    <select className="form-select w-70 w-md-80 " name="snowBoard" id="snowBoard" defaultValue="">
                                        <option value="">請選擇雪板類型</option>
                                        <option value="single">單板</option>
                                        <option value="double">雙板</option>
                                    </select>
                                </div>
                                <div className="form-text d-flex justify-content-end align-items-center select-info">
                                    <span className="material-symbols-outlined icon-unfilled text-brand-02">help</span>
                                    <Link to='/' className="select-info-link">如何挑選</Link>
                                </div>
                            </div>
                            <div className="mb-3 form-section">
                                <div className='d-flex justify-content-between align-items-center'>
                                    <label htmlFor="skiCoach" className="form-label mb-0">教練</label>
                                    <div className="w-70 w-md-80  d-flex">
                                        <div className="flex-shrink-0 me-3">
                                            <img 
                                                className="head-shot rounded-circle object-fit-cover" 
                                                src={selectedCoach ? coachImg : "../src/assets/images/person-icon.svg"}    
                                                alt="教練名"/>
                                        </div>
                                        <select
                                            value={selectedCoach}
                                            onChange={(e)=>{
                                                setSelectedCoach(e.target.value);
                                            }} 
                                            className="form-select" 
                                            name="skiCoach" 
                                            id="skiCoach">
                                            <option value="" disabled>
                                                {
                                                    selectedSkiHouse ? "請選擇教練":"請先選擇雪場"
                                                }
                                            </option>
                                            {
                                                coachesData.map((coach)=>{
                                                    return <option key={coach.name} value={coach.id}>{coach.name}</option>
                                                })
                                            }
                                            {/* <option value="1">木村拓哉</option>
                                            <option value="2">賴玲瑤</option>
                                            <option value="3">小可愛</option> */}
                                        </select>
                                    </div>
                                </div>
                                <div className="form-text d-flex justify-content-end align-items-center select-info">
                                    <span className="material-symbols-outlined icon-unfilled text-brand-02">help</span>
                                    <Link to='/' className="select-info-link">查看教練資訊</Link>
                                </div>
                            </div>
                            <div className="mb-3 form-section">
                                <div className='d-flex justify-content-between align-items-center'>
                                    <label htmlFor="coachPrice" className="form-label mb-0">價格/每小時</label>
                                    <input
                                        defaultValue="JPY20,000"
                                        type="text" 
                                        className="form-control-plaintext w-70 w-md-80  fs-2 text-brand-02 fw-bold" 
                                        id="coachPrice" 
                                        />
                                </div>
                            </div>
                            <div className="mb-3 form-section">
                                <div className='d-flex justify-content-between align-items-center'>
                                    <label htmlFor="classTime" className="form-label mb-0">時間</label>
                                    <select className="form-select w-70 w-md-80 " name='classTime' id='classTime'>
                                        <option value="">請選擇課程時間</option>
                                        <option value="allday">整天 5hr (09:30 -12:00) (13:00-15:30)</option>
                                        <option value="halfDayAM">半天 3hr (09:00 -12:00)</option>
                                        <option value="halfDayPM">半天 3hr (13:00 -16:00)</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3 form-section">
                                <div className='d-flex justify-content-between align-items-center'>
                                    <label htmlFor="startDate" className="form-label mb-0">開始日期</label>
                                    <input type="date" className="form-control w-70 w-md-80 " id="startDate" value="2025-01-01"/>
                                </div>
                            </div>
                            <div className="mb-3 form-section">
                                <div className='d-flex justify-content-between align-items-center'>
                                    <label htmlFor="classTime" className="form-label mb-0">結束日期</label>
                                    <input type="date" className="form-control w-70 w-md-80 " id="startDate" value="2025-01-01"/>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex flex-column gap-4'>
                            <div>    
                                <h3 className="form-title text-brand-02 ps-4 mb-3">學員資料</h3>
                                <p className=''>同班學員程度需一致，若有明顯差異，教練將以較初階程度為授課基準。</p>
                            </div>
                            <div className="mb-3 form-section">
                                <div className='d-flex justify-content-between align-items-center'>
                                    <label htmlFor="numOfStudents" className="form-label mb-0">上課人數</label>
                                    <select className="form-select w-70 w-md-80 " name='numOfStudents' id='numOfStudents' defaultValue="">
                                        <option value="">請選擇人數</option>
                                        <option value="1">1 人</option>
                                        <option value="2">2 人</option>
                                        <option value="3">3 人</option>
                                        <option value="3">4 人</option>
                                        <option value="3">5 人</option>
                                        <option value="3">6 人</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3 form-section">
                                <div className='d-flex justify-content-between align-items-center'>
                                    <label htmlFor="level" className="form-label mb-0">滑行程度</label>
                                    <select className="form-select w-70 w-md-80 " name='level' id='level' defaultValue="">
                                        <option value="">請選擇滑雪程度</option>
                                        <option value="1">零經驗</option>
                                        <option value="2">初階</option>
                                        <option value="3">初中階</option>
                                        <option value="4">中階</option>
                                        <option value="5">中高階</option>
                                        <option value="6">高階</option>
                                    </select>
                                </div>
                                <div className="form-text d-flex justify-content-end align-items-center select-info">
                                    <span className="material-symbols-outlined icon-unfilled text-brand-02">help</span>
                                    <Link to='/' className="select-info-link">如何判定滑行程度</Link>
                                </div>
                            </div>
                            {/* 學員資料 */}
                            <div className='d-flex flex-column gap-4 pt-4 border-top'>
                                <h4 className="form-title text-brand-02 ps-4 mb-3 fs-5">學員 1</h4>
                                <div className="mb-3 form-section">
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <label htmlFor="lastName" className="form-label mb-0">姓名</label>
                                        <div className='w-70 w-md-80  d-flex'>
                                            <input type="text" className="form-control w-25 me-3 " id="lastName" placeholder="姓氏" />
                                            <input type="text" className="form-control w-75" placeholder="姓名" />
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3 form-section">
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <label htmlFor="sex" className="form-label mb-0">性別</label>
                                        <select className="form-select w-70 w-md-80 " name='sex' id='sex' defaultValue="">
                                            <option value="">請選擇性別</option>
                                            <option value="male">男</option>
                                            <option value="female">女</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="mb-3 form-section">
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <label htmlFor="age" className="form-label mb-0">年齡</label>
                                        <input
                                            type="number" 
                                            className="form-control w-70 w-md-80 " 
                                            name="age" 
                                            id="age" 
                                            placeholder="請輸入真實年齡" />
                                    </div>
                                </div>
                                <div className="mb-3 form-section">
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <label htmlFor="phone" className="form-label mb-0">聯絡電話</label>
                                        <input type="tel" className="form-control w-70 w-md-80 " name="phone" id="phone" placeholder="09xxxxxxxx" />
                                    </div>
                                </div>
                            </div>  
                            <div className='d-flex flex-column gap-4 pt-4 border-top'>
                                <h4 className="form-title text-brand-02 ps-4 mb-3 fs-5">學員 2</h4>
                                <div className="mb-3 form-section">
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <label htmlFor="lastName" className="form-label mb-0">姓名</label>
                                        <div className='w-70 w-md-80  d-flex'>
                                            <input type="text" className="form-control w-25 me-3 " id="lastName" placeholder="姓氏" />
                                            <input type="text" className="form-control w-75" placeholder="姓名" />
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3 form-section">
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <label htmlFor="sex" className="form-label mb-0">性別</label>
                                        <select className="form-select w-70 w-md-80 " name='sex' id='sex' defaultValue="">
                                            <option value="">請選擇性別</option>
                                            <option value="male">男</option>
                                            <option value="female">女</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="mb-3 form-section">
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <label htmlFor="age" className="form-label mb-0">年齡</label>
                                        <input type="number" className="form-control w-70 w-md-80 " name="age" id="age" placeholder="請輸入真實年齡" />
                                    </div>
                                </div>
                                <div className="mb-3 form-section">
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <label htmlFor="phone" className="form-label mb-0">聯絡電話</label>
                                        <input type="tel" className="form-control w-70 w-md-80 " name="phone" id="phone" placeholder="09xxxxxxxx" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </form>
                    
                </div>
                <div className="col-lg-4 col-12">
                    <div className='mt-3 mt-lg-0'>
                        <h3 className="pb-4 bg-brand-02 text-white p-4 border-radius-top-20">學費明細</h3>
                        <div className="border border-brand-02 border-radius-bottom-20 p-4 mb-4">
                            <table className="table text-muted border-bottom text-md-20">
                                <tbody>
                                    <tr>
                                        <th scope="row" className="border-0 px-0 pt-4 fw-normal">價格/每小時</th>
                                        <td className="text-end border-0 px-0 pt-4">JPY 20,000</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="border-0 px-0 pt-3 fw-normal">時數</th>
                                        <td className="text-end border-0 px-0 pt-3">15 小時</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="border-0 px-0 pt-3 pb-3 fw-normal">人數</th>
                                        <td className="text-end border-0 px-0 pt-3 pb-4">2</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="d-flex justify-content-between mt-4">
                                <p className="mb-0 fs-4">總金額</p>
                                <p className="mb-0 fs-3 fw-bold text-brand-02">JPY 600,000</p>
                            </div>
                        </div>
                    </div>
                </div>  
            </div>
            <div className='d-flex justify-content-center mt-4 mt-lg-5 mb-5 mb-lg-60'>
                <Link to='/checkout' className="btn-custom btn-custom-filled w-lg-25 w-md-50 w-xs-100 text-nowrap">下一步</Link>
            </div>
        </div>
    )
}