import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IoArrowBack, IoClose } from 'react-icons/io5';
import { Table } from 'antd';
import moment from 'moment';
import { ImEye } from 'react-icons/im';
import { BiPencil } from 'react-icons/bi';
import { FiTrash2 } from 'react-icons/fi';

import {
  deleteDetail,
  fetchDetails,
  selectPaymentDetails,
  selectPaymentsIsLoading,
} from '../../../../../store/slices/paymentsSlice';
import Button from '../../../../../components/Button';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import Modal from '../../../../../components/Modal';

export default function PaymentDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { payment_id } = useParams();
  const [isShowDelete, setIsShowDelete] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState();
  const isLoading = useSelector(selectPaymentsIsLoading);
  const details = useSelector(selectPaymentDetails);

  useEffect(() => {
    dispatch(fetchDetails(payment_id));
  }, [dispatch, payment_id]);

  const paymentColumns = [
    {
      title: 'ID',
      key: 'detail id',
      dataIndex: 'detail_id',
    },
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: 'Quantity',
      key: 'quantity',
      dataIndex: 'quantity',
    },
    {
      title: 'Price',
      key: 'price',
      dataIndex: 'price',
    },
    {
      title: 'Created date',
      key: 'created date',
      render: (record) =>
        moment(record.created_date).format('DD-MM-YYYY') +
        ' - ' +
        moment(record.created_date).format('LT'),
    },
    {
      title: 'Actions',
      key: 'action',
      render: (text, record, index) => (
        <div className="button-container">
          <Link
            style={{ marginRight: 10 }}
            className={'button button--view'}
            to=""
          >
            <ImEye />
            <span>View</span>
          </Link>
          <Link
            className={'button button--update'}
            to={`detail/update/${record.detail_id}`}
          >
            <BiPencil />
            <span>Update</span>
          </Link>
          <Link
            to=""
            className="button button--delete"
            onClick={() => {
              setIsShowDelete(true);
              setSelectedDetail(record);
            }}
          >
            <FiTrash2 />
            <span>Delete</span>
          </Link>
        </div>
      ),
    },
  ];

  const handleDeleteDetail = () => {
    dispatch(deleteDetail(selectedDetail.detail_id));
    setIsShowDelete(false);
  };

  const renderBody = () => (
    <div className="content content--confirm">
      <div className="close-btn" onClick={() => setIsShowDelete(false)}>
        <IoClose className="close-icon" />
      </div>
      <IoIosCloseCircleOutline className="icon-title icon-title--delete" />
      <h3 className="message">Are you sure to delete this detail?</h3>
      <h3 className="object">{selectedDetail.name}</h3>
      <div className="btn-container">
        <Button
          className="button button--light"
          onClick={() => setIsShowDelete(false)}
        >
          Cancel
        </Button>
        <Button className="button button--main" onClick={handleDeleteDetail}>
          Delete
        </Button>
      </div>
    </div>
  );

  return (
    <div className="payment-content-detail">
      <Button
        onClick={() => navigate(-1)}
        className="button button-back button--light"
        type="button"
      >
        <IoArrowBack className="icon" />
        <span>Back to list payment</span>
      </Button>
      <div className="header">
        <div className="title-container">
          <h4 className="title">Payments Information</h4>
        </div>
        <Link to="detail/create" className="button button--main" type="button">
          <span>Add payment detail</span>
        </Link>
      </div>
      <Table
        rowClassName="custom-row"
        x={true}
        loading={isLoading}
        columns={paymentColumns}
        scroll={{ x: 300 }}
        pagination={{
          position: ['bottomCenter'],
        }}
        dataSource={details}
        rowKey={(record) => record.detail_id}
      />
      <Modal
        className={`${isShowDelete ? 'active' : ''}`}
        onClickClose={() => setIsShowDelete(false)}
        isOpen={isShowDelete}
        renderBody={renderBody}
      />
    </div>
  );
}
