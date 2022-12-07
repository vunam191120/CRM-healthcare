import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Form, Select, Switch } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { BiPencil } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';
import { FilterOutlined } from '@ant-design/icons';

import Modal from '../../../../components/Modal';
import Button from '../../../../components/Button';
import Spinner from '../../../../components/Spinner';
import Tag from '../../../../components/Tag';
import {
  fetchStaffsClinic,
  selectClinicsLoading,
  selectFilteredStaffsByClinic,
  createStaffClinic,
  updateStaffClinic,
} from '../../../../store/slices/clinicsSlice';
import { fetchUsers, selectUsers } from '../../../../store/slices/usersSlice';

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
const { Option } = Select;

export default function ClinicStaffs() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { clinic_id } = useParams();
  const [staffSelected, setStaffSlected] = useState({});
  const [isShowForm, setIsShowForm] = useState(false);
  const [mode, setMode] = useState('');
  const filteredStaffs = useSelector(selectFilteredStaffsByClinic);
  const users = useSelector(selectUsers);
  const clinicLoading = useSelector(selectClinicsLoading);

  useEffect(() => {
    dispatch(fetchStaffsClinic(clinic_id));
  }, [clinic_id, dispatch]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (mode === 'update') {
      form.setFieldsValue({
        user_id: staffSelected.user_id,
        profile_status: staffSelected.profile_status,
      });
    }
  }, [form, mode, staffSelected.profile_status, staffSelected.user_id]);

  const renderForm = (mode) => (
    <div className="content clinic-detail-category">
      <div className="close-btn" onClick={() => setIsShowForm(false)}>
        <IoClose className="close-icon" />
      </div>
      <h3 className="title">
        {mode === 'create' ? 'Add doctor into clinic' : 'Update doctor'}
      </h3>
      <Form
        className="clinicDoctorForm"
        {...formItemLayout}
        form={form}
        onFinish={handleSubmit}
        scrollToFirstError
      >
        {/* Select staff */}
        <Form.Item
          name="user_id"
          label="Staff"
          rules={[
            {
              required: true,
              message: 'Please select your staff!',
            },
          ]}
        >
          <Select placeholder="Select your staff">
            {users.map((user, index) => {
              const staffMatch = filteredStaffs.find((staff) => {
                if (user.user_id === staff.user_id) {
                  return staff;
                }
                return false;
              });
              if (!staffMatch) {
                return (
                  <Option
                    key={index}
                    value={user.user_id}
                  >{`${user.first_name} ${user.last_name} - ${user.user_id}`}</Option>
                );
              }
              return false;
            })}
          </Select>
        </Form.Item>

        {/* Position */}
        {/* <Form.Item
          name="position"
          label="Position"
          rules={[
            {
              required: true,
              message: 'Please enter your position',
            },
          ]}
        >
          <Input placeholder="Enter your position" />
        </Form.Item> */}

        {/* Profile status */}
        <Form.Item
          name="profile_status"
          valuePropName="checked"
          label="Profile status"
        >
          <Switch
            defaultChecked={
              mode === 'update' ? staffSelected.profile_status : false
            }
            className="switch"
          />
        </Form.Item>

        {/* Button */}
        <Form.Item {...tailFormItemLayout}>
          <Button className="button--main" type="submit">
            {clinicLoading ? (
              <Spinner />
            ) : mode === 'create' ? (
              'Add staff'
            ) : (
              'Update staff'
            )}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );

  const staffColumns = [
    {
      title: 'ID',
      key: 'user id',
      dataIndex: 'user_id',
    },
    {
      title: 'Avatar',
      key: 'avatar',
      render: (record) => (
        <img
          src={`${record.user.avatar}`}
          alt="avatar user"
          className="user-avatar"
        />
      ),
    },
    {
      title: 'Profile status',
      key: 'profile status',
      render: (record) => <Tag status={record.profile_status} />,
      filters: [
        {
          text: 'Active',
          value: 'active',
        },
        {
          text: 'Disabled',
          value: 'disabled',
        },
        {
          text: 'Both',
          value: 'both',
        },
      ],
      defaultFilteredValue: ['active'],
      filterMultiple: false,
      onFilter: (value, record) => {
        if (value !== 'both') {
          return value === 'active'
            ? record.profile_status === true
            : record.profile_status === false;
        } else {
          return (
            record.profile_status === true || record.profile_status === false
          );
        }
      },
      filterIcon: (filtered) => (
        <FilterOutlined
          style={{
            color: 'white',
          }}
        />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record, index) => (
        <div className="button-container">
          <Link
            className={'button button--update'}
            to=""
            onClick={() => {
              setIsShowForm(true);
              setMode('update');
              setStaffSlected(record);
            }}
          >
            <BiPencil />
            <span>Update</span>
          </Link>
        </div>
      ),
    },
  ];

  const handleSubmit = (values) => {
    const newStaff = {
      clinic_id: clinic_id,
      user_id: values.user_id,
      profile_status: values.profile_status,
    };
    if (mode === 'create') {
      dispatch(createStaffClinic(newStaff));
    } else {
      dispatch(updateStaffClinic(newStaff));
    }
    setIsShowForm(false);
  };

  return (
    <div className="doctor-content-detail">
      <div className="header">
        <h4 className="title">Staffs Information</h4>
        <Button
          onClick={() => {
            setIsShowForm(true);
            setMode('create');
            form.resetFields();
          }}
          className="button button--main"
          type="button"
        >
          <span>Add new staff</span>
        </Button>
      </div>
      <Table
        rowClassName="user-row custom-row"
        x={true}
        loading={clinicLoading}
        columns={staffColumns}
        scroll={{ x: 300 }}
        pagination={{
          position: ['bottomCenter'],
        }}
        dataSource={filteredStaffs}
        rowKey={(record) => record.user_id}
      ></Table>
      <Modal
        className={isShowForm ? 'active' : ''}
        onClickClose={() => setIsShowForm(false)}
        isOpen={isShowForm}
        renderBody={() => renderForm(mode)}
      />
    </div>
  );
}
