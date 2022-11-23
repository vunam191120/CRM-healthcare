import React from 'react';

// BO doctor, patient, staff,
// Sale appointment, payment, patient
// Support patient,
export default function DashboardCard({ text, num, icon }) {
  return (
    <div className="dashboard-card-container">
      <div className="content-card">
        <div className="left">
          <h3 className="num">{num}</h3>
          <h3 className="text">{text}</h3>
        </div>
        <div className="right">{icon}</div>
      </div>
    </div>
  );
}
