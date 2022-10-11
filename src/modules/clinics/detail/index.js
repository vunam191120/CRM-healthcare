import React from 'react';
import { PageHeader } from 'antd';
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ReconciliationOutlined } from '@ant-design/icons';
import {
  MdOutlineCategory,
  MdPayment,
  MdMeetingRoom,
  MdOutlineMedicalServices,
} from 'react-icons/md';
import { FaUserNurse } from 'react-icons/fa';
import { BsCalendar2Date, BsPeopleFill } from 'react-icons/bs';
import { fetchClinic } from '../../../store/slices/clinicsSlice';

export default function ClinicDetailLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { clinic_id } = useParams();

  useEffect(() => {
    dispatch(fetchClinic(clinic_id));
  }, [clinic_id, dispatch]);

  const renderTitle = () => (
    <>
      <h3 className="clinic-detail__title">Clinic Detail</h3>
      <ul className="clinic-detail__navbar">
        <li className="navbar__item">
          <NavLink
            className="navbar__link"
            exact="true"
            to={`/clinics/detail/${clinic_id}/clinic`}
          >
            <ReconciliationOutlined />
            <span className="text">Detail</span>
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink
            className="navbar__link"
            to={`/clinics/detail/${clinic_id}/categories`}
          >
            <MdOutlineCategory />
            <span className="text">Categories</span>
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink
            className="navbar__link"
            to={`/clinics/detail/${clinic_id}/services`}
          >
            <MdOutlineMedicalServices />
            <span className="text">Services</span>
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink
            className="navbar__link"
            to={`/clinics/detail/${clinic_id}/appointments`}
          >
            <BsCalendar2Date />
            <span className="text">Appointments</span>
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink
            className="navbar__link"
            to={`/clinics/detail/${clinic_id}/rooms`}
          >
            <MdMeetingRoom />
            <span className="text">Rooms</span>
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink
            className="navbar__link"
            to={`/clinics/detail/${clinic_id}/doctors`}
          >
            <FaUserNurse />
            <span className="text">Doctors</span>
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink
            className="navbar__link"
            to={`/clinics/detail/${clinic_id}/staffs`}
          >
            <BsPeopleFill />
            <span className="text">Staffs</span>
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink
            className="navbar__link"
            to={`/clinics/detail/${clinic_id}/payments`}
          >
            <MdPayment />
            <span className="text">Payments</span>
          </NavLink>
        </li>
      </ul>
    </>
  );

  return (
    <>
      <PageHeader
        className="site-page-header clinic-detail-header"
        onBack={() => navigate('/clinics')}
        title={renderTitle()}
      />
      <div className="clinic-detail-content">
        <Outlet />
      </div>
    </>
  );
}
