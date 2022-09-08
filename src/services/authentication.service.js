import UserApi from '../api/user';

const login = async (username, password) => {
  let response = await UserApi.login(username, password);
  let data = await response.json();
  if (data.status === 401) {
    return Promise.reject('Username of password incorrect');
  } else {
    return Promise.resolve(data);
  }
};

const logout = () => {
  // Remove data's user whenever they logged out
  localStorage.removeItem('currentUser');
  window.location.href = '/login';
  // window.location.href = 'localhost:3000/login';
};

export let authenticationService = {
  login,
  logout,
};
