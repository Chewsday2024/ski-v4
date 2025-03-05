import './Order.scss';
import { Link } from 'react-router';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';

// 建立預約教練訂單的共用環境
export const OrderContext = createContext({});

// 訂單資料 - 初始資料
export const defaultOrder = {
    "orderTime": "",
    "orderStatus":0,
    "userId": 1,
    "skiResortId": 0,          
    "coachId": 0,
    "class": {
        "skiType": "",             
        "timeType": "",                     
        "date": null,               
        "startDate": null,    
        "endDate": null,      
        "days": 0                     
    },
    "studentsData":{
        "studentNum": 0,
        "skiLevel": 0,                
        "students": []
    },
    "paymentDetail":{
        "hours": 0,
        "studentNum": 0,
        "total": 0
    },
    "contactInfo":{
        "name": "",
        "phone": "",
        "email": "",
        "lineId": "",
        "note": ""
    },
    "is_checked": false,
    "paymentMethod": 0, 
    "isPaid": false
}


export default function BookingPage(){

    const BASE_URL = "http://localhost:3000";

    // const [allSkiHouses, setAllSkiHouses] = useState([]); //全部的雪場資料
    const {allSkiHouses, setAllSkiHouses} = useContext(OrderContext);

    // const [allCoaches, setAllCoaches] = useState([]);   // 全部的教練資料
    const {allCoaches, setAllCoaches} = useContext(OrderContext);

    // const [classTime, setClassTime] = useState([]);     // 課程時間選項
    const {classTime,setClassTime} = useContext(OrderContext);

    // const [skillLevels,setSkillLevels] = useState([]);  // 學員滑雪程度選項
    const {skillLevels,setSkillLevels} = useContext(OrderContext);

    const [totalHours,setTotalHours] = useState(0);     // 課程時間總時數
    const [days,setDays] = useState(0);                 // 上課天數
    const [totalPrice,setTotalPrice] = useState(0);     // 總金額

    
    const [selectedSkiHouse, setSelectedSkiHouse] = useState("");  // 下拉選單選中的雪場 value
    const [selectedCoach, setSelectedCoach] = useState("");        // 下拉選單選中的教練 value
    const [selectedClass, setSelectedClass] = useState("");        // 下拉選單選中的課程時間 value
    const [selectedStudentNum,setSelectedStudentNum] = useState(0);  // 下拉選單選中的上課人數 value
    const [selectedSkiType,setSelectedSkiType] = useState("");          // 下拉選單選中的雪板類型 value
    const [selectedSkillLevel,setSelectedSkillLevel] = useState(0);     // 下拉選單選中的滑行程度 value

    
    // console.log("全部的雪場資料",allSkiHouses);
    // console.log("全部的教練資料",allCoaches);
    // console.log("課程時間選項",classTime);

    // console.log("滑雪程度",skillLevels);
    // console.log("雪板",selectedSkiType);

    // console.log("選中的滑行程度",selectedSkillLevel);
    

    useEffect(()=>{
        const getSkiHouse = async()=>{
            try {
                const res = await axios.get(`${BASE_URL}/skiResorts`);             
                setAllSkiHouses(res.data);
            } catch (error) {
                console.log(error);
            }
        }

        const getCoaches = async()=>{
            try {
                const res = await axios.get(`${BASE_URL}/coaches`);
                setAllCoaches(res.data);
            } catch (error) {
                console.log(error);
            }
        }

        const getClassTime = async()=>{
            try {
                const res = await axios.get(`${BASE_URL}/classTimeType`);             
                setClassTime(Object.entries(res.data));
            } catch (error) {
                console.log(error);
            }
        }

        const getSkillLevel = async()=>{
            try {
                const res = await axios.get(`${BASE_URL}/studentSkiLevel`);             
                setSkillLevels(Object.entries(res.data));
            } catch (error) {
                console.log(error);
            }
        }
        getSkiHouse();
        getCoaches();
        getClassTime();
        getSkillLevel();
        handleDate();
    },[]);


    let coachesData = [];
    if (selectedSkiHouse){
        const filteredCoaches = allSkiHouses.filter((skiHouse)=>(skiHouse.id == selectedSkiHouse))[0].selectCoach;
        // console.log("新的 filter",filteredCoaches);
        coachesData = allCoaches.filter((coach)=>filteredCoaches.includes(coach.id));
        // console.log("篩選過的教練資料",coachesData);
    }

    const [selectedCoachPrice,setSelectedCoachPrice] = useState(0);
    const [coachImg,setCoachImg] = useState("");

    useEffect(()=>{
        if (selectedCoach){
            const coach = allCoaches.find((coach)=> coach.id == selectedCoach);
            setCoachImg(coach.profileImg);
            setSelectedCoachPrice(coach.charge);
        }
    },[selectedCoach]);
    
    // console.log("被選到的教練圖片",coachImg,"教練價格",selectedCoachPrice);


    const [startDate,setStartDate] = useState("");      // 開始日期設定
    const [endDate,setEndDate] = useState("");          // 結束日期設定

    const prevSelectedStartDate = useRef("");
    const prevSelectedEndDate = useRef("");
    
    const [selectedStartDate, setSelectedStartDate] = useState("");    // 下拉選單選中的開始日期 value
    const [selectedEndDate,setSelectedEndDate] = useState("");         // 下拉選單選中的結束日期 value
    const [selectedDate,setSelectedDate] = useState("");               // 下拉選單選中的日期 value

    // console.log("選擇的開始日期",selectedStartDate,"選擇的結束日期",selectedEndDate);
    
    

    // 控制 Date Picker 最早可選日期 & 最晚可選日期
    const handleDate = ()=>{
        const minDate = new Date();
        const maxDate = new Date(); 

        minDate.setDate(minDate.getDate()+3);
        maxDate.setDate(maxDate.getDate()+365);

        const formattedMinDate = minDate.toISOString().split('T')[0];   //格式化為 YYYY-MM-DD
        const formattedMaxDate = maxDate.toISOString().split('T')[0];   //格式化為 YYYY-MM-DD

        setStartDate(formattedMinDate);
        setEndDate(formattedMaxDate);

        // console.log("最早可選時間:",formattedMinDate,"最晚可選時間",formattedMaxDate);
    }

    const handleSelectedStartDate = (e) => {
        const newStartDate = e.target.value;
        if ( selectedEndDate && new Date(newStartDate) > new Date(selectedEndDate)){
            alert("開始日期不可晚於結束日期");
            return;
        }
        setSelectedStartDate(newStartDate);
        prevSelectedStartDate.current = newStartDate;
    }

    const handleSelectedEndDate = (e) => {
        const newEndDate = e.target.value;
        if ( selectedStartDate && new Date(newEndDate) < new Date(selectedStartDate)){
            alert("結束日期不可早於開始日期");
            return;
        }
        setSelectedEndDate(newEndDate);
        prevSelectedEndDate.current = newEndDate;
    }
    
    // 計算總時數
    const countHours = ()=>{
        if (selectedClass){
            const selectedHours = classTime.find((item)=> item[0] == selectedClass)[1].hours;   //  選擇上課時間的時數
            let computedDays = 0;
            
            if (selectedClass === "allday" && selectedStartDate && selectedEndDate){
                computedDays = Math.max(1,(new Date(selectedEndDate) - new Date(selectedStartDate))/(1000 * 60 * 60 * 24)+1);
            } else if (selectedDate) {
                computedDays = 1;
            } 
            setDays(computedDays);
            setTotalHours(Number(selectedHours)*computedDays);
        }
    }

    useEffect(()=>{
        countHours();
        
    },[selectedClass,selectedStartDate,selectedEndDate,selectedDate]);

    // console.log("總時數",totalHours,"天數",days);

    // 計算總金額
    const countTotalPrice = ()=>{
        const total = selectedCoachPrice*totalHours*selectedStudentNum;
        setTotalPrice(total);
    }

    useEffect(()=>{
        countTotalPrice();
    },[selectedCoachPrice,totalHours,selectedStudentNum])



    const [students,setStudents] = useState([]);    //學員資料
    
    // 初始化學生資料
    useEffect(()=>{
        const defaultStudents = Array.from({length: selectedStudentNum},()=>({
            lastName: "",
            firstName: "",
            name:"",
            gender: "",
            age: 0,
            phone: ""
        }));
        setStudents(defaultStudents);
    },[selectedStudentNum])

    // 更新學生資料：Ｑ：GPT 寫的
    const handleStudentsData = (index, field, value) => {
        setStudents((prevStudents) => {
            // 複製一份學生資料的陣列，避免直接修改原本的資料
            const updatedStudents = [...prevStudents]; 

            // 更新指定學員的特定欄位
            updatedStudents[index] = {
                ...updatedStudents[index], // 保留該學員其他欄位的資料
                [field]: value,            // 只更新目前正在輸入的欄位

                // 若更新的是 lastName 或 firstName，則更新 name
                name: field === "lastName" || field === "firstName"
                ? `${field === "lastName" ? value : updatedStudents[index].lastName}${field === "firstName" ? value : updatedStudents[index].firstName}`
                : updatedStudents[index].name,
            };

            // 回傳更新後的新學生陣列，讓 React 更新畫面
            return updatedStudents;
        });
    };

    // 預約教練資料: useContext ()
    // const [order,setOrder] = useState({
    //     "orderTime": "",
    //     "orderStatus":0,
    //     "userId": 1,
    //     "skiResortId": 0,          
    //     "coachId": 0,
    //     "class": {
    //         "skiType": "",             
    //         "timeType": "",                     
    //         "date": null,               
    //         "startDate": null,    
    //         "endDate": null,      
    //         "days": 0                     
    //     },
    //     "studentsData":{
    //         "studentNum": 0,
    //         "skiLevel": 0,                
    //         "students": []
    //     },
    //     "paymentDetail":{
    //         "hours": 0,
    //         "studentNum": 0,
    //         "total": 0
    //     },
    //     "contactInfo":{
    //         "name": "",
    //         "phone": "",
    //         "email": "",
    //         "lineId": "",
    //         "note": ""
    //     },
    //     "is_checked": false,
    //     "paymentMethod": 0, 
    //     "isPaid": false
    // })
    const {order,setOrder} = useContext(OrderContext);

    // 把選擇的資料存到 orders 訂單裡
    const handleOrder = () => {
        const tmpOrder = {
            ...order,
            skiResortId: selectedSkiHouse,          
            coachId: selectedCoach,
            class: {
                skiType: selectedSkiType,             
                timeType: selectedClass,                     
                date: ( selectedClass!== "allday" ? selectedDate: ""),               
                startDate: ( selectedClass == "allday" ? selectedStartDate: ""),    
                endDate: ( selectedClass == "allday" ? selectedEndDate: ""),      
                days: days                     
            },
            studentsData:{
                studentNum: selectedStudentNum,
                skiLevel: selectedSkillLevel,                
                students: students
            },
            paymentDetail:{
                hours: totalHours,
                studentNum: selectedStudentNum,
                total: totalPrice
            },
        }
        setOrder(tmpOrder);
    }
   
    useEffect(()=>{
        handleOrder();
    },[selectedSkiHouse,
        selectedCoach,
        selectedSkiType,
        selectedClass,
        selectedDate,
        selectedStartDate,
        selectedEndDate,
        days,
        selectedStudentNum,
        selectedSkillLevel,
        students,
        totalHours,
        totalPrice
    ])

    // console.log("預約訂單資料",order);

    return (
        <>
        <div className="container">
            {/* PC Step flow */}
            <div className="row justify-content-center">
                <div className="col-lg-8 col">
                    <div className="d-none d-md-block">
                        <div className="d-flex justify-content-between step-sec">
                            <div className="d-flex">
                                <span className="step-circle active d-flex justify-content-center align-items-center">1</span>
                                <h2 className="fs-4 ms-3 text-brand-01">填寫預約資料</h2>
                            </div>
                            <span className="material-symbols-outlined text-brand-01 d-flex justify-content-center align-items-center">play_arrow</span>
                            <div className="d-flex">
                                <span className="step-circle d-flex justify-content-center align-items-center">2</span>
                                <h2 className="fs-4 ms-3 text-gray-03">填寫聯繫方式與付款</h2>
                            </div>
                            <span className="material-symbols-outlined d-flex justify-content-center align-items-center text-gray-03">play_arrow</span>
                            <div className="d-flex">
                                <span className="step-circle d-flex justify-content-center align-items-center">3</span>
                                <h2 className="fs-4 ms-3 text-gray-03">預約完成</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Mobile Step Flow */}
            <div className="row">
                <div className="col">
                    <div className="d-md-none">
                        <ul className="mobile-steps d-flex mt-20 mb-32">
                            <li className="d-flex flex-column align-items-center step-active">
                                <span className="step-circle active mobile-step-number d-flex justify-content-center align-items-center mb-3">1</span>
                                <h2 className="fs-6 text-brand-01 text-nowrap">填寫預約資料</h2>
                            </li>
                            <li className="d-flex flex-column align-items-center">
                                <span className="step-circle d-flex justify-content-center align-items-center mb-3">2</span>
                                <h2 className="fs-6 text-gray-03 text-nowrap d-none">填寫聯繫方式與付款</h2>
                            </li>
                            <li className="d-flex flex-column align-items-center">
                                <span className="step-circle d-flex justify-content-center align-items-center mb-3">3</span>
                                <h2 className="fs-6 text-gray-03 text-nowrap d-none">預約完成</h2>
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
                                            setSelectedSkiHouse(Number(e.target.value));
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
                                    <Link to='/ski-house' className="select-info-link">查看雪場資訊</Link>
                                </div>
                            </div>
                            <div className="mb-3 form-section">
                                <div className="d-flex justify-content-between align-items-center">
                                    <label htmlFor="snowBoard" className="form-label mb-0">類型</label>
                                    <select
                                        value={selectedSkiType}
                                        onChange={(e)=>{
                                            setSelectedSkiType(e.target.value)
                                        }}
                                        className="form-select w-70 w-md-80" 
                                        name="snowBoard" 
                                        id="snowBoard">
                                        <option value="" disabled>請選擇雪板類型</option>
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
                                <div className="d-flex justify-content-between align-items-center">
                                    <label htmlFor="skiCoach" className="form-label mb-0">教練</label>
                                    <div className="w-70 w-md-80  d-flex">
                                        <div className="flex-shrink-0 me-3">
                                            <img 
                                                className="head-shot rounded-circle object-fit-cover" 
                                                src={selectedCoach ? coachImg : "/images/person-icon.svg"}    
                                                alt="教練名"/>
                                        </div>
                                        <select
                                            value={selectedCoach}
                                            onChange={(e)=>{
                                                setSelectedCoach(Number(e.target.value));
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
                                        </select>
                                    </div>
                                </div>
                                <div className="form-text d-flex justify-content-end align-items-center select-info">
                                    <span className="material-symbols-outlined icon-unfilled text-brand-02">help</span>
                                    <Link to={`/coach/${selectedCoach}`} className="select-info-link">查看教練資訊</Link>
                                </div>
                            </div>
                            <div className="mb-3 form-section">
                                <div className="d-flex justify-content-between align-items-center">
                                    <label htmlFor="coachPrice" className="form-label mb-0">價格/每小時</label>
                                    <input
                                        value={`JPY ${selectedCoachPrice.toLocaleString()}`}
                                        type="text" 
                                        className="form-control-plaintext w-70 w-md-80 fs-2 text-brand-02 fw-bold" 
                                        id="coachPrice"
                                        readOnly 
                                        />
                                </div>
                            </div>
                            <div className="mb-3 form-section">
                                <div className="d-flex justify-content-between align-items-center">
                                    <label htmlFor="classTime" className="form-label mb-0">時間</label>
                                    <select
                                        value={selectedClass}
                                        onChange={(e)=>{
                                            setSelectedClass(e.target.value);
                                        }} 
                                        className="form-select w-70 w-md-80" 
                                        name='classTime' 
                                        id='classTime'>
                                        <option value="" disabled>請選擇課程時間</option>
                                        {
                                            classTime.map((item)=>{
                                                return(<option key={item[0]} value={item[0]}>{item[1].name}</option>)
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            {
                                (selectedClass === "allday" || selectedClass === "") ? <>
                                    <div className="mb-3 form-section">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <label htmlFor="startDate" className="form-label mb-0">開始日期</label>
                                            <input
                                                min={startDate}
                                                max={endDate}
                                                value={selectedStartDate}
                                                onChange={handleSelectedStartDate} 
                                                type="date" 
                                                className="form-control w-70 w-md-80" 
                                                id="startDate"/>
                                        </div>
                                    </div>
                                    <div className="mb-3 form-section">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <label htmlFor="endDate" className="form-label mb-0">結束日期</label>
                                            <input
                                                min={startDate}
                                                max={endDate}
                                                value={selectedEndDate}
                                                onChange={handleSelectedEndDate}
                                                type="date" 
                                                className="form-control w-70 w-md-80" 
                                                id="endDate"/>
                                        </div>
                                    </div>
                                </>
                             : <div className="mb-3 form-section">
                                <div className="d-flex justify-content-between align-items-center">
                                    <label htmlFor="date" className="form-label mb-0">日期</label>
                                    <input
                                        min={startDate}
                                        max={endDate}
                                        value={selectedDate}
                                        onChange={(e)=>{
                                            setSelectedDate(e.target.value);
                                        }}
                                        type="date" 
                                        className="form-control w-70 w-md-80" 
                                        id="date"/>
                                </div>
                            </div>
                            }
                            
                            
                        </div>
                        <div className='d-flex flex-column gap-4'>
                            <div>    
                                <h3 className="form-title text-brand-02 ps-4 mb-3">學員資料</h3>
                                <p className=''>同班學員程度需一致，若有明顯差異，教練將以較初階程度為授課基準。</p>
                            </div>
                            <div className="mb-3 form-section">
                                <div className="d-flex justify-content-between align-items-center">
                                    <label htmlFor="numOfStudents" className="form-label mb-0">上課人數</label>
                                    <select
                                        value={selectedStudentNum}
                                        onChange={(e)=>{
                                            setSelectedStudentNum(Number(e.target.value));
                                        }} 
                                        className="form-select w-70 w-md-80" 
                                        name="numOfStudents" 
                                        id="numOfStudents">
                                        <option value="0" disabled>請選擇人數</option>
                                        <option value="1">1 人</option>
                                        <option value="2">2 人</option>
                                        <option value="3">3 人</option>
                                        <option value="4">4 人</option>
                                        <option value="5">5 人</option>
                                        <option value="6">6 人</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3 form-section">
                                <div className="d-flex justify-content-between align-items-center">
                                    <label htmlFor="level" className="form-label mb-0">滑行程度</label>
                                    <select
                                        value={selectedSkillLevel}
                                        onChange={(e)=>{
                                            setSelectedSkillLevel(Number(e.target.value))
                                        }}
                                        className="form-select w-70 w-md-80" 
                                        name="level"
                                        id="level">
                                        <option value="0" disabled>請選擇滑雪程度</option>
                                        {
                                            skillLevels.map((skillLevel)=>{
                                                return(<option key={skillLevel[0]} value={skillLevel[0]}>{skillLevel[1]}</option>)
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="form-text d-flex justify-content-end align-items-center select-info">
                                    <span className="material-symbols-outlined icon-unfilled text-brand-02">help</span>
                                    <Link to='/' className="select-info-link">如何判定滑行程度</Link>
                                </div>
                            </div>
                            {/* 學員資料 */}
                            {
                                students.map((student,index)=>{
                                    return(<>
                                        <div key={index} className="d-flex flex-column gap-4 pt-4 border-top">
                                            <h4 className="form-title text-brand-02 ps-4 mb-3 fs-5">{`學員 ${index+1}`}</h4>
                                            <div className="mb-3 form-section">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <label htmlFor="lastName" className="form-label mb-0">姓名</label>
                                                    <div className="w-70 w-md-80 d-flex">
                                                        <input
                                                            value={student.lastName}
                                                            onChange={(e)=>{
                                                                handleStudentsData(index, "lastName", e.target.value)
                                                            }}
                                                            type="text" 
                                                            className="form-control w-25 me-3" 
                                                            id="lastName" 
                                                            placeholder="姓氏" />
                                                        <input
                                                            value={student.firstName}
                                                            onChange={(e)=>{
                                                                handleStudentsData(index, "firstName", e.target.value)
                                                            }}
                                                            type="text" 
                                                            className="form-control w-75" 
                                                            placeholder="姓名" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mb-3 form-section">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <label htmlFor="sex" className="form-label mb-0">性別</label>
                                                    <select
                                                        value={student.gender}
                                                        onChange={(e)=>{
                                                            handleStudentsData(index, "gender", e.target.value)
                                                        }}
                                                        className="form-select w-70 w-md-80" 
                                                        name="sex" 
                                                        id="sex" >
                                                        <option value="" disabled>請選擇性別</option>
                                                        <option value="male">男</option>
                                                        <option value="female">女</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="mb-3 form-section">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <label htmlFor="age" className="form-label mb-0">年齡</label>
                                                    <input
                                                        value={student.age}
                                                        onChange={(e)=>{
                                                            handleStudentsData(index, "age", e.target.value)
                                                        }}
                                                        type="number" 
                                                        className="form-control w-70 w-md-80" 
                                                        name="age" 
                                                        id="age" 
                                                        placeholder="請輸入真實年齡" />
                                                </div>
                                            </div>
                                            <div className="mb-3 form-section">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <label htmlFor="phone" className="form-label mb-0">聯絡電話</label>
                                                    <input
                                                        value={student.phone}
                                                        onChange={(e)=>{
                                                            handleStudentsData(index, "phone", e.target.value)
                                                        }}
                                                        type="tel" 
                                                        className="form-control w-70 w-md-80" 
                                                        name="phone" 
                                                        id="phone" 
                                                        placeholder="09xxxxxxxx" />
                                                </div>
                                            </div>
                                        </div>
                                    </>)
                                })
                            }
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
                                        <td className="text-end border-0 px-0 pt-4">{`JPY ${selectedCoachPrice.toLocaleString()}`}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="border-0 px-0 pt-3 fw-normal">時數</th>
                                        <td className="text-end border-0 px-0 pt-3">{totalHours} 小時</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="border-0 px-0 pt-3 pb-3 fw-normal">人數</th>
                                        <td className="text-end border-0 px-0 pt-3 pb-4">{selectedStudentNum}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="d-flex justify-content-between mt-4">
                                <p className="mb-0 fs-4">總金額</p>
                                <p className="mb-0 fs-3 fw-bold text-brand-02">JPY {totalPrice.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>  
            </div>
            <div className="d-flex justify-content-center mt-4 mt-lg-5 mb-5 mb-lg-60">
                <Link
                    onClick={handleOrder} 
                    to='/checkout' 
                    className="btn-custom btn-custom-filled w-lg-25 w-md-50 w-xs-100 text-nowrap">下一步
                </Link>
            </div>
        </div>
        </>
    )
}