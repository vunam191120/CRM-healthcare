import React, { useEffect, useState } from 'react';
import { PageHeader, Form, Input, Switch, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';
import { ImEye } from 'react-icons/im';

import ButtonApp from '../../../components/Button';
import {
  deleteService,
  selectServicesLoading,
  selectServices,
  fetchServices,
} from '../../../store/slices/servicesSlice';
import Spinner from '../../../components/Spinner';
import Modal from '../../../components/Modal';
import {
  fetchCategory,
  selectCategoriesLoading,
  selectCategoryNeedUpdate,
  updateCategory,
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { category_id } = useParams();
  const [form] = Form.useForm();
  const [editMode, setEditMode] = useState(false);
  const [isShowDelete, setIsShowDelete] = useState(false);
  const [service, setService] = useState();
  const categoryDetail = useSelector(selectCategoryNeedUpdate);
  const services = useSelector(selectServices);
  const cateLoading = useSelector(selectCategoriesLoading);
  const serviceLoading = useSelector(selectServicesLoading);

  const serviceColumns = [
    {
      title: 'No',
      key: 'index',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'service_name',
      key: 'service name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Category',
      key: 'category_name',
      render: (text, record, index) => <p>{record.category.category_name}</p>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record, index) => (
        <div className="button-container">
          <Link
            style={{ marginRight: 10 }}
            className={'button button--view'}
            to={`/services/detail/${record.service_id}`}
          >
            <ImEye />
            <span>View</span>
          </Link>
          <Link
            to=""
            className="button button--delete"
            onClick={() => {
              setIsShowDelete(true);
              setService(record);
            }}
          >
            <FiTrash2 />
            <span>Delete</span>
          </Link>
        </div>
      ),
    },
  ];

  useEffect(() => {
    dispatch(fetchCategory(category_id));
  }, [dispatch, category_id]);

  useEffect(() => {
    if (Object.keys(services).length === 0) {
      dispatch(fetchServices());
    }
  }, [dispatch, services]);

  useEffect(() => {
    if (
      (Object.keys(categoryDetail).length > 0) &
      (Object.keys(services).length > 0)
    ) {
      form.setFieldsValue({
        name: categoryDetail.category_name,
        description: categoryDetail.description,
      });
    }
  }, [categoryDetail, form, services]);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSubmit = (values) => {
    let newCate = {};
    newCate.category_name = values.name;
    newCate.description = values.description;
    newCate.category_id = category_id;
    newCate.created_by = categoryDetail.created_by;
    dispatch(updateCategory(newCate));
  };

  const handleDeleteService = (service_id) => {
    dispatch(deleteService(service_id));
  };

  const renderBody = () => (
    <div className="content content--confirm">
      <div className="close-btn" onClick={() => setIsShowDelete(false)}>
        <IoClose className="close-icon" />
      </div>
      <IoIosCloseCircleOutline className="icon-title icon-title--delete" />
      <h3 className="message">Are you sure to delete this category?</h3>
      <h3 className="object">{service.service_name}</h3>
      <div className="btn-container">
        <ButtonApp
          className="button button--light"
          onClick={() => setIsShowDelete(false)}
        >
          Cancel
        </ButtonApp>
        <ButtonApp
          className="button button--main"
          onClick={() => handleDeleteService(service.service_id)}
        >
          Delete
        </ButtonApp>
      </div>
    </div>
  );

  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={() => navigate('/categories')}
        title={'Category Detail'}
        subTitle="This is a subtitle"
      />
      <div className="category__detail-container">
        <Form
          className="categoryForm"
          {...formItemLayout}
          form={form}
          onFinish={handleSubmit}
          name="category detail"
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

          {/* Category Name */}
          <Form.Item
            name="name"
            label="Category Name"
            rules={
              editMode && [
                {
                  required: true,
                  message: 'Please input your category name!',
                },
              ]
            }
          >
            <Input
              disabled={!editMode}
              className="input-service__detail"
              placeholder="Enter your category name!"
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
              className="input-service__detail"
              placeholder="Enter your description"
              showCount={editMode ? true : false}
              maxLength={100}
              style={{
                resize: editMode ? 'vertical' : 'none',
              }}
            />
          </Form.Item>

          {/* Button */}
          <Form.Item {...tailFormItemLayout}>
            <ButtonApp
              disabled={!editMode}
              className="button button--main"
              type="submit"
            >
              {cateLoading ? <Spinner /> : 'Update service'}
              {/* <Spinner /> */}
            </ButtonApp>
          </Form.Item>
        </Form>

        <Table
          loading={serviceLoading}
          bordered
          rowClassName="custom-row"
          pagination={{
            position: ['bottomCenter'],
          }}
          columns={serviceColumns}
          dataSource={services.filter(
            (service) => service.category_id === categoryDetail.category_id
          )}
          rowKey={(record) => record.service_id}
        />
      </div>

      {/* </div> */}
      <Modal
        className={`${isShowDelete ? 'active' : ''}`}
        onClickClose={() => setIsShowDelete(false)}
        isOpen={isShowDelete}
        renderBody={renderBody}
      />
    </>
  );
}
