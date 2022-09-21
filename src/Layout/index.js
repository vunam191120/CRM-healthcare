import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import PrivateRoute from '../routes/PrivateRoute';
import appRoutes from './../routes/routes';
import Sidebar from '../components/Sidebar';
export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);

  const renderRoutes = (routes) =>
    routes.map((route, index) => (
      <Route
        key={index}
        path={route.path}
        element={
          <PrivateRoute roles={route.roles}>{route.element}</PrivateRoute>
        }
      />
    ));

  return (
    <div className="layout-container">
      <Sidebar collapsed={collapsed} />
      <div className="layout-content">
        <Routes>
          {renderRoutes(appRoutes)}
          <Route path="*" element={<Navigate to="/accounts" />} />
        </Routes>
      </div>
    </div>
  );
}
