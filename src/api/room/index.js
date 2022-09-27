import axiosClient from '../axios.config';

const roomAPI = {
  getAll(clinic_id) {
    const url = `/clinic/room/${clinic_id}`;
    return axiosClient.get(url);
  },
  getOne(room_id) {
    const url = `/clinic/room/one/${room_id}`;
    return axiosClient.get(url);
  },
  create(room) {
    const url = `/clinic/room`;
    return axiosClient.post(url, room);
  },
  update(room) {
    const url = `/clinic/room`;
    return axiosClient.put(url, room);
  },
  delete(room_id) {
    const url = `/clinic/room/${room_id}`;
    return axiosClient.delete(url);
  },
};

export default roomAPI;
