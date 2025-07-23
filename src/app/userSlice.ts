// ✅ 개선된 코드
import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  username: string | null;
  isLoggedIn: boolean;
}

const savedUsername = localStorage.getItem("username");

const initialState: UserState = {
  username: savedUsername,
  isLoggedIn: !!savedUsername,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.username = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("username", action.payload);
    },
    logout: (state) => {
      state.username = null;
      state.isLoggedIn = false;
      localStorage.removeItem("username");
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
