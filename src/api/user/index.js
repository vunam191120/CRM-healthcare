import axiosClient from '../axios.config';

const accountAPI = {
  create(user) {
    const url = `/account/user`;
    return axiosClient.post(url, user);
  },
  getAll() {
    const url = `/account/user`;
    return axiosClient.get(url);
  },
  getOne(email) {
    const url = `/account/${email}`;
    return axiosClient.get(url);
  },
  getIdentity(email) {
    const url = `/account/user/${email}`;
    return axiosClient.get(url);
  },
  login({ email, password }) {
    const url = `/account/login`;
    return axiosClient.post(url, { email, password });
  },
};

// Mock API
// const UserApi = {
//   create(user) {
//     const url = `/users/create`;
//     return fetch(url, {
//       method: 'POST',
//       body: user,
//     });
//   },
//   update(user) {
//     const url = `/users/update/${user.id}`;
//     return fetch(url, {
//       method: 'PUT',
//       body: user,
//     });
//   },
//   getOne(userId) {
//     const url = `/users/${userId}`;
//     return fetch(url);
//   },
//   getAll() {
//     const url = `/users`;
//     return fetch(url);
//   },
//   login(email, password) {
//     const url = `/login`;
//     return fetch(url, {
//       method: 'POST',
//       header: { 'Content-type': 'application/json; charset=UTF-8' },
//       body: JSON.stringify({
//         email,
//         password,
//       }),
//     });
//   },
// };

export default accountAPI;
