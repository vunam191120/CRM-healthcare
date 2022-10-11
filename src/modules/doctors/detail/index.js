import React from 'react';
import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import { AiTwotoneStar } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';
import moment from 'moment';

import Modal from '../../../components/Modal';

export default function DoctorDetail({
  doctor,
  isShowDetail,
  onClickClose,
  onClickDelete,
}) {
  const renderBody = () => (
    <div className="content">
      <div className="close-btn" onClick={onClickClose}>
        <IoClose className="close-icon" />
      </div>
      <h3 className="title">Doctor Detail</h3>
      <div className="head">
        <img
          className="avatar"
          src={doctor.avatar}
          alt="Doctor Detail Avatar"
        />
        <div className="description">
          <p className="id">#{doctor.doctor_id}</p>
          <h3 className="name">
            Dr.{doctor.first_name} {doctor.last_name}
          </h3>
          <p className="category">BDS, MDS - Oral & Maxillofacial Surgery</p>
        </div>
        <div className="tag-stars">
          <AiTwotoneStar />
          <span>4.6</span>
        </div>
      </div>
      <div className="body">
        <h4 className="body-title">Detail</h4>
        <Row gutter={8} className="details-container">
          <Col xl={8} xxl={8}>
            <p className="details-title">Member Since</p>
            <p className="details-info">
              {moment(doctor.date_of_birth).format('MMM Do YY')}
            </p>
          </Col>
          <Col xl={8} xxl={8}>
            <p className="details-title">Speciality</p>
            <p className="details-info">Dentist</p>
          </Col>
          <Col xl={8} xxl={8}>
            <p className="details-title">Consultation Fees</p>
            <p className="details-info">$100 / Consultation</p>
          </Col>
        </Row>
        <h4 className="body-title">Personal Information</h4>
        <Row gutter={8} className="details-container">
          <Col xl={8}>
            <p className="details-title">Gender</p>
            <p className="details-info">{doctor.gender}</p>
          </Col>
          <Col xl={8}>
            <p className="details-title">Date of Birth</p>
            <p className="details-info">{doctor.date_of_birth}</p>
          </Col>
          <Col xl={8}>
            <p className="details-title">Location</p>
            <p className="details-info">Ha Noi, Viet Nam</p>
          </Col>
          <Col xl={8}>
            <p className="details-title">Phone Number</p>
            <p className="details-info">(+84) {doctor.phone}</p>
          </Col>
          <Col xl={8}>
            <p className="details-title">Email</p>
            <p className="details-info">{doctor.email}</p>
          </Col>
        </Row>
        <p className="total-consulation">
          No of Consultation / Cancelled: <span>85/12</span>
        </p>
      </div>
      <div className="footer">
        <Link to={`update/${doctor.email}`} className="button button--main">
          Update
        </Link>
      </div>
    </div>
  );
  return (
    <Modal
      className={`${isShowDetail ? 'user-detail active' : 'user-detail'}`}
      isOpen={isShowDetail}
      onClose={onClickClose}
      renderBody={renderBody}
    />
  );
}
