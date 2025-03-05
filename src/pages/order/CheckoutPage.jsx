import { Link, useNavigate } from 'react-router';
import './Order.scss';
import { useContext, useEffect, useState } from 'react';
import { OrderContext } from './BookingPage';
import axios from 'axios';

export default function CheckoutPage(){

    const BASE_URL = "http://localhost:3000";

    const { order,setOrder,classTime,allCoaches,allSkiHouses,skillLevels } = useContext(OrderContext);

    const filterClassTime = classTime.find((item)=> item[0] === order.class.timeType);
    const filterCoach = allCoaches.find((coach)=> coach.id == order.coachId );
    const filterSkiHouse = allSkiHouses.find((skiHouse)=>skiHouse.id == order.skiResortId);
    const filterSkiLevel = skillLevels.find((skiLevel)=>skiLevel[0] == order.studentsData.skiLevel);


    const [payments,setPayments] = useState([]);    //付款方式

    const [checkedPayment,setCheckedPayment] = useState("");   //勾選中的付款方式 value
    const [inputContactData,setInputContactData] = useState({
        lastName: "",
        firstName: "",
        email: "",
        phone: "",
        lineId: "",
        note: ""
    })
    const [isChecked,setIsChecked] = useState(false);       //是否勾選同意條款  
    const { setErrorMessage } = useContext(OrderContext); //錯誤訊息

    // console.log("付款方式",payments,"長度",payments.length);
    // console.log("被選中的",checkedPayment);
    // console.log("聯繫方式",inputContactData);
    // console.log("是否同意",isChecked);
    
    // console.log("訂單資料",order);

    const orderNavigate = useNavigate();

    useEffect(()=>{
        const getPayments = async()=>{
            try {
                const res = await axios.get(`${BASE_URL}/paymentWays`);             
                setPayments(Object.entries(res.data));
            } catch (error) {
                console.log(error);
            }
        }
        getPayments();
    },[]);

    const handleContact = (e)=>{
        const {name, value} = e.target;
        setInputContactData((contact)=>({
            ...contact,
            [name]: value
        }))
    }

    const getSubmitTime = ()=>{
        const now = new Date();
        return now.toLocaleString();
    }

    // 把填入的資料更新存到 orders 訂單裡
    const updateOrder = () => {
        const tmpOrder = {
            ...order,
            orderTime: getSubmitTime(),
            contactInfo: {
                name: inputContactData.lastName+inputContactData.firstName,
                phone: inputContactData.phone,
                email: inputContactData.email,
                lineId: inputContactData.lineId,
                note: inputContactData.note
            },
            is_checked: isChecked,
            paymentMethod: checkedPayment,
            isPaid: true
        }
        setOrder(tmpOrder);
    }

    useEffect(()=>{
        updateOrder();
    },[inputContactData,isChecked,checkedPayment])

    const addOrder = async()=>{
        try {
            const res = await axios.post(`${BASE_URL}/orders`,order);
            orderNavigate("/checkout-success");
        } catch (error) {
            console.log(error);
            if (error.response.status === 404){
                setErrorMessage("404 網路連線問題，請重新嘗試");
                orderNavigate("/checkout-fail");
            }
        }
    }

    // console.log("step2預約資料",filterCoach);
    return (
        <div className="container">
            {/* PC Step flow */}
            <div className="row justify-content-center">
                <div className="col-lg-8 col">
                    <div className="d-none d-md-block">
                        <div className="d-flex justify-content-between step-sec">
                            <div className="d-flex">
                                <span className="step-circle d-flex justify-content-center align-items-center">1</span>
                                <h2 className="fs-4 ms-3 text-gray-03">填寫預約資料</h2>
                            </div>
                            <span className="material-symbols-outlined d-flex justify-content-center align-items-center  text-gray-03">play_arrow</span>
                            <div className="d-flex">
                                <span className="step-circle active d-flex justify-content-center align-items-center">2</span>
                                <h2 className="fs-4 ms-3 text-brand-01">填寫聯繫方式與付款</h2>
                            </div>
                            <span className="material-symbols-outlined d-flex justify-content-center align-items-center text-brand-01">play_arrow</span>
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
                            <li className="d-flex flex-column align-items-center">
                                <span className="step-circle mobile-step-number d-flex justify-content-center align-items-center mb-3">1</span>
                                <h2 className="fs-6 text-gray-03 text-nowrap d-none">填寫預約資料</h2>
                            </li>
                            <li className="d-flex flex-column align-items-center step-active">
                                <span className="step-circle active d-flex justify-content-center align-items-center mb-3">2</span>
                                <h2 className="fs-6 text-brand-01 text-nowrap">填寫聯繫方式與付款</h2>
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
                <div className="col-12">
                    <form action="" className="d-flex flex-column gap-5">
                        {/* 區塊：預約課程 */}
                        <div className="d-flex flex-column gap-4">
                            <h3 className="form-title text-brand-02 ps-4">預約課程</h3>
                            <div className="d-flex justify-content-between flex-wrap gap-4">
                                <div className="w-xs-100 w-lg-40 d-flex flex-column gap-4">
                                    <div className="mb-3 form-section">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <label htmlFor="" className="form-label mb-0">日期</label>
                                            <p className="form-control-plaintext w-70 w-md-80 fw-bold">
                                                {order.class.timeType === "allday" 
                                                    ? (order.class.startDate !== order.class.endDate) ? `${order.class.startDate} ～ ${order.class.endDate}`: order.class.startDate
                                                    : order.class.date}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mb-3 form-section">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <label htmlFor="" className="form-label mb-0">時間</label>
                                            <p className="form-control-plaintext w-70 w-md-80  fw-bold">
                                                {filterClassTime && filterClassTime[1]?.name}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mb-3 form-section">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <label htmlFor="" className="form-label mb-0">天數</label>
                                            <p className="form-control-plaintext w-70 w-md-80  fw-bold">{order.class.days} 天</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-xs-100 w-lg-40 d-flex flex-column gap-4 lower-part">
                                    <div className="mb-3 form-section">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <label htmlFor="" className="form-label mb-0">雪場</label>
                                            <p className="form-control-plaintext w-70 w-md-80  fw-bold">
                                                {filterSkiHouse && filterSkiHouse.chineseName}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mb-3 form-section">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <label htmlFor="" className="form-label mb-0">類型</label>
                                            <p className="form-control-plaintext w-70 w-md-80  fw-bold">
                                                {order.class.skiType === "single" ? "單板":"雙板"}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mb-3 form-section">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <label htmlFor="" className="form-label mb-0">教練</label>
                                            <p className="form-control-plaintext w-70 w-md-80  fw-bold">
                                                {filterCoach && filterCoach.name}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>   
                        </div>
                        {/* 區塊：學員資料 */}
                        <div className="d-flex flex-column gap-4">
                            <div>    
                                <h3 className="form-title text-brand-02 ps-4 mb-3">學員資料</h3>
                                <p className="">同班學員程度需一致，若有明顯差異，教練將以較初階程度為授課基準。</p>
                            </div>
                            <div className="mb-3 form-section">
                                <div className="d-flex justify-content-between align-items-center">
                                    <label htmlFor="" className="form-label mb-0">上課人數</label>
                                    <p className="form-control-plaintext w-70 w-md-80  fw-bold">{order.studentsData.studentNum} 人</p>
                                </div>
                            </div>
                            <div className="mb-3 form-section">
                                <div className="d-flex justify-content-between align-items-center">
                                    <label htmlFor="" className="form-label mb-0">滑行程度</label>
                                    <p className="form-control-plaintext w-70 w-md-80  fw-bold">{filterSkiLevel?.[1]}</p>
                                </div>
                            </div>
                            {/* 區塊：學員資料明細 */}
                            <div className="mb-3 form-section">
                                <div className="row g-3">
                                    {
                                        order.studentsData.students.map((student,index)=>{
                                            return (<>
                                                <div className="col-12 col-md-6 col-lg-4">
                                                    <div className="card border-0">
                                                        <h5 className="card-title text-center border border-brand-02 bg-brand-02 text-white border-radius-top-20 p-3 mb-0">學員 {index+1}</h5>
                                                        <div className="card-body border border-brand-02">
                                                            <div className="card-text d-flex justify-content-between align-items-center mb-2">
                                                                <label htmlFor="" className="form-label mb-0">姓名</label>
                                                                <p className="form-control-plaintext w-50 fw-bold">{student.name}</p>
                                                            </div>
                                                            <div className="card-text d-flex justify-content-between align-items-center mb-2">
                                                                <label htmlFor="" className="form-label mb-0">性別</label>
                                                                <p className="form-control-plaintext w-50 fw-bold">
                                                                    {student.gender === "male" ? "男" : "女"}
                                                                </p>
                                                            </div>
                                                            <div className="card-text d-flex justify-content-between align-items-center mb-2">
                                                                <label htmlFor="" className="form-label mb-0">年齡</label>
                                                                <p className="form-control-plaintext w-50 fw-bold">{student.age}</p>
                                                            </div>
                                                            <div className="card-text d-flex justify-content-between align-items-center mb-2">
                                                                <label htmlFor="" className="form-label mb-0">聯絡電話</label>
                                                                <p className="form-control-plaintext w-50 fw-bold">{student.phone}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>)
                                        })
                                    }
                                    {/* <div className="col-12 col-md-6 col-lg-4">
                                        <div className="card border-0">
                                            <h5 className="card-title text-center border border-brand-02 bg-brand-02 text-white border-radius-top-20 p-3 mb-0">學員 1</h5>
                                            <div className="card-body border border-brand-02">
                                                <div className="card-text d-flex justify-content-between align-items-center mb-2">
                                                    <label htmlFor="" className="form-label mb-0">姓名</label>
                                                    <p className="form-control-plaintext w-50 fw-bold">周秉倫</p>
                                                </div>
                                                <div className="card-text d-flex justify-content-between align-items-center mb-2">
                                                    <label htmlFor="" className="form-label mb-0">性別</label>
                                                    <p className="form-control-plaintext w-50 fw-bold">男</p>
                                                </div>
                                                <div className="card-text d-flex justify-content-between align-items-center mb-2">
                                                    <label htmlFor="" className="form-label mb-0">年齡</label>
                                                    <p className="form-control-plaintext w-50 fw-bold">33</p>
                                                </div>
                                                <div className="card-text d-flex justify-content-between align-items-center mb-2">
                                                    <label htmlFor="" className="form-label mb-0">聯絡電話</label>
                                                    <p className="form-control-plaintext w-50 fw-bold">0988123456</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-4">
                                        <div className="card border-0">
                                            <h5 className="card-title text-center border border-brand-02 bg-brand-02 text-white border-radius-top-20 p-3 mb-0">學員 1</h5>
                                            <div className="card-body border border-brand-02">
                                                <div className='card-text d-flex justify-content-between align-items-center mb-2'>
                                                    <label htmlFor="" className="form-label mb-0">姓名</label>
                                                    <p className='form-control-plaintext w-50 fw-bold'>周秉倫</p>
                                                </div>
                                                <div className='card-text d-flex justify-content-between align-items-center mb-2'>
                                                    <label htmlFor="" className="form-label mb-0">性別</label>
                                                    <p className='form-control-plaintext w-50 fw-bold'>男</p>
                                                </div>
                                                <div className='card-text d-flex justify-content-between align-items-center mb-2'>
                                                    <label htmlFor="" className="form-label mb-0">年齡</label>
                                                    <p className='form-control-plaintext w-50 fw-bold'>33</p>
                                                </div>
                                                <div className='card-text d-flex justify-content-between align-items-center mb-2'>
                                                    <label htmlFor="" className="form-label mb-0">聯絡電話</label>
                                                    <p className='form-control-plaintext w-50 fw-bold'>0988123456</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-4">
                                        <div className="card border-0">
                                            <h5 className="card-title text-center border border-brand-02 bg-brand-02 text-white border-radius-top-20 p-3 mb-0">學員 1</h5>
                                            <div className="card-body border border-brand-02">
                                                <div className='card-text d-flex justify-content-between align-items-center mb-2'>
                                                    <label htmlFor="" className="form-label mb-0">姓名</label>
                                                    <p className='form-control-plaintext w-50 fw-bold'>周秉倫</p>
                                                </div>
                                                <div className='card-text d-flex justify-content-between align-items-center mb-2'>
                                                    <label htmlFor="" className="form-label mb-0">性別</label>
                                                    <p className='form-control-plaintext w-50 fw-bold'>男</p>
                                                </div>
                                                <div className='card-text d-flex justify-content-between align-items-center mb-2'>
                                                    <label htmlFor="" className="form-label mb-0">年齡</label>
                                                    <p className='form-control-plaintext w-50 fw-bold'>33</p>
                                                </div>
                                                <div className='card-text d-flex justify-content-between align-items-center mb-2'>
                                                    <label htmlFor="" className="form-label mb-0">聯絡電話</label>
                                                    <p className='form-control-plaintext w-50 fw-bold'>0988123456</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-4">
                                        <div className="card border-0">
                                            <h5 className="card-title text-center border border-brand-02 bg-brand-02 text-white border-radius-top-20 p-3 mb-0">學員 1</h5>
                                            <div className="card-body border border-brand-02">
                                                <div className='card-text d-flex justify-content-between align-items-center mb-2'>
                                                    <label htmlFor="" className="form-label mb-0">姓名</label>
                                                    <p className='form-control-plaintext w-50 fw-bold'>周秉倫</p>
                                                </div>
                                                <div className='card-text d-flex justify-content-between align-items-center mb-2'>
                                                    <label htmlFor="" className="form-label mb-0">性別</label>
                                                    <p className='form-control-plaintext w-50 fw-bold'>男</p>
                                                </div>
                                                <div className='card-text d-flex justify-content-between align-items-center mb-2'>
                                                    <label htmlFor="" className="form-label mb-0">年齡</label>
                                                    <p className='form-control-plaintext w-50 fw-bold'>33</p>
                                                </div>
                                                <div className='card-text d-flex justify-content-between align-items-center mb-2'>
                                                    <label htmlFor="" className="form-label mb-0">聯絡電話</label>
                                                    <p className='form-control-plaintext w-50 fw-bold'>0988123456</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}

                                </div>
                            </div>
                            
                        </div>
                        {/* 區塊：付款 */}
                        <div className="row gap-4">
                            {/* 付款明細 */}
                            <div className="col-lg-8 col-12">
                                <div className='d-flex flex-column gap-4'> 
                                    <h3 className="form-title text-brand-02 ps-4">付款明細</h3>
                                    <div className="mb-3 form-section">
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <label htmlFor="" className="form-label mb-0">價格/每小時</label>
                                            <p className='form-control-plaintext w-70 w-md-80  fw-bold'>
                                                {filterCoach?.charge ? `JPY ${filterCoach.charge.toLocaleString()}` : `JPY 0`}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mb-3 form-section">
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <label htmlFor="" className="form-label mb-0">時數</label>
                                            <p className='form-control-plaintext w-70 w-md-80  fw-bold'>{order.paymentDetail.hours} 小時</p>
                                        </div>
                                    </div>
                                    <div className="mb-3 form-section">
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <label htmlFor="" className="form-label mb-0">人數</label>
                                            <p className='form-control-plaintext w-70 w-md-80  fw-bold'>{order.studentsData.studentNum} 人</p>
                                        </div>
                                    </div>
                                    <div className="mb-3 form-section">
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <label htmlFor="" className="form-label mb-0 fs-4">總金額</label>
                                            <p className='form-control-plaintext w-70 w-md-80  fw-bold fs-3 text-brand-01'>JPY {order.paymentDetail.total.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* 區塊：付款方式 */}
                            <div className="col-lg-4 col-12">
                                <div className='d-flex flex-column gap-4'> 
                                    <h3 className="form-title text-brand-02 ps-4">付款方式</h3>
                                    <div className="mb-3 form-section">
                                        {
                                            payments.map((payment,index)=>{
                                                return(
                                                    <>
                                                        <div key={index} className="form-check mb-3">
                                                            <input 
                                                                value={payment[1].id}
                                                                onChange={(e)=>{
                                                                    setCheckedPayment(Number(e.target.value));
                                                                }}
                                                                className="form-check-input" 
                                                                type="radio" 
                                                                name="payments" 
                                                                id={`payment${index+1}`} />
                                                            <label className="form-check-label" htmlFor={`payment${index+1}`}>
                                                                {payment[1].name}
                                                            </label>
                                                        </div>
                                                    </>
                                                )
                                            })
                                        }
                                    </div>
                                </div>    
                            </div>
                        </div>
                        {/* 區塊：聯繫方式 */}
                        <div className="row">
                            <div className="col-lg-8 col-12">
                                <div className='d-flex flex-column gap-4'>
                                    <h3 className="form-title text-brand-02 ps-4">聯繫方式</h3>
                                    <div className="mb-3 form-section">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <label htmlFor="contactLastName" className="form-label mb-0">姓名</label>
                                            <div className="w-70 w-md-80 d-flex">
                                                <input
                                                    value={inputContactData.lastName}
                                                    onChange={handleContact} 
                                                    name="lastName" 
                                                    type="text" 
                                                    className="form-control w-25 me-3" 
                                                    id="contactLastName"
                                                    placeholder="姓氏" />
                                                <input
                                                    value={inputContactData.firstName}
                                                    onChange={handleContact} 
                                                    name="firstName"  
                                                    type="text"
                                                    className="form-control w-75" 
                                                    placeholder="姓名" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3 form-section">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <label htmlFor="contactPhone" className="form-label mb-0">聯絡電話</label>
                                            <input
                                                value={inputContactData.phone}
                                                onChange={handleContact} 
                                                name="phone"   
                                                type="tel" 
                                                className="form-control w-70 w-md-80"  
                                                id="contactPhone" 
                                                placeholder="09xxxxxxxx" />
                                        </div>
                                    </div>
                                    <div className="mb-3 form-section">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <label htmlFor="email" className="form-label mb-0">E-mail</label>
                                            <input
                                                value={inputContactData.email}
                                                onChange={handleContact}  
                                                type="email" 
                                                className="form-control w-70 w-md-80" 
                                                name="email" 
                                                id="email" 
                                                placeholder="xxx@xxx.xxx" />
                                        </div>
                                    </div>
                                    <div className="mb-3 form-section">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <label htmlFor="lineId" className="form-label mb-0">LINE ID</label>
                                            <input
                                                value={inputContactData.lineId}
                                                onChange={handleContact} 
                                                type="text" 
                                                className="form-control w-70 w-md-80" 
                                                name="lineId" 
                                                id="lineId" 
                                                placeholder="" />
                                        </div>
                                    </div>
                                    <div className="mb-3 form-section">
                                        <div className="d-flex justify-content-between align-items-start">
                                            <label htmlFor="note" className="form-label mb-0">備註</label>
                                            <textarea
                                                value={inputContactData.note}
                                                onChange={handleContact} 
                                                className="form-control w-70 w-md-80"
                                                name="note" 
                                                id="note" 
                                                rows="3" 
                                                placeholder="如有其他特殊需求，可以跟我們說唷！"></textarea>
                                        </div>
                                    </div>
                                    <div className="mb-3 form-section">
                                        <div className="d-flex align-items-center">
                                            <input 
                                                onChange={(e)=>{
                                                    setIsChecked(e.target.checked)
                                                }} 
                                                className="form-check-input mt-0 me-3" 
                                                type="checkbox"
                                                name="isAgreed" 
                                                id="isAgreed" />
                                            <label htmlFor="isAgreed" className="form-label mb-0 w-70 w-md-80 text-nowrap">本人已詳閱並同意
                                                <Link to='/' className="text-brand-02 text-md-20">預約訂單注意事項</Link>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        
                    </form>
                    
                </div>  
            </div>
            <div className="d-flex justify-content-center flex-wrap gap-3 mt-4 mt-lg-5 mb-5 mb-lg-60">
                <Link to='/booking' className="btn-custom btn-custom-unfilled w-lg-25 w-md-50 w-xs-100 text-nowrap">上一步</Link>
                <Link 
                    className="btn-custom btn-custom-filled w-lg-25 w-md-50 w-xs-100 text-nowrap"
                    onClick={()=>{
                        addOrder();
                        localStorage.removeItem('orderData');
                    }}>付款去
                </Link>
            </div>
        </div>
    )
}