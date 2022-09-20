import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import movieAPI from "apis/movieAPI";
import { TicketsInfo } from "modules/_core/ticketsInfo";

const initialState = {
  tickets: {},
  details: {},
  isLoading: false,
  error: "",
  danhSachGheDaDat: [],
  managerUser: {},
};
export const getTickets = createAsyncThunk(
  "purchase/tickets/getTickets",
  async (showtimeId, { rejectWithValue }) => {
    try {
      const data = await movieAPI.getTickets(showtimeId);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const getdetailTickets = createAsyncThunk(
  "purchase/tickets/getdetailTickets",
  async (showtimeId, { rejectWithValue }) => {
    try {
      const data = await movieAPI.getTickets(showtimeId);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const bookingHistory = createAsyncThunk(
  "purchase/tickets/bookingHistory",
  async (_, { rejectWithValue }) => {
    try {
      const data = await movieAPI.bookingHistory();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const bookingTickets = createAsyncThunk(
  "purchase/tickets/bookingTickets",
  async (ticketInfo, { dispatch, rejectWithValue }) => {
    try {
      await movieAPI.bookingTickets(ticketInfo);
      await dispatch(getTickets(ticketInfo.maLichChieu));
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const ticketSlice = createSlice({
  name: "purchase/tickets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTickets.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTickets.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.tickets = payload;
    });
    builder.addCase(getTickets.rejected, (state, { payload }) => {
      state.error = payload;
      state.isLoading = false;
    });
    builder.addCase(getdetailTickets.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.details = payload;
    });
    builder.addCase(bookingHistory.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.managerUser = payload;
    });
  },
});
export default ticketSlice.reducer;
