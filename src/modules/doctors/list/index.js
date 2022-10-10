import { Table, PageHeader } from 'antd';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';

import {
  deleteDoctor,
  fetchDoctors,
  selectDoctors,
  selectDoctorsLoading,
} from '../../../store/slices/doctorsSlice';
import doctorColumns from './table-column';
import DoctorDetail from '../detail';
import Modal from '../../../components/Modal';
import Button from '../../../components/Button';

export default function DoctorsList() {
  const dispatch = useDispatch();
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isShowDelete, setIsShowDelete] = useState(false);
  const [doctorDetail, setDoctorDetail] = useState({});

  const doctors = useSelector(selectDoctors);
  const doctorsLoading = useSelector(selectDoctorsLoading);

  const renderBody = () => (
    <div className="content content--confirm">
      <div className="close-btn" onClick={() => setIsShowDelete(false)}>
        <IoClose className="close-icon" />
      </div>
      <IoIosCloseCircleOutline className="icon-title icon-title--delete" />
      <h3 className="message">Are you sure to delete this doctor?</h3>
      <h4 className="object">{doctorDetail.email}</h4>
      <div className="btn-container">
        <Button
          className="button button--light"
          onClick={() => setIsShowDelete(false)}
        >
          Cancel
        </Button>
        <Button className="button button--main" onClick={handleDeleteDoctor}>
          Delete
        </Button>
      </div>
    </div>
  );

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  const handleOpenDetail = () => {
    setIsShowDetail(true);
  };

  const handleClickClose = () => {
    setIsShowDetail(false);
    setIsShowDelete(false);
  };

  const handleDeleteDoctor = () => {
    dispatch(deleteDoctor(doctorDetail.doctor_id));
    setIsShowDelete(false);
  };

  return (
    <>
      <PageHeader
        className="site-page-header"
        title={'List Doctor'}
        extra={
          <Link className="add-link button button--main" to="create">
            <AiOutlineUserAdd />
            <span style={{ marginLeft: 10 }}>Add new doctor</span>
          </Link>
        }
      />
      <Table
        scrollToFirstRowOnChange={true}
        rowClassName="user-row"
        x={true}
        loading={doctorsLoading}
        onRow={(record, rowIndex) => ({
          onClick: (event) => {
            // Open detail and push user information to detail
            handleOpenDetail();
            setDoctorDetail(record);
          },
        })}
        columns={doctorColumns}
        scroll={{ x: 300 }}
        pagination={{
          position: ['bottomCenter'],
        }}
        dataSource={doctors}
        rowKey={(record) => record.doctor_id}
      ></Table>
      <DoctorDetail
        doctor={doctorDetail}
        isShowDetail={isShowDetail}
        onClickClose={handleClickClose}
        onClickDelete={() => setIsShowDelete(true)}
      />
      {/* Modal Confirm */}
      <Modal
        className={`${isShowDelete ? 'user-detail active' : 'user-detail'}`}
        onClickClose={() => setIsShowDelete(false)}
        isOpen={isShowDelete}
        renderBody={renderBody}
      />
    </>
  );
}
