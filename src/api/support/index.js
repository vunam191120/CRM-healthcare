import axiosClient from '../axios.config';

const supportAPI = {
  getAll() {
    const url = `/patient/support`;
    return axiosClient.get(url);
  },
  getOne(support_id) {
    const url = `/patient/support/${support_id}`;
    return axiosClient.get(url);
  },
  create(support) {
    const url = `/patient/support`;
    return axiosClient.post(url, support);
  },
  update(support) {
    const url = `/patient/support`;
    return axiosClient.put(url, support);
  },
};

export default supportAPI;
