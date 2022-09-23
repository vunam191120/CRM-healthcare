import axiosClient from '../axios.config';

const clinicAPI = {
  getAll() {
    const url = `/clinic`;
    return axiosClient.get(url);
  },
  getOne(clinic_id) {
    const url = `/clinic/${clinic_id}`;
    return axiosClient.get(url);
  },
  create(clinic) {
    const url = `/clinic/`;
    return axiosClient.post(url, clinic);
  },
  update(clinic) {
    const url = `/clinic`;
    return axiosClient.put(url, clinic);
  },
  delete(clinic_id) {
    const url = `/clinic/${clinic_id}`;
    return axiosClient.delete(url);
  },
};

export default clinicAPI;
