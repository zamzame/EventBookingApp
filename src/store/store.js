import { configureStore } from "@reduxjs/toolkit";
import createEventReducer from "./createEventSlice.js";

export const store = configureStore({
  reducer: {
    createEvent: createEventReducer,
  },
});