import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addProduct, getProducts, deleteProduct,updateProduct } from './ProductAPI ';
import jwt_decode from "jwt-decode";

// state-data (initial data)
const initialState = {
  products: []
};

export const getProductsAsync = createAsyncThunk(
  'products/getproducts',
  async (cid) => {
    const response = await getProducts(cid);
    
    return response.data;
  }
);
export const deleteProductAsync = createAsyncThunk(
  'products/deleteProduct',
  async (data) => {
    // console.log(data.prodID)
    const response = await deleteProduct(data.prodID,data.token);
    return response.data;
  }
);
export const updateProductAsync = createAsyncThunk(
  'products/updateProduct',
  async (data) => {
    // console.log(data.prodID)
    const response = await updateProduct(data.prodID,data.newPrice,data.token);
    return response.data;
  }
);

export const addProductAsync = createAsyncThunk(
  'products/addProduct',
    async (action) => {
      const response = await addProduct(action);
      return response.data;
  }
);
// export const addProductAsync = createAsyncThunk(
//   'products/addProduct',
//   async (data) => {
//     // console.log(data.token)
//     // console.log(data.productDesc,data.productPrice,data.productCatid)
//     const response = await addProduct(data.token, data.productDesc, data.productPrice, data.productCatID, data.myImage);
//     return response.data;
//   }
// );

export const ProductsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
  },
  // happens when async is done - callback
  // async (3)
  extraReducers: (builder) => {
    builder
      .addCase(addProductAsync.fulfilled, (state, action) => {
        state.products.push(action.payload)
        
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        
        state.products = state.products.filter((x) => x.id !== action.payload);
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.products = action.payload
        
      })
      .addCase(getProductsAsync.fulfilled, (state, action) => {
        state.products = action.payload
        
        
      });
      
  },
});
// export of sync methods only
// export const { signOut } = ProductSlice.actions;
// export of any part of the state
export const selectProducts = (state) => state.products.products;

export default ProductsSlice.reducer;
