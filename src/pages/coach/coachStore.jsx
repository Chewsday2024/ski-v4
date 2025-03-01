import { configureStore } from "@reduxjs/toolkit";


import coachpageReducer from './coachComps/coachPage/coachpageSlice';



const coachStore = configureStore({
  reducer: {
    coachPage: coachpageReducer
  }
})




export default coachStore;