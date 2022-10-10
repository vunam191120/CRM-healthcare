import { Table, PageHeader } from 'antd';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineUserAdd } from 'react-icons/ai';

import {
  fetchDoctors,
  selectDoctors,
  selectDoctorsLoading,
} from '../../../store/slices/doctorsSlice';
import doctorColumns from './table-column';
import DoctorDetail from '../detail';

export default function DoctorsList() {
  const dispatch = useDispatch();
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [doctorDetail, setDoctorDetail] = useState({});

  const doctors = useSelector(selectDoctors);
  const doctorsLoading = useSelector(selectDoctorsLoading);

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  const handleOpenDetail = () => {
    setIsShowDetail(true);
  };

  const handleClickClose = () => {
    setIsShowDetail(false);
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
      />
    </>
  );
}
