import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  createStudentsApi,
  deleteStudentsApi,
  getStudentsApi,
  getStudentsByIdApi,
  updateStudentsApi,
} from "../api/StudentApi";

export const fetchStudents = createAsyncThunk(
  "students/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getStudentsApi();
      // console.log(response.data);

      return response.data;
    } catch (e) {
      //   return rejectWithValue(e.response?.data || e.message);
      if (e.response) {
        // Server responded with error
        return rejectWithValue({
          message: e.response.data.message,
          status: e.response.status,
          type: "server_error",
        });
      } else if (e.request) {
        // Request made but no response
        return rejectWithValue({
          message: "No response from server",
          type: "network_error",
        });
      } else {
        // Something else happened
        return rejectWithValue({
          message: e.message,
          type: "unknown_error",
        });
      }
    }
  }
);

export const fetchStudentById = createAsyncThunk(
  "students/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getStudentsByIdApi(id);
      return (await response).data;
    } catch (e) {
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);

export const addStudents = createAsyncThunk(
  "students/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await createStudentsApi(data);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);

export const updateStudents = createAsyncThunk(
  "students/update",
  async ({id, data}, { rejectWithValue }) => {
    try {
      const response = await updateStudentsApi(id, data);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);

export const removeStudents = createAsyncThunk(
  "students/remove",
  async (id, { rejectWithValue }) => {
    try {
      await deleteStudentsApi(id);
      return id;
    } catch (e) {
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);

// export const removeMultipleStudents = createAsyncThunk(
//   'students/removeMultipleStudents',
//   async (ids, { rejectWithValue }) => {
//     try {
//       await api.deleteMultipleStudents(ids);
//       return ids;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

const studentSlice = createSlice({
  name: "students",
  initialState: {
    list: [],
        selectedStudent: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(addStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(fetchStudentById.fulfilled, (state, action) => {
              state.loading = false;
              state.selectedStudent = action.payload.student;
            })
      .addCase(updateStudents.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);

        console.log(state.list);
        
        
        // state.list = state.list.map((student) =>
        //   student._id === action.payload?.student._id ? action.payload : student
        // );
      })
      .addCase(removeStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter((s) => s._id !== action.payload?.student);
      })

      // Delete Multiple - Use filter with includes ✅
      //   .addCase(deleteMultipleStudents.fulfilled, (state, action) => {
      //     state.loading = false;
      //     state.students = state.students.filter(s => !action.payload.includes(s._id));
      //   });

      .addMatcher(
        isAnyOf(
          fetchStudents.pending,
          addStudents.pending,
          updateStudents.pending,
          removeStudents.pending
        ),
        (state) => {
          state.loading = true;
          state.error = null;
          state.successMessage = null;
        }
      )
      // 🔵 Using addMatcher for all rejected actions
      .addMatcher(
        isAnyOf(
          fetchStudents.rejected,
          addStudents.rejected,
          updateStudents.rejected,
          removeStudents.rejected
        ),
        (state, action) => {
          state.loading = false;
          state.error = action.payload?.message || "Something went wrong";
        }
      );
  },
});

export default studentSlice.reducer;
