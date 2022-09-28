import { Table, PageHeader } from 'antd';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';

import {
  selectUsers,
  selectUsersLoading,
  fetchUsers,
  deleteUser,
} from '../../../store/slices/usersSlice';
import usersColumn from './table-column';
import UserDetail from '../detail';
import Modal from '../../../components/Modal';
import Button from '../../../components/Button';

const { Column } = Table;

export default function AccountsList() {
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [isShowDelete, setIsShowDelete] = useState(false);
  const [userDetail, setUserDetail] = useState({});
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const usersLoading = useSelector(selectUsersLoading);

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
        dataSource={users}
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
