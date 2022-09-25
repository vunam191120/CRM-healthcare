import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Form, Switch } from 'antd';
import { useParams } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';

import {
  selectClinicsLoading,
  selectCategoriesByClinic,
  fetchCategoriesByClinic,
  fetchServicesByClinic,
  selectServicesByClinic,
  updateServicesStatus,
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

export default function ClinicServices() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { clinic_id } = useParams();
  const [isShowUpdate, setIsShowUpdate] = useState(false);
  const [newServices, setNewServices] = useState([]);
  const categories = useSelector(selectCategoriesByClinic);
  const services = useSelector(selectServicesByClinic);
  const clinicLoading = useSelector(selectClinicsLoading);
  const listCatesActive = categories.filter((cate) => cate.status === true);

  useEffect(() => {
    dispatch(fetchCategoriesByClinic(clinic_id));
  }, [clinic_id, dispatch]);

  useEffect(() => {
    dispatch(fetchServicesByClinic(clinic_id));
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

  const nestedColumns = [
    {
      title: 'Service Name',
      key: 'service name',
      render: (record) => record.service.service_name,
      width: 200,
    },
    {
      title: 'Description',
      key: 'description',
      render: (record) => record.service.description,
    },
  ];

  const renderBody = () => (
    <div className="content clinic-detail-service">
      <div className="close-btn" onClick={() => setIsShowUpdate(false)}>
        <IoClose className="close-icon" />
      </div>
      <h3 className="title">Service Status</h3>
      <Form
        className="serviceForm"
        {...formItemLayout}
        form={form}
        name="update"
        onFinish={handleSubmit}
        scrollToFirstError
      >
        <div className="form-container">
          {/* Switch */}
          {renderServices()}
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
      service_id: record.service_id,
      status: values,
    };
    // If update needed category is empty of not include record, just add it into newCates
    if (newServices.length === 0) {
      return setNewServices([obj]);
    }
    const result = newServices.find(
      (service) => service.service_id === obj.service_id
    );
    // If included, make clone and update
    if (result) {
      const cloneNewServices = [...newServices];
      const index = newServices.findIndex(
        (item) => item.service_id === obj.service_id
      );
      cloneNewServices[index] = obj;
      return setNewServices([...cloneNewServices]);
    } else {
      setNewServices((oldServices) => [...oldServices, obj]);
    }
  };

  const renderServices = () => {
    let listServices = [];
    services.forEach((service, index) => {
      // Check which services are including in activated activated category
      const result = listCatesActive.find(
        (cate) => cate.category_id === service.service.category_id
      );
      if (result) {
        listServices.push(
          <Form.Item key={index} name="status" valuePropName="checked">
            <div className="category-item">
              <p className="name">{service.service.service_name}</p>
              <Switch
                onChange={(values) => handleChangeStatus(values, service)}
                defaultChecked={service.status}
                className="switch"
              />
            </div>
          </Form.Item>
        );
      }
    });
    return listServices;
  };

  const handleSubmit = () => {
    if (newServices.length > 0) {
      const result = [];
      services.forEach((service) => {
        let serviceFound = newServices.find((item) => {
          if (service.service_id === item.service_id) {
            return service.status !== item.status;
          }
          return false;
        });
        if (serviceFound) {
          result.push(serviceFound);
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
          updateServicesStatus({
            clinic_id: Number(clinic_id),
            services: [...result],
          })
        );
      }
    }

    // setIsShowUpdate(false);
  };

  return (
    <div className="service-content-detail">
      <div className="header">
        <h4 className="title">Service Information</h4>
        <Button
          onClick={() => setIsShowUpdate(true)}
          className="button button--main"
          type="button"
        >
          <span>Update service</span>
        </Button>
      </div>
      <Table
        rowClassName="service-row"
        x={true}
        loading={clinicLoading}
        columns={categoriesColumns}
        // bordered
        scroll={{ x: 300 }}
        pagination={{
          position: ['bottomCenter'],
        }}
        dataSource={listCatesActive}
        rowKey={(record) => record.category_id}
        expandable={{
          rowExpandable: (record) =>
            services.find(
              (service) => service.service.category_id === record.category_id
            ),
          expandedRowRender: (record) => {
            return (
              <Table
                bordered
                pagination={false}
                rowKey={(record) => record.service_id}
                dataSource={services.filter(
                  (service) =>
                    service.service.category_id === record.category_id
                )}
                columns={nestedColumns}
              ></Table>
            );
          },
        }}
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
