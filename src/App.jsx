import { Outlet } from 'react-router';
import './App.scss';
import Header from './layout/Header';
import Footer from './layout/Footer';
import ScrollToTop from './components/ScrollToTop';
import { useEffect, useState } from 'react';
import { OrderContext } from './pages/order/BookingPage';
import defaultOrder from './pages/order/BookingPage';

// import AboutLoading from './component/AboutLoading';


function App() {
  // 預約教練訂單資料
  // 初始化時，從 localStorage 取得資料，若無則使用預設值
  const [order,setOrder] = useState(()=>{
    const localOrder = localStorage.getItem('orderData');
    return localOrder ? JSON.parse(localOrder) : defaultOrder;
  });

  // 當 order 更新時，將資料存入 localStorage
  useEffect(() => {
    localStorage.setItem('orderData', JSON.stringify(order));
  }, [order]);

  const [allSkiHouses, setAllSkiHouses] = useState([]); //全部的雪場資料
  const [allCoaches, setAllCoaches] = useState([]);   // 全部的教練資料
  const [classTime, setClassTime] = useState([]);     // 課程時間選項
  const [skillLevels,setSkillLevels] = useState([]);  // 學員滑雪程度選項

  return (
    <div className='d-flex flex-column justify-content-between vh-100'>
      <Header />
          <OrderContext.Provider 
            value={{order,setOrder,classTime,setClassTime,allCoaches,setAllCoaches,allSkiHouses,setAllSkiHouses,skillLevels,setSkillLevels}}>
            <Outlet />
            <ScrollToTop/>
            {/* <AboutLoading/> */}
          </OrderContext.Provider>
      {/* <Footer /> */}
    </div>
  )
}

export default App
