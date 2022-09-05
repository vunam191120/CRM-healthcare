import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import UserApi from '../../api/user';
import { authenticationService } from '../../services/authentication.service';

// Side Effect actions
const fetchUsers = createAsyncThunk('usersSlice/getAllUsers', async () => {
  try {
    const data = await UserApi.getAll();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
});

export const login = createAsyncThunk(
  'usersSlice/login',
  async ({ username, password }) => {
    return authenticationService.login(username, password);
  }
);

// const addUsers = createAsyncThunk('usersSlice/');

// Reducer
const usersSlice = createSlice({
  name: 'usersSlice',
  initialState: {
    users: [],
    isLoading: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: {
    // Fetch Users
    [fetchUsers.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchUsers.rejected]: (state) => {
      state.isLoading = false;
      state.hasError = true;
    },
    // Login
    [login.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [login.fulfilled]: (state, action) => {
      console.log('Log in successfully', action.payload);
      state.isLoading = false;
      state.hasError = false;
    },
    [login.rejected]: (state, action) => {
      state.isLoading = false;
      state.hasError = action.error.message;
    },
  },
});

// Selectors
export const selectUsersLoading = (state) => state.users.isLoading;

export const selectUsers = (state) => state.users.users;

export const selectUsersError = (state) => state.users.hasError;

export default usersSlice.reducer;
