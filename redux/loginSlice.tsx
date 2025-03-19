import { createSlice } from "@reduxjs/toolkit";

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState: {
    userDetails: {},
  },
  reducers: {
    userDetails: (state, action) => {
      state.userDetails = action.payload;
    },
  },
});

export const { userDetails} = userDetailsSlice.actions;
export default userDetailsSlice.reducer;
