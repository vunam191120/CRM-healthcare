import { Navigate, Route } from 'react-router-dom';

const PrivateRoute = ({ children, roles, ...rest }) => {
  const isLoggedIn = Boolean(localStorage.getItem('accessToken'));

  // Note logged in so redirect to login page
  if (!isLoggedIn) {
    <Navigate to="/login" />;
  }

  // Check if route is restricted by role
  if (roles && roles.indexOf)
    // <Route
    //   {...rest}
    //   render={(props) => {
    //     const currentUser = authenticationService.currentUserValue;
    //     if (!currentUser) {
    //       // not logged in so redirect to login page with the return url
    //       return (
    //         <Redirect
    //           to={{ pathname: '/login', state: { from: props.location } }}
    //         />
    //       );
    //     }

    //     // check if route is restricted by role
    //     if (roles && roles.indexOf(currentUser.role) === -1) {
    //       // role not authorised so redirect to home page
    //       return <Redirect to={{ pathname: '/' }} />;
    //     }

    //     // authorised so return component
    //     return <Component {...props} />;
    //   }}
    // />;

    return !isLoggedIn ? <Navigate to="/login" /> : children;
};

export default PrivateRoute;
