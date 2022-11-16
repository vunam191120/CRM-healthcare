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
  getDoctors(clinic_id) {
    const url = `/clinic/doctor/${clinic_id}`;
    return axiosClient.get(url);
  },
  getStaffs(clinic_id) {
    const url = `/clinic/staff/${clinic_id}`;
    return axiosClient.get(url);
  },
  createStaff(staff) {
    const url = `/clinic/staff`;
    return axiosClient.post(url, staff);
  },
  updateStaff(staff) {
    const url = `/clinic/staff/`;
    return axiosClient.put(url, staff);
  },
  deleteStaff(staff) {
    const url = `/clinic/staff`;
    return axiosClient.delete(url, staff);
  },
  updateCategories(data) {
    const url = `/clinic/category`;
    return axiosClient.put(url, data);
  },
  updateServices(data) {
    const url = `/clinic/service`;
    return axiosClient.put(url, data);
  },
  createDoctor(doctor) {
    const url = `/clinic/doctor/`;
    return axiosClient.post(url, doctor);
  },
  updateDoctor(doctor) {
    const url = `/clinic/doctor/`;
    return axiosClient.put(url, doctor);
  },
  deleteDoctor(doctor) {
    const url = `/clinic/doctor/`;
    return axiosClient.delete(url, doctor);
  },
};

export default clinicAPI;
