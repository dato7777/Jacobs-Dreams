import {createSlice } from '@reduxjs/toolkit';
// import { addProduct, getProducts, deleteProduct } from './ProductAPI ';
// import { addProductAsync, selectProducts, getProductsAsync } from './ProductsSlice'

const initialState =  {
  myCartItemsCount: 0,
  myCartItems: [],
  itemsQuantity: 1
}
export const ShoppingCartSlice = createSlice({

  name: 'cartItems',
  initialState,
  reducers: {
    addCartCount: (state, action) => {
      state.myCartItemsCount += 1;
      state.myCartItems = JSON.parse(localStorage.getItem('cartItems'))
      state.myCartItems.push(action.payload)
      localStorage.setItem("cartItems", JSON.stringify(state.myCartItems));
    },
    plusItemsQuantity: (state, action, item) => {
      let cartItems = JSON.parse(localStorage.getItem('cartItems'))
      for (let index = 0; index < cartItems.length; index++) {
        const element = cartItems[index];

        if (element.Product_ID === action.payload) {
          cartItems[index].Product_quantity += 1 //item.amount
          element.Product_cost = element.Product_price * element.Product_quantity
          localStorage.setItem("cartItems", JSON.stringify(cartItems));

        }
      }

    },
    minusItemsQuantity: (state, action) => {
      let cartItems = JSON.parse(localStorage.getItem('cartItems'))
      for (let index = 0; index < cartItems.length; index++) {
        const element = cartItems[index];
        if (element.Product_ID === action.payload) {
          cartItems[index].Product_quantity -= 1 //item.amount
          element.Product_cost = element.Product_price * element.Product_quantity
          localStorage.setItem("cartItems", JSON.stringify(cartItems));
          if (element.Product_quantity === 0) {
            state.myCartItemsCount -= 1;
            localStorage.setItem("cartItems", JSON.stringify(JSON.parse(localStorage.getItem("cartItems")).filter(e => e.Product_ID !== action.payload)));
          }
        }
      }

    },
    delCartItem: (state, action) => {
      state.myCartItems = (JSON.parse(localStorage.getItem("cartItems")).filter(e => e.Product_ID !== action.payload))
      localStorage.setItem("cartItems", JSON.stringify(state.myCartItems));
      state.myCartItemsCount -= 1;
    }
  },
  // happens when async is done - callback
  // async (3)
  extraReducers: (builder) => {

  },
});
// export of sync methods only
export const { addCartCount, plusItemsQuantity, minusItemsQuantity, delCartItem } = ShoppingCartSlice.actions;

// export of any part of the state

export const selectCartItemsCount = (state) => state.cartItems.myCartItemsCount;
export const selectCartItems = (state) => state.cartItems.myCartItems;
export const selectItemsQuantity = (state) => state.cartItems.itemsQuantity
export default ShoppingCartSlice.reducer;
