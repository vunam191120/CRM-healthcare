import { Table } from 'antd';
import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { BiPencil } from 'react-icons/bi';
import { FiTrash2 } from 'react-icons/fi';
import { ImEye } from 'react-icons/im';

import Modal from '../../../../../components/Modal';
import Button from '../../../../../components/Button';
import {
  deleteRoom,
  fetchRooms,
  selectRooms,
  selectRoomsLoading,
} from '../../../../../store/slices/roomsSlice';

export default function ClinicRooms() {
  const dispatch = useDispatch();
  const { clinic_id } = useParams();
  const [roomId, setRoomId] = useState();
  const [isShowDelete, setIsShowDelete] = useState(false);
  const rooms = useSelector(selectRooms);
  const roomsLoading = useSelector(selectRoomsLoading);

  useEffect(() => {
    dispatch(fetchRooms(clinic_id));
  }, [clinic_id, dispatch]);

  const roomsColumns = [
    {
      title: 'No',
      key: 'index',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Room ID',
      key: 'id',
      dataIndex: 'room_id',
    },
    {
      title: 'Bed Number',
      key: 'bed number',
      dataIndex: 'bed_number',
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
            style={{ marginRight: 10 }}
            className={'button button--view'}
            to={`/clinics/detail/${clinic_id}/beds/${record.room_id}`}
          >
            <ImEye />
            <span>View bed</span>
          </Link>
          <Link
            className={'button button--update'}
            to={`/clinics/detail/${clinic_id}/rooms/update/${record.room_id}`}
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
              setRoomId(record.room_id);
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
      <h3 className="message">Are you sure to delete this room?</h3>
      <h4 className="object">Room {roomId}</h4>
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

  const handleDeleteRoom = () => {
    dispatch(deleteRoom(roomId));
    setIsShowDelete(false);
  };

  return (
    <div className="room-content-detail">
      <div className="header">
        <h4 className="title">Service Information</h4>
        <Link
          to={`/clinics/detail/${clinic_id}/rooms/create`}
          className="button button--main"
          type="button"
        >
          <span>Create room</span>
        </Link>
      </div>
      <Table
        className="roomTable"
        rowClassName="custom-row"
        x={true}
        loading={roomsLoading}
        columns={roomsColumns}
        bordered
        scroll={{ x: 300 }}
        pagination={{
          position: ['bottomCenter'],
        }}
        dataSource={rooms}
        rowKey={(record) => record.room_id}
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
