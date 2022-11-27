import { message } from 'antd';
import { Navigate, useNavigate } from 'react-router-dom';
import { isLogin } from '../helpers/isLogin';

const PrivateRoute = ({ children, roles }) => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  // Note logged in so redirect to login page
  if (!isLogin()) {
    message.warning('You must login first!', 3);
    return <Navigate to="/login" replace={true} />;
  }

  // Check if route is restricted by role
  if (roles && roles.indexOf(currentUser.role) === -1) {
    // role are not authorised will redirect to home page
    message.warning('You do not have permission to access this page!', 3);
    return navigate(-1);
  }

  // Authorised role will return the children route
  return children;
};

export default PrivateRoute;
