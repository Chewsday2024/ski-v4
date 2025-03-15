import './Order.scss';
import { Link, useNavigate } from 'react-router';
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

// 建立預約教練訂單的共用環境
export const OrderContext = createContext({});

// 訂單資料 - 初始資料
export const defaultOrder = {
    orderTime: "",
    orderStatus:0,
    userId: 1,
    skiResortId: 0,
    skiResortName: "",          
    coachId: 0,
    coachName: "",
    coachPrice: 0,
    class: {
        skiType: "",             
        timeType: "",
        timeTypeName: "",                     
        date: null,               
        startDate: null,    
        endDate: null,      
        days: 0                     
    },
    studentsData:{
        studentNum: 0,
        skiLevel: 0,
        skiLevelName: "",                
        students: []
    },
    paymentDetail:{
        hours: 0,
        studentNum: 0,
        total: 0
    },
    contactInfo:{
        name: "",
        phone: "",
        email: "",
        lineId: "",
        note: ""
    },
    is_checked: false,
    paymentMethod: 0, 
    isPaid: false
}

export default function BookingPage(){

    const BASE_URL = "https://ski-api-m9x9.onrender.com";    //正式機
    // const BASE_URL = "http://localhost:3000";             //測試機

    const orderNavigate = useNavigate();

    const {
        register,
        handleSubmit,
        setValue,
        resetField,
        formState: { errors },
      } = useForm({
        mode: "onChange"
      });

    const onSubmit = async () => {
        try {
            orderNavigate("/checkout");
        } catch (errors) {
            console.log(errors);
        }
    }    

    // 清除開始日期/結束日期/日期的 errors 
    const handleValidateDate = ()=>{
        if (selectedClass === "allday"){
            resetField("date");
        } else {
            resetField("startDate");
            resetField("endDate");
        }
    }
    
    const [apiFinish, setApiFinish] = useState(false);
    const [initFinish, setInitFinish] = useState(false);
    const [allSkiHouses, setAllSkiHouses] = useState([]); //全部的雪場資料
    const [allCoaches, setAllCoaches] = useState([]);   // 全部的教練資料
    const [classTime, setClassTime] = useState([]);     // 課程時間選項
    const [skillLevels,setSkillLevels] = useState([]);  // 學員滑雪程度選項

    const [totalHours,setTotalHours] = useState(0);     // 課程時間總時數
    const [days,setDays] = useState(0);                 // 上課天數
    const [totalPrice,setTotalPrice] = useState(0);     // 總金額

    
    const [selectedSkiHouse, setSelectedSkiHouse] = useState("");           // 下拉選單選中的雪場 value
    const [selectedSkiHouseName, setSelectedSkiHouseName] = useState("");   // 選中的雪場名稱
    const [selectedCoach, setSelectedCoach] = useState("");                 // 下拉選單選中的教練 value
    const [selectedCoachName, setSelectedCoachName] = useState("");         // 選中的教練名稱
    const [selectedClass, setSelectedClass] = useState("");                 // 下拉選單選中的課程時間 value
    const [selectedClassName, setSelectedClassName] = useState("");         // 選中的課程時間名稱
    const [selectedStudentNum,setSelectedStudentNum] = useState("");         // 下拉選單選中的上課人數 value，原預設 0
    const [selectedSkiType,setSelectedSkiType] = useState("");              // 下拉選單選中的雪板類型 value
    const [selectedSkillLevel,setSelectedSkillLevel] = useState("");         // 下拉選單選中的滑行程度 value，原預設 0
    const [selectedSkillLevelName,setSelectedSkillLevelName] = useState("");      // 選中的滑行程度名稱

    
    

    // 取得全部的雪場資料
    const getSkiHouse = async()=>{
        try {
            const res = await axios.get(`${BASE_URL}/skiResorts`);             
            setAllSkiHouses(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    // 取得全部的教練資料
    const getCoaches = async()=>{
        try {
            const res = await axios.get(`${BASE_URL}/coaches`);
            setAllCoaches(res.data);
        } catch (error) {
            console.error(error);
        }
    }

    // 取得全部的上課時間資料
    const getClassTime = async()=>{
        try {
            const res = await axios.get(`${BASE_URL}/classTimeType`);             
            setClassTime(Object.entries(res.data));
        } catch (error) {
            console.error(error);
        }
    }

    // 取得全部的滑行程度資料
    const getSkillLevel = async()=>{
        try {
            const res = await axios.get(`${BASE_URL}/studentSkiLevel`);             
            setSkillLevels(Object.entries(res.data));
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(()=>{
        init()
    },[]);

    useEffect(()=> {
        if (apiFinish) {
            getStorage();
            setInitFinish(true)
        }
    }, [apiFinish])
    
    const init = async () => {
        await getSkiHouse();
        await getCoaches();
        await getClassTime();
        await getSkillLevel();
        handleDate();
        setApiFinish(true)
    }

    let coachesData = [];
    // 篩選對應的雪場教練
    if (selectedSkiHouse){
        const filteredCoaches = allSkiHouses.filter((skiHouse)=>(skiHouse.id == selectedSkiHouse))[0]?.selectCoach;
        coachesData = allCoaches.filter((coach)=>filteredCoaches?.includes(coach.id));
    }

    const [selectedCoachPrice,setSelectedCoachPrice] = useState(0);
    const [coachImg,setCoachImg] = useState("");

    // 取得教練其他資訊(圖片、價格)
    const getCoachOtherData = (id)=>{
        const coach = allCoaches.find((coach)=> coach.id == id);
        setCoachImg(coach?.profileImg);
        setSelectedCoachPrice(coach?.charge);
    }

    // 取得雪場名稱
    const getSkiHouseName = (id) =>{
        const filterSkiHouse = allSkiHouses.find((skiHouse)=>skiHouse.id === id);
        if (filterSkiHouse){
            const { chineseName } = filterSkiHouse;
            setSelectedSkiHouseName(chineseName);
        }
    }

    // 取得教練名稱
    const getCoachName = (id) =>{
        const filterCoach = allCoaches.find((coach)=> coach.id == id );
        if (filterCoach){
            const { name } = filterCoach;
            setSelectedCoachName(name);
        }
    }

    // 取得課程時間名稱
    const getClassName = (classId) =>{
        const filterClassTime = classTime.find((item)=> item[0] === classId);
        if (filterClassTime){
            setSelectedClassName(filterClassTime[1].name);
        }
    }

    // 取得滑行程度名稱
    const getSkiLevelName = (id)=>{
        const filterSkiLevel = skillLevels.find((skiLevel)=>skiLevel[0] == id);
        if (filterSkiLevel){
            setSelectedSkillLevelName(filterSkiLevel[1]);
        }
    }

    // 監測到選擇的雪場更新時，教練資料更新為預設值-bbb
    const clearSkiHouseData = () => {
        setSelectedCoach("");
        setSelectedCoachName("");
        setCoachImg("");
        setSelectedCoachPrice(0);
    }

    const [startDate,setStartDate] = useState("");      // 開始日期設定
    const [endDate,setEndDate] = useState("");          // 結束日期設定

    const prevSelectedStartDate = useRef("");
    const prevSelectedEndDate = useRef("");
    
    const [selectedStartDate, setSelectedStartDate] = useState("");    // 下拉選單選中的開始日期 value
    const [selectedEndDate,setSelectedEndDate] = useState("");         // 下拉選單選中的結束日期 value
    const [selectedDate,setSelectedDate] = useState("");               // 下拉選單選中的日期 value
        

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
            const selectedHours = classTime.find((item)=> item[0] == selectedClass)?.[1].hours;   //  選擇上課時間的時數
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


    // 計算總金額
    const countTotalPrice = ()=>{
        const total = selectedCoachPrice*totalHours*selectedStudentNum;
        setTotalPrice(total);
    }

    useEffect(()=>{
        countTotalPrice();
    },[selectedCoachPrice,totalHours,selectedStudentNum])



    const [students,setStudents] = useState([]);    //學員資料

    // 更新學生資料
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

    const {order,setOrder} = useContext(OrderContext);

    // 把選擇的資料存到 orders 訂單裡
    const handleOrder = () => {
        const tmpOrder = {
            ...order,
            orderStatus:0,
            userId: 6,
            skiResortId: selectedSkiHouse,
            skiResortName: selectedSkiHouseName,          
            coachId: selectedCoach,
            coachPrice: selectedCoachPrice,
            coachName: selectedCoachName,
            class: {
                skiType: selectedSkiType,             
                timeType: selectedClass,
                timeTypeName: selectedClassName,                     
                date: ( selectedClass!== "allday" ? selectedDate: ""),               
                startDate: ( selectedClass == "allday" ? selectedStartDate: ""),    
                endDate: ( selectedClass == "allday" ? selectedEndDate: ""),      
                days: days                     
            },
            studentsData:{
                studentNum: selectedStudentNum,
                skiLevel: selectedSkillLevel,
                skiLevelName: selectedSkillLevelName,                
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
        if (initFinish) {
            handleOrder();
        }
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

    // 當 Storage 有資料時，則回填
    const getStorage = ()=>{
        const localOrder = localStorage.getItem('orderData');
        const storageOrder = localOrder && localOrder !=='undefined'? JSON.parse(localOrder): undefined;
        if (storageOrder && storageOrder !== undefined){
            if (order.skiResortId !== 0){

                setSelectedSkiHouse(storageOrder.skiResortId);
                setSelectedSkiHouseName(storageOrder.skiResortName);
                setSelectedCoach(Number(storageOrder.coachId));
                setSelectedSkiType(storageOrder.class?.skiType);
                setSelectedClassName(storageOrder.class?.timeTypeName)
                setSelectedClass(storageOrder.class?.timeType);
                setSelectedStudentNum(storageOrder.studentsData?.studentNum);
                setSelectedSkillLevel(storageOrder.studentsData?.skiLevel);
                setSelectedSkillLevelName(storageOrder.studentsData?.skiLevelName);
                setStudents(storageOrder.studentsData?.students);
                setSelectedDate(storageOrder.class?.date);
                setSelectedStartDate(storageOrder.class?.startDate);
                setSelectedEndDate(storageOrder.class?.endDate);
                setSelectedCoachName(storageOrder.coachName);
                setTotalPrice(storageOrder.paymentDetail?.total);
                
                setValue("snowHouse", Number(storageOrder.skiResortId),{ shouldValidate: true });
                setValue("skiCoach", Number(storageOrder.coachId),{ shouldValidate: true });
                setValue("snowBoard", storageOrder.class?.skiType, {shouldValidate: true});
                setValue("classTime", storageOrder.class?.timeType, {shouldValidate: true});
                setValue("numOfStudents", storageOrder.studentsData?.studentNum, {shouldValidate: true});
                setValue("level", storageOrder.studentsData?.skiLevel, {shouldValidate: true});
                setValue("date", storageOrder.class?.date, {shouldValidate: true});
                setValue("startDate", storageOrder.class?.startDate, {shouldValidate: true});
                setValue("endDate", storageOrder.class?.endDate, {shouldValidate: true});

                getCoachOtherData(Number(storageOrder.coachId))
            }
        }
    }

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
                    <form  
                        id="bookingForm" 
                        className="d-flex flex-column gap-5">
                        <div className="d-flex flex-column gap-4">
                            <h3 className="form-title text-brand-02 ps-4">預約課程</h3>
                            <div className="mb-3 form-section">
                                <div className="d-flex justify-content-between align-items-center">
                                    <label htmlFor="snowHouse" className="form-label mb-0">雪場</label>
                                    <select
                                        {...register('snowHouse',{
                                            required: "必選",
                                        })}
                                        value={selectedSkiHouse}
                                        onChange={(e)=>{
                                            setSelectedSkiHouse(Number(e.target.value));
                                            getSkiHouseName(Number(e.target.value));
                                            clearSkiHouseData();
                                            setValue("snowHouse", Number(e.target.value),{ shouldValidate: true });
                                        }}
                                        className={`form-select w-70 w-md-80 ${errors.snowHouse && 'is-invalid'}`}
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
                                <div className="d-flex align-items-center w-70 w-md-80 ms-auto">
                                    {
                                        errors.snowHouse && <p className="text-danger">{errors.snowHouse.message}</p>
                                    }
                                    <div className="form-text d-flex justify-content-end align-items-center select-info ms-auto">
                                        <span className="material-symbols-outlined icon-unfilled text-brand-02">help</span>
                                        <Link to={`/ski-house/${selectedSkiHouse}`} className="select-info-link" target="_blank">查看雪場資訊</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3 form-section">
                                <div className="d-flex justify-content-between align-items-center">
                                    <label htmlFor="snowBoard" className="form-label mb-0">類型</label>
                                    <select
                                        {...register('snowBoard',{
                                            required: "必選",
                                        })}
                                        value={selectedSkiType}
                                        onChange={(e)=>{
                                            setSelectedSkiType(e.target.value);
                                            setValue("snowBoard", e.target.value,{ shouldValidate: true });
                                        }}
                                        className={`form-select w-70 w-md-80 ${errors.snowBoard && 'is-invalid'}`}
                                        name="snowBoard" 
                                        id="snowBoard">
                                        <option value="" disabled>請選擇雪板類型</option>
                                        <option value="single">單板</option>
                                        <option value="double">雙板</option>
                                    </select>
                                </div>
                                <div className="d-flex align-items-center w-70 w-md-80 ms-auto">
                                    {
                                        errors.snowBoard && <p className="text-danger">{errors.snowBoard.message}</p>
                                    }
                                    <div className="form-text d-flex justify-content-end align-items-center select-info ms-auto">
                                        <span className="material-symbols-outlined icon-unfilled text-brand-02">help</span>
                                        <Link to='/' className="select-info-link" target="_blank">如何挑選</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3 form-section">
                                <div className="d-flex justify-content-between align-items-center">
                                    <label htmlFor="skiCoach" className="form-label mb-0">教練</label>
                                    <div className="w-70 w-md-80 d-flex">
                                        <div className="flex-shrink-0 me-3">
                                            <img 
                                                className="head-shot rounded-circle object-fit-cover" 
                                                src={selectedCoach ? coachImg : "person-icon.svg"}    
                                                alt="教練名"/>
                                        </div>
                                        <select
                                            {...register('skiCoach',{
                                                required: "必選",
                                            })}
                                            value={selectedCoach}
                                            onChange={(e)=>{
                                                setSelectedCoach(Number(e.target.value));
                                                getCoachName(Number(e.target.value));
                                                getCoachOtherData(Number(e.target.value));
                                                setValue("skiCoach", Number(e.target.value),{ shouldValidate: true });
                                            }} 
                                            className={`form-select ${errors.skiCoach && 'is-invalid'}`} 
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
                                <div className="d-flex align-items-center w-70 w-md-80 ms-auto">
                                    {
                                        errors.skiCoach && <p className="text-danger ms-60">{errors.skiCoach.message}</p>
                                    }
                                    <div className="form-text d-flex justify-content-end align-items-center select-info ms-auto">
                                        <span className="material-symbols-outlined icon-unfilled text-brand-02">help</span>
                                        <Link to={`/${selectedCoach}`} className="select-info-link" target="_blank">查看教練資訊</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3 form-section">
                                <div className="d-flex justify-content-between align-items-center">
                                    <label htmlFor="coachPrice" className="form-label mb-0">價格/每小時</label>
                                    <p className="form-control-plaintext w-70 w-md-80 fs-2 text-brand-02 fw-bold">JPY {selectedCoachPrice?.toLocaleString()}</p>
                                </div>
                            </div>
                            <div className="mb-3 form-section">
                                <div className="d-flex justify-content-between align-items-center">
                                    <label htmlFor="classTime" className="form-label mb-0">時間</label>
                                    <select
                                        {...register('classTime',{
                                            required: "必選",
                                        })}
                                        value={selectedClass}
                                        onChange={(e)=>{
                                            setSelectedClass(e.target.value);
                                            getClassName(e.target.value);
                                            setValue("classTime", e.target.value,{ shouldValidate: true });
                                        }} 
                                        className={`form-select w-70 w-md-80 ${errors.classTime && 'is-invalid'}`} 
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
                                <div className="d-flex align-items-center w-70 w-md-80 ms-auto">
                                    {
                                        errors.classTime && <p className="text-danger mt-1">{errors.classTime.message}</p>
                                    }
                                </div>
                            </div>
                            {
                                (selectedClass === "allday" || selectedClass === "") ? <>
                                    <div className="mb-3 form-section">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <label htmlFor="startDate" className="form-label mb-0">開始日期</label>
                                            <input
                                                {...register('startDate',{
                                                    required: selectedClass === "allday" ? "請選擇" : false,
                                                })}
                                                min={startDate}
                                                max={endDate}
                                                value={selectedStartDate}
                                                onChange={(e)=>{
                                                    handleSelectedStartDate(e);
                                                    setValue("startDate", e.target.value,{ shouldValidate: true });
                                                    handleValidateDate();
                                                }} 
                                                type="date" 
                                                className={`form-select w-70 w-md-80 ${errors.startDate && 'is-invalid'}`} 
                                                id="startDate"/>
                                        </div>
                                        <div className="d-flex align-items-center w-70 w-md-80 ms-auto">
                                            {
                                                errors.startDate && <p className="text-danger mt-1">{errors.startDate.message}</p>
                                            }
                                        </div>
                                    </div>
                                    <div className="mb-3 form-section">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <label htmlFor="endDate" className="form-label mb-0">結束日期</label>
                                            <input
                                                {...register("endDate",{
                                                    required: selectedClass === "allday" ? "請選擇" : false,
                                                })}
                                                min={startDate}
                                                max={endDate}
                                                value={selectedEndDate}
                                                onChange={(e)=>{
                                                    handleSelectedEndDate(e);
                                                    setValue("endDate", e.target.value,{ shouldValidate: true });
                                                    handleValidateDate();
                                                }}
                                                type="date" 
                                                className={`form-select w-70 w-md-80 ${errors.endDate && 'is-invalid'}`}
                                                id="endDate"/>
                                        </div>
                                        <div className="d-flex align-items-center w-70 w-md-80 ms-auto">
                                            {
                                                errors.endDate && <p className="text-danger mt-1">{errors.endDate.message}</p>
                                            }
                                        </div>
                                    </div>
                                </>
                             : <div className="mb-3 form-section">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <label htmlFor="date" className="form-label mb-0">日期</label>
                                        <input
                                            {...register('date',{
                                                required: selectedClass !== "allday" ? "請選擇" : false,
                                            })}
                                            min={startDate}
                                            max={endDate}
                                            value={selectedDate}
                                            onChange={(e)=>{
                                                setSelectedDate(e.target.value);
                                                setValue("date", e.target.value,{ shouldValidate: true });
                                                handleValidateDate();
                                            }}
                                            type="date" 
                                            className={`form-select w-70 w-md-80 ${errors.date && 'is-invalid'}`}
                                            id="date"/>
                                    </div>
                                    <div className="d-flex align-items-center w-70 w-md-80 ms-auto">
                                        {
                                            errors.date && <p className="text-danger mt-1">{errors.date.message}</p>
                                        }
                                    </div>
                            </div>
                            }
                            
                            
                        </div>
                        <div className="d-flex flex-column gap-4">
                            <div>    
                                <h3 className="form-title text-brand-02 ps-4 mb-3">學員資料</h3>
                                <p className=''>同班學員程度需一致，若有明顯差異，教練將以較初階程度為授課基準。</p>
                            </div>
                            <div className="mb-3 form-section">
                                <div className="d-flex justify-content-between align-items-center">
                                    <label htmlFor="numOfStudents" className="form-label mb-0">上課人數</label>
                                    <select
                                        {...register('numOfStudents',{
                                            required: "必選",
                                        })}
                                        value={selectedStudentNum}
                                        onChange={(e)=>{
                                            let newStudents
                                            if (Number(e.target.value) > Number(selectedStudentNum)) {
                                                let addCount =  Number(e.target.value) - Number(selectedStudentNum)
                                                newStudents = [...students, ...Array.from({length: addCount},()=>({
                                                    lastName: "",
                                                    firstName: "",
                                                    name:"",
                                                    gender: "",
                                                    age: "",
                                                    phone: ""
                                                }))]
                                            } else {
                                                newStudents = Array.from({length: Number(e.target.value)},()=>({
                                                    lastName: "",
                                                    firstName: "",
                                                    name:"",
                                                    gender: "",
                                                    age: "",
                                                    phone: ""
                                                }));
                                            }
                                            
                                            setStudents(newStudents);

                                            setSelectedStudentNum(Number(e.target.value));
                                            setValue("numOfStudents", Number(e.target.value),{ shouldValidate: true });
                                        }}
                                        className={`form-select w-70 w-md-80 ${errors.numOfStudents && 'is-invalid'}`}  
                                        name="numOfStudents" 
                                        id="numOfStudents">
                                        <option value="" disabled>請選擇人數</option>
                                        <option value="1">1 人</option>
                                        <option value="2">2 人</option>
                                        <option value="3">3 人</option>
                                        <option value="4">4 人</option>
                                        <option value="5">5 人</option>
                                        <option value="6">6 人</option>
                                    </select>
                                </div>
                                <div className="d-flex align-items-center w-70 w-md-80 ms-auto">
                                    {
                                        errors.numOfStudents && <p className="text-danger mt-1">{errors.numOfStudents.message}</p>
                                    }
                                </div>
                            </div>
                            <div className="mb-3 form-section">
                                <div className="d-flex justify-content-between align-items-center">
                                    <label htmlFor="level" className="form-label mb-0">滑行程度</label>
                                    <select
                                        {...register('level',{
                                            required: "必選",
                                        })}
                                        value={selectedSkillLevel}
                                        onChange={(e)=>{
                                            setSelectedSkillLevel(Number(e.target.value));
                                            getSkiLevelName(Number(e.target.value));
                                            setValue("level", Number(e.target.value),{ shouldValidate: true });
                                        }}
                                        className={`form-select w-70 w-md-80 ${errors.level && 'is-invalid'}`}
                                        name="level"
                                        id="level">
                                        <option value="" disabled>請選擇滑雪程度</option>
                                        {
                                            skillLevels.map((skillLevel)=>{
                                                return(<option key={skillLevel[0]} value={skillLevel[0]}>{skillLevel[1]}</option>)
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="d-flex align-items-center w-70 w-md-80 ms-auto">
                                    {
                                        errors.level && <p className="text-danger mt-1">{errors.level.message}</p>
                                    }
                                    <div className="form-text d-flex justify-content-end align-items-center select-info ms-auto">
                                        <span className="material-symbols-outlined icon-unfilled text-brand-02">help</span>
                                        <Link to='/' className="select-info-link" target="_blank">如何判定滑行程度</Link>
                                    </div>
                                </div>
                                
                            </div>
                            {/* 學員資料 */}
                            {
                                students?.map((student,index)=>{
                                    return(
                                        <div key={index} className="d-flex flex-column gap-4 pt-4 border-top">
                                            <h4 className="form-title text-brand-02 ps-4 mb-3 fs-5">{`學員 ${index+1}`}</h4>
                                            <div className="mb-3 form-section">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <label htmlFor={`lastName${index+1}`} className="form-label mb-0">姓名</label>
                                                    <div className="w-70 w-md-80 d-flex">
                                                        <input
                                                            {...register(`lastName${index+1}`,{
                                                                required: "必填",
                                                            })}
                                                            value={student.lastName}
                                                            onChange={(e)=>{
                                                                handleStudentsData(index, "lastName", e.target.value);
                                                                setValue(`lastName${index+1}`, e.target.value,{ shouldValidate: true });
                                                            }}
                                                            type="text" 
                                                            className={`form-control w-25 me-3 ${errors[`lastName${index+1}`] && 'is-invalid'}`} 
                                                            id={`lastName${index+1}`} 
                                                            placeholder="姓氏" />
                                                        <input
                                                            {...register(`firstName${index+1}`,{
                                                                required: "必填",
                                                            })}
                                                            value={student.firstName}
                                                            onChange={(e)=>{
                                                                handleStudentsData(index, "firstName", e.target.value);
                                                                setValue(`firstName${index+1}`, e.target.value,{ shouldValidate: true });
                                                            }}
                                                            type="text"
                                                            id={`firstName${index+1}`}
                                                            className={`form-control w-75 ${errors[`firstName${index+1}`] && 'is-invalid'}`} 
                                                            placeholder="姓名" />
                                                    </div>
                                                </div>
                                                <div className="w-70 w-md-80 d-flex ms-auto">
                                                    {
                                                        errors[`lastName${index+1}`] && <p className="text-danger w-25 me-3 mt-1">{errors[`lastName${index+1}`].message}</p>
                                                    }
                                                    {
                                                        errors[`firstName${index+1}`] && <p className="text-danger ms-auto mt-1" style={{width:"calc(75% - 16px)"}}>{errors[`firstName${index+1}`].message}</p>
                                                    }
                                                </div>
                                            </div>
                                            <div className="mb-3 form-section">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <label htmlFor={`sex${index+1}`} className="form-label mb-0">性別</label>
                                                    <select
                                                        {...register(`sex${index+1}`,{
                                                            required: "必選",
                                                        })}
                                                        value={student.gender}
                                                        onChange={(e)=>{
                                                            handleStudentsData(index, "gender", e.target.value);
                                                            setValue(`sex${index+1}`, e.target.value,{ shouldValidate: true });
                                                        }}
                                                        className={`form-select w-70 w-md-80 ${errors[`sex${index+1}`] && 'is-invalid'}`}
                                                        name={`sex${index+1}`} 
                                                        id={`sex${index+1}`} >
                                                        <option value="" disabled>請選擇性別</option>
                                                        <option value="male">男</option>
                                                        <option value="female">女</option>
                                                    </select>
                                                </div>
                                                <div className="d-flex align-items-center w-70 w-md-80 ms-auto">
                                                    {
                                                        errors[`sex${index+1}`] && <p className="text-danger mt-1">{errors[`sex${index+1}`].message}</p>
                                                    }
                                                </div>
                                            </div>
                                            <div className="mb-3 form-section">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <label htmlFor={`age${index+1}`} className="form-label mb-0">年齡</label>
                                                    <input
                                                        {...register(`age${index+1}`,{
                                                            required: "必填",
                                                            min: {
                                                                value: 1,
                                                                message: "請輸入真實年齡"
                                                            },
                                                            max: {
                                                                value: 200,
                                                                message: "請輸入真實年齡"
                                                            },
                                                        })}
                                                        min="1"
                                                        max="200"
                                                        value={student.age}
                                                        onChange={(e)=>{
                                                            handleStudentsData(index, "age", e.target.value);
                                                            setValue(`age${index+1}`, e.target.value,{ shouldValidate: true });
                                                        }}
                                                        type="number" 
                                                        className={`form-control w-70 w-md-80 ${errors[`age${index+1}`] && 'is-invalid'}`}
                                                        name={`age${index+1}`}
                                                        id={`age${index+1}`}
                                                        placeholder="請輸入真實年齡" />
                                                </div>
                                                <div className="d-flex align-items-center w-70 w-md-80 ms-auto">
                                                    {
                                                        errors[`age${index+1}`] && <p className="text-danger mt-1">{errors[`age${index+1}`].message}</p>
                                                    }
                                                </div>
                                            </div>
                                            <div className="mb-3 form-section">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <label htmlFor={`phone${index+1}`} className="form-label mb-0">聯絡電話</label>
                                                    <input
                                                        {...register(`phone${index+1}`,{
                                                            required: "必填",
                                                            pattern: {
                                                                value: /^(0[2-8]\d{7,8}|09\d{8})$/,
                                                                message: '格式錯誤'
                                                            }
                                                        })}
                                                        value={student.phone}
                                                        onChange={(e)=>{
                                                            handleStudentsData(index, "phone", e.target.value);
                                                            setValue(`phone${index+1}`, e.target.value,{ shouldValidate: true });
                                                        }}
                                                        type="tel" 
                                                        className={`form-control w-70 w-md-80 ${errors[`phone${index+1}`] && 'is-invalid'}`}
                                                        name={`phone${index+1}`}
                                                        id={`phone${index+1}`}
                                                        placeholder="請輸入手機號碼09或市話" />
                                                </div>
                                                <div className="d-flex align-items-center w-70 w-md-80 ms-auto">
                                                    {
                                                        errors[`phone${index+1}`] && <p className="text-danger mt-1">{errors[`phone${index+1}`].message}</p>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    )
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
                                        <td className="text-end border-0 px-0 pt-4">{`JPY ${selectedCoachPrice?.toLocaleString()}`}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="border-0 px-0 pt-3 fw-normal">時數</th>
                                        <td className="text-end border-0 px-0 pt-3">{totalHours} 小時</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="border-0 px-0 pt-3 pb-3 fw-normal">人數</th>
                                        <td className="text-end border-0 px-0 pt-3 pb-4">{selectedStudentNum ? selectedStudentNum : 0}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="d-flex justify-content-between mt-4">
                                <p className="mb-0 fs-4">總金額</p>
                                <p className="mb-0 fs-3 fw-bold text-brand-02">JPY {totalPrice?.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                </div>  
            </div>
            <div className="d-flex justify-content-center mt-4 mt-lg-5 mb-5 mb-lg-60">
                <button 
                    type="button"
                    form="bookingForm"
                    onClick={()=>{
                        handleSubmit(onSubmit)();
                        handleOrder();
                    }}
                    className="btn-custom btn-custom-filled w-lg-25 w-md-50 w-xs-100 text-nowrap">
                    下一步
                </button>
            </div>
        </div>
        </>
    )
}