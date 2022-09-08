import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import UserApi from '../../api/user';
import { authenticationService } from '../../services/authentication.service';

// Side Effect actions

export const fetchUsers = createAsyncThunk(
  'usersSlice/getAllUsers',
  async () => {
    try {
      const result = await UserApi.getAll();
      const data = await result.json();
      return data.users;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
);

export const login = createAsyncThunk(
  'usersSlice/login',
  async ({ username, password }) => {
    let data = await authenticationService.login(username, password);
    return data.user;
  }
);

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
      localStorage.setItem('currentUser', JSON.stringify(action.payload));
      state.isLoading = false;
      state.hasError = false;
      window.location.href = '/';
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
