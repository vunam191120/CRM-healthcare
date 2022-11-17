import React, { useEffect, useState } from 'react';
import { DatePicker, Form, Input, Select, Radio, Checkbox } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';

import Button from '../../../../../components/Button';
import Spinner from '../../../../../components/Spinner';
import { STATUS_APPOINTMENT, TIME_WORKING } from '../../../../../constants';
import {
  createAppointment,
  fetchAppointment,
  selectAppointmentNeedUpdate,
  selectAppointmentsIsLoading,
  updateAppointment,
} from '../../../../../store/slices/appointmentsSlice';
import {
  fetchCategoriesByClinic,
  fetchDoctorsClinic,
  selectCategoriesByClinic,
  selectDoctorsByClinic,
} from '../../../../../store/slices/clinicsSlice';

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

const { Option } = Select;

export default function AppointmentForm({ mode }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [statusCanceled, setStatusCanceled] = useState(false);
  const { appointment_id, clinic_id } = useParams();
  const categories = useSelector(selectCategoriesByClinic);
  const doctors = useSelector(selectDoctorsByClinic);
  const isLoading = useSelector(selectAppointmentsIsLoading);
  const appointmentNeedUpdate = useSelector(selectAppointmentNeedUpdate);

  useEffect(() => {
    dispatch(fetchDoctorsClinic(clinic_id));
  }, [clinic_id, dispatch]);

  useEffect(() => {
    dispatch(fetchCategoriesByClinic(clinic_id));
  }, [clinic_id, dispatch]);

  useEffect(() => {
    if (mode === 'update') {
      dispatch(fetchAppointment(appointment_id));
    }
  }, [appointment_id, dispatch, mode]);

  useEffect(() => {
    if (Object.keys(appointmentNeedUpdate).length > 0) {
      form.setFieldsValue({
        clinic_id: appointmentNeedUpdate.clinic_id,
        category: appointmentNeedUpdate.category_id,
        doctor: appointmentNeedUpdate.doctor_id,
        date: moment(appointmentNeedUpdate.date),
        time: appointmentNeedUpdate.time,
        name: appointmentNeedUpdate.name,
        phone: appointmentNeedUpdate.phone,
        email: appointmentNeedUpdate.email,
        description: appointmentNeedUpdate.description,
        gender: appointmentNeedUpdate.gender,
        status: appointmentNeedUpdate.status,
        foreigner: appointmentNeedUpdate.is_foreigner,
      });
    }
  }, [appointmentNeedUpdate, form]);

  const handleSubmit = (values) => {
    let newAppointment = {
      clinic_id,
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
    };

    if (mode === 'create') {
      dispatch(createAppointment(newAppointment));
    } else {
      newAppointment.status = values.status;
      newAppointment.appointment_id = appointment_id;
      if (values.status === 'canceled') {
        newAppointment.reason = values.reason;
      }
      dispatch(updateAppointment(newAppointment));
    }
  };

  return (
    <div className="appointment-content-detail">
      <div className="header">
        <h4 className="title">
          {mode === 'create' ? 'Create' : 'Update'} appointment
        </h4>
      </div>

      <Form
        className="appointmentForm"
        {...formItemLayout}
        form={form}
        onFinish={handleSubmit}
        name="appointmentForm"
        scrollToFirstError
      >
        {/* Clinic ID */}
        <Form.Item label="Appointment ID" name="clinic_id">
          <Input className="input-custom-disabled" disabled={true} />
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
              <Option key={index} value={doctor.doctor_id}>
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
              <Option key={index} value={category.category_id}>
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
          <DatePicker allowClear="false" format="DD-MM-YYYY" />
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
        {mode === 'update' && (
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
            <Select
              onChange={(value) => setStatusCanceled(value === 'canceled')}
              placeholder="Select status"
            >
              {STATUS_APPOINTMENT.map((status, index) => (
                <Option value={status} key={index}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}

        {statusCanceled && (
          <>
            {/* Reason */}
            <Form.Item
              label="Reason"
              name="reason"
              rules={[
                {
                  required: true,
                  message: 'Please input reason for this payment!',
                },
              ]}
            >
              <Input.TextArea placeholder="Enter reason" rows={3} />
            </Form.Item>
          </>
        )}

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
            {isLoading ? (
              <Spinner />
            ) : (
              `${mode === 'create' ? 'Add' : 'Update'} appointment`
            )}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
