import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addOrder,getOrders,getOrderDetails} from './OrderAPI ';
import jwt_decode from "jwt-decode";
// import { addProductAsync, selectProducts, getProductsAsync } from './ProductsSlice'
import { useSelector, useDispatch } from 'react-redux';

// state-data (initial data)
const initialState = {
  myorders: [],
  myOrderDetails: [],
  localStorageInit:[]
};
// const token = localStorage.getItem('token')
// const userID = jwt_decode(localStorage.getItem('token')).user_id
let myCartItems = JSON.parse(localStorage.getItem('cartItems'))  
// let cartProdIds = myCartItems.map(e => e.Product_ID)
// const orderTotal = JSON.parse(localStorage.getItem('totaltopay'))
// const subtotal = JSON.parse(localStorage.getItem('sum'))
// const discount = JSON.parse(localStorage.getItem('discount'))

export const addOrderAsync = createAsyncThunk(
  'orders/addOrder',
  async (data) => {
    const response = await addOrder(
      data.token, data.myCartItems, data.subtotal, data.discount, data.orderTotal);
    return response.data;
  }
);

export const getOrdersAsync = createAsyncThunk(
  'orders/getOrders',
  async (data) => {
    const response = await getOrders(data.token);
    
    return response.data;
  }
);
export const getOrderDetailsAsync = createAsyncThunk(
  'orders/getOrderDetails',
  async (data) => {
    const response = await getOrderDetails(data.token);
    
    return response.data;
  }
);

export const OrderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearCart: () => {
      localStorage.setItem("cartItems", JSON.stringify([]))
      // console.log(myCartItems)
    },
    pushToOrders: (state) => {
    },

  },
  // happens when async is done - callback
  // async (3)
  extraReducers: (builder) => {
    builder
    .addCase(addOrderAsync.fulfilled, (state, action) => {
    })
    .addCase(getOrdersAsync.fulfilled, (state, action) => {
      state.myorders=action.payload
    })
    .addCase(getOrderDetailsAsync.fulfilled, (state, action) => {
      state.myOrderDetails=action.payload
    });

  },
});
// export of sync methods only
export const { clearCart } = OrderSlice.actions;
// export const { signOut } = ProductSlice.actions;
// export of any part of the state


export const selectorders = (state) => state.orders.myorders;
export const selectorderdetails = (state) => state.orders.myOrderDetails;

export default OrderSlice.reducer;
