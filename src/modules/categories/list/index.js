import React, { useEffect, useState } from 'react';
import { Table, PageHeader } from 'antd';
import { Link } from 'react-router-dom';
import { BiCategoryAlt, BiPencil } from 'react-icons/bi';
import { FiTrash2 } from 'react-icons/fi';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { ImEye } from 'react-icons/im';

import Button from '../../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteCategory,
  fetchCategories,
  selectCategories,
  selectCategoriesLoading,
} from '../../../store/slices/categoriesSlice';
import Modal from '../../../components/Modal';
import {
  fetchServices,
  selectServices,
} from '../../../store/slices/servicesSlice';

const { Column } = Table;

export default function CategoriesList() {
  const [isShowDelete, setIsShowDelete] = useState(false);
  const [categoryId, setCategoryId] = useState();
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
          {/* <Link
            to=""
            className="button button--delete"
            onClick={() => {
              setIsShowDelete(true);
              setCategoryId(record.category_id);
            }}
          >
            <FiTrash2 />
            <span>Delete</span>
          </Link> */}
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
        <Button className="button button--main" onClick={handleDeleteCategory}>
          Delete
        </Button>
      </div>
    </div>
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  const handleDeleteCategory = () => {
    dispatch(deleteCategory(categoryId));
    setIsShowDelete(false);
  };

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
        rowClassName="category-row"
        x={true}
        loading={categoriesLoading}
        columns={categoriesColumns}
        // bordered
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
                bordered
                pagination={false}
                rowKey={(record) =>
                  `${record.service_id} ${record.service_name}`
                }
                dataSource={services.filter(
                  (service) => service.category_id === record.category_id
                )}
                columns={nestedColumns}
              ></Table>
            );
          },
        }}
      >
        <Column title={categoriesColumns.title} key={categoriesColumns.key} />
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
