import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


const loadFavorites = () => {
  const savedFavorites = localStorage.getItem("favorites");

  console.log(savedFavorites);
  return savedFavorites ? JSON.parse(savedFavorites) : [];
};

 
 
 
const initialState = { 
  coachPage: {},
  favorites: loadFavorites(),
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
    setIsFavorite (state, action) {
      const isFavorite = state.favorites.find( item => item.id === action.payload.id);

      if (isFavorite) {
        state.favorites = state.favorites.filter( item => item.id !== action.payload.id);
      } else {
        state.favorites.push(action.payload);
      }
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



export const { setIsFavorite } = coachpageSlice.actions;




export const getFavorites = state => state.coachPage.favorites;

export const getCoach = state => state.coachPage.coachPage;

export const getPageStatus = state => state.coachPage.status;



export default coachpageSlice.reducer;