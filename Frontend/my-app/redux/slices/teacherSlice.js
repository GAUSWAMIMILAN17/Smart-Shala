import { createSlice } from "@reduxjs/toolkit";

const teacherSlice = createSlice({
    name: "teacher",
    initialState: {
        dashboard: null,
        submissions: [],
        tests: [],
        allTeachers: []
    },
    reducers: {
        setDashboard(state, action) {
            state.dashboard = action.payload
        },
        setSubmission(state,action) {
            state.submissions = action.payload
        },
        setTests(state,action) {
            state.tests = action.payload
        },
        setAllTeachers(state,action) {
            state.allTeachers = action.payload
        }
    }
})

export const {setDashboard,setSubmission,setTests,setAllTeachers} = teacherSlice.actions
export default teacherSlice.reducer