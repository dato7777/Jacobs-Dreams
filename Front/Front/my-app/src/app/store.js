import { configureStore } from '@reduxjs/toolkit';
import CategoriesSlice from './pages/CategoriesSlice';
import CheckoutSilce from './pages/checkout/CheckoutSilce';
import FavouritesSlice from './pages/FavouritesSlice';
import LoginReducer from './pages/LoginSlice';
import OrderSlice from './pages/orders/OrderSlice';
import ProductsSlice from './pages/ProductsSlice';
import ShoppingCartSlice from './pages/ShoppingCartSlice';
export const store = configureStore({
  reducer: {
    login:LoginReducer,
    products:ProductsSlice,
    categories:CategoriesSlice,
    favourites:FavouritesSlice,
    cartItems:ShoppingCartSlice,
    userDetails:CheckoutSilce,
    orders:OrderSlice
  },
});
