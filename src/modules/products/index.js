import React, { useEffect, useState } from 'react';
import { PageHeader, Table } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { GiMedicines } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import { FiTrash2 } from 'react-icons/fi';
import { BiPencil } from 'react-icons/bi';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { ImEye } from 'react-icons/im';
import { IoClose } from 'react-icons/io5';
import moment from 'moment';

import {
  deleteProduct,
  fetchProducts,
  selectProducts,
  selectProductsIsLoading,
} from '../../store/slices/productsSlice';
import Modal from '../../components/Modal';
import Button from '../../components/Button';

export default function ProductList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState({});
  const [isShowDelete, setIsShowDelete] = useState(false);
  const isLoading = useSelector(selectProductsIsLoading);
  const products = useSelector(selectProducts);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleDeleteProduct = () => {
    dispatch(deleteProduct(selectedProduct.product_id));
    setIsShowDelete(false);
  };

  const renderBody = () => (
    <div className="content content--confirm">
      <div className="close-btn" onClick={() => setIsShowDelete(false)}>
        <IoClose className="close-icon" />
      </div>
      <IoIosCloseCircleOutline className="icon-title icon-title--delete" />
      <h3 className="message">Are you sure to delete this product?</h3>
      <h3 className="object">{selectedProduct.product_name}</h3>
      <div className="btn-container">
        <Button
          className="button button--light"
          onClick={() => setIsShowDelete(false)}
        >
          Cancel
        </Button>
        <Button className="button button--main" onClick={handleDeleteProduct}>
          Delete
        </Button>
      </div>
    </div>
  );

  const productColumn = [
    {
      title: 'ID',
      dataIndex: 'product_id',
      key: 'product_id',
    },
    {
      title: 'Name',
      dataIndex: 'product_name',
      key: 'product_name',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Expired Date',
      key: 'expired date',
      render: (record) => moment(record.expired_date).format('DD-MM-YYYY'),
    },
    {
      title: 'Manufacture Date',
      key: 'manufacture',
      render: (record) => moment(record.manufacture_date).format('DD-MM-YYYY'),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Actions',
      key: 'action',
      render: (text, record, index) => (
        <div className="button-container">
          <Link
            style={{ marginRight: 10 }}
            className={'button button--view'}
            to={`/products/detail/${record.product_id}`}
          >
            <ImEye />
            <span>View</span>
          </Link>
          <Link
            className={'button button--update'}
            to={`/products/update/${record.product_id}`}
          >
            <BiPencil />
            <span>Update</span>
          </Link>
          <Link
            to=""
            className="button button--delete"
            onClick={() => {
              setIsShowDelete(true);
              setSelectedProduct(record);
            }}
          >
            <FiTrash2 />
            <span>Delete</span>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        className="site-page-header"
        title={'List Product'}
        extra={
          <Link className="add-link button button--main" to="create">
            <GiMedicines />
            <span style={{ marginLeft: 10 }}>Add new product</span>
          </Link>
        }
        onBack={() => navigate('/', { replace: true })}
      />
      <Table
        rowClassName="custom-row"
        x={true}
        loading={isLoading}
        columns={productColumn}
        scroll={{ x: 300 }}
        pagination={{
          position: ['bottomCenter'],
        }}
        dataSource={products}
        rowKey={(record) => record.product_id}
      ></Table>
      <Modal
        className={`${isShowDelete ? 'active' : ''}`}
        onClickClose={() => setIsShowDelete(false)}
        isOpen={isShowDelete}
        renderBody={renderBody}
      />
    </>
  );
}
