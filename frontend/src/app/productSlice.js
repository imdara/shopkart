import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProduct } = productSlice.actions;

export default productSlice.reducer;
