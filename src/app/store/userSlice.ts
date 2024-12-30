import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";

type User = {
  id: number;
  loginId: string;
  name: string;
};

type UserState = {
  user: User | null;
};

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
  },
});

export const selectUser = (state: RootState) => state.user.user;
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
