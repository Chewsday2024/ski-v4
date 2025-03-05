import { configureStore } from "@reduxjs/toolkit";


import coachpageReducer from './coachComps/coachPage/coachpageSlice';
import coachlistReducer from './coachComps/coachlist/coachlistSlice';



const coachStore = configureStore({
  reducer: {
    coachPage: coachpageReducer,
    coachList: coachlistReducer
  }
})




export default coachStore;