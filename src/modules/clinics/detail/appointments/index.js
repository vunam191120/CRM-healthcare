import React, { useEffect, useMemo } from 'react';
import { DatePicker, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { FilterOutlined } from '@ant-design/icons';
import { useParams, Link } from 'react-router-dom';
import { BiPencil } from 'react-icons/bi';
import { AiTwotoneCalendar } from 'react-icons/ai';
import moment from 'moment';

import {
  changeDate,
  fetchAppointments,
  selectAppointmentsIsLoading,
  selectFilteredAppointmentsByClinic,
} from '../../../../store/slices/appointmentsSlice';

import { STATUS_APPOINTMENT } from '../../../../constants';

const { RangePicker } = DatePicker;

export default function ClinicAppointments() {
  const dispatch = useDispatch();
  const { clinic_id } = useParams();
  const appointments = useSelector(selectFilteredAppointmentsByClinic);
  const appointmentsLoading = useSelector(selectAppointmentsIsLoading);
  const listUniDoctorID = useMemo(() => {
    if (appointments.length > 0) {
      const listDoctorID = appointments.map((item) => item.doctor_id);
      return [...new Set(listDoctorID)];
    } else {
      return [];
    }
  }, [appointments]);

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

  const appointmentColumns = [
    {
      title: 'ID',
      dataIndex: 'appointment_id',
      key: 'appointment ID',
    },
    {
      title: 'Doctor',
      key: 'doctor',
      dataIndex: 'doctor_id',
      // filters:
      //   Object.keys(appointments).length > 0 &&
      // appointments
      //   .map((appointment) => {
      //     return appointment.doctor_id;
      //   })
      //   .map((doctor, index) => ({
      //     text: doctor,
      //     value: doctor,
      //   })),
      filters:
        listUniDoctorID.length > 0 &&
        listUniDoctorID.map((item) => ({
          text: item,
          value: item,
        })),
      onFilter: (value, record) => record.doctor_id === value,
    },
    {
      title: 'Customer',
      dataIndex: 'name',
      key: 'customer',
    },
    {
      title: 'Created Date',
      key: 'created ID',
      dataIndex: 'created_date',
      ...getColumnFilterDateProps('created_date'),
    },
    {
      title: 'Date',
      key: 'doctor',
      render: (record) =>
        `${moment(record.date).format('DD-MM-YYYY')} | ${record.time}`,
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
      filters: STATUS_APPOINTMENT.map((status) => ({
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
            to={`update/${record.appointment_id}`}
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

  useEffect(() => {
    dispatch(fetchAppointments(clinic_id));
  }, [clinic_id, dispatch]);

  return (
    <div className="appointment-content-detail">
      <div className="header">
        <h4 className="title">Appointments Information</h4>
        <Link to="create" className="button button--main" type="button">
          <span>Add appointment</span>
        </Link>
      </div>
      <Table
        rowClassName="custom-row"
        x={true}
        loading={appointmentsLoading}
        columns={appointmentColumns}
        scroll={{ x: 300 }}
        pagination={{
          position: ['bottomCenter'],
        }}
        dataSource={appointments}
        rowKey={(record) => record.appointment_id}
      ></Table>
    </div>
  );
}
