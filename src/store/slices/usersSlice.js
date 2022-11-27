import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import accountAPI from '../../api/user';
import checkRole from '../../helpers/checkRole';
import { ROLES } from '../../constants';

// Side Effect actions

export const fetchUsers = createAsyncThunk(
  'usersSlice/getAllUsers',
  async () => {
    try {
      const result = await accountAPI.getAll();
      const { rows } = result.data.data;
      return rows;
    } catch (err) {
      return Promise.reject(err.message);
    }
  }
);

export const fetchUser = createAsyncThunk(
  'usersSlice/getUser',
  async (user_id) => {
    try {
      const result = await accountAPI.getOne(user_id);
      return result.data.data;
    } catch (err) {
      return Promise.reject(err.message);
    }
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
    const user_id = user.get('user_id');
    try {
      const result = await accountAPI.update(user, user_id);
      return result;
    } catch (err) {
      return Promise.reject(err.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'usersSlice/deleteUser',
  async (user_id) => {
    try {
      const result = await accountAPI.delete(user_id);
      if (result.data.data === 1) {
        return user_id;
      } else {
        return Promise.reject('Delete failed!');
      }
    } catch (err) {
      return Promise.reject(err.message);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  'usersSlice/forgotPassword',
  async (email) => {
    try {
      const result = await accountAPI.forgotPassword({ email });
      const resetPwToken = result.data.data.savedUser.reset_password_token;
      return Promise.resolve(resetPwToken);
    } catch (err) {
      return Promise.reject(err.message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'usersSlice/resetPassword',
  async ({ token, new_password, confirm_password }) => {
    try {
      const result = await accountAPI.resetPassword(token, {
        new_password,
        confirm_password,
      });
      return Promise.resolve(result.data.data[0]);
    } catch (err) {
      return Promise.reject(err.message);
    }
  }
);

export const login = createAsyncThunk(
  'usersSlice/login',
  async ({ email, password }) => {
    try {
      const resultToken = await accountAPI.login({ email, password });
      if (!resultToken.data) {
        return Promise.reject(resultToken.response.data.errors[0]);
      }
      localStorage.setItem('accessToken', resultToken.data.token);
      localStorage.setItem('refreshToken', resultToken.data.refreshToken);
      const resultUser = await accountAPI.getIdentity(
        resultToken.data.userData.user_id
      );
      let currentUser = resultUser.data.data;
      currentUser = { ...currentUser, role: checkRole(currentUser.role_id) };
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      return Promise.resolve('Logged in succesfully!');
    } catch (err) {
      return Promise.reject(err.message);
    }
  }
);

// Reducer
const usersSlice = createSlice({
  name: 'usersSlice',
  initialState: {
    users: [],
    searchTerm: '',
    userNeedUpdate: {},
    isLoading: false,
    hasError: false,
  },
  reducers: {
    changeUserNeedUpdateAvatar: (state, action) => {
      state.userNeedUpdate.avatar[0] = {
        ...state.userNeedUpdate.avatar[0],
        ...action.payload,
      };
    },
    deleteUserNeedUpdateAvatar: (state, action) => {
      state.userNeedUpdate.avatar = [];
    },
    setUserNeedUpdate: (state, action) => {
      state.userNeedUpdate = {
        ...state.userNeedUpdate,
        ...action.payload,
      };
    },
    changeSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
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
    [fetchUsers.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Fetch One User
    [fetchUser.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.userNeedUpdate = action.payload;
      // Modify avatar property to be more apporiate with fileList at upload component antd
      state.userNeedUpdate = {
        ...state.userNeedUpdate,
        avatar: [
          {
            uid: `${action.payload.avatar}${action.payload.user_id}`,
            status: 'done',
            url: `${action.payload.avatar}`,
            title: action.payload.avatar.slice(4),
          },
        ],
      };
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
        .loading('Action in progress..', 0.5)
        .then(() => message.success('Added new user successfully!', 3));
      state.isLoading = false;
      state.hasError = false;
    },
    [createUser.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Update User
    [updateUser.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [updateUser.fulfilled]: (state, action) => {
      message
        .loading('Action in progress..', 1)
        .then(() => message.success('Update user successfully!', 3));
      // state.users = [...state.users, action.payload];
      state.isLoading = false;
      state.hasError = false;
    },
    [updateUser.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Delete User
    [deleteUser.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [deleteUser.fulfilled]: (state, action) => {
      message
        .loading('Action in progress..', 1)
        .then(() => message.success('Deleted user successfully!', 3));
      state.users = state.users.filter(
        (user) => user.user_id !== action.payload
      );
      state.isLoading = false;
      state.hasError = false;
    },
    [deleteUser.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Forgot Password
    [forgotPassword.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [forgotPassword.fulfilled]: (state, action) => {
      message
        .loading('Action in progress..', 1)
        .then(() =>
          message.success('Sended validation letter to your email address!', 3)
        );
      state.isLoading = false;
      state.hasError = false;
    },
    [forgotPassword.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Reset Password
    [resetPassword.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [resetPassword.fulfilled]: (state, action) => {
      message
        .loading('Action in progress..', 1)
        .then(() => message.success(action.payload, 3));
      // Auto login
      state.isLoading = false;
      state.hasError = false;
    },
    [resetPassword.rejected]: (state, action) => {
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
        window.location.href = '/dashboard';
      }, 500);
      state.isLoading = false;
      state.hasError = false;
    },
    [login.rejected]: (state, action) => {
      message.error(action.error.message, 4);
      state.isLoading = false;
      state.hasError = action.error.message;
    },
  },
});

// Actions
export const {
  changeUserNeedUpdateAvatar,
  deleteUserNeedUpdateAvatar,
  setUserNeedUpdate,
  changeSearchTerm,
} = usersSlice.actions;

// Selectors
export const selectUsersLoading = (state) => state.users.isLoading;

export const selectUsers = (state) => state.users.users;

export const selectUsersError = (state) => state.users.hasError;

export const selectUserNeedUpdate = (state) => state.users.userNeedUpdate;

export const selectUserSearchTerm = (state) => state.users.searchTerm;

export const selectFilteredUsers = (state) => {
  const users = selectUsers(state);
  const searchTerm = selectUserSearchTerm(state);

  return users.filter((user) =>
    user.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const selectUsersAdmin = (state) =>
  state.users.users.filter((user) => user.role_id === ROLES.ADMIN);

export default usersSlice.reducer;
