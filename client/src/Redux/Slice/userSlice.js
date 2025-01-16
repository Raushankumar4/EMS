import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    allUsers: [],
    profile: null,
    allTasks: [],
  },
  reducers: {
    setUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
    setALlTasks: (state, action) => {
      state.allTasks = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { setUsers, setProfile, setALlTasks } = userSlice.actions;
