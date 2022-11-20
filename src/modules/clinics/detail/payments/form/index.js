import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Switch } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { STATUS_APPOINTMENT } from '../../../../../constants';
import Button from '../../../../../components/Button';
import Spinner from '../../../../../components/Spinner';
import {
  fetchPatients,
  selectPatients,
} from '../../../../../store/slices/patientsSlice';
import {
  addPayment,
  fetchPayment,
  selectPaymentNeedUpdate,
  selectPaymentsIsLoading,
  updatePayment,
} from '../../../../../store/slices/paymentsSlice';

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
  const [modeHaveAccount, setModeHaveAccount] = useState(true);
  const [statusCanceled, setStatusCanceled] = useState(false);
  const { clinic_id, payment_id } = useParams();
  const paymentNeedUpdate = useSelector(selectPaymentNeedUpdate);
  const isLoading = useSelector(selectPaymentsIsLoading);
  const patients = useSelector(selectPatients);

  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  // Fetch payment when go to update form
  useEffect(() => {
    if (mode === 'update') {
      dispatch(fetchPayment(payment_id));
    }
  }, [dispatch, mode, payment_id]);

  useEffect(() => {
    if (Object.keys(paymentNeedUpdate).length > 0 && mode === 'update') {
      form.setFieldsValue({
        full_name: paymentNeedUpdate.full_name,
        phone: paymentNeedUpdate.phone,
        email: paymentNeedUpdate.email,
        status: paymentNeedUpdate.status,
      });
    }
  }, [clinic_id, form, mode, modeHaveAccount, paymentNeedUpdate]);

  // Fill form based on mode and modeHaveAccount
  useEffect(() => {
    if (mode === 'update' && modeHaveAccount && paymentNeedUpdate.patient_id) {
      form.setFieldValue('patient_id', paymentNeedUpdate.patient_id);
    } else if (
      mode === 'update' &&
      !modeHaveAccount &&
      !paymentNeedUpdate.patient_id
    ) {
      form.setFieldValue('full_name', paymentNeedUpdate.full_name);
    }

    // Fill based on status
    if (paymentNeedUpdate.status === 'canceled') {
      setStatusCanceled(true);
      form.setFieldValue('reason', paymentNeedUpdate.reason);
    }
  }, [form, mode, modeHaveAccount, paymentNeedUpdate]);

  // Reset fields whenever change mode account back to no when creating
  useEffect(() => {
    if (!modeHaveAccount && mode === 'create') {
      form.resetFields();
    }
  }, [form, mode, modeHaveAccount]);

  const handleSubmit = (values) => {
    const newPayment = {
      phone: values.phone,
      email: values.email,
      clinic_id,
    };

    if (modeHaveAccount) {
      newPayment.patient_id = values.patient_id;
      newPayment.is_register = true;
    } else {
      newPayment.full_name = values.full_name;
    }

    if (mode === 'create') {
      dispatch(addPayment(newPayment));
    } else {
      newPayment.payment_id = paymentNeedUpdate.payment_id;
      newPayment.status = values.status;
      if (values.status === 'canceled') {
        newPayment.reason = values.reason;
      }
      dispatch(updatePayment(newPayment));
    }
  };

  return (
    <div className="payment-content-detail">
      <div className="header">
        <h4 className="title">
          {mode === 'create' ? 'Create' : 'Update'} payment
        </h4>
      </div>

      {mode === 'create' && (
        <div className="switch-table">
          <span className="text-mode">
            {modeHaveAccount
              ? 'Payment has patient accounts'
              : 'Payment does not have patient accounts'}
            :{' '}
          </span>
          <Switch
            onChange={(values) => {
              setModeHaveAccount(values);
            }}
            defaultChecked={modeHaveAccount}
            className="switch"
          />
        </div>
      )}

      <Form
        className="paymentForm"
        {...formItemLayout}
        form={form}
        onFinish={handleSubmit}
        name="paymentForm"
        scrollToFirstError
      >
        {((mode === 'create' && !modeHaveAccount) ||
          (mode === 'update' && !paymentNeedUpdate.is_register)) && (
          <>
            {/* Name */}
            <Form.Item
              name="full_name"
              label="Patient Name"
              rules={[
                {
                  required: true,
                  message: 'Please input patient name!',
                },
              ]}
            >
              <Input
                disabled={mode === 'update'}
                className="input-custom-disabled"
                placeholder="Enter patient name!"
              />
            </Form.Item>
          </>
        )}
        {((mode === 'create' && modeHaveAccount) ||
          (mode === 'update' && paymentNeedUpdate.is_register)) && (
          <>
            {/* Patients */}
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
              <Select
                disabled={mode === 'update'}
                className="input-custom-disabled"
                onChange={(e) => {
                  const selectedPatient = patients.find(
                    (patient) => patient.patient_id === e
                  );
                  form.setFieldsValue({
                    phone: selectedPatient.phone,
                    email: selectedPatient.email,
                  });
                }}
                placeholder="Select patient"
              >
                {patients.map((patient, index) => (
                  <Option key={index} value={patient.patient_id}>
                    {patient.patient_id} - {patient.full_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </>
        )}

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
          <Input
            disabled={modeHaveAccount}
            className="input-custom-disabled"
            placeholder={`${modeHaveAccount ? '' : 'Enter phone!'}`}
          />
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
          <Input
            disabled={modeHaveAccount}
            className="input-custom-disabled"
            placeholder={`${modeHaveAccount ? '' : 'Enter email!'}`}
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
