import { createSlice } from '@reduxjs/toolkit';
 
 
 
const initialState = { 
  coachPage: {},
  pageIsOpen: false,
  status: 'idle',
  error: null
};
 
 
 
const coachpageSlice = createSlice({
  name: 'coachPage',
  initialState,
  reducers: {
    setCoachPage (state, action) {
      console.log(action.payload);
      // state.coachPage = action.payload;
    },
    setPageIsOpen (state, action) {
      state.pageIsOpen = action.payload;
    }
  },
});



export const { setCoachPage, setPageIsOpen } = coachpageSlice.actions;



export const getPageIsOpenStatus = state => state.coachPage.pageIsOpen;



export default coachpageSlice.reducer;