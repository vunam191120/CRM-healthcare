import axiosClient from '../axios.config';

const appointmentAPI = {
  getAll() {
    const url = `/patient/appointment`;
    return axiosClient.get(url);
  },
  getOne(appointment_id) {
    const url = `/patient/appointment/${appointment_id}`;
    return axiosClient.get(url);
  },
  create(appointment) {
    const url = `/patient/appointment`;
    return axiosClient.post(url, appointment);
  },
  update(appointment) {
    const url = `/patient/appointment`;
    return axiosClient.put(url, appointment);
  },
};

export default appointmentAPI;
