import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, roles }) => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  // Note logged in so redirect to login page
  if (!Boolean(localStorage.getItem('currentUser'))) {
    return <Navigate to="/login" replace={true} />;
  }

  // Check if route is restricted by role
  if (roles && roles.indexOf(currentUser.role) === -1) {
    // role are not authorised will redirect to home page
    return <Navigate to="/" replace={true} />;
  }

  // Authorised role will return the children route
  return children;
};

export default PrivateRoute;
