import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Form, Switch } from 'antd';
import { useParams } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';

import {
  fetchCategoriesByClinic,
  selectCategoriesByClinic,
  selectClinicsLoading,
  updateCategoriesStatus,
} from '../../../../store/slices/clinicsSlice';
import Modal from '../../../../components/Modal';
import Button from '../../../../components/Button';
import Spinner from '../../../../components/Spinner';

const formItemLayout = {
  wrapperCol: {
    xl: {
      span: 24,
    },
    lg: {
      span: 24,
    },
    xs: {
      span: 24,
    },
    sm: {
      span: 24,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xl: {
      span: 24,
      offset: 8,
    },
    xs: {
      span: 24,
      offset: 8,
    },
    sm: {
      span: 16,
      offset: 9,
    },
  },
};

export default function ClinicCategories() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { clinic_id } = useParams();
  const [isShowUpdate, setIsShowUpdate] = useState(false);
  const categories = useSelector(selectCategoriesByClinic);
  const clinicLoading = useSelector(selectClinicsLoading);
  const [newCates, setNewCates] = useState([]);

  useEffect(() => {
    dispatch(fetchCategoriesByClinic(clinic_id));
  }, [clinic_id, dispatch]);

  const categoriesColumns = [
    {
      title: 'No',
      key: 'index',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Name',
      key: 'category name',
      render: (record) => record.category.category_name,
    },
    {
      title: 'Description',
      key: 'description',
      render: (record) => record.category.description,
    },
    {
      title: 'Created by',
      key: 'created by',
      render: (record) => record.category.created_by,
    },
  ];

  const renderBody = () => (
    <div className="content clinic-detail-category">
      <div className="close-btn" onClick={() => setIsShowUpdate(false)}>
        <IoClose className="close-icon" />
      </div>
      <h3 className="title">Category Status</h3>
      <Form
        className="categoryForm"
        {...formItemLayout}
        form={form}
        name="update"
        onFinish={handleSubmit}
        scrollToFirstError
      >
        <div className="form-container">
          {/* Switch */}
          {categories.map((cate, index) => (
            <Form.Item key={index} name="status" valuePropName="checked">
              <div className="category-item">
                <p className="name">{cate.category.category_name}</p>
                <Switch
                  onChange={(values) => handleChangeStatus(values, cate)}
                  defaultChecked={cate.status}
                  className="switch"
                />
              </div>
            </Form.Item>
          ))}
        </div>

        {/* Button */}
        <Form.Item {...tailFormItemLayout}>
          <Button className="button--main" type="submit">
            {/* Show spinner whenever click this button */}
            {clinicLoading ? <Spinner /> : 'Update'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );

  const handleChangeStatus = (values, record) => {
    let obj = {
      category_id: record.category_id,
      status: values,
    };
    // If update needed category is empty of not include record, just add it into newCates
    if (newCates.length === 0) {
      return setNewCates([obj]);
    }
    const result = newCates.find(
      (cate) => cate.category_id === obj.category_id
    );
    // If included, make clone and update
    if (result) {
      const cloneNewCates = [...newCates];
      const index = newCates.findIndex(
        (item) => item.category_id === obj.category_id
      );
      cloneNewCates[index] = obj;
      return setNewCates([...cloneNewCates]);
    } else {
      setNewCates((oldCates) => [...oldCates, obj]);
    }
  };

  const handleSubmit = () => {
    if (newCates.length > 0) {
      const result = [];
      categories.forEach((cate) => {
        let cateFound = newCates.find((item) => {
          if (cate.category_id === item.category_id) {
            return cate.status !== item.status;
          }
          return false;
        });
        if (cateFound) {
          result.push(cateFound);
        }
      });

      if (result.length > 0) {
        // Change true to 1 and false to 0;
        // for (let index in result) {
        //   if (result[index].status) {
        //     result[index].status = 1;
        //   } else {
        //     result[index].status = 0;
        //   }
        // }

        dispatch(
          updateCategoriesStatus({
            clinic_id: Number(clinic_id),
            categories: [...result],
          })
        );
      }
    }

    // setIsShowUpdate(false);
  };

  return (
    <div className="category-content-detail">
      <div className="header">
        <h4 className="title">Category Information</h4>
        <Button
          onClick={() => setIsShowUpdate(true)}
          className="button button--main"
          type="button"
        >
          <span>Update category</span>
        </Button>
      </div>

      <Table
        rowClassName="category-row"
        x={true}
        loading={clinicLoading}
        columns={categoriesColumns}
        bordered
        scroll={{ x: 300 }}
        pagination={{
          position: ['bottomCenter'],
        }}
        dataSource={categories.filter((cate) => cate.status === true)}
        // dataSource={categories.filter((cate) => cate.status === 1)}
        // dataSource={categories}
        rowKey={(record) => record.category_id}
      ></Table>
      <Modal
        className={`${isShowUpdate ? 'active' : ''}`}
        onClickClose={() => setIsShowUpdate(false)}
        isOpen={isShowUpdate}
        renderBody={renderBody}
      />
    </div>
  );
}
