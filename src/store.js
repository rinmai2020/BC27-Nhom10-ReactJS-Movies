import { configureStore } from "@reduxjs/toolkit";
import filmManagerSlice from "modules/Admin/slice/filmManagerSlice";
import userManagementSlice from "modules/Admin/Users/slice/userManagementSlice";
import authSlice from "modules/Authentication/slices/authSlice";
import ticketSlices from "modules/Purchase/slices/ticketSlices";

const store = configureStore({
  reducer: {
    auth: authSlice,
    movie: filmManagerSlice,
    user: userManagementSlice,
    ticket: ticketSlices,
  },
});

export default store;
