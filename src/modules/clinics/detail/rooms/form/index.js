import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Form, InputNumber } from 'antd';

import Button from '../../../../../components/Button';
import Spinner from '../../../../../components/Spinner';
import {
  selectRoomNeedUpdate,
  selectRoomsLoading,
  fetchRoom,
  createRoom,
  updateRoom,
} from '../../../../../store/slices/roomsSlice';

const formItemLayout = {
  labelCol: {
    xl: {
      span: 4,
    },
    lg: {
      span: 4,
    },
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xl: {
      span: 16,
    },
    lg: {
      span: 14,
    },
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xl: {
      span: 24,
      offset: 4,
    },
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export default function RoomForm({ mode }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { room_id } = useParams();
  const { clinic_id } = useParams();
  const roomLoading = useSelector(selectRoomsLoading);
  const roomNeedUpdate = useSelector(selectRoomNeedUpdate);

  useEffect(() => {
    if (mode === 'update') {
      dispatch(fetchRoom(room_id));
    }
  }, [room_id, dispatch, mode]);

  useEffect(() => {
    if (Object.keys(roomNeedUpdate).length > 0) {
      form.setFieldsValue({
        room_id,
        bed_number: roomNeedUpdate.bed_number,
        slot: roomNeedUpdate.slot,
        price: roomNeedUpdate.price,
      });
    }
  }, [form, roomNeedUpdate, room_id]);

  const handleSubmit = (values) => {
    let newRoom = {};
    newRoom.price = Number(values.price);
    newRoom.bed_number = values.bed_number;
    newRoom.slot = values.slot;
    newRoom.clinic_id = clinic_id;
    // newRoom.description = values.description;
    if (mode === 'create') {
      dispatch(createRoom(newRoom));
    } else {
      newRoom.room_id = room_id;
      dispatch(updateRoom(newRoom));
    }
  };

  return (
    <div className="room-content-detail">
      <div className="header">
        <h4 className="title">
          {mode === 'create' ? 'Create room' : 'Update room'}
        </h4>
      </div>
      <Form
        className="roomForm"
        {...formItemLayout}
        form={form}
        onFinish={handleSubmit}
        name="rooms"
        initialValues={{
          bed_number: '4',
          price: '100',
          slot: '4',
        }}
        scrollToFirstError
      >
        {/* Room ID */}
        {mode === 'update' && (
          <Form.Item name="room_id" label="Room ID">
            <InputNumber disabled />
          </Form.Item>
        )}

        {/* Bed number */}
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
          <InputNumber min={1} max={6} />
        </Form.Item>

        {/* Slot */}
        <Form.Item
          name="slot"
          label="Slot"
          rules={[
            {
              required: true,
              message: 'Please input slot',
            },
          ]}
        >
          <InputNumber min={1} max={6} />
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
          <InputNumber prefix="$" min={100} max={1000} />
        </Form.Item>

        {/* Description */}
        {/* <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: true,
              message: 'Please input description',
            },
          ]}
        >
          <Input.TextArea
            placeholder="Enter your description"
            showCount
            maxLength={100}
          />
        </Form.Item> */}

        {/* Button */}
        <Form.Item {...tailFormItemLayout}>
          <Button className="button button--main" type="submit">
            {roomLoading ? (
              <Spinner />
            ) : (
              `${mode === 'create' ? 'Add room' : 'Update room'}`
            )}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
