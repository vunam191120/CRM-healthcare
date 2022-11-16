import React, { useEffect, useState } from 'react';
import { Form, InputNumber, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import {
  addDetail,
  fetchDetail,
  selectDetailNeedUpdate,
  selectPaymentsIsLoading,
  updateDetail,
} from '../../../../../../store/slices/paymentsSlice';
import { TYPE_PAYMENTS } from '../../../../../../constants';
import {
  fetchProducts,
  selectProducts,
} from '../../../../../../store/slices/productsSlice';
import {
  fetchBeds,
  selectBeds,
} from '../../../../../../store/slices/bedsSlice';
import {
  fetchServices,
  selectServices,
} from '../../../../../../store/slices/servicesSlice';
import Spinner from '../../../../../../components/Spinner';
import Button from '../../../../../../components/Button';
import { IoArrowBack } from 'react-icons/io5';

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

export default function PaymentDetailForm({ mode }) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState('');
  const [selectedID, setSelectedID] = useState();
  const { payment_id, detail_id } = useParams();
  const isLoading = useSelector(selectPaymentsIsLoading);
  const detailNeedUpdate = useSelector(selectDetailNeedUpdate);
  const products = useSelector(selectProducts);
  const beds = useSelector(selectBeds);
  const services = useSelector(selectServices);

  useEffect(() => {
    if (mode === 'update') {
      dispatch(fetchDetail(detail_id));
    }
  }, [detail_id, dispatch, mode]);

  useEffect(() => {
    if (mode === 'update' && Object.keys(detailNeedUpdate).length > 0) {
      setSelectedType(detailNeedUpdate.type);
      form.setFieldsValue({
        type: detailNeedUpdate.type,
        name: detailNeedUpdate.name,
        quantity: detailNeedUpdate.quantity,
      });
    }
  }, [detailNeedUpdate, form, mode]);

  useEffect(() => {
    switch (selectedType) {
      case 'product':
        dispatch(fetchProducts());
        break;
      case 'bed':
        dispatch(fetchBeds());
        break;
      case 'service':
        dispatch(fetchServices());
        break;
      default:
        break;
    }
  }, [dispatch, selectedType]);

  const handleSubmit = (values) => {
    let newDetail = {
      payment_id,
      type: selectedType,
      quantity: values.quantity,
      price: 200,
    };

    // Clone name of type to detail name
    if (selectedType === 'product') {
      newDetail.name = products.find(
        (item) => item.product_id === selectedID
      ).product_name;
    } else if (selectedType === 'service') {
      newDetail.name = services.find(
        (item) => item.service_id === selectedID
      ).service_name;
    } else {
    }

    if (mode === 'create') {
      dispatch(addDetail(newDetail));
    } else {
      newDetail.payment_id = detailNeedUpdate.payment_id;
      newDetail.detail_id = detailNeedUpdate.detail_id;
      dispatch(updateDetail(newDetail));
    }
  };

  return (
    <div className="payment-content-detail">
      <Button
        onClick={() => navigate(-1)}
        className="button button-back button--light"
        type="button"
      >
        <IoArrowBack className="icon" />
        <span>Back to list payment detail</span>
      </Button>
      <div className="header">
        <h4 className="title">
          {mode === 'create' ? 'Add' : 'Update'} payment detail
        </h4>
      </div>

      <Form
        className="paymentForm"
        {...formItemLayout}
        form={form}
        onFinish={handleSubmit}
        name="paymentForm"
        scrollToFirstError
      >
        {/* Type */}
        <Form.Item
          label="Type payment detail"
          name="type"
          rules={[
            {
              required: true,
              message: 'Please select type payment detail!',
            },
          ]}
        >
          <Select
            placeholder="Select type of detail"
            onChange={(value) => setSelectedType(value)}
          >
            {TYPE_PAYMENTS.map((item, index) => (
              <Option key={index} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {selectedType === 'product' && (
          <>
            {/* Products */}
            <Form.Item
              name="product_id"
              label="Product Item"
              rules={[
                {
                  required: true,
                  message: 'Please select product item!',
                },
              ]}
            >
              <Select
                placeholder="Select product item"
                onChange={(value) => setSelectedID(value)}
              >
                {products.map((item, index) => (
                  <Option key={index} value={item.product_id}>
                    {item.product_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </>
        )}

        {selectedType === 'service' && (
          <>
            {/* Services */}
            <Form.Item
              name="service_id"
              label="Service Item"
              rules={[
                {
                  required: true,
                  message: 'Please select service item!',
                },
              ]}
            >
              <Select
                placeholder="Select service item"
                onChange={(value) => setSelectedID(value)}
              >
                {services.map((item, index) => (
                  <Option key={index} value={item.service_id}>
                    {item.service_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </>
        )}

        {/* Quantity */}
        <Form.Item
          name="quantity"
          label="Quantity"
          rules={[{ required: true, message: 'Please enter quantity!' }]}
        >
          <InputNumber
            placeholder="Enter quantity"
            style={{ width: '100%' }}
            className="input-custom-disabled"
            min={0}
          />
        </Form.Item>

        {/* Price */}
        <Form.Item
          name="price"
          label="Price"
          rules={[
            {
              required: true,
              message: 'Please input price!',
            },
          ]}
          value={200}
        >
          <InputNumber
            style={{ width: '100%' }}
            prefix="$"
            min={1}
            className="input-custom-disabled"
          />
        </Form.Item>

        {/* Button */}
        <Form.Item {...tailFormItemLayout}>
          <Button
            className="button button--main"
            style={{ marginLeft: 'auto' }}
            type="submit"
          >
            {isLoading ? (
              <Spinner />
            ) : (
              `${mode === 'create' ? 'Add' : 'Update'} payment detail`
            )}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
