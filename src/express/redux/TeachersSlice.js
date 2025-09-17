import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createTeacherApi,
  // updateTeacherApi,
  deleteTeacherApi,
  getTeachersApi,
} from "../api/TeachersApi";

export const fetchTeachers = createAsyncThunk("teachers/fetchAll", async () => {
  const response = await getTeachersApi();
  return response.data;
});

export const createTeacher = createAsyncThunk(
  "teachers/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await createTeacherApi(data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// export const updateTeacher = createAsyncThunk(
//   "teachers/update",
//   async ({ id, data }) => {
//     const response = await updateTeacherApi(id, data);
//     return response.data;
//   }
// );

export const deleteTeacher = createAsyncThunk("teachers/delete", async (id) => {
  await deleteTeacherApi(id);
  return id;
});

const teachersSlice = createSlice({
  name: "teachers",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeachers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchTeachers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTeacher.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      // .addCase(updateTeacher.fulfilled, (state, action) => {
      //   const index = state.list.findIndex((t) => t.id === action.payload.id);
      //   if (index !== -1) state.list[index] = action.payload;
      // })
      .addCase(deleteTeacher.fulfilled, (state, action) => {
        state.list = state.list.filter((t) => t.id !== action.payload);
      });
  },
});

export default teachersSlice.reducer;
