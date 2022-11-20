import { message } from 'antd';
import medicalRecordAPI from '../../api/medicalRecord';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const fetchMedicalRecordsByPatient = createAsyncThunk(
  'medicalRecordsSlice/fetchMedicalRecordsByPatient',
  async (patient_id) => {
    try {
      const result = await medicalRecordAPI.getAllByPatient(patient_id);
      return result.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const fetchMedicalRecord = createAsyncThunk(
  'medicalRecordsSlice/fetchMedicalRecord',
  async (record_id) => {
    try {
      const result = await medicalRecordAPI.getOne(record_id);
      return result.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const addMedicalRecord = createAsyncThunk(
  'medicalRecordsSlice/addMedicalRecord',
  async (newMedicalRecord) => {
    try {
      const result = await medicalRecordAPI.add(newMedicalRecord);
      return result.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const updateMedicalRecord = createAsyncThunk(
  'medicalRecordsSlice/updateMedicalRecord',
  async (newMedicalRecord) => {
    try {
      const result = await medicalRecordAPI.update(newMedicalRecord);
      return result.data.data;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const deleteDocument = createAsyncThunk(
  'medicalRecordsSlice/deleteDocument',
  async (document_id) => {
    try {
      await medicalRecordAPI.deleteDocument(document_id);
      return document_id;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

export const deletePrescription = createAsyncThunk(
  'medicalRecordsSlice/deletePrescription',
  async (prescription_id) => {
    try {
      await medicalRecordAPI.deletePrescription(prescription_id);
      return prescription_id;
    } catch (error) {
      return Promise.reject(error.message);
    }
  }
);

const medicalRecordsSlice = createSlice({
  name: 'medicalRecordsSlice',
  initialState: {
    medicalRecords: [],
    medicalRecordNeedUpdate: {},
    isLoading: false,
    hasErorr: false,
  },
  reducers: {},
  extraReducers: {
    // Fetch Medical Records
    [fetchMedicalRecordsByPatient.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchMedicalRecordsByPatient.fulfilled]: (state, action) => {
      state.medicalRecords = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchMedicalRecordsByPatient.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Fetch Medical Record
    [fetchMedicalRecord.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [fetchMedicalRecord.fulfilled]: (state, action) => {
      state.medicalRecordNeedUpdate = action.payload;
      state.isLoading = false;
      state.hasError = false;
    },
    [fetchMedicalRecord.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Add Medical Record
    [addMedicalRecord.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [addMedicalRecord.fulfilled]: (state, action) => {
      message.success('Added new medical record successfully!', 3);
      state.isLoading = false;
      state.hasError = false;
    },
    [addMedicalRecord.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Update Medical Record
    [updateMedicalRecord.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [updateMedicalRecord.fulfilled]: (state, action) => {
      message.success('Updated medical record successfully!', 3);
      state.isLoading = false;
      state.hasError = false;
    },
    [updateMedicalRecord.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Delete document
    [deleteDocument.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [deleteDocument.fulfilled]: (state, action) => {
      message.success('Deleted document successfully!', 3);
      state.medicalRecordNeedUpdate.images =
        state.medicalRecordNeedUpdate.images.filter(
          (item) => item.document_id !== action.payload
        );
      state.isLoading = false;
      state.hasError = false;
    },
    [deleteDocument.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
    // Delete Prescription
    [deletePrescription.pending]: (state) => {
      state.isLoading = true;
      state.hasError = false;
    },
    [deletePrescription.fulfilled]: (state, action) => {
      message.success('Deleted prescription successfully!', 3);
      state.medicalRecordNeedUpdate.prescriptions =
        state.medicalRecordNeedUpdate.prescriptions.filter(
          (item) => item.prescription_id !== action.payload
        );
      state.isLoading = false;
      state.hasError = false;
    },
    [deletePrescription.rejected]: (state, action) => {
      message.error(action.error.message, 3);
      state.isLoading = false;
      state.hasError = true;
    },
  },
});

// Selector
export const selectMedicalRecords = (state) =>
  state.medicalRecords.medicalRecords;

export const selectMedicalRecordNeedUpdate = (state) =>
  state.medicalRecords.medicalRecordNeedUpdate;

export const selectMedicalRecordIsLoading = (state) =>
  state.medicalRecords.isLoading;

export default medicalRecordsSlice.reducer;
