import { Outlet } from 'react-router';
import { useSelector } from 'react-redux';





import SerchInput from './coachComps/SearchInput';





import './Coach.scss';
import { getPageIsOpenStatus } from './coachComps/coachPage/coachpageSlice';





function Coach() {

  const pageIsOpen = useSelector(getPageIsOpenStatus);
  

  return (
    <div className='bg-gray-05'>
      <div className={`container my-3 ${pageIsOpen ? 'd-none' : 'd-block'}`}>
        <div className='d-flex flex-column align-items-center'>
          <h1 className='text-brand-01'>教練總覽</h1>
          
          <SerchInput />
          
          
        </div>
      </div>

      <Outlet />
    </div>
  )
}

export default Coach