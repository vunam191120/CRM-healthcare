import { Table } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineUserAdd } from 'react-icons/ai';

import {
  selectUsers,
  selectUsersLoading,
} from '../../../store/slices/usersSlice';
import usersColumn from './table-column';
import { fetchUsers } from '../../../store/slices/usersSlice';
import UserDetail from '../detail';
import Button from '../../../components/Button';

const { Column } = Table;

export default function UsersList() {
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const usersLoading = useSelector(selectUsersLoading);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleOpenDetail = () => {
    setIsShowDetail(true);
  };

  const handleClickClose = () => {
    setIsShowDetail(false);
  };

  return (
    <>
      <Table
        rowClassName="user-row"
        loading={usersLoading}
        onRow={(record, rowIndex) => ({
          onClick: (event) => {
            handleOpenDetail();
          },
        })}
        columns={usersColumn}
        bordered
        scroll={{ x: 300 }}
        pagination={{
          position: ['bottomCenter'],
        }}
        title={() => (
          <div className="table-header">
            <h2 className="table-title">list of users</h2>{' '}
            <Link className="add-link btn button--main" to="create">
              <AiOutlineUserAdd />
              <span>Add New User</span>
            </Link>
          </div>
        )}
        dataSource={users}
        rowKey="id"
      >
        <Column title={usersColumn.title} key={usersColumn.keys} />
      </Table>
      <UserDetail isShowDetail={isShowDetail} onClickClose={handleClickClose} />
    </>
  );
}
