import axiosClient from '../axios.config';

const serviceAPI = {
  getAll() {
    const url = `/utilities/service`;
    return axiosClient.get(url);
  },
  getOne(service_id) {
    const url = `/utilities/service/${service_id}`;
    return axiosClient.get(url);
  },
  create(service) {
    const url = `/utilities/service/`;
    return axiosClient.post(url, service);
  },
  update(service) {
    const url = `/utilities/service`;
    return axiosClient.put(url, service);
  },
  delete(service_id) {
    const url = `/utilities/service/${service_id}`;
    return axiosClient.delete(url);
  },
};

export default serviceAPI;
