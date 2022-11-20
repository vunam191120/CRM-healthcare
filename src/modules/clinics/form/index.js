import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { IoClose } from 'react-icons/io5';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { Form, Input, PageHeader, Select, Upload } from 'antd';

import Spinner from '../../../components/Spinner';
import Button from '../../../components/Button';
import Modal from '../../../components/Modal';
import {
  createClinic,
  fetchClinic,
  selectClinicsLoading,
  selectClinicNeedUpdate,
  updateClinic,
  addClinicNeedUpdateImage,
  deleteImage,
  setClinicNeedUpdate,
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
export default function ClinicsForm({ mode, customPageHeader }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { clinic_id } = useParams();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const isLoading = useSelector(selectClinicsLoading);
  const clinicNeedUpdate = useSelector(selectClinicNeedUpdate);
  const usersAdmin = useSelector(selectUsersAdmin);
  const [preview, setPreview] = useState({
    isOpen: false,
    title: '',
    src: '',
  });
  const [isShowDelete, setIsShowDelete] = useState(false);
  const [imageDelete, setImageDelete] = useState({});

  const renderBody = () => (
    <div className="content content--confirm">
      <div className="close-btn" onClick={() => setIsShowDelete(false)}>
        <IoClose className="close-icon" />
      </div>
      <IoIosCloseCircleOutline className="icon-title icon-title--delete" />
      <h3 className="message">Are you sure to delete this image?</h3>
      <img
        className="object"
        src={imageDelete.url}
        width="100%"
        alt="img confirm delete"
      />
      <div className="btn-container">
        <Button
          className="button button--light"
          onClick={() => setIsShowDelete(false)}
        >
          Cancel
        </Button>
        <Button
          className="button button--main"
          onClick={() => {
            dispatch(deleteImage(imageDelete));
            setIsShowDelete(false);
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );

  const handleClose = () => {
    setPreview({ ...preview, isOpen: false });
  };

  const handlePreview = (file) => {
    setPreview({
      ...preview,
      src: file.url,
      title: file.title,
      isOpen: true,
    });
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (mode === 'update') {
      dispatch(fetchClinic(clinic_id));
    }
  }, [mode, dispatch, clinic_id]);

  useEffect(() => {
    if (mode === 'update' && Object.keys(clinicNeedUpdate).length > 0) {
      form.setFieldsValue({
        name: clinicNeedUpdate.clinic.clinic_name,
        description: clinicNeedUpdate.clinic.description,
        address: clinicNeedUpdate.clinic.address,
        city: clinicNeedUpdate.clinic.city,
        state: clinicNeedUpdate.clinic.state,
        manager: clinicNeedUpdate.clinic.manager_id,
      });
    }
  }, [clinicNeedUpdate, form, mode]);

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
      {!customPageHeader ? (
        <PageHeader
          className="site-page-header"
          onBack={() => navigate('/clinics')}
          title={mode === 'create' ? 'Add clinic' : 'Update clinic'}
          subTitle="This is a subtitle"
        />
      ) : (
        customPageHeader
      )}
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
          <Input
            onBlur={(e) =>
              dispatch(
                setClinicNeedUpdate({
                  clinic_name: e.target.value,
                })
              )
            }
            placeholder="Enter your clinic name!"
          />
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
          <Input
            onBlur={(e) =>
              dispatch(
                setClinicNeedUpdate({
                  address: e.target.value,
                })
              )
            }
            placeholder="Enter address!"
          />
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
          <Input
            onBlur={(e) =>
              dispatch(
                setClinicNeedUpdate({
                  city: e.target.value,
                })
              )
            }
            placeholder="Enter city!"
          />
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
          <Input
            onBlur={(e) =>
              dispatch(
                setClinicNeedUpdate({
                  state: e.target.value,
                })
              )
            }
            placeholder="Enter state"
          />
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
            <Select
              onChange={(value) => {
                dispatch(
                  setClinicNeedUpdate({
                    manager_id: value,
                  })
                );
              }}
              placeholder="Select your manager"
            >
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
            onBlur={(e) =>
              dispatch(
                setClinicNeedUpdate({
                  description: e.target.value,
                })
              )
            }
            placeholder="Enter your description"
            showCount
            maxLength={100}
          />
        </Form.Item>

        {/* Images */}
        <Form.Item label="Documents" valuePropName="fileList">
          <Upload
            onRemove={(file) => {
              if (mode === 'create') {
                const index = fileList.indexOf(file);
                const newFileList = fileList.slice();
                newFileList.splice(index, 1);
                setFileList(newFileList);
              } else {
                setIsShowDelete(true);
                setImageDelete(file);
              }
            }}
            beforeUpload={(file) => {
              // Fake sending document to action props succesfully
              file.status = 'done';
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = (event) => {
                if (mode === 'update') {
                  file.url = event.target.result;
                  dispatch(addClinicNeedUpdateImage(file));
                }
                setFileList((oldFile) => [...oldFile, file]);
              };
              return false;
            }}
            multiple
            listType="picture-card"
            fileList={mode === 'update' ? clinicNeedUpdate.images : fileList}
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
      <Modal
        className={preview.isOpen && 'active'}
        isOpen={preview.isOpen}
        renderBody={() => (
          <div className="content content-preview">
            <div className="close-btn" onClick={handleClose}>
              <IoClose className="close-icon" />
            </div>
            <h3 className="title">{preview.title}</h3>
            <img className="modal-image" src={preview.src} alt="Preivew img" />
          </div>
        )}
        onClose={handleClose}
      />
      <Modal
        className={`${isShowDelete ? 'active' : ''}`}
        onClickClose={() => setIsShowDelete(false)}
        isOpen={isShowDelete}
        renderBody={renderBody}
      />
    </>
  );
}

ClinicsForm.defaultProps = {
  customPageHeader: false,
};
