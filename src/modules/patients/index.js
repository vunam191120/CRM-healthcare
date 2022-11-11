import React, { useEffect, useState } from 'react';
import { Input, PageHeader, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeSearchTerm,
  fetchPatients,
  selectFilteredPatients,
  selectPatientIsLoading,
  selectPatientsSearchTerm,
} from '../../store/slices/patientsSlice';
import { SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
import Highlighter from 'react-highlight-words';
import { Link } from 'react-router-dom';
import { ImEye } from 'react-icons/im';

export default function PatientList() {
  const dispatch = useDispatch();
  const filteredPatients = useSelector(selectFilteredPatients);
  const isLoading = useSelector(selectPatientIsLoading);
  const [searchedColumn, setSearchColumn] = useState('');
  const searchTerm = useSelector(selectPatientsSearchTerm);

  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: () => {
      return (
        <div style={{ padding: 8 }}>
          <Input
            placeholder={`Search ${dataIndex}`}
            onChange={(e) => {
              dispatch(changeSearchTerm(e.target.value));
              setSearchColumn(dataIndex);
            }}
            style={{
              marginBottom: 8,
              display: 'block',
            }}
          />
        </div>
      );
    },
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : 'white',
        }}
      />
    ),
    render: (text) => {
      // console.log('Text at render: ', text);
      return searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          autoEscape
          searchWords={[searchTerm]}
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      );
    },
  });

  const columns = [
    {
      title: 'ID',
      key: 'patient id',
      dataIndex: 'patient_id',
    },
    {
      title: 'Avatar',
      key: 'avatar',
      render: (text, record, index) => (
        <img
          src={`${record.avatar}`}
          alt="avatar user"
          className="user-avatar"
        />
      ),
      width: 100,
    },
    {
      title: 'Full Name',
      dataIndex: 'full_name',
      key: 'first name',
      ...getColumnSearchProps('full_name'),
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Date of Birth',
      key: 'date_of_birth',
      render: (record) => moment(record.date_of_birth).format('DD-MM-YYYY'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record, index) => (
        <div className="button-container">
          <Link
            style={{ marginRight: 10 }}
            className={'button button--view'}
            to={`/patients/detail/${record.patient_id}`}
          >
            <ImEye />
            <span>View</span>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader className="site-page-header" title={'List Patients'} />
      <Table
        scrollToFirstRowOnChange={true}
        rowClassName="user-row"
        x={true}
        loading={isLoading}
        columns={columns}
        scroll={{ x: 300 }}
        pagination={{
          position: ['bottomCenter'],
        }}
        dataSource={filteredPatients}
        rowKey={(record) => record.patient_id}
      ></Table>
    </>
  );
}
