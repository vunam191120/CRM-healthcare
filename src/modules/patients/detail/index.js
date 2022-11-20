import React, { useEffect, useState } from 'react';
import {
  Checkbox,
  DatePicker,
  Form,
  Input,
  message,
  PageHeader,
  Radio,
  Select,
  Table,
  Tabs,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { BiPencil } from 'react-icons/bi';
import moment from 'moment';

import {
  fetchAppointmentByPatient,
  fetchPatient,
  fetchPaymentByPatient,
  selectAppointmentByPatient,
  selectPatientNeedUpdate,
  selectPaymentByPatient,
  updatePatientAppointments,
} from '../../../store/slices/patientsSlice';
import {
  selectAppointmentsIsLoading,
  updateAppointment,
} from '../../../store/slices/appointmentsSlice';
import Button from '../../../components/Button';
import Spinner from '../../../components/Spinner';
import Tag from '../../../components/Tag';
import {
  fetchCategoriesByClinic,
  fetchDoctorsClinic,
  selectCategoriesByClinic,
  selectClinicsLoading,
  selectDoctorsByClinic,
} from '../../../store/slices/clinicsSlice';
import { STATUS_APPOINTMENT, TIME_WORKING } from '../../../constants';
import { ImEye } from 'react-icons/im';
import { formatDateAndTime } from '../../../helpers/formatDate';
import {
  fetchMedicalRecordsByPatient,
  selectMedicalRecordIsLoading,
  selectMedicalRecords,
} from '../../../store/slices/medicalRecordsSlice';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xl: {
      span: 4,
    },
    lg: {
      span: 4,
    },
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xl: {
      span: 16,
    },
    lg: {
      span: 14,
    },
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xl: {
      span: 24,
      offset: 4,
    },
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export default function PatientDetail() {
  const { patient_id } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedAppointment, setSelectedAppointment] = useState({});
  const patient = useSelector(selectPatientNeedUpdate);
  const appointments = useSelector(selectAppointmentByPatient);
  const appointmentsLoading = useSelector(selectAppointmentsIsLoading);
  const payments = useSelector(selectPaymentByPatient);
  const doctors = useSelector(selectDoctorsByClinic);
  const categories = useSelector(selectCategoriesByClinic);
  const clinicsLoading = useSelector(selectClinicsLoading);
  const medicalRecordLoading = useSelector(selectMedicalRecordIsLoading);
  const medicalRecords = useSelector(selectMedicalRecords);

  useEffect(() => {
    dispatch(fetchPatient(patient_id));
    dispatch(fetchPaymentByPatient(patient_id));
    dispatch(fetchMedicalRecordsByPatient(patient_id));
  }, [dispatch, patient_id]);

  useEffect(() => {
    if (patient.email) {
      dispatch(fetchAppointmentByPatient(patient.email));
    }
  }, [dispatch, patient]);

  useEffect(() => {
    // Fetch doctor when appointment selected
    if (Object.keys(selectedAppointment).length > 0) {
      dispatch(fetchDoctorsClinic(selectedAppointment.clinic_id));
      dispatch(fetchCategoriesByClinic(selectedAppointment.clinic_id));
    }
  }, [dispatch, selectedAppointment]);

  useEffect(() => {
    if (selectedAppointment) {
      form.setFieldsValue({
        clinic_id: selectedAppointment.clinic_id,
        category: selectedAppointment.category_id,
        doctor: selectedAppointment.doctor_id,
        date: moment(selectedAppointment.date),
        time: selectedAppointment.time,
        name: selectedAppointment.name,
        phone: selectedAppointment.phone,
        email: selectedAppointment.email,
        description: selectedAppointment.description,
        gender: selectedAppointment.gender,
        status: selectedAppointment.status,
        foreigner: selectedAppointment.is_foreigner,
      });
    }
  }, [form, selectedAppointment]);

  const appointmentColumns = [
    {
      title: 'Appointment ID',
      dataIndex: 'appointment_id',
      key: 'appointment id',
    },
    {
      title: 'Clinic ID',
      dataIndex: 'clinic_id',
      key: 'clinic id',
    },
    {
      title: 'Doctor',
      key: 'doctor',
      render: (record) => record.doctor_id,
    },
    {
      title: 'Date',
      key: 'date',
      render: (record) =>
        `${moment(record.date).format('DD-MM-YYYY')} - ${record.time}`,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <div className="button-container">
          <span
            className={'button button--update'}
            style={{ marginRight: 10 }}
            onClick={() => setSelectedAppointment(record)}
          >
            <BiPencil />
            <span>Update</span>
          </span>
        </div>
      ),
    },
  ];

  const paymentColumns = [
    {
      title: 'ID',
      key: 'id',
      dataIndex: 'payment_id',
    },
    {
      title: 'Clinic ID',
      key: 'clinic id',
      dataIndex: 'clinic_id',
    },
    {
      title: 'Created date',
      key: 'created date',
      render: (record) => formatDateAndTime(record.date),
    },
    {
      title: 'Paid on',
      key: 'Paid on',
      render: (record) => record.paid_on && formatDateAndTime(record.paid_on),
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <div className="button-container">
          <Link
            style={{ marginRight: 10 }}
            className={'button button--view'}
            to={`/clinics/detail/${record.clinic_id}/payments/detail/${record.payment_id}`}
          >
            <ImEye />
            <span>View detail</span>
          </Link>
        </div>
      ),
    },
  ];

  const medicalRecordColumns = [
    {
      title: 'ID',
      key: 'id',
      dataIndex: 'record_id',
    },
    // {
    //   title: 'Address',
    //   key: 'patient_address',
    //   dataIndex: 'patient_address',
    // },
    {
      title: 'Created date',
      key: 'created date',
      render: (record) => formatDateAndTime(record.created_date),
    },
    {
      title: 'Status',
      key: 'status',
      render: (record) => <Tag status={record.status} />,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record) => (
        <div className="button-container">
          <Link
            to={`/detail/${record.record_id}`}
            className="button button--view"
          >
            <ImEye className="icon" />
            <span>View</span>
          </Link>
        </div>
      ),
    },
  ];

  const handleSubmit = (values) => {
    let newAppointment = {
      clinic_id: values.clinic_id,
      category_id: values.category,
      doctor_id: values.doctor,
      date: moment(values.date).format('YYYY-MM-DD'),
      time: values.time,
      name: values.name,
      phone: values.phone,
      email: values.email,
      description: values.description,
      gender: values.gender,
      is_foreigner: values.foreigner,
      status: values.status,
      appointment_id: selectedAppointment.appointment_id,
    };

    try {
      dispatch(updateAppointment(newAppointment));
      dispatch(updatePatientAppointments(newAppointment));
    } catch (error) {
      return message.error(error.message, 3);
    }
  };

  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={() => navigate('/patients')}
        title={`Patient detail`}
      />
      {Object.keys(patient).length > 0 && (
        <div className="user-profile-container">
          <div className="cover"></div>
          <div className="user-header">
            <img className="avatar" alt="avatar" src={patient.avatar} />
            <div className="user-info">
              <h2 className="name">{patient.full_name}</h2>
            </div>
          </div>
          <div className="user-body">
            <Tabs
              type="card"
              items={[
                'Personal Information',
                'Appointment',
                'Payment',
                'Medical Record',
              ].map((item, index) => {
                if (index === 0) {
                  return {
                    label: item,
                    key: index,
                    children: (
                      <div className="personal-information-container">
                        <div className="info-item">
                          <span className="left">Name: </span>
                          <span className="right">{patient.full_name}</span>
                        </div>
                        <div className="info-item">
                          <span className="left">Gender: </span>
                          <span className="right">{patient.gender}</span>
                        </div>
                        <div className="info-item">
                          <span className="left">Phone: </span>
                          <span className="right">{patient.phone}</span>
                        </div>
                        <div className="info-item">
                          <span className="left">Email: </span>
                          <span className="right">{patient.email}</span>
                        </div>
                        <div className="info-item">
                          <span className="left">Date of birth: </span>
                          <span className="right">
                            {moment(patient.date_of_birth).format('DD-MM-YYYY')}
                          </span>
                        </div>
                        <div className="info-item">
                          <span className="left">City: </span>
                          <span className="right">{patient.city}</span>
                        </div>
                        <div className="info-item">
                          <span className="left">Address: </span>
                          <span className="right">{patient.address}</span>
                        </div>
                      </div>
                    ),
                  };
                } else if (index === 1) {
                  return {
                    label: item,
                    key: index,
                    children: (
                      <div className="appointment-container">
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
                        />

                        {Object.keys(selectedAppointment).length > 0 && (
                          <>
                            <h2 className="title">Appointment Form</h2>
                            <Form
                              className="appointmentForm"
                              {...formItemLayout}
                              form={form}
                              onFinish={handleSubmit}
                              name="appointmentForm"
                              scrollToFirstError
                              z
                            >
                              {/* Clinic ID */}
                              <Form.Item
                                name="clinic_id"
                                label="Appointment ID: "
                              >
                                <Input disabled />
                              </Form.Item>

                              {/* Doctor ID */}
                              <Form.Item
                                label="Doctor"
                                name="doctor"
                                rules={[
                                  {
                                    required: true,
                                    message: 'Please select your doctor!',
                                  },
                                ]}
                              >
                                <Select placeholder="Select doctor">
                                  {doctors.map((doctor, index) => (
                                    <Option
                                      key={index}
                                      value={doctor.doctor_id}
                                    >
                                      {doctor.doctor.full_name}
                                    </Option>
                                  ))}
                                </Select>
                              </Form.Item>

                              {/* Category ID */}
                              <Form.Item
                                label="Category"
                                name="category"
                                rules={[
                                  {
                                    required: true,
                                    message: 'Please select category!',
                                  },
                                ]}
                              >
                                <Select placeholder="Select category">
                                  {categories.map((category, index) => (
                                    <Option
                                      key={index}
                                      value={category.category_id}
                                    >
                                      {category.category.category_name}
                                    </Option>
                                  ))}
                                </Select>
                              </Form.Item>

                              {/* Customer name */}
                              <Form.Item
                                name="name"
                                label="Customer Name"
                                rules={[
                                  {
                                    required: true,
                                    message: 'Please input customer name!',
                                  },
                                ]}
                              >
                                <Input placeholder="Enter customer name!" />
                              </Form.Item>

                              {/* Gender */}
                              <Form.Item
                                label="Gender"
                                name="gender"
                                rules={[
                                  {
                                    required: true,
                                    message: 'Please select your gender!',
                                  },
                                ]}
                              >
                                <Radio.Group>
                                  <Radio value="Female">Female</Radio>
                                  <Radio value="Male">Male</Radio>
                                  <Radio value="Other">Other</Radio>
                                </Radio.Group>
                              </Form.Item>

                              {/* Phone */}
                              <Form.Item
                                name="phone"
                                label="Phone"
                                rules={[
                                  {
                                    required: true,
                                    message: 'Please input your phone!',
                                  },
                                ]}
                              >
                                <Input placeholder="Enter phone!" />
                              </Form.Item>

                              {/* Email */}
                              <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                  {
                                    type: 'email',
                                    message: 'The input is not valid e-mail!',
                                  },
                                  {
                                    required: true,
                                    message: 'Please input e-mail!',
                                  },
                                ]}
                              >
                                <Input placeholder="Enter email!" />
                              </Form.Item>

                              {/* Date */}
                              <Form.Item
                                name="date"
                                label="Date"
                                rules={[
                                  {
                                    required: true,
                                    message: 'Please select date!',
                                  },
                                ]}
                              >
                                <DatePicker
                                  allowClear="false"
                                  format="DD-MM-YYYY"
                                />
                              </Form.Item>

                              {/* Time */}
                              <Form.Item
                                name="time"
                                label="Time"
                                rules={[
                                  {
                                    required: true,
                                    message: 'Please select time!',
                                  },
                                ]}
                              >
                                <Select placeholder="Select time">
                                  {TIME_WORKING.map((time, index) => (
                                    <Option key={index} value={time}>
                                      {time}
                                    </Option>
                                  ))}
                                </Select>
                              </Form.Item>

                              {/* Description */}
                              <Form.Item
                                name="description"
                                label="Description"
                                rules={[
                                  {
                                    required: true,
                                    message: 'Please enter description!',
                                  },
                                ]}
                              >
                                <Input.TextArea
                                  placeholder="Detailed description of symptoms"
                                  showCount
                                  rows={12}
                                  maxLength={1000}
                                />
                              </Form.Item>

                              {/* Status */}
                              <Form.Item
                                name="status"
                                label="Status"
                                rules={[
                                  {
                                    required: true,
                                    message: 'Please select status!',
                                  },
                                ]}
                              >
                                <Select placeholder="Select status">
                                  {STATUS_APPOINTMENT.map((status, index) => (
                                    <Option value={status} key={index}>
                                      {status.charAt(0).toUpperCase() +
                                        status.slice(1)}
                                    </Option>
                                  ))}
                                </Select>
                              </Form.Item>

                              {/* Is foreigner */}
                              <Form.Item
                                valuePropName="checked"
                                name="foreigner"
                                label="Is foreigner"
                              >
                                <Checkbox>Book for a foreigner</Checkbox>
                              </Form.Item>

                              {/* Button */}
                              <Form.Item {...tailFormItemLayout}>
                                <Button
                                  className="button button--main"
                                  style={{ marginLeft: 'auto' }}
                                  type="submit"
                                >
                                  {clinicsLoading ? (
                                    <Spinner />
                                  ) : (
                                    <span>Update appointment</span>
                                  )}
                                </Button>
                              </Form.Item>
                            </Form>
                          </>
                        )}
                      </div>
                    ),
                  };
                } else if (index === 2) {
                  return {
                    label: item,
                    key: index,
                    children: (
                      <div className="payment-container">
                        <Table
                          rowClassName="custom-row"
                          x={true}
                          loading={appointmentsLoading}
                          columns={paymentColumns}
                          scroll={{ x: 300 }}
                          pagination={{
                            position: ['bottomCenter'],
                          }}
                          dataSource={payments}
                          rowKey={(record) => record.payment_id}
                        />
                      </div>
                    ),
                  };
                } else {
                  return {
                    label: item,
                    key: index,
                    children: (
                      <Table
                        className="medical-record-table"
                        x={true}
                        loading={medicalRecordLoading}
                        scroll={{ x: 300 }}
                        pagination={{
                          position: ['bottomCenter'],
                        }}
                        columns={medicalRecordColumns}
                        dataSource={medicalRecords}
                        rowKey={(record) => record.record_id}
                      />
                    ),
                  };
                }
              })}
            />
          </div>
        </div>
      )}
    </>
  );
}
