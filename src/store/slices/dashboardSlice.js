import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import DashboardAPI from '../../api/dashboard';
import checkRoleRoute from '../../helpers/checkRoleRoute';

export const fetchCount = createAsyncThunk(
  'dashboardSlice/fetchCount',
  async (role_id) => {
    try {
      let roleRoute = checkRoleRoute(role_id);
      const result = await DashboardAPI.getCount(roleRoute);
      return result.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const fetchAdminChart = createAsyncThunk(
  'dashboardSlice/fetchAdminChart',
  async () => {
    try {
      const result = await DashboardAPI.getAdminChart();
      return result.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

// Reducer
const dashboardSlice = createSlice({
  name: 'dashboardSlice',
  initialState: {
    count: [],
    chart: {},
  },
  reducers: {},
  extraReducers: {
    // Fetch dashboard count
    [fetchCount.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchCount.fulfilled]: (state, action) => {
      state.count = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchCount.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Fetch admin chart
    [fetchAdminChart.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchAdminChart.fulfilled]: (state, action) => {
      state.chart = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchAdminChart.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

// Selectors
export const selectDashboardIsLoading = (state) => state.dashboard.isLoading;

export const selectDashboardCount = (state) => state.dashboard.count;

export const selectDashboardChartMonth = (state) =>
  state.dashboard.chart.visit_by_month;

export const selectDashboardChartDay = (state) =>
  state.dashboard.chart.visit_by_day;

export default dashboardSlice.reducer;
