import { configureStore } from "@reduxjs/toolkit";
import cartProductsReducer from "./cartProductsSlice";
import productsReducer from "./productsSlice";
import statisticsReducer from "./statisticsSlice";
import ordersReducer from "./ordersSlice";
import messageReducer from "./messageSlice";
import nameReducer from "./nameSlice";
import userReducer from "./userSlice";
import productReducer from "./productSlice";
import showReducer from "./showSlice";
import openReducer from "./openSlice";
import tokenReducer from "./tokenSlice";

const store = configureStore({
  reducer: {
    cartProducts: cartProductsReducer,
    products: productsReducer,
    statistics: statisticsReducer,
    orders: ordersReducer,
    message: messageReducer,
    name: nameReducer,
    user: userReducer,
    product: productReducer,
    showStatus: showReducer,
    open: openReducer,
    token: tokenReducer,
  },
});

export default store;
