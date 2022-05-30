import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMessage } = messageSlice.actions;

export default messageSlice.reducer;
