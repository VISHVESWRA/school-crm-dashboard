import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginApi } from "../api/LoginApi";

export const Login = createAsyncThunk("auth/login", async (credentials) => {
  const response = await LoginApi(credentials);

  localStorage.setItem("token", response.token);

  return response;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
  },
  reducers: {
    Logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(Login.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
