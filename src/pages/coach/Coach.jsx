import { Outlet } from 'react-router';





import SerchInput from './coachComps/SearchInput';





import './Coach.scss';






function Coach() {
  

  return (
    <div className='bg-gray-05'>
      <div className={`container my-5`}>
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