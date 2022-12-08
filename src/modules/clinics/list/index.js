import { Table, PageHeader } from 'antd';
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BiCategoryAlt, BiPencil } from 'react-icons/bi';
import { ImEye } from 'react-icons/im';

import {
  fetchClinics,
  selectClinics,
  selectClinicsLoading,
} from '../../../store/slices/clinicsSlice';
import { fetchUsers } from '../../../store/slices/usersSlice';

const { Column } = Table;

export default function ClinicsList() {
  const dispatch = useDispatch();
  const clinics = useSelector(selectClinics);
  const clinicsLoading = useSelector(selectClinicsLoading);

  useEffect(() => {
    dispatch(fetchClinics());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const clinicCloumns = [
    {
      title: 'No',
      key: 'index',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'clinic_name',
      key: 'clinic name',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: 'Manager',
      dataIndex: 'manager_id',
      key: 'manager',
      // render: (record) => {
      //   const manager = usersAdmin.find(
      //     (user) => user.user_id === record.manager_id
      //   );
      //   return manager ? manager.full_name : '';
      // },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record, index) => (
        <div className="button-container">
          <Link
            className={'button button--view'}
            to={`/clinics/detail/${record.clinic_id}/clinic`}
          >
            <ImEye />
            <span>View</span>
          </Link>
          <Link
            className={'button button--update'}
            to={`/clinics/update/${record.clinic_id}`}
          >
            <BiPencil />
            <span>Update</span>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        className="site-page-header"
        title={'List Clinic'}
        extra={
          <Link className="add-link button button--main" to="create">
            <BiCategoryAlt />
            <span style={{ marginLeft: 10 }}>Add New Clinic</span>
          </Link>
        }
      />
      <Table
        // onChange={handleChange}
        rowClassName="custom-row"
        x={true}
        loading={clinicsLoading}
        columns={clinicCloumns}
        scroll={{ x: 300 }}
        pagination={{
          position: ['bottomCenter'],
        }}
        dataSource={clinics}
        rowKey={(record) => record.clinic_id}
      >
        <Column title={clinicCloumns.title} key={clinicCloumns.key} />
      </Table>
    </>
  );
}
