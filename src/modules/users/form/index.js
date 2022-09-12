import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import {
  Button,
  Checkbox,
  Form,
  Input,
  Upload,
  Select,
  PageHeader,
} from 'antd';

import Modal from '../../../components/Modal';

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

export default function UsersForm({ mode }) {
  const [form] = Form.useForm();
  const [preview, setPreview] = useState({
    isOpen: false,
    title: '',
    src: '',
  });
  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ]);

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="84">+84</Option>
      </Select>
    </Form.Item>
  );

  const handlePreview = async (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setPreview({
        ...preview,
        src: event.target.result,
        title: file.name,
        isOpen: true,
      });
    };
  };

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={() => null}
        title="Add User"
        subTitle="This is a subtitle"
      />
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          prefix: '84',
        }}
        scrollToFirstError
      >
        {/* Username */}
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* Password */}
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        {/* Confirm Password */}
        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error('The two passwords that you entered do not match!')
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        {/* Phone */}
        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            {
              required: true,
              message: 'Please input your phone number!',
            },
          ]}
        >
          <Input
            addonBefore={prefixSelector}
            style={{
              width: '100%',
            }}
          />
        </Form.Item>

        {/* Experience */}
        <Form.Item
          name="experience"
          label="Experience"
          rules={[
            {
              required: true,
              message: 'Please input experience',
            },
          ]}
        >
          <Input.TextArea showCount maxLength={100} />
        </Form.Item>

        {/* Gender */}
        <Form.Item
          name="gender"
          label="Gender"
          rules={[
            {
              required: true,
              message: 'Please select gender!',
            },
          ]}
        >
          <Select placeholder="select your gender">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>

        {/* Documents */}
        <Form.Item label="Upload" valuePropName="fileList">
          <Upload
            onRemove={(file) => {
              const index = fileList.indexOf(file);
              const newFileList = fileList.slice();
              newFileList.splice(index, 1);
              setFileList(newFileList);
            }}
            beforeUpload={(file) => {
              file.status = 'done';
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = (event) => {
                file.thumbUrl = event.target.result;
              };
              setFileList([...fileList, file]);
              return false;
            }}
            listType="picture-card"
            multiple
            fileList={fileList}
            onPreview={handlePreview}
          >
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </div>
          </Upload>
        </Form.Item>

        {/* Agreement */}
        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error('Should accept agreement')),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            I have read the <Link to="">agreement</Link>
          </Checkbox>
        </Form.Item>

        {/* Button */}
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            {mode === 'create' ? 'Add user' : 'Update User'}
          </Button>
        </Form.Item>
      </Form>
      <Modal
        isOpen={preview.isOpen}
        title={preview.title}
        icon={null}
        message={<img src={preview.src} alt="Preivew img" />}
        onClose={() => ({ ...preview, isOpen: false })}
        onConfirm={() => ({ ...preview, isOpen: false })}
      />
      <pre>{JSON.stringify(fileList, null, 2)}</pre>
    </>
  );
}
