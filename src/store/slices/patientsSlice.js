import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import patientAPI from '../../api/patient';

export const fetchPatient = createAsyncThunk(
  'patientsSlice/fetchPatient',
  async (id) => {
    try {
      const result = await patientAPI.getOne(id);
      return result.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const fetchPatients = createAsyncThunk(
  'patientsSlice/fetchPatients',
  async () => {
    try {
      const result = await patientAPI.getAll();
      return result.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const fetchAppointmentByPatient = createAsyncThunk(
  'patientsSlice/fetchAppointmentByPatient',
  async (email) => {
    try {
      const result = await patientAPI.getPatientAppointment(email);
      return result.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

// Reducer
const patientsSlice = createSlice({
  name: 'patientsSlice',
  initialState: {
    patients: [],
    patientNeedUpdate: {},
    appointments: [],
    searchTerm: '',
    isLoading: false,
    hasError: false,
  },
  reducers: {
    updatePatientAppointments: (state, action) => {
      state.appointments = state.appointments.map((item) => {
        if (item.appointment_id === action.payload.appointment_id) {
          item = action.payload;
        }
        return item;
      });
    },
    changeSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: {
    // Fetch patients
    [fetchPatients.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchPatients.fulfilled]: (state, action) => {
      state.patients = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchPatients.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Fetch One Patient
    [fetchPatient.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchPatient.fulfilled]: (state, action) => {
      state.patientNeedUpdate = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchPatient.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Fetch Appointment by Patient
    [fetchAppointmentByPatient.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchAppointmentByPatient.fulfilled]: (state, action) => {
      state.appointments = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchAppointmentByPatient.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

// Actions
export const { updatePatientAppointments, changeSearchTerm } =
  patientsSlice.actions;

// Selector

export const selectPatients = (state) => state.patients.patients;

export const selectPatientsSearchTerm = (state) => state.patients.searchTerm;

export const selectPatientNeedUpdate = (state) =>
  state.patients.patientNeedUpdate;

export const selectAppointmentByPatient = (state) =>
  state.patients.appointments;

export const selectFilteredPatients = (state) => {
  const patients = selectPatients(state);
  const searchTerm = selectPatientsSearchTerm(state);

  return patients.filter((patient) =>
    patient.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const selectPatientIsLoading = (state) => state.patients.isLoading;

export default patientsSlice.reducer;
