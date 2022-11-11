import React, { useEffect, useState } from 'react';
import { Form, Input, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  fetchPayment,
  selectClinicsLoading,
  selectPaymentNeedUpdate,
} from '../../../../../store/slices/clinicsSlice';
import { STATUS_APPOINTMENT } from '../../../../../constants';
import Button from '../../../../../components/Button';
import Spinner from '../../../../../components/Spinner';
import {
  fetchPatients,
  selectPatients,
} from '../../../../../store/slices/patientsSlice';

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

export default function PaymentForm({ mode }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [modeHaveAccount, setModeHaveAcocunt] = useState(true);
  const { clinic_id, payment_id } = useParams();
  const paymentNeedUpdate = useSelector(selectPaymentNeedUpdate);
  const isLoading = useSelector(selectClinicsLoading);
  const patients = useSelector(selectPatients);

  useEffect(() => {
    dispatch(fetchPayment({ payment_id, clinic_id }));
  }, [clinic_id, dispatch, payment_id]);

  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  useEffect(() => {
    if (Object.keys(paymentNeedUpdate).length > 0 && !modeHaveAccount) {
      form.setFieldsValue({
        clinic_id: clinic_id,
        name: paymentNeedUpdate.name,
        phone: paymentNeedUpdate.phone,
        email: paymentNeedUpdate.email,
        status: paymentNeedUpdate.status,
      });
    }
  }, [clinic_id, form, modeHaveAccount, paymentNeedUpdate]);

  const handleSubmit = (values) => {};

  return (
    <div className="appointment-content-detail">
      <div className="header">
        <h4 className="title">
          {mode === 'create' ? 'Create' : 'Update'} payment
        </h4>
      </div>

      <Form
        className="paymentForm"
        {...formItemLayout}
        form={form}
        onFinish={handleSubmit}
        name="paymentForm"
        scrollToFirstError
      >
        {/* Clinic ID */}
        <Form.Item label="Appointment ID" name="clinic_id">
          <Input disabled={true} />
        </Form.Item>

        {!modeHaveAccount ? (
          <>
            {/* Name */}
            <Form.Item
              name="name"
              label="Patient Name"
              rules={[
                {
                  required: true,
                  message: 'Please input patient name!',
                },
              ]}
            >
              <Input placeholder="Enter patient name!" />
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
          </>
        ) : (
          <Form.Item
            name="patient_id"
            label="Patient"
            rules={[
              {
                required: true,
                message: 'Please select patient',
              },
            ]}
          >
            <Select placeholder="Select patient">
              {patients.map((patient, index) => (
                <Option key={index} value={patient.patient_id}>
                  {patient.patient_id} - {patient.full_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}

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
            <Select placeholder="Select status">
              {STATUS_APPOINTMENT.map((status, index) => (
                <Option value={status} key={index}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}

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
              `${mode === 'create' ? 'Add' : 'Update'} payment`
            )}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
