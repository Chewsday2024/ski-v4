import { Outlet } from 'react-router';
import './App.scss';
import Header from './layout/Header';
import Footer from './layout/Footer';
import ScrollToTop from './components/ScrollToTop';
import { OrderContext } from './pages/order/BookingPage';


// import AboutLoading from './component/AboutLoading';


function App() {
  return (
    <div className='d-flex flex-column justify-content-between vh-100'>
      <Header />
        <OrderContext.Provider>
          <Outlet />
          <ScrollToTop/>
          {/* <AboutLoading/> */}
        </OrderContext.Provider>
      <Footer />
    </div>
  )
}

export default App
