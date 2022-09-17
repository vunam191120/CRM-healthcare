import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  Switch,
  Checkbox,
  Form,
  Input,
  Upload,
  Select,
  PageHeader,
  DatePicker,
} from 'antd';
import moment from 'moment';

import Modal from '../../../components/Modal';
import Button from '../../../components/Button';
import Spinner from '../../../components/Spinner';
import {
  createUser,
  fetchUser,
  selectUpdateUser,
  selectUsersLoading,
} from '../../../store/slices/usersSlice';
import { ROLES } from '../../../constants';

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

export default function AccountForm({ mode }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector(selectUsersLoading);
  const updateUser = useSelector(selectUpdateUser);
  const { userId } = useParams();
  const [form] = Form.useForm();
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
  const [preview, setPreview] = useState({
    isOpen: false,
    title: '',
    src: '',
  });
  const [fileList, setFileList] = useState([]);

  // Get user need to update
  useEffect(() => {
    if (mode === 'update') {
      dispatch(fetchUser(userId));
    }
  }, [mode, dispatch, userId]);

  // Fill values after getting needed user
  useEffect(() => {
    if (Object.keys(updateUser).length > 0) {
      form.setFieldsValue({
        firstName: updateUser.firstName,
        lastName: updateUser.lastName,
        email: updateUser.email,
        password: updateUser.password,
        confirm: updateUser.password,
        phone: updateUser.phone,
        experiences: updateUser.experiences,
        gender: updateUser.gender,
        role: updateUser.role,
        dateOfBirth: moment(updateUser.dateOfBirth, 'DDMMYYYY'),
        profileStatus: true,
        agreement: true,
      });
    }
  }, [form, updateUser]);

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

  const handleClose = () => {
    setPreview({ ...preview, isOpen: false });
  };

  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append('first_name', values.firstName);
    formData.append('last_name', values.lastName);
    formData.append('email', values.email);
    formData.append('password', values.password);
    formData.append('phone', values.prefix + values.phone);
    // formData.append('gender', values.gender);
    formData.append('avatar', fileList);
    formData.append('role_id', values.role);
    //     "email": "admin@gmail.com",
    // "last_name": "last_name",
    // "first_name": "first_name",
    // "phone": "88888888",
    // "role_id": 1,
    // "password": "123456789",
    // "avatar": "test"
    // formData.append('date_of_birth', values.dateOfBirth);
    // formData.append('experience', values.prefix + values.experience);
    // formData.append('documents', fileList);
    if (mode === 'create') {
      dispatch(createUser(formData));
    } else if (mode === 'update') {
      formData.append('id', userId);
      dispatch(updateUser(formData));
    }
  };

  // Fill method for testing
  const onFill = () => {
    form.setFieldsValue({
      firstName: 'Vu',
      lastName: 'Nam',
      email: 'admin@gmail.com',
      password: 'admin',
      confirm: 'admin',
      phone: '971940618',
      experiences: '22 years of being a couch potato :D',
      gender: 'Male',
      role: '1',
      dateOfBirth: moment('19112000', 'DDMMYYYY'),
      profileStatus: true,
      agreement: true,
    });
  };

  const handleReset = () => {
    form.resetFields();
  };

  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={() => navigate('/accounts')}
        title={mode === 'create' ? 'Add User' : 'Update User'}
        subTitle="This is a subtitle"
      />
      <Form
        className="userForm"
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={handleSubmit}
        initialValues={{
          prefix: '84',
        }}
        scrollToFirstError
      >
        {/* First Name */}
        <Form.Item
          name="firstName"
          label="First Name"
          rules={[
            {
              required: true,
              message: 'Please input your first name!',
            },
          ]}
        >
          <Input placeholder="Enter your first name!" />
        </Form.Item>

        {/* Last Name */}
        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[
            {
              required: true,
              message: 'Please input your last name!',
            },
          ]}
        >
          <Input placeholder="Enter your last name!" />
        </Form.Item>

        {/* Email */}
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
          <Input placeholder="Enter your email!" />
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
          <Input.Password placeholder="Enter your password!" />
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
          <Input.Password placeholder="Confirm your password!" />
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
            placeholder="Enter your phone!"
            addonBefore={prefixSelector}
            style={{
              width: '100%',
            }}
          />
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
          <Select placeholder="Select your gender">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>

        {/* Role */}
        <Form.Item
          name="role"
          label="Role"
          rules={[
            {
              required: true,
              message: 'Please select role!',
            },
          ]}
        >
          <Select placeholder="Select your role!">
            <Option value={ROLES.ADMIN}>Admin</Option>
            <Option value={ROLES.SALE}>Sale</Option>
            <Option value={ROLES.BACK_OFFICER}>Back Officer</Option>
          </Select>
        </Form.Item>

        {/* Date of Birth */}
        <Form.Item name="dateOfBirth" label="Date of Birth">
          <DatePicker allowClear={false} format="DD-MM-YYYY" />
        </Form.Item>

        {/* Experiences */}
        {/* <Form.Item
          name="experiences"
          label="Experiences"
          rules={[
            {
              required: true,
              message: 'Please input experience',
            },
          ]}
        >
          <Input.TextArea
            placeholder="Enter your experiences"
            showCount
            maxLength={100}
          />
        </Form.Item> */}

        {/* Documents */}
        <Form.Item label="Avatar" valuePropName="fileList">
          <Upload
            onRemove={(file) => {
              const index = fileList.indexOf(file);
              const newFileList = fileList.slice();
              newFileList.splice(index, 1);
              setFileList(newFileList);
            }}
            beforeUpload={(file) => {
              // Fake sending document to action props succesfully
              file.status = 'done';
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = (event) => {
                file.thumbUrl = event.target.result;
              };
              setFileList((fileList) => [...fileList, file]);
              return false;
            }}
            listType="picture-card"
            // multiple
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

        {/* Profile status */}
        <Form.Item
          name="profileStatus"
          valuePropName="checked"
          label="Profile status"
        >
          <Switch defaultChecked className="switch" />
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
          <Button className="button--main" type="submit">
            {/* Show spinner whenever click this button */}
            {isLoading ? (
              <Spinner />
            ) : (
              `${mode === 'create' ? 'Add User' : 'Update User'}`
            )}
          </Button>
          {mode === 'create' && (
            <Link style={{ marginLeft: 30 }} to="" onClick={onFill}>
              Fill form
            </Link>
          )}
          <Button
            className="button--light"
            type="button"
            handleClick={handleReset}
          >
            Reset
          </Button>
        </Form.Item>
      </Form>
      <Modal
        isOpen={preview.isOpen}
        header={<h4 className="modal__title">{preview.title}</h4>}
        message={
          <div>
            <img className="modal__image" src={preview.src} alt="Preivew img" />
          </div>
        }
        onClose={handleClose}
        onConfirm={handleClose}
      />
    </>
  );
}
