import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
 
 
 
const initialState = { 
  coaches: [],
  status: 'idle',
  error: null
};



export const getAllCoaches = createAsyncThunk('coachList/getAllCoaches', async () => {
  const res = await axios.get('https://ski-api-m9x9.onrender.com/coaches');

  return res.data;
})
 
 
 
const coachlistSlice = createSlice({
  name: 'coachList',
  initialState,
  reducers: {
  
  },
  extraReducers ( bulider ) {
    bulider
      .addCase(getAllCoaches.pending, state => {
        state.status = 'loading';
      })
      .addCase(getAllCoaches.fulfilled, (state, action) => {
        state.status = 'succeded';

        state.coaches = [...action.payload];
      })
      .addCase(getAllCoaches.rejected, (state, action) => {
        state.status = 'failed';

        state.error = action.error.message;
      })
  }
});


export const getallcoaches = state => state.coachList.coaches;



export default coachlistSlice.reducer;