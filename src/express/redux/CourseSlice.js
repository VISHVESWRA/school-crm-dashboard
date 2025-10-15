import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createCourseApi,
  updateCourseApi,
  deleteCourseApi,
  getCoursesApi,
  getCourseByIdApi,
} from "../api/CourseApi";

export const fetchCourses = createAsyncThunk("courses/fetchAll", async () => {
  const response = await getCoursesApi();
  return response.data;
});

export const fetchCourseById = createAsyncThunk(
  "courses/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getCourseByIdApi(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const createCourse = createAsyncThunk(
  "courses/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await createCourseApi(data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateCourse = createAsyncThunk(
  "courses/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await updateCourseApi(id, data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteCourse = createAsyncThunk("courses/delete", async (id) => {
  await deleteCourseApi(id);
  return id;
});

const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    list: [],
    selectedCourse: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload?.courses;
      })

      .addCase(createCourse.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      .addCase(fetchCourseById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCourse = action.payload?.course;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateCourse.fulfilled, (state, action) => {
        state.list = state.list.map((course) =>
          course._id === action.payload._id ? action.payload : course
        );
      })

      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.list = state.list.filter((t) => t._id !== action.payload);
      });
  },
});

export default coursesSlice.reducer;
