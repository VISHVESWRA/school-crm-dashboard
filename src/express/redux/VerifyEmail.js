// verifySlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ResetApi, VerifyEmailApi } from "../api/LoginApi";

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (data, { rejectWithValue }) => {
    try {
      const response = await VerifyEmailApi(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await ResetApi(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const verifySlice = createSlice({
  name: "verify",
  initialState: { loading: false, getUser: null, error: null },
  reducers: {
    clearVerifyError: (state) => {
      state.error = null;
    },
    clearUser: (state) => {
      state.getUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Verify Email
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.getUser = action.payload;
        state.error = null;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.getUser = null;
        state.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      });
  },
});

export const { clearVerifyError, clearUser } = verifySlice.actions;
export default verifySlice.reducer;
