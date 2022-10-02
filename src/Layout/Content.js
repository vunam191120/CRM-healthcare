import React from 'react';
import appRoutes from '../routes/routes';
import PrivateRoute from '../routes/PrivateRoute';
import { Routes, Route } from 'react-router-dom';

const Content = React.memo(() => {
  const renderRoutes = (routes) =>
    routes.map((route, index) => (
      <Route
        key={index}
        path={route.path}
        element={
          <PrivateRoute roles={route.roles}>{route.element}</PrivateRoute>
        }
      >
        {route.subnavs &&
          route.subnavs.map((subRoute, index) => (
            <Route
              key={index}
              path={subRoute.path}
              element={
                <PrivateRoute roles={subRoute.roles}>
                  {subRoute.element}
                </PrivateRoute>
              }
            ></Route>
          ))}
      </Route>
    ));
  return (
    <div className="layout-content">
      <Routes>
        {renderRoutes(appRoutes)}
        {/* <Route path="*" element={<Navigate to="/accounts" />} /> */}
      </Routes>
    </div>
  );
});

export default Content;
