import axios from 'axios';
import { isLogin } from '../helpers/isLogin';

const axiosClient = axios.create({
  baseURL: 'http://159.223.73.5:3002',
  // baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

axiosClient.interceptors.request.use(async (config) => {
  if (isLogin()) {
    config.headers.authorization = localStorage.getItem('accessToken');
  }

  return config;
});

// axiosClient.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response.status === 401) {
//       alert('Login session has expired!');
//       localStorage.removeItem('currentUser');
//       localStorage.removeItem('accessToken');
//       window.location.href = '/login';
//     }
//     console.log('Error at interceptor: ', error);
//     return error;
//     // switch (error.response.status) {
//     //   case 401:
//     //     alert('Login session has expired!');
//     //     localStorage.removeItem('currentUser');
//     //     localStorage.removeItem('accessToken');
//     //     window.location.href = '/login';
//     //     break;
//     //   default:
//     //     return error;
//     // }
//   }
// );

export default axiosClient;
