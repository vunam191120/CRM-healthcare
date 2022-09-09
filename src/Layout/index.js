import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import PrivateRoute from '../routes/PrivateRoute';
import appRoutes from './../routes/routes';
import Sidebar from '../components/Sidebar';

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);

  const renderRoutes = (routes) => {
    return routes.map((route, index) => {
      return (
        <Route
          key={index}
          path={route.path}
          element={
            <PrivateRoute roles={route.roles}>{route.element}</PrivateRoute>
          }
        />
      );
    });
  };

  return (
    <div className="layout-container">
      <Sidebar collapsed={collapsed} />
      <div className="layout-content">
        <Routes>{renderRoutes(appRoutes)}</Routes>
      </div>
    </div>
  );
}
