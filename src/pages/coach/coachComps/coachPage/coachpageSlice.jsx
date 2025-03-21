import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
 
 
 
const initialState = { 
  coachPage: {},
  isMark: false,
  status: 'idle',
  error: null
};




export const getOneCoach = createAsyncThunk('coachPage/getOneCoach', async (id) => {
  const res = await axios.get(`https://ski-api-m9x9.onrender.com/coaches/${id}`);


  return res.data;
})




 
 
 
const coachpageSlice = createSlice({
  name: 'coachPage',
  initialState,
  reducers: {
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



export const { setIsMark } = coachpageSlice.actions;




export const getIsMarkStatus = state => state.coachPage.isMark;

export const getCoach = state => state.coachPage.coachPage;

export const getPageStatus = state => state.coachPage.status;



export default coachpageSlice.reducer;