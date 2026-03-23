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
    teacherList: [],
    studentList: [],
    classList: [],
    classSubjects: [],
  },

  reducers: {
    setDashboardData: (state, action) => {
      state.dashboardData = action.payload;
    },
    setTeacherList: (state, action) => {
      state.teacherList = action.payload;
    },
    setStudentList: (state, action) => {
      state.studentList = action.payload;
    },
    setClassList: (state, action) => {
      state.classList = action.payload;
    },
    setClassSubjects: (state, action) => {
      state.classSubjects = action.payload;
    }
  },
});

export const { setDashboardData, setTeacherList, setStudentList, setClassList, setClassSubjects } = adminSlice.actions;

export default adminSlice.reducer;

export const adminSliceReducer = adminSlice.reducer;
