import React from 'react';
import DashboardAdmin from '../../components/DashboardAdmin';
import DashboardBO from '../../components/DashboardBO';
import DashboardMarketing from '../../components/DashboardMarketing';
import DashboardSale from '../../components/DashboardSale';
import DashboardSupport from '../../components/DashboardSupport';
import { ROLES } from '../../constants';
import getCurrentUser from '../../helpers/getCurrentUser';

export default function Dashboard() {
  const currentUser = getCurrentUser();

  return (
    <div className="dashboard-container">
      {currentUser.role_id === ROLES.ADMIN && <DashboardAdmin />}
      {currentUser.role_id === ROLES.BACK_OFFICER && <DashboardBO />}
      {currentUser.role_id === ROLES.SALE && <DashboardSale />}
      {currentUser.role_id === ROLES.MARKETING && <DashboardMarketing />}
      {currentUser.role_id === ROLES.SUPPORT && <DashboardSupport />}
    </div>
  );
}
