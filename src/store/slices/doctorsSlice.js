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
      return Promise.reject(err.message);
    }
  }
);

export const fetchDoctor = createAsyncThunk(
  'doctorsSlice/getDoctor',
  async (doctor_id) => {
    try {
      const result = await doctorAPI.getOne(doctor_id);
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

// Reducer
const doctorsSlice = createSlice({
  name: 'doctorsSlice',
  initialState: {
    doctors: [],
    doctorNeedUpdate: {},
    searchTerm: '',
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
    setDoctorNeedUpdate: (state, action) => {
      state.doctorNeedUpdate = {
        ...state.doctorNeedUpdate,
        ...action.payload,
      };
    },
    changeSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
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
      state.doctorNeedUpdate = action.payload;
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
  },
});

// Actions
export const {
  changeDoctorNeedUpdateAvatar,
  deleteDoctorNeedUpdateAvatar,
  setDoctorNeedUpdate,
  changeSearchTerm,
} = doctorsSlice.actions;

// Selector
export const selectDoctorsLoading = (state) => state.doctors.isLoading;

export const selectDoctors = (state) => state.doctors.doctors;

export const selectDoctorsError = (state) => state.doctors.hasError;

export const selectDoctorNeedUpdate = (state) => state.doctors.doctorNeedUpdate;

export const selectDoctorSearchTerm = (state) => state.doctors.searchTerm;

export const selectFilteredDoctors = (state) => {
  const doctors = selectDoctors(state);
  const searchTerm = selectDoctorSearchTerm(state);

  return doctors.filter((doctor) =>
    doctor.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const selectDoctorAvailable = (state) => {
  const doctors = selectDoctors(state);

  return doctors.filter(
    (doctor) => doctor.profile_status === true && doctor.available === true
  );
};

export default doctorsSlice.reducer;
