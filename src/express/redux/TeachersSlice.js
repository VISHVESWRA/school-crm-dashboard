import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createTeacherApi,
  updateTeacherApi,
  deleteTeacherApi,
  getTeachersApi,
  getTeacherByIdApi,
} from "../api/TeachersApi";

export const fetchTeachers = createAsyncThunk("teachers/fetchAll", async () => {
  const response = await getTeachersApi();
  return response.data;
});

export const fetchTeacherById = createAsyncThunk(
  "teachers/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getTeacherByIdApi(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

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

export const updateTeacher = createAsyncThunk(
  "teachers/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await updateTeacherApi(id, data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteTeacher = createAsyncThunk("teachers/delete", async (id) => {
  await deleteTeacherApi(id);
  return id;
});

const teachersSlice = createSlice({
  name: "teachers",
  initialState: {
    list: [],
    selectedTeacher: null,
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
      .addCase(fetchTeacherById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeacherById.fulfilled, (state, action) => {
        state.loading = false;

        state.selectedTeacher = action.payload;
      })
      .addCase(fetchTeacherById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTeacher.fulfilled, (state, action) => {
        console.log(action.payload);

        const index = state.list.findIndex((t) => t._id === action.payload._id);
        if (index !== -1) state.list[index] = action.payload;
      })
      .addCase(deleteTeacher.fulfilled, (state, action) => {
        state.list = state.list.filter((t) => t._id !== action.payload);
      });
  },
});

export default teachersSlice.reducer;
