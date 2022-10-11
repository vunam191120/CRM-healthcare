import { Table, PageHeader, Input } from 'antd';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
import Highlighter from 'react-highlight-words';

import {
  changeSearchTerm,
  fetchDoctors,
  selectDoctorSearchTerm,
  // selectDoctors,
  selectDoctorsLoading,
  selectFilteredDoctors,
} from '../../../store/slices/doctorsSlice';
import DoctorDetail from '../detail';
import Tag from '../../../components/Tag';

export default function DoctorsList() {
  const dispatch = useDispatch();
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [doctorDetail, setDoctorDetail] = useState({});
  const [searchedColumn, setSearchColumn] = useState('');
  const searchTerm = useSelector(selectDoctorSearchTerm);

  const filteredDoctors = useSelector(selectFilteredDoctors);
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
            // value={selectedKeys[0]}
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
      title: 'ID',
      key: 'index',
      dataIndex: 'doctor_id',
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
      title: 'Profile status',
      key: 'profile status',
      render: (record) => <Tag status={record.profile_status} />,
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
