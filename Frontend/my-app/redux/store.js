import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import adminSlice from "./slices/adminSlice";
import { persistReducer, persistStore } from "redux-persist";
import localStorage from "redux-persist/lib/storage";
import teacherSlice from "./slices/teacherSlice"

const persistConfig = {
  key: "root",
  storage: localStorage, // Use localStorage for persistence
  whitelist: ["auth", "admin"], // Only persist the auth and admin slices
};

const rooReducer = combineReducers({
  auth: authSlice,
  admin: adminSlice,
  teacher: teacherSlice
});

const persistedReducer = persistReducer(persistConfig, rooReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export default store;
