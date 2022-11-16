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
  async (data) => {
    try {
      const { clinic_id, payment_id } = data;
      const result = await PaymentAPI.getPayment(clinic_id, payment_id);
      return result.data.data;
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
    paymentNeedUpdate: {},
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
  },
});

// Selector
export const selectPayments = (state) => state.payments.payments;

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
