import { Navigate } from 'react-router-dom';
import UserApi from '../api/user';

const login = async (username, password) => {
  let response = await UserApi.login(username, password);
  let data = await response.json();
  if (data.status === 401) {
    return Promise.reject('Username of password incorrect');
  } else {
    // authenticationService.currentUser = data;
    return Promise.resolve(data);
  }
};

const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('currentUser');
  <Navigate to="/login" replace={true} />;
};

export const authenticationService = {
  login,
  logout,
  currentUser: {},
  getCurrentUser() {
    this.currentUser = localStorage.getItem('currentUser');
  },
};
