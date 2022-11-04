import React, { useEffect } from 'react';
import { PageHeader, Form, Input, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import Button from '../../../components/Button';
import Spinner from '../../../components/Spinner';
import {
  createSupport,
  fetchSupport,
  selectSupportNeedUpdate,
  selectSupportsIsLoading,
  updateSupport,
} from '../../../store/slices/supportsSlice';
import { STATUS_SUPPORT } from '../../../constants';

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

export default function SupportForm({ mode }) {
  const [form] = Form.useForm();
  const { support_id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectSupportsIsLoading);
  const supportNeedUpdate = useSelector(selectSupportNeedUpdate);

  useEffect(() => {
    if (mode === 'update') {
      dispatch(fetchSupport(support_id));
    }
  }, [dispatch, mode, support_id]);

  useEffect(() => {
    if (Object.keys(supportNeedUpdate).length > 0) {
      if (mode === 'update') {
        form.setFieldsValue({
          subject: supportNeedUpdate.subject,
          name: supportNeedUpdate.name,
          phone: supportNeedUpdate.phone,
          email: supportNeedUpdate.email,
          description: supportNeedUpdate.description,
          status: supportNeedUpdate.status,
        });
      }
    }
  });

  const handleSubmit = (values) => {
    let newSupport = {
      subject: values.subject,
      name: values.name,
      phone: values.phone,
      email: values.email,
      description: values.description,
    };

    if (mode === 'create') {
      dispatch(createSupport(newSupport));
      form.resetFields();
    } else {
      newSupport = { ...newSupport, support_id, status: values.status };
      if (values.status === 'blocking') {
        newSupport.reason = values.reason;
      }
      dispatch(updateSupport(newSupport));
    }
  };

  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={() => navigate('/supports')}
        title={mode === 'create' ? 'Add support' : 'Update support'}
        subTitle="This is a subtitle"
      />
      <Form
        className="supportForm"
        {...formItemLayout}
        form={form}
        onFinish={handleSubmit}
        name="supportForm"
        scrollToFirstError
      >
        {/* Subject */}
        <Form.Item
          name="subject"
          label="Subject"
          rules={[
            {
              required: true,
              message: 'Please input your subject!',
            },
          ]}
        >
          <Input placeholder="Enter subject" />
        </Form.Item>

        {/* Name */}
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: 'Please input your name!',
            },
          ]}
        >
          <Input placeholder="Enter name" />
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
            rows={6}
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
            <Select placeholder="Select status">
              {STATUS_SUPPORT.map((status, index) => (
                <Option value={status} key={index}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}

        {/* Reason */}
        <Form.Item name="reason" label="Reason">
          <Input.TextArea
            placeholder="Enter reason if you set status of support equals to blocking"
            showCount
            rows={6}
            maxLength={1000}
          />
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
    </>
  );
}
