import { Table } from 'antd';
import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { BiPencil } from 'react-icons/bi';
import { FiTrash2 } from 'react-icons/fi';

import Modal from '../../../../../components/Modal';
import Button from '../../../../../components/Button';
import {
  fetchBeds,
  selectBeds,
  selectBedsLoading,
} from '../../../../../store/slices/bedsSlice';

export default function ClinicBedss() {
  const dispatch = useDispatch();
  const { clinic_id } = useParams();
  const { room_id } = useParams();
  const [bedId, setBedId] = useState();
  const [isShowDelete, setIsShowDelete] = useState(false);
  const beds = useSelector(selectBeds);
  const bedsLoading = useSelector(selectBedsLoading);

  useEffect(() => {
    dispatch(fetchBeds(room_id));
  }, [room_id, clinic_id, dispatch]);

  const bedsColumns = [
    {
      title: 'No',
      key: 'index',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Bed ID',
      key: 'id',
      dataIndex: 'bed_id',
    },
    {
      title: 'Price',
      key: 'price',
      render: (record) => `$${record.price}`,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record, index) => (
        <div className="button-container">
          <Link
            className={'button button--update'}
            to={`/clinics/detail/${clinic_id}/beds/update/${record.bed_id}`}
            style={{ marginRight: 10 }}
          >
            <BiPencil />
            <span>Update</span>
          </Link>
          <Link
            to=""
            className="button button--delete"
            onClick={() => {
              setIsShowDelete(true);
              setBedId(record.bed_id);
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
      <h3 className="message">Are you sure to delete this bed?</h3>
      <h4 className="object">Bed {bedId}</h4>
      <div className="btn-container">
        <Button
          className="button button--light"
          onClick={() => setIsShowDelete(false)}
        >
          Cancel
        </Button>
        <Button className="button button--main" onClick={handleDeleteRoom}>
          Delete
        </Button>
      </div>
    </div>
  );

  const handleDeleteRoom = () => {};

  return (
    <div className="bed-content-detail">
      <div className="header">
        <h4 className="title">Bed Information</h4>
        <Link
          to={`/clinics/detail/${clinic_id}/beds/${room_id}/create  `}
          className="button button--main"
          type="button"
        >
          <span>Create bed</span>
        </Link>
      </div>
      <Table
        rowClassName="room-row"
        x={true}
        loading={bedsLoading}
        columns={bedsColumns}
        bordered
        scroll={{ x: 300 }}
        pagination={{
          position: ['bottomCenter'],
        }}
        dataSource={beds}
        rowKey={(record) => record.bed_id}
      ></Table>
      <Modal
        className={`${isShowDelete ? 'active' : ''}`}
        onClickClose={() => setIsShowDelete(false)}
        isOpen={isShowDelete}
        renderBody={renderBody}
      />
    </div>
  );
}
