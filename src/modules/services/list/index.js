import React, { useEffect, useState } from 'react';
import { Table, PageHeader } from 'antd';
import { Link } from 'react-router-dom';
import { BiCategoryAlt, BiPencil } from 'react-icons/bi';
import { FiTrash2 } from 'react-icons/fi';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';

import Button from '../../../components/Button';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '../../../components/Modal';
import {
  deleteService,
  fetchServices,
  selectServices,
  selectServicesLoading,
} from '../../../store/slices/servicesSlice';

const { Column } = Table;

export default function ServicesList() {
  const [isShowDelete, setIsShowDelete] = useState(false);
  const [sortedInfo, setSortedInfo] = useState({});
  const [filteredInfo, setFilteredInfo] = useState({});
  const [serviceId, setServiceId] = useState();
  const services = useSelector(selectServices);
  const serviceLoading = useSelector(selectServicesLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(services).length === 0) {
      dispatch(fetchServices());
    }
  }, [dispatch, services]);

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
      filteredValue: filteredInfo.service_name || null,
      sorter: (a, b) => a.service_name - b.service_name,
      sortOrder:
        sortedInfo.columnKey === 'service_name' ? sortedInfo.order : null,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Category',
      key: 'category name',
      render: (text, record, index) => <p>{record.category.category_name}</p>,
      filters: [
        {
          text: 'Dermatology',
          value: 'Dermatology',
        },
        {
          text: 'Ophthalmology',
          value: 'Ophthalmology',
        },
        {
          text: 'Nutrition',
          value: 'Nutrition',
        },
      ],
      // filteredValue: filteredInfo.address || null,
      onFilter: (value, record) =>
        record.category.category_name.includes(value),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record, index) => (
        <div className="button-container">
          <Link
            className={'button button--update'}
            to={`/services/update/${record.service_id}`}
          >
            <BiPencil />
            <span>Update</span>
          </Link>
          <Link
            to=""
            className="button button--delete"
            onClick={() => {
              setIsShowDelete(true);
              setServiceId(record.service_id);
            }}
          >
            <FiTrash2 />
            <span>Delete</span>
          </Link>
        </div>
      ),
    },
  ];

  const renderBody = () => (
    <div className="content content--confirm">
      <div className="close-btn" onClick={() => setIsShowDelete(false)}>
        <IoClose className="close-icon" />
      </div>
      <IoIosCloseCircleOutline className="icon-title icon-title--delete" />
      <h3 className="message">Are you sure to delete this category?</h3>
      <div className="btn-container">
        <Button
          className="button button--light"
          onClick={() => setIsShowDelete(false)}
        >
          Cancel
        </Button>
        <Button className="button button--main" onClick={handleDeleteService}>
          Delete
        </Button>
      </div>
    </div>
  );

  const handleDeleteService = () => {
    dispatch(deleteService(serviceId));
    setIsShowDelete(false);
  };

  return (
    <>
      <PageHeader
        className="site-page-header"
        title={'List Service'}
        extra={
          <Link className="add-link button button--main" to="create">
            <BiCategoryAlt />
            <span style={{ marginLeft: 10 }}>Add New Service</span>
          </Link>
        }
      />
      <Table
        rowClassName="service-row"
        x={true}
        loading={serviceLoading}
        columns={serviceColumns}
        bordered
        scroll={{ x: 300 }}
        pagination={{
          position: ['bottomCenter'],
        }}
        dataSource={services}
        rowKey={(record) => record.service_id}
      >
        <Column title={serviceColumns.title} key={serviceColumns.key} />
      </Table>
      <Modal
        className={`${isShowDelete ? 'active' : ''}`}
        onClickClose={() => setIsShowDelete(false)}
        isOpen={isShowDelete}
        renderBody={renderBody}
      />
    </>
  );
}
