import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit';
import { message } from 'antd';
import axios from 'axios';
import axiosClient from '../../api/axios.config';
import accountAPI from '../../api/user';
import UserApi from '../../api/user';
import checkRole from '../../helpers/checkRole';

// Side Effect actions

export const fetchUsers = createAsyncThunk(
  'usersSlice/getAllUsers',
  async () => {
    const result = await accountAPI.getAll();
    const { rows } = result.data.data;
    return rows;
  }
);

export const fetchUser = createAsyncThunk(
  'usersSlice/getUser',
  async (userId) => {
    const result = await UserApi.getOne(userId);
    const data = await result.json();
    if (data.status === 404) {
      return Promise.reject(data.message);
    }
    return data;
  }
);

export const createUser = createAsyncThunk(
  'usersSlice/createUser',
  async (user) => {
    try {
      const result = await accountAPI.create(user);
      return result;
    } catch (err) {
      return Promise.reject(err.response.data.errors[0]);
    }
  }
);

export const updateUser = createAsyncThunk(
  'usersSlice/updateUser',
  async (user) => {
    const result = await UserApi.update(user);
  }
);

export const login = createAsyncThunk(
  'usersSlice/login',
  async ({ email, password }) => {
    const resultToken = await accountAPI.login({ email, password });
    localStorage.setItem('accessToken', resultToken.data.token);
    localStorage.setItem('refreshToken', resultToken.data.refreshToken);
    const resultUser = await accountAPI.getIdentity(email);
    let currentUser = resultUser.data.data;
    currentUser = { ...currentUser, role: checkRole(currentUser.role_id) };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    return Promise.resolve('Logged in succesfully!');
  }
);

// Reducer
const usersSlice = createSlice({
  name: 'usersSlice',
  initialState: {
    users: [],
    updateUser: {},
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
    // Fetch One User
    [fetchUser.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.updateUser = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchUser.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Create User
    [createUser.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [createUser.fulfilled]: (state, action) => {
      state.users = [...state.users, action.payload];
      message
        .loading('Action in progress..', 1)
        .then(() => message.success('Added new user successfully!', 3));
      state.isLoading = false;
      state.hasError = false;
    },
    [createUser.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Login
    [login.pending]: (state, action) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [login.fulfilled]: (state, action) => {
      message.success(action.payload, 3);
      setTimeout(() => {
        window.location.href = '/';
      }, 500);
      state.isLoading = false;
      state.hasError = false;
    },
    [login.rejected]: (state, action) => {
      // message.error('Email or password is incorrect. Try again!', 4);
      state.isLoading = false;
      state.hasError = action.error.message;
    },
    // Logout
  },
});

// Selectors
export const selectUsersLoading = (state) => state.users.isLoading;

export const selectUsers = (state) => state.users.users;

export const selectUsersError = (state) => state.users.hasError;

export const selectUpdateUser = (state) => state.users.updateUser;

export default usersSlice.reducer;
