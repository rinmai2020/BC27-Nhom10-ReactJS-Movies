import movieAPI from "apis/movieAPI";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  movies: [],
  isLoading: false,
  error: "",
  movieInfo: {},
  theaters: [],
  theaterSystem: [],
};
export const getMovies = createAsyncThunk(
  "home/movies/getMovies",
  async (tenPhim, { rejectWithValue }) => {
    try {
      if (tenPhim !== "") {
        return await movieAPI.getMovies(tenPhim);
      }
      const data = await movieAPI.getMovies();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const addMovie = createAsyncThunk(
  "hom/movies/addMovies",
  async (movie, { dispatch, rejectWithValue }) => {
    try {
      await movieAPI.addMovie(movie);
      dispatch(getMovies());
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const updateMovies = createAsyncThunk(
  "hom/movies/updateMovies",
  async (movieId, { dispatch, rejectWithValue }) => {
    try {
      await movieAPI.updateMovies(movieId);
      dispatch(getMovies());
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const deleteMovies = createAsyncThunk(
  "home/movies/addMovies",
  async (movieId, { dispatch, rejectWithValue }) => {
    try {
      await movieAPI.deleteMovies(movieId);
      dispatch(getMovies());
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const getMovieDetails = createAsyncThunk(
  "home/movies/getMovieDetails",
  async (movieId, { rejectWithValue }) => {
    try {
      const data = await movieAPI.getMovieDetails(movieId);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const getTheaterShowtime = createAsyncThunk(
  "admin/theater/showtime",
  async (_, { rejectWithValue }) => {
    try {
      const data = await movieAPI.getTheaterShowtime();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const postBookingTicket = createAsyncThunk(
  "admin/theater/ticketInfo",
  async (thongTinLichChieu, { dispatch, rejectWithValue }) => {
    try {
      await movieAPI.postBookingTicket(thongTinLichChieu);
      dispatch(getMovies());
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const getTheaterSystem = createAsyncThunk(
  "admin/theater/system",
  async (maHeThongRap, { rejectWithValue }) => {
    try {
      const data = movieAPI.getTheaterSystem(maHeThongRap);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const adminSlice = createSlice({
  name: "home/movies",
  initialState,
  reducers: {
    changeSearch: (state, { payload }) => {
      state.search = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMovies.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getMovies.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.movies = payload;
    });

    builder.addCase(getMovies.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
    builder.addCase(getMovieDetails.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.movieInfo = payload;
    });
    builder.addCase(getTheaterShowtime.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.theaters = payload;
    });
    builder.addCase(getTheaterSystem.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.theaterSystem = payload;
    });
    builder.addCase(postBookingTicket.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.theaterSystem = payload;
    });
  },
});
export const { changeSearch } = adminSlice.actions;
export default adminSlice.reducer;
