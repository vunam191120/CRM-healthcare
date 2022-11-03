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

import Button from '../../../components/Button';
import Modal from '../../../components/Modal';
import Spinner from '../../../components/Spinner';
import {
  changeDoctorNeedUpdateAvatar,
  createDoctor,
  deleteDoctorNeedUpdateAvatar,
  fetchDoctor,
  selectDoctorNeedUpdate,
  selectDoctorsLoading,
  updateDoctor,
  setDoctorNeedUpdate,
} from '../../../store/slices/doctorsSlice';

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xl: {
      span: 5,
    },
    lg: {
      span: 5,
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
      span: 17,
    },
    lg: {
      span: 17,
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

export default function DoctorForm({ mode }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [oldImage, setOldImage] = useState(false);
  const isLoading = useSelector(selectDoctorsLoading);
  const doctorNeedUpdate = useSelector(selectDoctorNeedUpdate);
  const { doctor_id } = useParams();
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
      dispatch(fetchDoctor(doctor_id));
    }
  }, [mode, dispatch, doctor_id]);

  // Fill values after getting needed user
  useEffect(() => {
    if (mode === 'update') {
      if (Object.keys(doctorNeedUpdate).length > 0) {
        form.setFieldsValue({
          first_name: doctorNeedUpdate.first_name,
          last_name: doctorNeedUpdate.last_name,
          email: doctorNeedUpdate.email,
          phone: doctorNeedUpdate.phone,
          gender: doctorNeedUpdate.gender,
          date_of_birth: moment(doctorNeedUpdate.date_of_birth),
          work_progress: doctorNeedUpdate.work_progress,
          citizen_identification_date: moment(
            doctorNeedUpdate.citizen_identification_date
          ),
          citizen_identification_number:
            doctorNeedUpdate.citizen_identification_number,
          description: doctorNeedUpdate.description,
          other_document: doctorNeedUpdate.other_document,
          profile_status: doctorNeedUpdate.profile_status,
          agreement: true,
        });
      }
    }
  }, [form, mode, doctorNeedUpdate]);

  const handlePreview = (file) => {
    if (mode === 'update') {
      setPreview({
        ...preview,
        src: doctorNeedUpdate.avatar[0].url,
        name: doctorNeedUpdate.avatar[0].name,
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

  // Fill method for testing
  const onFill = () => {
    const randomNum = Math.floor(Math.random() * 100);
    form.setFieldsValue({
      first_name: `Vu ${randomNum}`,
      last_name: `Nam ${randomNum}`,
      email: `doctor${randomNum}@gmail.com`,
      password: 'doctor',
      confirm: 'doctor',
      phone: `97194${randomNum}${randomNum}`,
      work_progress: `${randomNum} years of being a couch potato :D`,
      other_document: `${randomNum} certificates of healthy baby`,
      gender: 'Male',
      date_of_birth: moment('19112000', 'DD-MM-YYYY'),
      description: 'The best doctor all over the world!',
      citizen_identification_number: `01353099${randomNum}`,
      citizen_identification_date: moment('19112017', 'DD-MM-YYYY'),
      profile_status: true,
      agreement: true,
    });
  };

  const handleReset = () => {
    form.resetFields();
  };

  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append('first_name', values.first_name);
    formData.append('last_name', values.last_name);
    formData.append('full_name', `${values.first_name} ${values.last_name}`);
    formData.append('email', values.email);
    formData.append('phone', `${values.prefix}${values.phone}`);
    formData.append('gender', values.gender);
    formData.append(
      'date_of_birth',
      values.date_of_birth.toDate().toISOString()
    );
    formData.append(
      'citizen_identification_number',
      values.citizen_identification_number
    );
    formData.append(
      'citizen_identification_date',
      values.citizen_identification_date.toDate().toISOString()
    );
    formData.append('profile_status', values.profile_status);
    formData.append('work_progress', values.work_progress);
    formData.append('other_document', values.other_document);
    formData.append('description', values.description);
    if (mode === 'create') {
      formData.append('avatar', avatar[0]);
      formData.append('password', values.password);
      dispatch(createDoctor(formData));
    } else if (mode === 'update') {
      oldImage && formData.append('avatar', avatar[0]);
      formData.append('doctor_id', doctorNeedUpdate.doctor_id);
      dispatch(updateDoctor(formData));
    }
  };

  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={() => navigate('/doctors')}
        title={mode === 'create' ? 'Add doctor' : 'Update doctor'}
        // subTitle="This is a subtitle"
      />
      <Form
        className="doctorForm"
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
                setDoctorNeedUpdate({
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
                setDoctorNeedUpdate({
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
          <Input
            onBlur={(e) =>
              dispatch(
                setDoctorNeedUpdate({
                  email: e.target.value,
                })
              )
            }
            disabled={mode === 'update'}
            placeholder="Enter your email!"
          />
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
                setDoctorNeedUpdate({
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
            onChange={(value) =>
              dispatch(
                setDoctorNeedUpdate({
                  gender: value,
                })
              )
            }
            placeholder="Select your gender"
          >
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
            <Option value="Other">Other</Option>
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
          <DatePicker
            onChange={(e) =>
              dispatch(
                setDoctorNeedUpdate({
                  date_of_birth: e.toDate().toISOString(),
                })
              )
            }
            allowClear={false}
            format="DD-MM-YYYY"
          />
        </Form.Item>

        {/* Work progress */}
        <Form.Item
          label="Work progress"
          name="work_progress"
          rules={[
            {
              required: true,
              message: 'Please enter your work progress!',
            },
          ]}
        >
          <Input.TextArea
            autosize={{ minRows: 3, maxRows: 6 }}
            onBlur={(e) =>
              dispatch(
                setDoctorNeedUpdate({
                  work_progress: e.target.value,
                })
              )
            }
            style={{
              minHeight: 100,
            }}
          />
        </Form.Item>

        {/* Avatar */}
        <Form.Item label="Avatar" valuePropName="fileList">
          <Upload
            onRemove={(file) => {
              if (mode === 'update') {
                dispatch(deleteDoctorNeedUpdateAvatar());
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
                  dispatch(changeDoctorNeedUpdateAvatar(file));
                }
                setAvatar([file]);
              };
              return false;
            }}
            listType="picture-card"
            fileList={mode === 'update' ? doctorNeedUpdate.avatar : avatar}
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

        {/* Citizen Identification Number */}
        <Form.Item
          name="citizen_identification_number"
          label="Citizen Identification Number"
          rules={[
            {
              required: true,
              message: 'Please select citizen identification number!',
            },
          ]}
        >
          <Input
            onBlur={(e) =>
              dispatch(
                setDoctorNeedUpdate({
                  citizen_identification_number: e.target.value,
                })
              )
            }
            placeholder="Enter your citizen identification number!"
          />
        </Form.Item>

        {/* Citizen Identification Date */}
        <Form.Item
          name="citizen_identification_date"
          label="Citizen Identification Date"
          rules={[
            {
              required: true,
              message: 'Please select citizen identification date!',
            },
          ]}
        >
          <DatePicker
            onChange={(e) =>
              dispatch(
                setDoctorNeedUpdate({
                  citizen_identification_date: e.toDate().toISOString(),
                })
              )
            }
            allowClear={false}
            format="DD-MM-YYYY"
          />
        </Form.Item>

        {/* Description */}
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: 'Please enter your description!',
            },
          ]}
        >
          <Input.TextArea
            onBlur={(e) =>
              dispatch(
                setDoctorNeedUpdate({
                  description: e.target.value,
                })
              )
            }
            autosize={{ minRows: 3, maxRows: 6 }}
          />
        </Form.Item>

        {/* Other document */}
        <Form.Item label="Other document" name="other_document">
          <Input.TextArea
            onBlur={(e) =>
              dispatch(
                setDoctorNeedUpdate({
                  other_document: e.target.value,
                })
              )
            }
            autosize={{ minRows: 3, maxRows: 6 }}
            style={{
              minHeight: 100,
            }}
          />
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
                setDoctorNeedUpdate({
                  profile_status: value,
                })
              )
            }
            defaultChecked={
              mode === 'update' ? doctorNeedUpdate.profile_status : false
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
              `${mode === 'create' ? 'Add doctor' : 'Update doctor'}`
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
