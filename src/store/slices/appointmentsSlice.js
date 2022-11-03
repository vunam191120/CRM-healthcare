import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import appointmentAPI from '../../api/appointment';
import { selectClinicNeedUpdate } from './clinicsSlice';
import moment from 'moment';

export const fetchAppointments = createAsyncThunk(
  'appointmentsSlice/fetchAppointments',
  async () => {
    try {
      const result = await appointmentAPI.getAll();
      return result.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const fetchAppointment = createAsyncThunk(
  'appointmentsSlice/fetchAppointment',
  async (appointment_id) => {
    try {
      const result = await appointmentAPI.getOne(appointment_id);
      return result.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const createAppointment = createAsyncThunk(
  'appointmentsSlice/createAppointment',
  async (appoitnment) => {
    try {
      const result = await appointmentAPI.create(appoitnment);
      return result.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const updateAppointment = createAsyncThunk(
  'appointmentsSlice/updateAppointment',
  async (appointment) => {
    try {
      const result = await appointmentAPI.update(appointment);
      return result.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

const appointmentsSlice = createSlice({
  name: 'appointmentsSlice',
  initialState: {
    appointments: [],
    appointmentNeedUpdate: {},
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
    // Fetch Appointments
    [fetchAppointments.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchAppointments.fulfilled]: (state, action) => {
      state.appointments = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchAppointments.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Fetch Appointment
    [fetchAppointment.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchAppointment.fulfilled]: (state, action) => {
      state.appointmentNeedUpdate = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchAppointment.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Create Appointment
    [createAppointment.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [createAppointment.fulfilled]: (state, action) => {
      state.appointments = [...state.appointments, action.payload];
      message.success('Added new appointment successfully!');
      state.isLoading = false;
      state.hasError = false;
    },
    [createAppointment.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Update Appointment
    [updateAppointment.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [updateAppointment.fulfilled]: (state, action) => {
      message.success('Updated appointment successfully!');
      state.isLoading = false;
      state.hasError = false;
    },
    [updateAppointment.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

// Actions
export const { changeDate } = appointmentsSlice.actions;

// Selector

export const selectAppointments = (state) => state.appointments.appointments;

export const selectAppointmentStartDate = (state) =>
  state.appointments.startDate;

export const selectAppointmentEndDate = (state) => state.appointments.endDate;

export const selectFilteredAppointmentsByClinic = (state) => {
  let valid = true;
  const selectClinic = selectClinicNeedUpdate(state);
  const appointments = selectAppointments(state);
  const startDate = selectAppointmentStartDate(state);
  const endDate = selectAppointmentEndDate(state);

  if (Object.keys(selectClinic).length > 0) {
    return appointments.filter((appointment) => {
      // Filter by clinic
      if (appointment.clinic_id !== selectClinic.clinic.clinic_id) {
        valid = false;
      }

      // Filter by date range
      if (startDate !== '' && endDate !== '') {
        const compareDate = moment(appointment.created_date);
        valid = compareDate.isBetween(startDate, endDate);
      }

      return valid ? appointment : false;
    });
  } else {
    return [];
  }
};

export const selectAppointmentsIsLoading = (state) =>
  state.appointments.isLoading;

export const selectAppointmentNeedUpdate = (state) =>
  state.appointments.appointmentNeedUpdate;

export default appointmentsSlice.reducer;
