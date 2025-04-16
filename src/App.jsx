import { Outlet } from 'react-router';
import './App.scss';
import ScrollToTop from './components/ScrollToTop';
import { useEffect, useState } from 'react';
// import { OrderContext } from './pages/order/BookingPage';
// import defaultOrder from './pages/order/BookingPage';
import { OrderContext } from './pages/order/OrderContext';
import { defaultOrder } from './pages/order/DefaultOrder';
// import AboutLoading from './component/AboutLoading';


function App() {
  
  // 預約教練訂單資料
  // 初始化時，從 localStorage 取得資料，若無則使用預設值
  const [order,setOrder] = useState(()=>{
    const localOrder = localStorage.getItem('orderData');
    return localOrder && localOrder !== 'undefined'  ? JSON.parse(localOrder) : defaultOrder;
  });

  // 當 order 更新時，將資料存入 localStorage
  useEffect(() => {
    localStorage.setItem('orderData', JSON.stringify(order));
  }, [order]);

  const [errorMessage,setErrorMessage] = useState("");    //紀錄錯誤訊息

  return (
    <div className='d-flex flex-column justify-content-between min-vh-100'>
      <OrderContext.Provider 
        value={{order,setOrder,errorMessage,setErrorMessage}}>
        <Outlet />
        <ScrollToTop/>
        {/* <AboutLoading/> */}
      </OrderContext.Provider>
    </div>
  )
}

export default App
