import React, { useEffect } from 'react';
import { DatePicker, Table, PageHeader } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FilterOutlined } from '@ant-design/icons';
import { BiPencil, BiSupport } from 'react-icons/bi';
import { AiTwotoneCalendar } from 'react-icons/ai';
import moment from 'moment';

import { STATUS_SUPPORT } from '../../constants';
import {
  changeDate,
  fetchSupports,
  selectFilteredSupport,
  selectSupportsIsLoading,
} from '../../store/slices/supportsSlice';

const { RangePicker } = DatePicker;

export default function SupportList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const supports = useSelector(selectFilteredSupport);
  const isLoading = useSelector(selectSupportsIsLoading);

  const getColumnFilterDateProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <RangePicker
          format="DD/MM/YYYY"
          onChange={(value) => {
            if (!value) {
              return dispatch(changeDate(['', '']));
            }
            // Make start and end date has the same date format of created_by
            // After that, we can create the same typeof momentjs format.
            const startDate = moment(new Date(value[0]).toISOString()).startOf(
              'day'
            );
            const endDate = moment(new Date(value[1]).toISOString()).endOf(
              'day'
            );
            dispatch(changeDate([startDate, endDate]));
          }}
        />
      </div>
    ),
    filterIcon: (filtered) => (
      <AiTwotoneCalendar
        style={{
          color: filtered ? '#1890ff' : 'white',
        }}
      />
    ),
    render: (text) => {
      return `${moment(text).format('DD-MM-YYYY')} - ${moment(
        moment(text).format('LT'),
        ['h:mm A']
      ).format('HH:mm')}`;
    },
  });

  useEffect(() => {
    dispatch(fetchSupports());
  }, [dispatch]);

  const supportColumns = [
    {
      title: 'ID',
      dataIndex: 'support_id',
      key: 'support ID',
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Created date',
      key: 'created_date',
      dataIndex: 'created_date',
      ...getColumnFilterDateProps('created_date'),
    },
    {
      title: 'Status',
      key: 'status',
      render: (record) => (
        <span className="appointment-status">
          {record.status.charAt(0).toUpperCase() +
            record.status.slice(1, record.status.length)}
        </span>
      ),
      filters: STATUS_SUPPORT.map((status) => ({
        text: status.charAt(0).toUpperCase() + status.slice(1, status.length),
        value: status,
      })),
      onFilter: (value, record) => record.status.includes(value),
      filterIcon: (filtered) => (
        <FilterOutlined
          style={{
            color: filtered ? '#1890ff' : 'white',
          }}
        />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record, index) => (
        <div className="button-container">
          <Link
            to={`update/${record.support_id}`}
            className={'button button--update'}
            style={{ marginRight: 10 }}
            onClick={() => {}}
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
        title={'List Support'}
        extra={
          <Link className="add-link button button--main" to="create">
            <BiSupport />
            <span style={{ marginLeft: 10 }}>Add new support</span>
          </Link>
        }
        onBack={() => navigate('/', { replace: true })}
      />
      <Table
        rowClassName="custom-row"
        x={true}
        loading={isLoading}
        columns={supportColumns}
        scroll={{ x: 300 }}
        pagination={{
          position: ['bottomCenter'],
        }}
        dataSource={supports}
        rowKey={(record) => record.support_id}
      ></Table>
    </>
  );
}
