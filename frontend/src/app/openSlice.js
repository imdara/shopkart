import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const openSlice = createSlice({
  name: "open",
  initialState,
  reducers: {
    showCart: (state) => {
      // code to set open state to true
      state.value = true;
    },
    hideCart: (state) => {
      // code to set open state to false
      state.value = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { showCart, hideCart } = openSlice.actions;

export default openSlice.reducer;
