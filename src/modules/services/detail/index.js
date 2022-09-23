import React, { useEffect, useState } from 'react';
import { PageHeader, Form, Input, Switch } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';

import ButtonApp from '../../../components/Button';
import {
  deleteService,
  selectServicesLoading,
  selectServiceNeedUpdate,
  fetchService,
  updateService,
} from '../../../store/slices/servicesSlice';
import Spinner from '../../../components/Spinner';
import Modal from '../../../components/Modal';
import {
  fetchCategories,
  selectCategories,
} from '../../../store/slices/categoriesSlice';

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

export default function Detail() {
  const [editMode, setEditMode] = useState(false);
  const { service_id } = useParams();
  const [form] = Form.useForm();
  const serviceDetail = useSelector(selectServiceNeedUpdate);
  const categories = useSelector(selectCategories);
  const isLoading = useSelector(selectServicesLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isShowDelete, setIsShowDelete] = useState(false);

  useEffect(() => {
    dispatch(fetchService(service_id));
  }, [dispatch, service_id]);

  useEffect(() => {
    if (Object.keys(categories).length === 0) {
      dispatch(fetchCategories());
    }
  }, [categories, dispatch]);

  useEffect(() => {
    if (
      (Object.keys(serviceDetail).length > 0) &
      (Object.keys(categories).length > 0)
    ) {
      form.setFieldsValue({
        name: serviceDetail.service_name,
        description: serviceDetail.description,
        category: categories.find(
          (cate) => cate.category_id === serviceDetail.category_id
        ).category_name,
      });
    }
  }, [categories, form, serviceDetail]);

  const renderBody = () => (
    <div className="content content--confirm">
      <div className="close-btn" onClick={() => setIsShowDelete(false)}>
        <IoClose className="close-icon" />
      </div>
      <IoIosCloseCircleOutline className="icon-title icon-title--delete" />
      <h3 className="message">Are you sure to delete this category?</h3>
      <h3 className="object">{serviceDetail.service_name}</h3>
      <div className="btn-container">
        <ButtonApp
          className="button button--light"
          onClick={() => setIsShowDelete(false)}
        >
          Cancel
        </ButtonApp>
        <ButtonApp
          className="button button--main"
          onClick={handleDeleteService}
        >
          Delete
        </ButtonApp>
      </div>
    </div>
  );

  const handleDeleteService = () => {
    dispatch(deleteService(service_id));
    setIsShowDelete(false);
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSubmit = (values) => {
    let newService = {};
    newService.service_name = values.name;
    newService.description = values.description;
    newService.category_id = categories.find(
      (cate) => cate.category_name === values.category
    ).category_id;
    newService.service_id = service_id;
    dispatch(updateService(newService));
  };

  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={() => navigate('/services')}
        title={'Service Detail'}
        subTitle="This is a subtitle"
      />
      <Form
        className="serviceForm"
        {...formItemLayout}
        form={form}
        onFinish={handleSubmit}
        name="service detail"
        scrollToFirstError
      >
        {/* Modes */}
        <Form.Item name="edit_mode" valuePropName="checked" label="Edit mode">
          <Switch
            defaultChecked={editMode}
            onChange={toggleEditMode}
            className="switch"
          />
        </Form.Item>

        {/* Service Name */}
        <Form.Item
          name="name"
          label="Service Name"
          rules={
            editMode && [
              {
                required: true,
                message: 'Please input your service name!',
              },
            ]
          }
        >
          <Input
            disabled={!editMode}
            className="input-detail"
            placeholder="Enter your service name!"
          />
        </Form.Item>

        {/* Description */}
        <Form.Item
          name="description"
          label="Description"
          rules={
            editMode && [
              {
                required: true,
                message: 'Please input description',
              },
            ]
          }
        >
          <Input.TextArea
            disabled={!editMode}
            className="input-detail"
            placeholder="Enter your description"
            showCount={editMode ? true : false}
            maxLength={100}
            style={{
              resize: editMode ? 'vertical' : 'none',
            }}
          />
        </Form.Item>

        {/* Category Name */}
        <Form.Item name="category" label="Category">
          <Input disabled className="input-detail--category" />
        </Form.Item>

        {/* Button */}
        <Form.Item {...tailFormItemLayout}>
          <ButtonApp
            disabled={!editMode}
            className="button button--main"
            type="submit"
          >
            {isLoading ? <Spinner /> : 'Update service'}
          </ButtonApp>
          <ButtonApp
            className="button button--light"
            onClick={() => {
              setIsShowDelete(true);
            }}
            type="button"
          >
            Delete service
          </ButtonApp>
        </Form.Item>
      </Form>
      <Modal
        className={`${isShowDelete ? 'active' : ''}`}
        onClickClose={() => setIsShowDelete(false)}
        isOpen={isShowDelete}
        renderBody={renderBody}
      />
    </>
  );
}
