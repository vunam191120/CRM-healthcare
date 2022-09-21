import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Input, PageHeader, Select } from 'antd';

import {
  createService,
  fetchService,
  selectServiceNeedUpdate,
  selectServicesLoading,
  updateService,
} from '../../../store/slices/servicesSlice';
import Spinner from '../../../components/Spinner';
import Button from '../../../components/Button';
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

const { Option } = Select;

export default function ServiceForm({ mode }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { service_id } = useParams();
  const [form] = Form.useForm();
  const isLoading = useSelector(selectServicesLoading);
  const categories = useSelector(selectCategories);
  const serviceNeedUpdate = useSelector(selectServiceNeedUpdate);

  useEffect(() => {
    if (mode === 'update') {
      dispatch(fetchService(service_id));
    }
  }, [mode, dispatch, service_id]);

  useEffect(() => {
    if (Object.keys(categories).length === 0) {
      dispatch(fetchCategories());
    }
  }, [categories, dispatch]);

  useEffect(() => {
    if (mode === 'update') {
      if (Object.keys(serviceNeedUpdate).length > 0) {
        form.setFieldsValue({
          name: serviceNeedUpdate.service_name,
          description: serviceNeedUpdate.description,
        });
      }
    }
  }, [form, serviceNeedUpdate, mode]);

  const handleSubmit = (values) => {
    let newService = {};
    newService.service_name = values.name;
    newService.description = values.description;
    newService.category_id = values.category;
    if (mode === 'create') {
      dispatch(createService(newService));
      form.resetFields();
    }
    if (mode === 'update') {
      newService.service_id = service_id;
      dispatch(updateService(newService));
    }
  };

  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={() => navigate('/services')}
        title={mode === 'create' ? 'Add service' : 'Update service'}
        subTitle="This is a subtitle"
      />
      <Form
        className="serviceForm"
        {...formItemLayout}
        form={form}
        onFinish={handleSubmit}
        name="categories"
        // initialValues={
        //   mode === 'update'
        //     ? {
        //         category: `${serviceNeedUpdate.category_id}`,
        //       }
        //     : {}
        // }
        scrollToFirstError
      >
        {/* Service Name */}
        <Form.Item
          name="name"
          label="Service Name"
          rules={[
            {
              required: true,
              message: 'Please input your service name!',
            },
          ]}
        >
          <Input placeholder="Enter your service name!" />
        </Form.Item>

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

        {/* Category Name */}
        <Form.Item
          name="category"
          label="Category"
          rules={[
            {
              required: true,
              message: 'Please select category!',
            },
          ]}
        >
          <Select placeholder="Select your category">
            {/* <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
            <Option value="Other">Other</Option> */}
            {categories.map((cate) => (
              <Option key={cate.category_id} value={cate.category_id}>
                {cate.category_name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Button */}
        <Form.Item {...tailFormItemLayout}>
          <Button className="button button--main" type="submit">
            {isLoading ? (
              <Spinner />
            ) : (
              `${mode === 'create' ? 'Add service' : 'Update service'}`
            )}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
