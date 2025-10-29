// verifySlice.js
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {VerifyEmailApi} from "../api/LoginApi";

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (data, {rejectWithValue}) => {
    try {
      const response = await VerifyEmailApi(data);
      console.log(response);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const verifySlice = createSlice({
  name: "verify",
  initialState: {loading: false, getUser: null, error: null},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.getUser = action.payload;
        state.error = "";
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      });
  },
});

export default verifySlice.reducer;
