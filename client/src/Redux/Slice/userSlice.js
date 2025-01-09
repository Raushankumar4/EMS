import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user", 
  initialState: {
    allUsers: [],   
    profile: null, 
  },
  reducers: {
    setUsers: (state, action) => {
      state.allUsers = action.payload;  
    },
    setProfile: (state, action) => {
      state.profile = action.payload;  
    },
  },
});

export default userSlice.reducer; 
export const { setUsers, setProfile } = userSlice.actions;  
