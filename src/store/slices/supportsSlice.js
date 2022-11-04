import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import moment from 'moment';

import supportAPI from '../../api/support';

export const fetchSupports = createAsyncThunk(
  'supportsSlice/fetchSupports',
  async () => {
    try {
      const result = await supportAPI.getAll();
      return result.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const fetchSupport = createAsyncThunk(
  'supportsSlice/fetchSupport',
  async (support_id) => {
    try {
      const result = await supportAPI.getOne(support_id);
      return result.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const createSupport = createAsyncThunk(
  'supportsSlice/createSupport',
  async (support) => {
    try {
      const result = await supportAPI.create(support);
      return result.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const updateSupport = createAsyncThunk(
  'supportsSlice/updateSupport',
  async (support) => {
    try {
      await supportAPI.update(support);
      return support;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

const supportsSlice = createSlice({
  name: 'supportsSlice',
  initialState: {
    supports: [],
    supportNeedUpdate: {},
    isLoading: false,
    hasError: false,
    startDate: '',
    endDate: '',
  },
  reducers: {
    changeDate: (state, action) => {
      state.startDate = action.payload[0];
      state.endDate = action.payload[1];
    },
  },
  extraReducers: {
    // Fetch supports
    [fetchSupports.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchSupports.fulfilled]: (state, action) => {
      state.supports = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchSupports.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Fetch support
    [fetchSupport.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchSupport.fulfilled]: (state, action) => {
      state.supportNeedUpdate = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchSupport.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Create support
    [createSupport.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [createSupport.fulfilled]: (state, action) => {
      message.success('Added new support successfully!');
      state.isLoading = false;
      state.hasError = false;
    },
    [createSupport.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Update support
    [updateSupport.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [updateSupport.fulfilled]: (state, action) => {
      message.success('Updated support successfully!');
      // state.supportNeedUpdate = action.payload;
      // state.supports = state.supports.map((support) => {
      //   if (support.support_id === action.payload.suport_id) {
      //     support = action.payload;
      //   }
      //   return support;
      // });
      state.isLoading = false;
      state.hasError = false;
    },
    [updateSupport.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

// Actions
export const { changeDate, toggleReason } = supportsSlice.actions;

// Selector
export const selectSupports = (state) => state.supports.supports;

export const selectSupportNeedUpdate = (state) =>
  state.supports.supportNeedUpdate;

export const selectSupportsIsLoading = (state) => state.supports.isLoading;

export const selectSupportStartDate = (state) => state.supports.startDate;

export const selectSupportEndDate = (state) => state.supports.endDate;

export const selectFilteredSupport = (state) => {
  let valid = true;
  const supports = selectSupports(state);
  const startDate = selectSupportStartDate(state);
  const endDate = selectSupportEndDate(state);

  if (supports.length > 0) {
    return supports.filter((support) => {
      // Filter by date range
      if (startDate !== '' && endDate !== '') {
        const compareDate = moment(support.created_date);
        valid = compareDate.isBetween(startDate, endDate);
      }

      return valid ? support : false;
    });
  } else {
    return [];
  }
};

export default supportsSlice.reducer;
