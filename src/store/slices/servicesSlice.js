import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import serviceAPI from '../../api/service';

// Side effect actions
export const fetchServices = createAsyncThunk(
  'servicesSlice/getServices',
  async () => {
    try {
      const result = await serviceAPI.getAll();
      return result.data.data;
    } catch (err) {
      return Promise.reject(err);
    }
  }
);

export const fetchService = createAsyncThunk(
  'servicesSlice/getService',
  async (service_id) => {
    try {
      const result = await serviceAPI.getOne(service_id);
      return result.data.data;
    } catch (err) {
      return Promise.reject(err.message);
    }
  }
);

export const createService = createAsyncThunk(
  'servicesSlice/createService',
  async (service) => {
    try {
      const result = await serviceAPI.create(service);
      return result.data.data;
    } catch (err) {
      return Promise.reject(err.response.data.errors[0]);
    }
  }
);

export const updateService = createAsyncThunk(
  'servicesSlice/updateService',
  async (service) => {
    try {
      const result = await serviceAPI.update(service);
      return result;
    } catch (err) {
      console.log('Error catched', err);
      return Promise.reject(err.message);
    }
  }
);

export const deleteService = createAsyncThunk(
  'servicesSlice/deleteService',
  async (service_id) => {
    try {
      const result = await serviceAPI.delete(service_id);
      if (result.data.data === 1) {
        return service_id;
      } else {
        return Promise.reject('Delete failed');
      }
    } catch (err) {
      return Promise.reject(err);
    }
  }
);

// Reducer

const servicesSlice = createSlice({
  name: 'servicesSlice',
  initialState: {
    services: [],
    serviceNeedUpdate: {},
    isLoading: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: {
    // Fetch Services
    [fetchServices.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchServices.fulfilled]: (state, action) => {
      state.services = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchServices.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Fetch Service
    [fetchService.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchService.fulfilled]: (state, action) => {
      state.serviceNeedUpdate = {
        ...state.serviceNeedUpdate,
        ...action.payload,
      };
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchService.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Create Service
    [createService.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [createService.fulfilled]: (state, action) => {
      state.services = [...state.services, action.payload];
      message
        .loading('Action in progress..', 0.5)
        .then(() => message.success('Added new service successfully!', 3));
      state.isLoading = false;
      state.hasError = false;
    },
    [createService.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Update Service
    [updateService.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [updateService.fulfilled]: (state, action) => {
      message
        .loading('Action in progress..', 0.5)
        .then(() => message.success('Update service successfully!', 3));
      state.isLoading = false;
      state.hasError = false;
    },
    [updateService.rejected]: (state, action) => {
      console.log('erorr', action.error.message);
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Delete Service
    [deleteService.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [deleteService.fulfilled]: (state, action) => {
      message
        .loading('Action in progress..', 0.5)
        .then(() => message.success('Deleted service successfully!', 3));
      state.services = state.services.filter(
        (service) => service.service_id !== action.payload
      );
      state.isLoading = false;
      state.hasError = false;
    },
    [deleteService.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

// Selectors
export const selectServices = (state) => state.services.services;

export const selectServicesLoading = (state) => state.services.isLoading;

export const selectServicesError = (state) => state.services.hasError;

export const selectServiceNeedUpdate = (state) =>
  state.services.serviceNeedUpdate;

export default servicesSlice.reducer;
