import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: null,
};

export const statisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {
    setStatistics: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setStatistics } = statisticsSlice.actions;

export default statisticsSlice.reducer;
