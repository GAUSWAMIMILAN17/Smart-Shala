import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLogout: (state) => {
        state.user = null;
        setLoading(false);
    }
  }
});

export const { setLoading, setUser, setLogout } = authSlice.actions;

export default authSlice.reducer;

export const authSliceReducer = authSlice.reducer;
