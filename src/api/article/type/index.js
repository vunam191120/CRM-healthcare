import axiosClient from '../../axios.config';

const typeAPI = {
  getAll() {
    const url = `/article/type`;
    return axiosClient.get(url);
  },
  getOne(type_id) {
    const url = `/article/type/${type_id}`;
    return axiosClient.get(url);
  },
  create(type) {
    const url = `/article/type`;
    return axiosClient.post(url, type);
  },
  update(type) {
    const url = `/article/type`;
    return axiosClient.put(url, type);
  },
  delete(type_id) {
    const url = `/article/type/${type_id}`;
    return axiosClient.delete(url);
  },
};

export default typeAPI;
