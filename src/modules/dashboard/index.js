import React from 'react';
import DashboardAdmin from '../../components/DashboardAdmin';
import DashboardSale from '../../components/DashboardSale';
import DashboardSupport from '../../components/DashboardSupport';
import { ROLES } from '../../constants';

export default function Dashboard() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  return (
    <div className="dashboard-container">
      {currentUser.role_id === ROLES.ADMIN && <DashboardAdmin />}
      {(currentUser.role_id === ROLES.SALE ||
        currentUser.role_id === ROLES.BACK_OFFICER) && <DashboardSale />}
      {(currentUser.role_id === ROLES.MARKETING ||
        currentUser.role_id === ROLES.SUPPORT) && <DashboardSupport />}
    </div>
  );
}
