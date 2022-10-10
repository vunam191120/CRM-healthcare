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
  getOne(email) {
    const url = `/account/doctor/${email}`;
    return axiosClient.get(url);
  },
  update(doctor, doctor_id) {
    const url = `/account/doctor/${doctor_id}`;
    return axiosClient.put(url, doctor);
  },
  delete(doctor_id) {
    const url = `/account/doctor/${doctor_id}`;
    return axiosClient.delete(url);
  },
};

export default doctorAPI;
