import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
// import './index.css';
import Login from './app/pages/Login';
import About from './app/pages/About';
import Categories from './app/pages/Categories';
import Homepage from './app/pages';
import AddStaff from './app/pages/AddStaff';
import Product from './app/pages/Product';
import AllDrinks from './app/pages/AllDrinks';
import Favourites from './app/pages/Favourites';
import ShoppingCart from './app/pages/ShoppingCart';
import ConfirmAddress from './app/pages/checkout/ConfirmAddress';
import PaymentForm from './app/pages/checkout/PaymentForm';
import Review from './app/pages/checkout/Review';
import OrderReview from './app/pages/checkout/OrderReview';
import Orders from './app/pages/orders/Orders';
import ScrollToTop from './app/components/ScrollToTop';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <ScrollToTop/>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signout" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/alldrinks" element={<AllDrinks />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/shoppingcart" element={<ShoppingCart />} />
            <Route path="/confirmaddress" element={<ConfirmAddress />} />
            <Route path="/paymentform" element={<PaymentForm />} />
            <Route path="/orderreview" element={<Review />} />
            <Route path="/ordersummary" element={<OrderReview />} />
            <Route path="/orderdetails" element={<Orders />} />
            <Route path="/addproduct" element={<Product />} />
            <Route path="/addcategory" element={<Categories />} />
            <Route path="/categories" element={<Categories />}>
              <Route path=":id" element={<Product />} />
            </Route>
            <Route path="/addstaff" element={<AddStaff />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);


