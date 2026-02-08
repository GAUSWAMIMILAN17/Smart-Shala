"use client";

import { Provider } from "react-redux";
import store, { persistor } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";

export default function StateProvider({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-gray-500 text-lg">Loading...</p>
    </div>
  );
}
