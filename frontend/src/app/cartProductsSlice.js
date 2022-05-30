import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const cartProductsSlice = createSlice({
  name: "cartProducts",
  initialState,
  reducers: {
    setCartProducts: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCartProducts } = cartProductsSlice.actions;

export default cartProductsSlice.reducer;
