import axiosClient from '../../axios.config';

const tagAPI = {
  getAll() {
    const url = `/article/tag`;
    return axiosClient.get(url);
  },
  getOne(tag_id) {
    const url = `/article/tag/${tag_id}`;
    return axiosClient.get(url);
  },
  create(tag) {
    const url = `/article/tag/`;
    return axiosClient.post(url, tag);
  },
  update(tag) {
    const url = `/article/tag`;
    return axiosClient.put(url, tag);
  },
  delete(tag_id) {
    const url = `/article/tag/${tag_id}`;
    return axiosClient.delete(url);
  },
};

export default tagAPI;
