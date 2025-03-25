import { useRef, useState } from 'react';
import CoachList from './coachlist/CoachList';



import { InputValue } from '../coachContext';



import './SearchInput.scss'




function SerchInput() {
  const sexRef = useRef(null);
  const chargeRef = useRef(null);
  const boardRef = useRef(null);
  const houseRef = useRef(null);
  const keyWordRef = useRef(null);

  const [ allValue, setAllValue ] = useState({sex : '',
                                              charge : '',
                                              board : '',
                                              house : '',
                                              keyWord : ''});

  
    
  return (
    <InputValue.Provider value={{allValue}}>
      <div className='w-100 d-flex flex-lg-row flex-column justify-content-center gap-3 mt-5'>
        <select className="form-select w-auto" ref={sexRef}>
          <option value=''>性別</option>
          <option value="男">男性</option>
          <option value="女">女性</option>
        </select>
        
        <select className="form-select w-auto" ref={chargeRef}>
          <option value=''>收費</option>
          <option value="chargeLV1">10,000以下</option>
          <option value="chargeLV2">10,000 ~ 15,000</option>
          <option value="chargeLV3">15,000 ~ 20,000</option>
          <option value="chargeLV4">20,000 以上</option>
        </select>

        <select className="form-select w-auto" ref={boardRef}>
          <option value=''>雪板類別</option>
          <option value="單板">單板</option>
          <option value="雙板">雙板</option>
        </select>

        <select className="form-select w-auto" ref={houseRef}>
          <option value=''>教課雪場</option>
          <option value="house1">藏王溫泉滑雪場</option>
          <option value="house2">安比高原滑雪場</option>
          <option value="house3">富良野滑雪場</option>
          <option value="house4">湯澤中里滑雪場</option>
          <option value="house5">野澤溫泉滑雪場</option>
        </select>


        <input className='form-control' defaultValue='' type="text" placeholder='🔎關鍵字...' ref={keyWordRef} />

        <button className='btn btn-brand-01 search-btn' onClick={() => {
          setAllValue(pre => ({
            ...pre,
            sex : sexRef.current.value,
            charge : chargeRef.current.value,
            board : boardRef.current.value,
            house : houseRef.current.value,
            keyWord : keyWordRef.current.value
            
          }));
        }}>搜尋</button>
      </div>

      

      <CoachList />



    </InputValue.Provider>
  )
  
}

export default SerchInput;