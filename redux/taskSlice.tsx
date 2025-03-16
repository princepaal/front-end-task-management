//making slice for all the tasks.

import { createSlice } from "@reduxjs/toolkit";

const taskListingSlice = createSlice({
  name: "tasksList",
  initialState: [],
  //creating the multiple set states inside it.
  reducers: {
    addAllTasks: (state, action) => {
      state = action.payload;
    },
  },
});
export const { addAllTasks } = taskListingSlice.actions;
export default taskListingSlice.reducer;
