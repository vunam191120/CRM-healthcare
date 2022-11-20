import axiosClient from '../axios.config';

const medicalRecordAPI = {
  getAllByPatient(patient_id) {
    const url = `/patient/record/patient/${patient_id}`;
    return axiosClient.get(url);
  },
  getAllByDoctor(doctor_id) {
    const url = `/patient/record/doctor/${doctor_id}`;
    return axiosClient.get(url);
  },
  getOne(record_id) {
    const url = `/patient/record/medical/${record_id}`;
    return axiosClient.get(url);
  },
  add(newMedicalRecord) {
    const url = `/patient/record/patient`;
    return axiosClient.post(url, newMedicalRecord, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  update(newMedicalRecord) {
    const url = `/patient/record/patient`;
    return axiosClient.put(url, newMedicalRecord, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  deleteDocument(document_id) {
    const url = `/patient/record/document/${document_id}`;
    return axiosClient.delete(url);
  },
  deletePrescription(prescription_id) {
    const url = `/patient/record/prescription/${prescription_id}`;
    return axiosClient.delete(url);
  },
};

export default medicalRecordAPI;
