import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginApi } from "../api/LoginApi";

export const LoginUser = createAsyncThunk("auth/login", async (credentials) => {
  const response = await LoginApi(credentials);
  console.log(response.data);


  localStorage.setItem("token", response.token);

  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
  },
  reducers: {
    Logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
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
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
