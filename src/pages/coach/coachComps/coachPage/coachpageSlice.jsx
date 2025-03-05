import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
 
 
 
const initialState = { 
  coachPage: {},
  pageIsOpen: false,
  isMark: false,
  status: 'idle',
  error: null
};




export const getOneCoach = createAsyncThunk('coachPage/getOneCoach', async (id) => {
  const res = await axios.get(`http://localhost:3000/coaches/${id}`);


  return res.data;
})




 
 
 
const coachpageSlice = createSlice({
  name: 'coachPage',
  initialState,
  reducers: {
    setPageIsOpen (state, action) {
      state.pageIsOpen = action.payload;
    },
    setIsMark (state) {
      state.isMark = state.isMark ? false : true;
    }
  },
  extraReducers ( bulider ) {
    bulider
      .addCase(getOneCoach.pending, state => {
        state.status = 'loading';
      })
      .addCase(getOneCoach.fulfilled, (state, action) => {
        state.status = 'succeded';

        state.coachPage = action.payload;
      })
  }
});



export const { setPageIsOpen, setIsMark } = coachpageSlice.actions;



export const getPageIsOpenStatus = state => state.coachPage.pageIsOpen;

export const getIsMarkStatus = state => state.coachPage.isMark;

export const getCoach = state => state.coachPage.coachPage;

export const getPageStatus = state => state.coachPage.status;



export default coachpageSlice.reducer;