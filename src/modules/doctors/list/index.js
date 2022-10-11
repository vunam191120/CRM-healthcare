import { Table, PageHeader, Input } from 'antd';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';

import {
  changeSearchTerm,
  fetchDoctors,
  selectDoctorSearchTerm,
  // selectDoctors,
  selectDoctorsLoading,
  selectFilteredDoctor,
} from '../../../store/slices/doctorsSlice';
import DoctorDetail from '../detail';
import Highlighter from 'react-highlight-words';

export default function DoctorsList() {
  const dispatch = useDispatch();
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [doctorDetail, setDoctorDetail] = useState({});
  const [searchedColumn, setSearchColumn] = useState('');
  const searchTerm = useSelector(selectDoctorSearchTerm);

  const filteredDoctors = useSelector(selectFilteredDoctor);
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

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => {
      return (
        <div style={{ padding: 8 }}>
          <Input
            // ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            // onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            onChange={(e) => {
              dispatch(changeSearchTerm(e.target.value));
              setSearchColumn(dataIndex);
              // if(e.target.value === '') {
              //   clearFilters();
              // }
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

  const doctorColumns = [
    {
      title: 'No',
      key: 'index',
      render: (text, record, index) => index + 1,
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
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first name',
      ...getColumnSearchProps('first_name'),
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last name',
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
      dataIndex: 'date_of_birth',
      key: 'date_of_birth',
    },
  ];

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
        dataSource={filteredDoctors}
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
