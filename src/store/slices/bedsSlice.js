import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import bedAPI from '../../api/bed';

export const fetchBeds = createAsyncThunk(
  'bedsSlice/fetchBeds',
  async (room_id) => {
    try {
      const result = await bedAPI.getAll(room_id);
      return result.data.data;
    } catch (err) {
      return Promise.reject(err.message);
    }
  }
);

export const fetchBed = createAsyncThunk(
  'bedsSlice/fetchBed',
  async (bed_id) => {
    try {
      const result = await bedAPI.getOne(bed_id);
      return result.data.data;
    } catch (err) {
      return Promise.reject(err.message);
    }
  }
);

export const createBed = createAsyncThunk(
  'bedsSlice/createBed',
  async (bed) => {
    try {
      const result = await bedAPI.create(bed);
      return result.data.data;
    } catch (err) {
      return Promise.reject(err.response.data.errors[0]);
    }
  }
);

export const updateBed = createAsyncThunk(
  'bedsSlice/updateBed',
  async (bed) => {
    try {
      await bedAPI.update(bed);
      return bed;
    } catch (err) {
      return Promise.reject(err.message);
    }
  }
);

export const deleteBed = createAsyncThunk(
  'bedsSlice/deleteBed',
  async (room_id) => {
    try {
      const result = await bedAPI.delete(room_id);
      if (result.data.data === 1) {
        return room_id;
      } else {
        return Promise.reject('Delete failed');
      }
    } catch (err) {
      return Promise.reject(err);
    }
  }
);
// Reducer

const bedsSlice = createSlice({
  name: 'bedsSlice',
  initialState: {
    beds: [],
    bedNeedUpdate: {},
    isLoading: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: {
    // Fetch Beds
    [fetchBeds.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchBeds.fulfilled]: (state, action) => {
      state.beds = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchBeds.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Fetch Bed
    [fetchBed.pending]: (state) => {
      // state.isLoading = true;
      // state.hasError = false;
    },
    [fetchBed.fulfilled]: (state, action) => {
      state.bedNeedUpdate = action.payload;
      // state.isLoading = false;
      // state.hasError = false;
    },
    [fetchBed.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      // state.isLoading = false;
      // state.hasError = true;
    },
    // Create Bed
    [createBed.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [createBed.fulfilled]: (state, action) => {
      state.beds = [...state.beds, action.payload];
      message
        .loading('Action in progress..', 0.5)
        .then(() => message.success('Added new bed successfully!', 3));
      state.isLoading = false;
      state.hasError = false;
    },
    [createBed.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Update Bed
    [updateBed.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [updateBed.fulfilled]: (state, action) => {
      message
        .loading('Action in progress..', 0.5)
        .then(() => message.success('Update bed successfully!', 3));
      state.beds = state.beds.map((bed) => {
        if (bed.bed_id === action.payload.bed_id) {
          bed = { ...bed, ...action.payload };
        }
        return bed;
      });
      state.bedNeedUpdate = { ...state.bedNeedUpdate, ...action.payload };
      state.isLoading = false;
      state.hasError = false;
    },
    [updateBed.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Delete Bed
    [deleteBed.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [deleteBed.fulfilled]: (state, action) => {
      message
        .loading('Action in progress..', 0.5)
        .then(() => message.success('Deleted bed successfully!', 3));
      state.beds = state.beds.filter((bed) => bed.bed_id !== action.payload);
      state.isLoading = false;
      state.hasError = false;
    },
    [deleteBed.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

// Selectors

export const selectBeds = (state) => state.beds.beds;

export const selectBedsLoading = (state) => state.beds.isLoading;

export const selectBedsError = (state) => state.beds.hasError;

export const selectBedNeedUpdate = (state) => state.beds.bedNeedUpdate;

export default bedsSlice.reducer;
