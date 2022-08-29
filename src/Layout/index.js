import React from 'react';
import Sidebar from '../components/Sidebar';

export default function Layout() {
  return (
    <div className="layout-container">
      <Sidebar />
      <div className="layout-content">Hello World</div>
    </div>
  );
}
