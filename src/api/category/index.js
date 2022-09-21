import axiosClient from '../axios.config';

const categoryAPI = {
  getAll() {
    const url = `/utilities/category`;
    return axiosClient.get(url);
  },
  getOne(cate_id) {
    const url = `/utilities/category/${cate_id}`;
    return axiosClient.get(url);
  },
  create(cate) {
    const url = `/utilities/category/`;
    return axiosClient.post(url, cate);
  },
  update(cate) {
    const url = `/utilities/category`;
    return axiosClient.put(url, cate);
  },
  delete(cate_id) {
    const url = `/utilities/category/${cate_id}`;
    return axiosClient.delete(url);
  },
};

export default categoryAPI;
