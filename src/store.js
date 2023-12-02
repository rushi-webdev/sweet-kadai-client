// store.js
import { configureStore } from '@reduxjs/toolkit';
import auth from './slice/auth';
import userReducer from './slice/userSlice';
import productReducer from "./slice/ProductSlice"
import cartReducer from "./slice/CartSlice"
import addressReducer from "./slice/userAddressSlice"
import orderReducer from "./slice/OrderSlice"
import paymentReducer from "./slice/PaymentSlice"
import {categoriesReducer} from "./slice/CategorySlice"
import {productsByCategoryReducer} from "./slice/CategorySlice"
import searchReducer from "./slice/searchSlice";
import forgotPasswordReducer from "./slice/passwordResetSlice"
import CheckoutReducer from "./slice/CheckoutSlice"
import adminReducer from "./slice/AdminCategory"
import adminOrderReducer from './slice/AdminOrder';

const store = configureStore({
  reducer: {
    // auth: authReducer,
    auth:auth,
    user:userReducer,
    products: productReducer,
    cart: cartReducer,
    address:addressReducer,
    orders: orderReducer,
    search: searchReducer,
    razorpayId:paymentReducer,
    categories:categoriesReducer,
    productsByCategory:productsByCategoryReducer,
    forgotPassword:forgotPasswordReducer,
    checkout:CheckoutReducer,
    postCategory:adminReducer,
    adminOrders: adminOrderReducer,
    // other reducers go here if you have them
  },
});

export default store;
