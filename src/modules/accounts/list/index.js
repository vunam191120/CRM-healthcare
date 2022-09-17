import { Table, PageHeader } from 'antd';
import { Link } from 'react-router-dom';
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
import checkRole from '../../../helpers/checkRole';

const { Column } = Table;

export default function AccountsList() {
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [userDetail, setUserDetail] = useState({});
  // const [pagination, setPagination] = useState({
  //   current: 1,
  //   pageSize: 10,
  // });

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
      <PageHeader
        className="site-page-header"
        // onBack={() => null}
        title={'List User'}
        extra={
          <Link className="add-link btn button--main" to="create">
            <AiOutlineUserAdd />
            <span>Add New User</span>
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
        bordered
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
      />
    </>
  );
}
