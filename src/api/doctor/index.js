import axiosClient from '../axios.config';

const doctorAPI = {
  create(doctor) {
    const url = `/account/doctor`;
    return axiosClient.post(url, doctor);
  },
  getAll() {
    const url = `/account/doctor`;
    return axiosClient.get(url);
  },
  getOne(doctor_id) {
    const url = `/account/doctor/${doctor_id}`;
    return axiosClient.get(url);
  },
  update(doctor, doctor_id) {
    const url = `/account/doctor/${doctor_id}`;
    return axiosClient.put(url, doctor);
  },
};

export default doctorAPI;
