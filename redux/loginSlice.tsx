import { createSlice } from "@reduxjs/toolkit";

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState: {
    token: false,
    userDetails: {},
  },
  reducers: {
    userDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    loginUser: (state,action)=>{
        console.log('action', action)
        state.token = action.payload;
    },
    logoutUser: (state,action)=>{
        state.token = action.payload;
    }
  },
});

export const { userDetails ,loginUser, logoutUser} = userDetailsSlice.actions;
export default userDetailsSlice.reducer;
