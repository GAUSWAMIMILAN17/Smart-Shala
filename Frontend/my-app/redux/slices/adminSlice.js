import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    dashboardData: {
      totalClasses: 0,
      totalTeachers: 0,
      totalStudents: 0,
      classList: [],
      teacherList: [],
      studentList: [],
    },
  },

  reducers: {
    setDashboardData: (state, action) => {
      state.dashboardData = action.payload;
    },
  },
});

export const { setDashboardData } = adminSlice.actions;

export default adminSlice.reducer;

export const adminSliceReducer = adminSlice.reducer;
