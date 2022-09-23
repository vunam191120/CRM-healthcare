import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { Form, Input, PageHeader, Select, Upload } from 'antd';

import Spinner from '../../../components/Spinner';
import Button from '../../../components/Button';
import {
  createClinic,
  fetchClinic,
  selectClinicsLoading,
  selectClinicNeedUpdate,
  updateClinic,
} from '../../../store/slices/clinicsSlice';
import { fetchUsers, selectUsersAdmin } from '../../../store/slices/usersSlice';

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
export default function ClinicsForm({ mode }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { clinic_id } = useParams();
  const [form] = Form.useForm();
  const [oldImage, setOldImage] = useState(false);
  const [fileList, setFileList] = useState([]);
  const isLoading = useSelector(selectClinicsLoading);
  const clinicNeedUpdate = useSelector(selectClinicNeedUpdate);
  const usersAdmin = useSelector(selectUsersAdmin);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (mode === 'update') {
      dispatch(fetchClinic(clinic_id));
    }
  }, [mode, dispatch, clinic_id]);

  useEffect(() => {
    if (mode === 'update') {
      if (Object.keys(clinicNeedUpdate).length > 0) {
        form.setFieldsValue({
          name: clinicNeedUpdate.clinic_name,
          description: clinicNeedUpdate.description,
          address: clinicNeedUpdate.address,
          city: clinicNeedUpdate.city,
          state: clinicNeedUpdate.state,
          manager: clinicNeedUpdate.manager_id,
        });
      }
    }
  }, [form, clinicNeedUpdate, mode]);

  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append('clinic_name', values.name);
    formData.append('description', values.description);
    formData.append('address', values.address);
    formData.append('city', values.city);
    formData.append('state', values.state);
    for (let file of fileList) {
      formData.append('clinics', file);
    }
    if (mode === 'create') {
      formData.append(
        'manager_id',
        JSON.parse(localStorage.getItem('currentUser')).user_id
      );
      dispatch(createClinic(formData));
      form.resetFields();
    }
    if (mode === 'update') {
      formData.append('clinic_id', Number(clinic_id));
      formData.append('manager_id', values.manager);
      dispatch(updateClinic(formData));
    }
  };

  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={() => navigate('/clinics')}
        title={mode === 'create' ? 'Add clinic' : 'Update clinic'}
        subTitle="This is a subtitle"
      />
      <Form
        className="clinicForm"
        {...formItemLayout}
        form={form}
        onFinish={handleSubmit}
        name="clinics"
        scrollToFirstError
      >
        {/* Clinic Name */}
        <Form.Item
          name="name"
          label="Clinic Name"
          rules={[
            {
              required: true,
              message: 'Please input your clinic name!',
            },
          ]}
        >
          <Input placeholder="Enter your clinic name!" />
        </Form.Item>

        {/* Address */}
        <Form.Item
          name="address"
          label="Address"
          rules={[
            {
              required: true,
              message: 'Please input address!',
            },
          ]}
        >
          <Input placeholder="Enter address!" />
        </Form.Item>

        {/* City */}
        <Form.Item
          name="city"
          label="City"
          rules={[
            {
              required: true,
              message: 'Please input city!',
            },
          ]}
        >
          <Input placeholder="Enter city!" />
        </Form.Item>

        {/* State */}
        <Form.Item
          name="state"
          label="State"
          rules={[
            {
              required: true,
              message: 'Please input state',
            },
          ]}
        >
          <Input placeholder="Enter state" />
        </Form.Item>

        {/* Manager */}
        {mode === 'update' && (
          <Form.Item
            name="manager"
            label="Manager"
            rules={[
              {
                required: true,
                message: 'Please select manager!',
              },
            ]}
          >
            <Select placeholder="Select your manager">
              {usersAdmin.map((user, index) => (
                <Option
                  value={user.user_id}
                  key={index}
                >{`${user.first_name} - ${user.last_name}`}</Option>
              ))}
            </Select>
          </Form.Item>
        )}

        {/* Description */}
        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
              message: 'Please input description',
            },
          ]}
        >
          <Input.TextArea
            placeholder="Enter your description"
            showCount
            maxLength={100}
          />
        </Form.Item>

        {/* Images */}
        <Form.Item label="Documents" valuePropName="fileList">
          <Upload
            onRemove={(file) => {
              const index = fileList.indexOf(file);
              const newFileList = fileList.slice();
              newFileList.splice(index, 1);
              setFileList(newFileList);
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
                // if (mode === 'update') {
                //   setAvatar([file]);
                //   dispatch(changeUserNeedUpdateAvatar(file));
                // }
                setFileList((oldFile) => [...oldFile, file]);
              };
              return false;
            }}
            multiple
            listType="picture-card"
            fileList={mode === 'update' ? clinicNeedUpdate.avatar : fileList}
            // onPreview={handlePreview}
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

        {/* Button */}
        <Form.Item {...tailFormItemLayout}>
          <Button className="button button--main" type="submit">
            {isLoading ? (
              <Spinner />
            ) : (
              `${mode === 'create' ? 'Add clinic' : 'Update clinic'}`
            )}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
