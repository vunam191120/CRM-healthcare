import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import typeAPI from '../../api/article/type';

export const fetchTypes = createAsyncThunk(
  'typesSlice/fetchTypes',
  async () => {
    try {
      const result = await typeAPI.getAll();
      return result.data.data;
    } catch (err) {
      return Promise.reject(err.message);
    }
  }
);

export const fetchType = createAsyncThunk(
  'typesSlice/fetchType',
  async (type_id) => {
    try {
      const result = await typeAPI.getOne(type_id);
      return result.data.data;
    } catch (err) {
      return Promise.reject(err.message);
    }
  }
);

export const createType = createAsyncThunk(
  'typesSlice/createType',
  async (type) => {
    try {
      const result = await typeAPI.create(type);
      return result.data.data;
    } catch (err) {
      return Promise.reject(err.response.data.errors[0]);
    }
  }
);

export const updateType = createAsyncThunk(
  'typesSlice/updateType',
  async (type) => {
    try {
      await typeAPI.update(type);
      return type;
    } catch (err) {
      return Promise.reject(err.message);
    }
  }
);

export const deleteType = createAsyncThunk(
  'typesSlice/deleteType',
  async (type_id) => {
    try {
      const result = await typeAPI.delete(type_id);
      if (result.data.data === 1) {
        return type_id;
      } else {
        return Promise.reject('Delete failed');
      }
    } catch (err) {
      return Promise.reject(err);
    }
  }
);
// Reducer

const typesSlice = createSlice({
  name: 'typesSlice',
  initialState: {
    types: [],
    typeNeedUpdate: {},
    isLoading: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: {
    // Fetch types
    [fetchTypes.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchTypes.fulfilled]: (state, action) => {
      state.types = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchTypes.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Fetch type
    [fetchType.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchType.fulfilled]: (state, action) => {
      state.typeNeedUpdate = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchType.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Create type
    [createType.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [createType.fulfilled]: (state, action) => {
      state.types = [...state.types, action.payload];
      message
        .loading('Action in progress..', 0.5)
        .then(() => message.success('Added new type successfully!', 3));
      state.isLoading = false;
      state.hasError = false;
    },
    [createType.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Update types
    [updateType.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [updateType.fulfilled]: (state, action) => {
      message
        .loading('Action in progress..', 0.5)
        .then(() => message.success('Update type successfully!', 3));
      state.types = state.types.map((type) => {
        if (type.type_id === action.payload.type_id) {
          type = { ...type, ...action.payload };
        }
        return type;
      });
      state.typeNeedUpdate = {
        ...state.typeNeedUpdate,
        ...action.payload,
      };
      state.isLoading = false;
      state.hasError = false;
    },
    [updateType.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Delete type
    [deleteType.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [deleteType.fulfilled]: (state, action) => {
      message
        .loading('Action in progress..', 0.5)
        .then(() => message.success('Deleted type successfully!', 3));
      state.types = state.types.filter(
        (type) => type.type_id !== action.payload
      );
      state.isLoading = false;
      state.hasError = false;
    },
    [deleteType.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

// Selectors

export const selectTypes = (state) => state.types.types;

export const selectTypesLoading = (state) => state.types.isLoading;

export const selectTypesError = (state) => state.types.hasError;

export const selectTypeNeedUpdate = (state) => state.types.typeNeedUpdate;

export default typesSlice.reducer;
