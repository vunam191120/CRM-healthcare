import { Form, Table, Select, InputNumber } from 'antd';
import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { BiPencil } from 'react-icons/bi';
import { FiTrash2 } from 'react-icons/fi';
import { FaBed } from 'react-icons/fa';

import Modal from '../../../../components/Modal';
import Button from '../../../../components/Button';
import {
  createBed,
  deleteBed,
  fetchBed,
  fetchBeds,
  selectBedNeedUpdate,
  selectBeds,
  selectBedsLoading,
  updateBed,
} from '../../../../store/slices/bedsSlice';
import Spinner from '../../../../components/Spinner';
import RoomDiagram from '../../../../components/RoomDiagram';

const formItemLayout = {
  wrapperCol: {
    xl: {
      span: 16,
    },
    lg: {
      span: 16,
    },
    xs: {
      span: 16,
    },
    sm: {
      span: 16,
    },
  },
};

export default function ClinicBeds() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { clinic_id } = useParams();
  const { room_id } = useParams();
  const [bedId, setBedId] = useState();
  const [isShowDelete, setIsShowDelete] = useState(false);
  const beds = useSelector(selectBeds);
  const bedsLoading = useSelector(selectBedsLoading);
  const bedNeedUpdate = useSelector(selectBedNeedUpdate);

  useEffect(() => {
    dispatch(fetchBeds(room_id));
  }, [room_id, clinic_id, dispatch]);

  useEffect(() => {
    form.setFieldsValue({
      room_id,
      bed_id: bedNeedUpdate.bed_id,
      bed_number: bedNeedUpdate.slot,
      price: bedNeedUpdate.price,
    });
  }, [bedNeedUpdate, form, room_id]);

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
      title: 'Slot',
      key: 'slot',
      dataIndex: 'slot',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record, index) => (
        <div className="button-container">
          <Link
            to=""
            className={'button button--update'}
            style={{ marginRight: 10 }}
            onClick={() => {
              setBedId(record.bed_id);
              dispatch(fetchBed(record.bed_id));
            }}
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
        <Button className="button button--main" onClick={handleDeleteBed}>
          Delete
        </Button>
      </div>
    </div>
  );

  const renderBeds = () => {
    return beds.map((bed, index) => (
      <div key={index} className="bed-item">
        <FaBed
          className={`bed-icon ${
            bedNeedUpdate.bed_id === bed.bed_id ? 'active' : ''
          }`}
          onClick={() => {
            dispatch(fetchBed(bed.bed_id));
          }}
        />
      </div>
    ));
  };

  const handleDeleteBed = () => {
    dispatch(deleteBed(bedId));
    setIsShowDelete(false);
  };

  const handleCreateBed = () => {
    const newBed = {
      room_id,
      slot: 10,
      price: 100,
    };
    dispatch(createBed(newBed));
  };

  const handleSubmit = (values) => {
    const newBed = {};
    newBed.bed_id = values.bed_id;
    newBed.room_id = values.room_id;
    newBed.slot = values.bed_number;
    newBed.price = values.price;
    dispatch(updateBed(newBed));
  };

  return (
    <div className="bed-content-detail">
      <div className="header">
        <h4 className="title">Bed Information</h4>
        <Button
          onClick={handleCreateBed}
          className="button button--main"
          type="button"
        >
          <span>Click to create bed</span>
        </Button>
      </div>
      <div className="bed-body">
        <div className="bed-form-update">
          <RoomDiagram renderBeds={renderBeds} roomID={room_id} />
          <Form
            className="bedForm"
            {...formItemLayout}
            form={form}
            name="update"
            onFinish={handleSubmit}
            scrollToFirstError
          >
            {/* Bed Id */}
            <Form.Item name="bed_id" label="Bed ID">
              <InputNumber
                style={{ width: '100%' }}
                className="input-custom-disabled"
                disabled
                value={bedNeedUpdate.bed_id}
              />
            </Form.Item>

            {/* Slot */}
            <Form.Item
              name="bed_number"
              label="Bed number"
              rules={[
                {
                  required: true,
                  message: 'Please input bed number!',
                },
              ]}
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>

            {/* Price */}
            <Form.Item
              name="price"
              label="Price"
              rules={[
                {
                  required: true,
                  message: 'Please input price',
                },
              ]}
            >
              <InputNumber
                style={{ width: '100%' }}
                prefix="$"
                min={100}
                max={1000}
              />
            </Form.Item>

            {/* Button */}
            <Form.Item>
              <Button className="button--main" type="submit">
                {bedsLoading ? <Spinner /> : 'Update'}
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="bed-table">
          <Table
            rowClassName="custom-row"
            x={true}
            loading={bedsLoading}
            columns={bedsColumns}
            scroll={{ x: 300 }}
            pagination={{
              position: ['bottomCenter'],
            }}
            dataSource={beds}
            rowKey={(record) => record.bed_id}
          ></Table>
        </div>
      </div>

      <Modal
        className={`${isShowDelete ? 'active' : ''}`}
        onClickClose={() => setIsShowDelete(false)}
        isOpen={isShowDelete}
        renderBody={renderBody}
      />
    </div>
  );
}
