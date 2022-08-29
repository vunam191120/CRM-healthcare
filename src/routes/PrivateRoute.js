// function PrivateRoute({ children }) {
//   // let location = useLocation();
//   return isLogin() ? children : <Navigate to="/login" replace />;
// }

import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isLoggedIn = Boolean(localStorage.getItem('accessToken'));
  return !isLoggedIn ? <Navigate to="/login" /> : children;
};

export default PrivateRoute;
