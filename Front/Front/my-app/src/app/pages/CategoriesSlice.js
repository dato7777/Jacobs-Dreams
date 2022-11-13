import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addCategory, getCategories,deleteCategory} from './CategoryAPI ';
import jwt_decode from "jwt-decode";

// state-data (initial data)
const initialState = {
  categories: []
};

// simple async method(component can call it)
// async (1)
export const getCategoriesAsync = createAsyncThunk(
  'categories/getCategories',
  async (action) => {
    const response = await getCategories(action);
    return response.data;
  }
);

export const addCategoryAsync = createAsyncThunk(
  'categories/addCategory',
  async (data) => {
    const response = await addCategory(data.token,data.categDesc);
    return response.data;
  }
);
export const deleteCategoryAsync = createAsyncThunk(
  'categories/deleteCategory',
  async (data) => {
    const response = await deleteCategory(data.token,data.catID);
    return response.data;
  }
);

export const CategoriesSlice = createSlice({

  name: 'categories',
  initialState,
  reducers: {

  },
  // happens when async is done - callback
  // async (3)
  extraReducers: (builder) => {
    builder
      
      .addCase(addCategoryAsync.fulfilled, (state, action) => {
        state.categories=JSON.parse(localStorage.getItem('myLocalCategs'))
        
        state.categories.push(action.payload)
        localStorage.setItem("myLocalCategs", JSON.stringify(state.categories));
        
      })
      .addCase(getCategoriesAsync.fulfilled, (state, action) => {
        state.categories = action.payload;
        localStorage.setItem("myLocalCategs", JSON.stringify(state.categories));
      }
      )
      .addCase(deleteCategoryAsync.fulfilled, (state, action) => {
        state.categories = state.categories.filter((x) => x.id !== action.payload);
        localStorage.setItem("myLocalCategs", JSON.stringify(state.categories));
      }
      );
  },
});
// export of sync methods only

// export of any part of the state
export const selectCategories = (state) => state.categories.categories;
// export reducer to the application
export default CategoriesSlice.reducer;
