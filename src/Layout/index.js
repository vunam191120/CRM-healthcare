import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import PrivateRoute from '../routes/PrivateRoute';
import appRoutes from '../routes/routes';
import Sidebar from '../components/Sidebar';

export default function Layout() {
  const [expand, setExpand] = useState(true);

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
    <div className={`layout-container ${!expand ? 'shrunk' : ''}`}>
      <Sidebar toggleExpanded={() => setExpand(!expand)} expanded={expand} />
      <div className="layout-content">
        <Routes>
          {renderRoutes(appRoutes)}
          {/* <Route path="*" element={<Navigate to="/accounts" />} /> */}
        </Routes>
      </div>
    </div>
  );
}
