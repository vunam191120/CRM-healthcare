// import axiosClient from '../axios.config';

// const UserApi = {
//   getAll() {
//     const url = `/users`;
//     return axiosClient.get(url);
//   },
//   getOne(id) {
//     const url = `/users/${id}`;
//     return axiosClient.get(url);
//   },
//   add(user) {
//     const url = `/users`;
//     return axiosClient.post(url, user);
//   },
//   update(id, user) {
//     const url = `/users/${id}`;
//     return axiosClient.put(url, user);
//   },
//   remove(id) {
//     const url = `/users/${id}`;
//     return axiosClient.delete(url);
//   },
//   login(username, password) {
//     const url = `/login`;
//     return axiosClient.post(url, { username, password });
//   },
// };

const UserApi = {
  getAll(username, password) {
    const url = `/users`;
    return fetch(url);
  },
  login(username, password) {
    const url = `/login`;
    return fetch(url, {
      method: 'POST',
      header: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify({
        username,
        password,
      }),
    });
  },
};
export default UserApi;

/**
 * Using and call from action of store Redux
 * await UserApi.remove(id);
 *
 */
