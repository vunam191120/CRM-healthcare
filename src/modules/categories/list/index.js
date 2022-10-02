import React, { useEffect } from 'react';
import { Table, PageHeader } from 'antd';
import { Link } from 'react-router-dom';
import { BiCategoryAlt, BiPencil } from 'react-icons/bi';
import { ImEye } from 'react-icons/im';

import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCategories,
  selectCategories,
  selectCategoriesLoading,
} from '../../../store/slices/categoriesSlice';
import {
  fetchServices,
  selectServices,
} from '../../../store/slices/servicesSlice';

const { Column } = Table;

export default function CategoriesList() {
  const categories = useSelector(selectCategories);
  const services = useSelector(selectServices);
  const categoriesLoading = useSelector(selectCategoriesLoading);
  const dispatch = useDispatch();

  const nestedColumns = [
    {
      title: 'Service Name',
      key: 'service name',
      dataIndex: 'service_name',
      width: 200,
    },
    {
      title: 'Description',
      key: 'description',
      dataIndex: 'description',
    },
    {
      title: 'View Detail',
      key: 'view detail',
      width: 120,
      className: 'view-detail-service',
      render: (record) => (
        <Link to={`/services/detail/${record.service_id}`}>
          <ImEye className="view-detail-serivce__icon" />
        </Link>
      ),
    },
  ];

  const categoriesColumns = [
    {
      title: 'No',
      key: 'index',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'category_name',
      key: 'category name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Created by',
      key: 'created by',
      dataIndex: 'created_by',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record, index) => (
        <div className="button-container">
          <Link
            style={{ marginRight: 10 }}
            className={'button button--view'}
            to={`/categories/detail/${record.category_id}`}
          >
            <ImEye />
            <span>View</span>
          </Link>
          <Link
            className={'button button--update'}
            to={`/categories/update/${record.category_id}`}
          >
            <BiPencil />
            <span>Update</span>
          </Link>
        </div>
      ),
    },
  ];

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  return (
    <>
      <PageHeader
        className="site-page-header"
        title={'List Category'}
        extra={
          <Link className="add-link button button--main" to="create">
            <BiCategoryAlt />
            <span style={{ marginLeft: 10 }}>Add New Category</span>
          </Link>
        }
      />
      <Table
        rowClassName="custom-row"
        x={true}
        loading={categoriesLoading}
        columns={categoriesColumns}
        //
        scroll={{ x: 300 }}
        pagination={{
          position: ['bottomCenter'],
        }}
        dataSource={categories}
        rowKey={(record) => record.category_id}
        expandable={{
          rowExpandable: (record) =>
            services.find(
              (service) => service.category_id === record.category_id
            ),
          expandedRowRender: (record) => {
            return (
              <Table
                pagination={false}
                rowKey={(record) =>
                  `${record.service_id} ${record.service_name}`
                }
                dataSource={services.filter(
                  (service) => service.category_id === record.category_id
                )}
                rowClassName="custom-row"
                columns={nestedColumns}
              ></Table>
            );
          },
        }}
      >
        <Column title={categoriesColumns.title} key={categoriesColumns.key} />
      </Table>
    </>
  );
}
