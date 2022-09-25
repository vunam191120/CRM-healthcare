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
  deleteImage(image_id) {
    const url = `/clinic/image/${image_id}`;
    return axiosClient.delete(url);
  },
  // Details
  getCategories(clinic_id) {
    const url = `/clinic/category/${clinic_id}`;
    return axiosClient.get(url);
  },
  getServices(clinic_id) {
    const url = `/clinic/service/${clinic_id}`;
    return axiosClient.get(url);
  },
  updateCategories(data) {
    const url = `/clinic/category`;
    return axiosClient.put(url, data);
  },
  updateServices(data) {
    const url = `/clinic/service`;
    return axiosClient.put(url, data);
  },
};

export default clinicAPI;
