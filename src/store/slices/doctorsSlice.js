import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { message } from 'antd';
import doctorAPI from '../../api/doctor';

// Side effect actions
export const fetchDoctors = createAsyncThunk(
  'doctorsSlice/getAllDoctors',
  async () => {
    try {
      const result = await doctorAPI.getAll();
      return result.data.data.rows;
    } catch (err) {
      return err.message;
    }
  }
);

export const fetchDoctor = createAsyncThunk(
  'doctorsSlice/getDoctor',
  async (email) => {
    try {
      const result = await doctorAPI.getOne(email);
      return result.data.data;
    } catch (err) {
      return Promise.reject(err.message);
    }
  }
);

export const createDoctor = createAsyncThunk(
  'doctorsSlice/createDoctor',
  async (doctor) => {
    try {
      const result = await doctorAPI.create(doctor);
      return result;
    } catch (err) {
      return Promise.reject(err.response.data.errors[0]);
    }
  }
);

export const updateDoctor = createAsyncThunk(
  'doctorsSlice/updateDoctor',
  async (doctor) => {
    const doctor_id = doctor.get('doctor_id');
    try {
      const result = await doctorAPI.update(doctor, doctor_id);
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err.message);
    }
  }
);

export const deleteDoctor = createAsyncThunk(
  'doctorsSlice/deleteDoctor',
  async (doctor_id) => {
    try {
      const result = await doctorAPI.delete(doctor_id);
      if (result.data.data === 1) {
        return doctor_id;
      } else {
        return Promise.reject('Delete failed!');
      }
    } catch (err) {
      return Promise.reject(err.message);
    }
  }
);

// Reducer
const doctorsSlice = createSlice({
  name: 'doctorsSlice',
  initialState: {
    doctors: [],
    doctorNeedUpdate: {},
    isLoading: false,
    hasError: false,
  },
  reducers: {
    changeDoctorNeedUpdateAvatar: (state, action) => {
      state.doctorNeedUpdate.avatar[0] = {
        ...state.doctorNeedUpdate.avatar[0],
        ...action.payload,
      };
    },
    deleteDoctorNeedUpdateAvatar: (state, action) => {
      state.doctorNeedUpdate.avatar = [];
    },
  },
  extraReducers: {
    // Fetch doctors
    [fetchDoctors.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchDoctors.fulfilled]: (state, action) => {
      state.doctors = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchDoctors.rejected]: (state, action) => {
      message.err(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Fetch doctor
    [fetchDoctor.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchDoctor.fulfilled]: (state, action) => {
      state.userNeedUpdate = action.payload;
      // Modify avatar property to be more apporiate with fileList at upload component antd
      state.doctorNeedUpdate = {
        ...state.doctorNeedUpdate,
        avatar: [
          {
            uid: `${action.payload.avatar}${action.payload.doctor_id}`,
            status: 'done',
            url: `${action.payload.avatar}`,
            title: action.payload.avatar.slice(4),
          },
        ],
      };
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchDoctor.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Create doctor
    [createDoctor.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [createDoctor.fulfilled]: (state, action) => {
      state.doctors = [...state.doctors, action.payload];
      message
        .loading('Action in progress..', 0.5)
        .then(() => message.success('Added new doctor successfully!', 3));
      state.isLoading = false;
      state.hasError = false;
    },
    [createDoctor.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Update doctor
    [updateDoctor.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [updateDoctor.fulfilled]: (state, action) => {
      message
        .loading('Action in progress..', 1)
        .then(() => message.success('Update doctor successfully!', 3));
      //   state.doctors = [...state.doctors, action.payload];
      state.isLoading = false;
      state.hasError = false;
    },
    [updateDoctor.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Delete doctor
    [deleteDoctor.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [deleteDoctor.fulfilled]: (state, action) => {
      message
        .loading('Action in progress..', 1)
        .then(() => message.success('Deleted doctor successfully!', 3));
      state.doctors = state.doctors.filter(
        (doctor) => doctor.doctor_id !== action.payload
      );
      state.isLoading = false;
      state.hasError = false;
    },
    [deleteDoctor.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

// Selector

export const { changeDoctorNeedUpdateAvatar, deleteDoctorNeedUpdateAvatar } =
  doctorsSlice.actions;

export const selectDoctorsLoading = (state) => state.doctors.isLoading;

export const selectDoctors = (state) => state.doctors.doctors;

export const selectDoctorsError = (state) => state.doctors.hasError;

export const selectDoctorNeedUpdate = (state) => state.doctors.doctorNeedUpdate;

export default doctorsSlice.reducer;