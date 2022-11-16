import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import PaymentAPI from '../../api/payment';

// Actions
export const fetchPayments = createAsyncThunk(
  'paymentsSlice/fetchPayments',
  async (clinic_id) => {
    try {
      const result = await PaymentAPI.getPayments(clinic_id);
      return result.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const fetchPayment = createAsyncThunk(
  'paymentsSlice/fetchPayment',
  async (payment_id) => {
    try {
      const result = await PaymentAPI.getPayment(payment_id);
      return result.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const fetchDetails = createAsyncThunk(
  'paymentsSlice/fetchDetails',
  async (payment_id) => {
    try {
      const result = await PaymentAPI.getDetails(payment_id);
      return result.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const fetchDetail = createAsyncThunk(
  'paymentsSlice/fetchDetail',
  async (detail_id) => {
    try {
      const result = await PaymentAPI.getDetail(detail_id);
      return result.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const addDetail = createAsyncThunk(
  'paymentsSlice/addDetail',
  async (newDetail) => {
    try {
      const result = await PaymentAPI.addDetail(newDetail);
      return result.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const updateDetail = createAsyncThunk(
  'paymentsSlice/updateDetail',
  async (newDetail) => {
    try {
      const result = await PaymentAPI.updateDetail(
        newDetail.detail_id,
        newDetail
      );
      return result.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const deleteDetail = createAsyncThunk(
  'paymentsSlice/deleteDetail',
  async (detail_id) => {
    try {
      await PaymentAPI.deleteDetail(detail_id);
      return detail_id;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

// Reducer
const paymentsSlice = createSlice({
  name: 'paymentsSlice',
  initialState: {
    payments: [],
    details: [],
    paymentNeedUpdate: {},
    detailNeedUpdate: {},
    searchTerm: '',
    isLoading: false,
    hasError: false,
  },
  reducers: {},
  extraReducers: {
    // Fetch Payments
    [fetchPayments.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchPayments.fulfilled]: (state, action) => {
      state.payments = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchPayments.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Fetch Payment
    [fetchPayment.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchPayment.fulfilled]: (state, action) => {
      state.paymentNeedUpdate = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchPayment.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Fetch Payments
    [fetchDetails.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchDetails.fulfilled]: (state, action) => {
      state.details = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchDetails.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Fetch Detail
    [fetchDetail.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchDetail.fulfilled]: (state, action) => {
      state.detailNeedUpdate = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchDetail.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Add Detail
    [addDetail.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [addDetail.fulfilled]: (state, action) => {
      message.success('Added new payment detail successfully!');
      state.isLoading = false;
      state.hasError = false;
    },
    [addDetail.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Update Detail
    [updateDetail.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [updateDetail.fulfilled]: (state, action) => {
      message.success('Updated payment detail successfully!');
      state.isLoading = false;
      state.hasError = false;
    },
    [updateDetail.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Delete Detail
    [deleteDetail.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [deleteDetail.fulfilled]: (state, action) => {
      message.success('Deleted payment detail successfully!');
      state.details = state.details.filter(
        (item) => item.detail_id !== action.payload
      );
      state.isLoading = false;
      state.hasError = false;
    },
    [deleteDetail.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

// Selector
export const selectPayments = (state) => state.payments.payments;

export const selectPaymentDetails = (state) => state.payments.details;

export const selectDetailNeedUpdate = (state) =>
  state.payments.detailNeedUpdate;

export const selectPaymentNeedUpdate = (state) =>
  state.payments.paymentNeedUpdate;

export const selectPaymentHasAccount = (state) => {
  const payments = selectPayments(state);
  return payments.filter((item) => item.patient_id);
};

export const selectPaymentNoAccount = (state) => {
  const payments = selectPayments(state);
  return payments.filter((item) => !item.patient_id);
};

export const selectPaymentsIsLoading = (state) => state.payments.isLoading;

export const selectSearchTerm = (state) => state.payments.searchTerm;

export default paymentsSlice.reducer;
