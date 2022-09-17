import React from 'react';
import { Col, Row } from 'antd';
import { Link } from 'react-router-dom';
import { AiTwotoneStar } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';

import Button from '../../../components/Button';
import doctorAvt from '../../../assets/img/doctor-avatar.jpeg';

export default function UserDetail({ user, isShowDetail, onClickClose }) {
  return (
    <div
      className={
        isShowDetail ? `user-detail__overlay active` : `user-detail__overlay`
      }
      onClick={() => onClickClose()}
    >
      <div className="content">
        <div className="close-btn" onClick={onClickClose}>
          <IoClose className="close-icon" />
        </div>
        <h3 className="title">User Detail</h3>
        <div className="head">
          <img className="avatar" src={doctorAvt} alt="Doctor Detail Avatar" />
          <div className="description">
            <p className="id">#{user.user_id}</p>
            <h3 className="name">
              Dr.{user.first_name} {user.last_name}
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
              <p className="details-info">Nov 21, 2022</p>
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
              <p className="details-info">{user.gender}</p>
            </Col>
            <Col xl={8}>
              <p className="details-title">Date of Birth</p>
              <p className="details-info">{user.dateOfBirth}</p>
            </Col>
            <Col xl={8}>
              <p className="details-title">Location</p>
              <p className="details-info">Newyork, USA</p>
            </Col>
            <Col xl={8}>
              <p className="details-title">Phone Number</p>
              <p className="details-info">+{user.phone}</p>
            </Col>
            <Col xl={8}>
              <p className="details-title">Email</p>
              <p className="details-info">{user.email}</p>
            </Col>
          </Row>
          <p className="total-consulation">
            No of Consultation / Cancelled: <span>85/12</span>
          </p>
        </div>
        <div className="footer">
          <Link to={`update/${user.id}`} className="btn button--main">
            Update
          </Link>
          <Button className="btn button--light">Delete</Button>
        </div>
      </div>
    </div>
  );
}
