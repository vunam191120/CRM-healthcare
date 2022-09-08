import { Table } from 'antd';
import 'antd/dist/antd.css';
import { Button, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectUsers,
  selectUsersLoading,
} from '../../../store/slices/usersSlice';

import usersColumn from './table-column';
import { fetchUsers } from '../../../store/slices/usersSlice';
import UserDetail from '../detail';

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
        pagination={{
          position: ['bottomCenter'],
        }}
        title={() => <h2 className="table-header">List of users</h2>}
        dataSource={users}
        rowKey="id"
      >
        <Column title={usersColumn.title} key={usersColumn.keys} />
      </Table>
      <UserDetail isShowDetail={isShowDetail} onClickClose={handleClickClose} />
    </>
  );
}
