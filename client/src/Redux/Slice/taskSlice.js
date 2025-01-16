import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name:"tasks",
  initialState: {
    myTasks: [],
  },
  reducers: {
    setMyTasks: (state, action) => {
      state.myTasks = action.payload;
    },
  },
});

export default taskSlice.reducer;
export const { setMyTasks } = taskSlice.actions;
