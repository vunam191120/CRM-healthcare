import axiosClient from '../axios.config';

const patientAPI = {
  getPatientAppointment(email) {
    const url = `/patient/crm/appointment/${email}`;
    return axiosClient.get(url);
  },
  getPatientPayment(patient_id) {
    const url = `/patient/crm/payment/${patient_id}`;
    return axiosClient.get(url);
  },
  getAll() {
    const url = `/patient/crm/patient`;
    return axiosClient.get(url);
  },
  getOne(id) {
    const url = `/patient/crm/patient/${id}`;
    return axiosClient.get(url);
  },
};

export default patientAPI;
