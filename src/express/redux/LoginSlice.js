import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginApi } from "../api/LoginApi";

export const LoginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await LoginApi(credentials);
      localStorage.setItem("token", response.data.token);
      return response.data; // { token, user }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  }
);

const savedUser = JSON.parse(localStorage.getItem("user"));

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: savedUser || null,
    token: localStorage.getItem("token") || null,
    role: savedUser?.role || null,
    loading: false,
    error: null,
  },
  reducers: {
    Logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.role = action.payload.user?.role || null;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { Logout } = authSlice.actions;
export default authSlice.reducer;
