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

export const fetchBOChart = createAsyncThunk(
  'dashboardSlice/fetchBOChart',
  async () => {
    try {
      const result = await DashboardAPI.getAdminChart();
      return result.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const fetchMarketingChart = createAsyncThunk(
  'dashboardSlice/fetchMarketingChart',
  async () => {
    try {
      const result = await DashboardAPI.getMarketingChart();
      return result.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const fetchSaleChart = createAsyncThunk(
  'dashboardSlice/fetchSaleChart',
  async () => {
    try {
      const result = await DashboardAPI.getSaleChart();
      return result.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const fetchSalePie = createAsyncThunk(
  'dashboardSlice/fetchSalePie',
  async () => {
    try {
      const result = await DashboardAPI.getSalePie();
      return result.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const fetchSupportPie = createAsyncThunk(
  'dashboardSlice/fetchSupportPie',
  async () => {
    try {
      const result = await DashboardAPI.getSupportPie();
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
    pie: {},
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
    // Fetch bo chart
    [fetchBOChart.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchBOChart.fulfilled]: (state, action) => {
      state.chart = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchBOChart.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Fetch sale chart
    [fetchSaleChart.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchSaleChart.fulfilled]: (state, action) => {
      state.chart = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchSaleChart.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Fetch marketing chart
    [fetchMarketingChart.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchMarketingChart.fulfilled]: (state, action) => {
      state.chart = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchMarketingChart.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Fetch sale pie
    [fetchSalePie.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchSalePie.fulfilled]: (state, action) => {
      state.pie = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchSalePie.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Fetch support pie
    [fetchSupportPie.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchSupportPie.fulfilled]: (state, action) => {
      state.pie = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchSupportPie.rejected]: (state, action) => {
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

export const selectDashboardChartIncome = (state) =>
  state.dashboard.chart.income;

export const selectDashboardPieStatus = (state) => state.dashboard.pie.status;

export const selectDashboardPieType = (state) => state.dashboard.pie.type;

export const selectDashboardChartView = (state) => state.dashboard.chart.views;

export default dashboardSlice.reducer;
