import userAPI from "apis/userAPI";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  users: [],
  isLoading: false,
  error: "",
  userInfo: {},
  search: "",
};
export const getUsers = createAsyncThunk(
  "admin/users/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const data = await userAPI.getUsers();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const getUserInfo = createAsyncThunk(
  "admin/users/getUserInfo",
  async (taiKhoan, { rejectWithValue }) => {
    try {
      const data = await userAPI.getUserInfo(taiKhoan);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const addUser = createAsyncThunk(
  "admin/users/addUser",
  async (user, { dispatch, rejectWithValue }) => {
    try {
      await userAPI.addUser(user);
      dispatch(getUsers());
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const deleteUser = createAsyncThunk(
  "admin/users/deleteUser",
  async (TaiKhoan, { dispatch, rejectWithValue }) => {
    try {
      await userAPI.deleteUser(TaiKhoan);
      dispatch(getUsers());
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const updateUser = createAsyncThunk(
  "admin/users/updateUser",
  async (userId, { dispatch, rejectWithValue }) => {
    try {
      await userAPI.updateUser(userId);
      dispatch(getUsers());
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const findUser = createAsyncThunk(
  "admin/users/findUser",
  async (taiKhoan, { dispatch, rejectWithValue }) => {
    try {
      const data = await userAPI.findUser(taiKhoan);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const userManagementSlice = createSlice({
  name: "admin/users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.users = payload;
    });

    builder.addCase(getUsers.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
    builder.addCase(getUserInfo.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.userInfo = payload;
    });
    builder.addCase(findUser.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.users = payload;
    });
  },
});
export const { changeSearch } = userManagementSlice.actions;
export default userManagementSlice.reducer;
