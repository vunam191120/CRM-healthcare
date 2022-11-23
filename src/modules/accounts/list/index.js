import { Table, PageHeader, Input } from 'antd';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { SearchOutlined } from '@ant-design/icons';
import { IoClose } from 'react-icons/io5';
import Highlighter from 'react-highlight-words';

import {
  selectUsersLoading,
  fetchUsers,
  deleteUser,
  changeSearchTerm,
  selectUserSearchTerm,
  selectFilteredUsers,
} from '../../../store/slices/usersSlice';
import UserDetail from '../detail';
import Modal from '../../../components/Modal';
import Button from '../../../components/Button';
import checkRole from '../../../helpers/checkRole';
import Tag from '../../../components/Tag';
import moment from 'moment';

const { Column } = Table;

export default function AccountsList() {
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isShowDelete, setIsShowDelete] = useState(false);
  const [userDetail, setUserDetail] = useState({});
  const [searchedColumn, setSearchColumn] = useState('');
  const dispatch = useDispatch();
  const filteredUsers = useSelector(selectFilteredUsers);
  const usersLoading = useSelector(selectUsersLoading);
  const searchTerm = useSelector(selectUserSearchTerm);

  const renderBody = () => (
    <div className="content content--confirm">
      <div className="close-btn" onClick={() => setIsShowDelete(false)}>
        <IoClose className="close-icon" />
      </div>
      <IoIosCloseCircleOutline className="icon-title icon-title--delete" />
      <h3 className="message">Are you sure to delete this account?</h3>
      <h4 className="object">{userDetail.email}</h4>
      <div className="btn-container">
        <Button
          className="button button--light"
          onClick={() => setIsShowDelete(false)}
        >
          Cancel
        </Button>
        <Button className="button button--main" onClick={handleDeleteUser}>
          Delete
        </Button>
      </div>
    </div>
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleOpenDetail = () => {
    setIsShowDetail(true);
  };

  const handleClickClose = () => {
    setIsShowDetail(false);
  };

  const handleDeleteUser = () => {
    dispatch(deleteUser(userDetail.user_id));
    setIsShowDelete(false);
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

  const usersColumn = [
    {
      title: 'ID',
      key: 'index',
      dataIndex: 'user_id',
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
    },
    {
      title: 'Full Name',
      dataIndex: 'full_name',
      key: 'full name',
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
      title: 'Role',
      key: 'role',
      render: (text, record, index) => checkRole(record.role_id),
    },
    {
      title: 'Date of Birth',
      key: 'dateOfBirth',
      render: (text, record, index) =>
        moment(record.date_of_birth).format('DD-MM-YYYY'),
    },
    // {
    //   title: 'Profile status',
    //   key: 'profile status',
    //   render: (record) => <Tag status={record.profile_status} />,
    // },
  ];

  return (
    <>
      <PageHeader
        className="site-page-header"
        // onBack={() => null}
        title={'List User'}
        extra={
          <Link className="add-link button button--main" to="create">
            <AiOutlineUserAdd />
            <span style={{ marginLeft: 10 }}>Add New User</span>
          </Link>
        }
      />
      <Table
        scrollToFirstRowOnChange={true}
        rowClassName="user-row"
        x={true}
        loading={usersLoading}
        onRow={(record, rowIndex) => ({
          onClick: (event) => {
            // Open detail and push user information to detail
            handleOpenDetail();
            setUserDetail(record);
          },
        })}
        columns={usersColumn}
        scroll={{ x: 300 }}
        pagination={{
          position: ['bottomCenter'],
        }}
        dataSource={filteredUsers}
        rowKey={(record) => record.user_id}
      >
        <Column title={usersColumn.title} key={usersColumn.keys} />
      </Table>
      <UserDetail
        user={userDetail}
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
