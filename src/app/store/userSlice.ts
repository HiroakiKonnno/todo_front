import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import store, { RootState } from ".";
import apiClient from "@/lib/axios";

type User = {
  id: number;
  loginId: string;
  name: string;
};

type UserState = {
  user: User | null;
  loading: boolean;
  error: string | null;
};

type AppDispatch = typeof store.dispatch;

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, thunkAPI) => {
    try {
      const response = await apiClient.get("/me");
      return response.data;
    } catch {
      return thunkAPI.rejectWithValue(null);
    }
  }
);

export const fetchUserIfNeeded =
  () => async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    if (state.user.user) {
      return;
    }
    await dispatch(fetchUser());
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectUser = (state: RootState) => state.user.user;
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
