import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
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
  updateUser,
  fetchUser,
  selectUserNeedUpdate,
  selectUsersLoading,
  changeUserNeedUpdateAvatar,
  deleteUserNeedUpdateAvatar,
  setUserNeedUpdate,
} from '../../../store/slices/usersSlice';
import { ROLES } from '../../../constants';
import checkRole from '../../../helpers/checkRole';

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
  const [oldImage, setOldImage] = useState(false);
  const isLoading = useSelector(selectUsersLoading);
  const userNeedUpdate = useSelector(selectUserNeedUpdate);
  const { email } = useParams();
  const [form] = Form.useForm();
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="0">+ 84</Option>
      </Select>
    </Form.Item>
  );
  const [preview, setPreview] = useState({
    isOpen: false,
    name: '',
    src: '',
  });
  const [avatar, setAvatar] = useState([]);

  // Get user need to update
  useEffect(() => {
    if (mode === 'update') {
      dispatch(fetchUser(email));
    }
  }, [mode, dispatch, email]);

  // Fill values after getting needed user
  useEffect(() => {
    if (mode === 'update') {
      if (Object.keys(userNeedUpdate).length > 0) {
        form.setFieldsValue({
          first_name: userNeedUpdate.first_name,
          last_name: userNeedUpdate.last_name,
          email: userNeedUpdate.email,
          phone: userNeedUpdate.phone,
          gender: userNeedUpdate.gender,
          role: checkRole(userNeedUpdate.role_id),
          date_of_birth: moment(userNeedUpdate.date_of_birth, 'DD-MM-YYYY'),
          profile_status: userNeedUpdate.profile_status,
          agreement: true,
        });
      }
    }
  }, [form, mode, userNeedUpdate]);

  const handlePreview = (file) => {
    if (mode === 'update') {
      setPreview({
        ...preview,
        src: userNeedUpdate.avatar[0].url,
        name: userNeedUpdate.avatar[0].name,
        isOpen: true,
      });
    } else {
      setPreview({
        ...preview,
        src: file.url,
        name: file.name,
        isOpen: true,
      });
    }
  };

  const handleClose = () => {
    setPreview({ ...preview, isOpen: false });
  };

  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append('first_name', values.first_name);
    formData.append('last_name', values.last_name);
    formData.append('full_name', `${values.first_name} ${values.last_name}`);
    formData.append('email', values.email);
    formData.append('phone', `${values.prefix}${values.phone}`);
    formData.append('gender', values.gender);
    formData.append('date_of_birth', values.date_of_birth.format('DD-MM-YYYY'));
    formData.append('profile_status', values.profile_status);
    formData.append('old_image', oldImage);
    if (mode === 'create') {
      formData.append('avatar', avatar[0]);
      formData.append('role_id', values.role);
      formData.append('password', values.password);
      dispatch(createUser(formData));
    } else if (mode === 'update') {
      oldImage && formData.append('avatar', avatar[0]);
      formData.append('role_id', ROLES[values.role.toUpperCase()]);
      formData.append('user_id', userNeedUpdate.user_id);
      dispatch(updateUser(formData));
    }
  };

  // Fill method for testing
  const onFill = () => {
    form.setFieldsValue({
      first_name: 'Vu',
      last_name: 'Nam',
      email: 'admin@gmail.com',
      password: 'admin',
      confirm: 'admin',
      phone: '971940618',
      experiences: '22 years of being a couch potato :D',
      gender: 'Male',
      role: '1',
      date_of_birth: moment('19112000', 'DD-MM-YYYY'),
      profile_status: true,
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
        title={mode === 'create' ? 'Add account' : 'Update account'}
        subTitle="This is a subtitle"
      />
      <Form
        className="userForm"
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={handleSubmit}
        initialValues={{
          prefix: '0',
        }}
        scrollToFirstError
      >
        {/* First Name */}
        <Form.Item
          name="first_name"
          label="First Name"
          rules={[
            {
              required: true,
              message: 'Please input your first name!',
            },
          ]}
        >
          <Input
            onBlur={(e) =>
              dispatch(
                setUserNeedUpdate({
                  first_name: e.target.value,
                })
              )
            }
            placeholder="Enter your first name!"
          />
        </Form.Item>

        {/* Last Name */}
        <Form.Item
          name="last_name"
          label="Last Name"
          rules={[
            {
              required: true,
              message: 'Please input your last name!',
            },
          ]}
        >
          <Input
            onBlur={(e) =>
              dispatch(
                setUserNeedUpdate({
                  last_name: e.target.value,
                })
              )
            }
            placeholder="Enter your last name!"
          />
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
          <Input disabled={mode === 'update'} placeholder="Enter your email!" />
        </Form.Item>

        {/* Password */}
        {mode === 'create' && (
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
        )}

        {/* Confirm Password */}
        {mode === 'create' && (
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
                    new Error(
                      'The two passwords that you entered do not match!'
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm your password!" />
          </Form.Item>
        )}

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
            onBlur={(e) =>
              dispatch(
                setUserNeedUpdate({
                  phone: e.target.value,
                })
              )
            }
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
          <Select
            onChange={(value) => {
              dispatch(
                setUserNeedUpdate({
                  gender: value,
                })
              );
            }}
            placeholder="Select your gender"
          >
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
            <Option value="Other">Other</Option>
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
          <Select
            onChange={(value) => {
              dispatch(
                setUserNeedUpdate({
                  role_id: value,
                })
              );
            }}
            placeholder="Select your role!"
          >
            <Option value={ROLES.ADMIN}>Admin</Option>
            <Option value={ROLES.SALE}>Sale</Option>
            <Option value={ROLES.BACK_OFFICER}>Back Officer</Option>
          </Select>
        </Form.Item>

        {/* Date of Birth */}
        <Form.Item
          name="date_of_birth"
          label="Date of Birth"
          rules={[
            {
              required: true,
              message: 'Please select your date of birth!',
            },
          ]}
        >
          <DatePicker allowClear={false} format="DD-MM-YYYY" />
        </Form.Item>

        {/* Avatar */}
        <Form.Item label="Avatar" valuePropName="fileList">
          <Upload
            onRemove={(file) => {
              if (mode === 'update') {
                dispatch(deleteUserNeedUpdateAvatar());
              }
              setAvatar([]);
            }}
            beforeUpload={(file) => {
              // Fake sending document to action props succesfully
              if (mode === 'update') {
                setOldImage(true);
              }
              file.status = 'done';
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = (event) => {
                file.url = event.target.result;
                if (mode === 'update') {
                  setAvatar([file]);
                  dispatch(changeUserNeedUpdateAvatar(file));
                }
                setAvatar([file]);
              };
              return false;
            }}
            listType="picture-card"
            fileList={mode === 'update' ? userNeedUpdate.avatar : avatar}
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
          name="profile_status"
          valuePropName="checked"
          label="Profile status"
        >
          <Switch
            onChange={(value) =>
              dispatch(
                setUserNeedUpdate({
                  profile_status: value,
                })
              )
            }
            defaultChecked={
              mode === 'update' ? userNeedUpdate.profile_status : false
            }
            className="switch"
          />
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
          <Button className="button button--main" type="submit">
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
            className="button button--light"
            type="button"
            onClick={handleReset}
          >
            Reset
          </Button>
        </Form.Item>
      </Form>
      <Modal
        className={preview.isOpen && 'active'}
        isOpen={preview.isOpen}
        renderBody={() => (
          <div className="content content-preview">
            <div className="close-btn" onClick={handleClose}>
              <IoClose className="close-icon" />
            </div>
            <h3 className="title">{preview.name}</h3>
            <img className="modal-image" src={preview.src} alt="Preivew img" />
          </div>
        )}
        onClose={handleClose}
      />
    </>
  );
}
