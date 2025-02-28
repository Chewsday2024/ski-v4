import { Outlet } from 'react-router';
import { Provider } from 'react-redux';





import SerchInput from './coachComps/SearchInput';
import store from './store';




import './Coach.scss';





function Coach() {
  

  return (
    <Provider store={store}>
      <div className='bg-gray-05'>
        <div className='container my-3 '>
          <div className='d-flex flex-column align-items-center'>
            <h1 className='text-brand-01'>教練總覽</h1>
            
            <SerchInput />
            
            
          </div>
        </div>

        <Outlet />
      </div>
    </Provider>
  )
}

export default Coach