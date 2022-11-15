import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PageHeader, Form, Input, DatePicker, Select } from 'antd';

import Button from '../../../components/Button';
import Spinner from '../../../components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';
import {
  addProduct,
  fetchProduct,
  fetchSuppliers,
  selectProductNeedUpdate,
  selectProductsIsLoading,
  selectSuppliers,
  updateProduct,
} from '../../../store/slices/productsSlice';
import { TYPE_PRODUCTS } from '../../../constants';
import moment from 'moment';

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

const { Option } = Select;

export default function ProductForm({ mode }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product_id } = useParams();
  const [form] = Form.useForm();
  const isLoading = useSelector(selectProductsIsLoading);
  const suppliers = useSelector(selectSuppliers);
  const productNeedUpdate = useSelector(selectProductNeedUpdate);

  useEffect(() => {
    dispatch(fetchSuppliers());
  }, [dispatch]);

  useEffect(() => {
    if (mode === 'update') {
      dispatch(fetchProduct(product_id));
    }
  }, [dispatch, mode, product_id]);

  useEffect(() => {
    if (mode === 'update' && Object.keys(productNeedUpdate).length > 0) {
      form.setFieldsValue({
        product_name: productNeedUpdate.product_name,
        description: productNeedUpdate.description,
        expired_date: moment(productNeedUpdate.expired_date),
        manufacture_date: moment(productNeedUpdate.manufacture_date),
        type: productNeedUpdate.type,
        supplier: productNeedUpdate.supplier_id,
      });
    }
  }, [form, mode, productNeedUpdate]);

  const handleSubmit = (values) => {
    let newProduct = {
      product_name: values.product_name,
      description: values.description,
      expired_date: values.expired_date.format('YYYY-MM-DD'),
      manufacture_date: values.manufacture_date.format('YYYY-MM-DD'),
      type: values.type,
      supplier_id: values.supplier,
    };

    if (mode === 'create') {
      dispatch(addProduct(newProduct));
    } else {
      newProduct.product_id = product_id;
      dispatch(updateProduct(newProduct));
    }
  };

  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={() => navigate('/products')}
        title={mode === 'create' ? 'Add product' : 'Update product'}
      />
      <Form
        scrollToFirstError
        form={form}
        {...formItemLayout}
        name="productForm"
        onFinish={handleSubmit}
        className="productForm"
      >
        {/* Product Name */}
        <Form.Item
          name="product_name"
          label="Product Name"
          rules={[
            {
              required: true,
              message: 'Please input your product name!',
            },
          ]}
        >
          <Input placeholder="Enter your product name!" />
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

        {/* Manufacture Date */}
        <Form.Item
          name="manufacture_date"
          label="Manufacture Date"
          rules={[
            {
              required: true,
              message: 'Please select product manufacture date!',
            },
          ]}
        >
          <DatePicker
            placeholder="Select manufacture date"
            allowClear={false}
            format="DD-MM-YYYY"
          />
        </Form.Item>

        {/* Expired date */}
        <Form.Item
          name="expired_date"
          label="Expired Date"
          rules={[
            {
              required: true,
              message: 'Please select product expired date!',
            },
          ]}
        >
          <DatePicker
            placeholder="Select expired date"
            allowClear={false}
            format="DD-MM-YYYY"
          />
        </Form.Item>

        {/* Type */}
        <Form.Item
          name="type"
          label="Type"
          rules={[
            {
              required: true,
              message: 'Please select product type!',
            },
          ]}
        >
          <Select>
            {TYPE_PRODUCTS.map((product, index) => (
              <Option key={index} value={product}>
                {product}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Supplier */}
        <Form.Item
          name="supplier"
          label="Supplier"
          rules={[
            {
              required: true,
              message: 'Please select supplier!',
            },
          ]}
        >
          <Select>
            {suppliers.map((supplier, index) => (
              <Option key={index} value={supplier.supplier_id}>
                {supplier.supplier_name} - {supplier.supplier_address}
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
              `${mode === 'create' ? 'Add product' : 'Update product'}`
            )}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
