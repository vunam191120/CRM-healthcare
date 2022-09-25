import React from 'react';
import ClinicsForm from '../../form';

export default function ClinicClinic() {
  return (
    <>
      <h4 className="title">Clinic Information</h4>
      <div className="clinic-content-detail">
        <div className="clinic-info">
          <ul className="info-list">
            <li className="info-item">
              <span className="filed">Patient records : </span>
              <span className="value">4509212</span>
            </li>
            <li className="info-item">
              <span className="filed">Award Winning : </span>
              <span className="value">60</span>
            </li>
            <li className="info-item">
              <span className="filed">Connections Success Rate :</span>
              <span className="value">96.2%</span>
            </li>
          </ul>
        </div>
        <div className="clinic-form">
          <ClinicsForm mode="update" customPageHeader={true} />
        </div>
      </div>
    </>
  );
}
