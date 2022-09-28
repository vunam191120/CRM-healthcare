import axiosClient from '../axios.config';

const bedAPI = {
  getAll(room_id) {
    const url = `/clinic/bed/${room_id}`;
    return axiosClient.get(url);
  },
  getOne(bed_id) {
    const url = `/clinic/bed/one/${bed_id}`;
    return axiosClient.get(url);
  },
  create(bed) {
    const url = `/clinic/bed`;
    return axiosClient.post(url, bed);
  },
  update(bed) {
    const url = `/clinic/bed`;
    return axiosClient.put(url, bed);
  },
  delete(bed_id) {
    const url = `/clinic/bed/${bed_id}`;
    return axiosClient.delete(url);
  },
};

export default bedAPI;
