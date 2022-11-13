import {createSlice } from '@reduxjs/toolkit';

// state-data (initial data)
const initialState = {
  myFavouritesCount: 0,
  myFavourites:[]
  
};
export const FavouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addFavCount: (state,action) => {
      state.myFavouritesCount +=1;
      state.myFavourites=JSON.parse(localStorage.getItem('favourites'))
      state.myFavourites.push(action.payload);
      localStorage.setItem("favourites", JSON.stringify(state.myFavourites));
    },
    delFavItem: (state,action) => {
      state.myFavourites=(JSON.parse(localStorage.getItem("favourites")).filter(e=>e.Product_ID!== action.payload))
      localStorage.setItem("favourites", JSON.stringify(state.myFavourites));
      state.myFavouritesCount -=1;
    }
  },
  // happens when async is done - callback
  // async (3)
  extraReducers: (builder) => {
      
  },
});
// export of sync methods only
export const { addFavCount,addFavItem, delFavItem} = FavouritesSlice.actions;
// export const { signOut } = ProductSlice.actions;
// export of any part of the state

export const selectFavourites = (state) => state.favourites.myFavouritesCount;
export const selectFavouriteItems = (state) => state.favourites.myFavourites;
export default FavouritesSlice.reducer;
