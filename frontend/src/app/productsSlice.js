import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
