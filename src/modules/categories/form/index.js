import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Input, PageHeader } from 'antd';

import {
  createCategory,
  fetchCategory,
  selectCategoriesLoading,
  selectCategoryNeedUpdate,
  setCategoryNeedUpdate,
  updateCategory,
} from '../../../store/slices/categoriesSlice';
import Spinner from '../../../components/Spinner';
import Button from '../../../components/Button';

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
export default function CategoryForm({ mode }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { category_id } = useParams();
  const [form] = Form.useForm();
  const isLoading = useSelector(selectCategoriesLoading);
  const categoryNeedUpdate = useSelector(selectCategoryNeedUpdate);

  useEffect(() => {
    if (mode === 'update') {
      dispatch(fetchCategory(category_id));
    }
  }, [mode, dispatch, category_id]);

  useEffect(() => {
    if (mode === 'update') {
      if (Object.keys(categoryNeedUpdate).length > 0) {
        form.setFieldsValue({
          name: categoryNeedUpdate.category_name,
          description: categoryNeedUpdate.description,
        });
      }
    }
  }, [form, categoryNeedUpdate, mode]);

  const handleSubmit = (values) => {
    let newCate = {};
    newCate.category_name = values.name;
    newCate.description = values.description;
    if (mode === 'create') {
      newCate.created_by = JSON.parse(
        localStorage.getItem('currentUser')
      ).user_id;
      dispatch(createCategory(newCate));
      form.resetFields();
    }
    if (mode === 'update') {
      newCate.category_id = category_id;
      newCate.created_by = categoryNeedUpdate.created_by;
      dispatch(updateCategory(newCate));
    }
  };

  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={() => navigate('/categories')}
        title={mode === 'create' ? 'Add category' : 'Update category'}
        subTitle="This is a subtitle"
      />
      <Form
        className="categoryForm"
        {...formItemLayout}
        form={form}
        onFinish={handleSubmit}
        name="categories"
        scrollToFirstError
      >
        {/* Category Name */}
        <Form.Item
          name="name"
          label="Category Name"
          rules={[
            {
              required: true,
              message: 'Please input your category name!',
            },
          ]}
        >
          <Input placeholder="Enter your category name!" />
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

        {/* Button */}
        <Form.Item {...tailFormItemLayout}>
          <Button className="button button--main" type="submit">
            {isLoading ? (
              <Spinner />
            ) : (
              `${mode === 'create' ? 'Add category' : 'Update category'}`
            )}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
