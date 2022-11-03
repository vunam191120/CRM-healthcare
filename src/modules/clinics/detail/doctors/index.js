import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Form, DatePicker, Select, Input, Switch } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { BiPencil } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import moment from 'moment';

import Modal from '../../../../components/Modal';
import Button from '../../../../components/Button';
import Spinner from '../../../../components/Spinner';
import Tag from '../../../../components/Tag';
import {
  createDoctorClinic,
  fetchDoctorsClinic,
  selectClinicsLoading,
  selectFilteredDoctorsByClinic,
  selectSearchTermClinic,
  updateDoctorClinic,
  changeSearchTerm,
} from '../../../../store/slices/clinicsSlice';
import {
  fetchDoctors,
  selectDoctorAvailable,
} from '../../../../store/slices/doctorsSlice';

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
const { RangePicker } = DatePicker;

export default function ClinicDoctors() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { clinic_id } = useParams();
  const [doctorSelected, setDoctorSelected] = useState({});
  const [isShowForm, setIsShowForm] = useState(false);
  const [mode, setMode] = useState('');
  const [searchedColumn, setSearchColumn] = useState('');
  const filteredDoctors = useSelector(selectFilteredDoctorsByClinic);
  const availabledDoctors = useSelector(selectDoctorAvailable);
  const clinicLoading = useSelector(selectClinicsLoading);
  const searchTerm = useSelector(selectSearchTermClinic);

  useEffect(() => {
    if (mode === 'update') {
      form.setFieldsValue({
        doctor_id: doctorSelected.doctor_id,
        position: doctorSelected.position,
        contract: [
          moment(doctorSelected.contract_start_date),
          moment(doctorSelected.contract_end_date),
        ],
        profile_status: doctorSelected.profile_status,
      });
    }
  }, [
    doctorSelected.contract_end_date,
    doctorSelected.contract_start_date,
    doctorSelected.doctor_id,
    doctorSelected.position,
    doctorSelected.profile_status,
    form,
    mode,
  ]);

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  useEffect(() => {
    console.log(filteredDoctors);
  }, [filteredDoctors]);

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => {
      return (
        <div style={{ padding: 8 }}>
          <Input
            // ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            // value={selectedKeys[0]}
            // onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            onChange={(e) => {
              dispatch(changeSearchTerm(e.target.value));
              setSearchColumn(dataIndex);
              // if(e.target.value === '') {
              //   clearFilters();
              // }
            }}
            style={{
              marginBottom: 8,
              display: 'block',
            }}
          />
        </div>
      );
    },
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : 'white',
        }}
      />
    ),
    render: (record) => {
      // console.log('Text at render: ', text);
      return searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          autoEscape
          searchWords={[searchTerm]}
          textToHighlight={
            record.doctor.full_name ? record.doctor.full_name.toString() : ''
          }
        />
      ) : (
        record.doctor.full_name
      );
    },
  });

  const doctorColumns = [
    {
      title: 'ID',
      key: 'doctor id',
      dataIndex: 'doctor_id',
    },
    {
      title: 'Avatar',
      key: 'avatar',
      render: (record) => (
        <img
          src={`${record.doctor.avatar}`}
          alt="avatar user"
          className="user-avatar"
        />
      ),
    },
    {
      title: 'Full Name',
      key: 'full name',
      render: (record) => record.doctor.full_name,
      ...getColumnSearchProps('full_name'),
    },
    {
      title: 'Position',
      key: 'position',
      dataIndex: 'position',
    },
    {
      title: 'Contract start',
      key: 'contract start',
      render: (text, record) =>
        moment(record.contract_start_date).format('DD-MM-YYYY'),
    },
    {
      title: 'Contract end',
      key: 'contract end',
      render: (text, record) =>
        moment(record.contract_end_date).format('DD-MM-YYYY'),
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
              setDoctorSelected(record);
            }}
          >
            <BiPencil />
            <span>Update</span>
          </Link>
        </div>
      ),
    },
  ];

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
        {/* Select doctor */}
        <Form.Item
          name="doctor_id"
          label="Doctor"
          rules={[
            {
              required: true,
              message: 'Please select your doctor!',
            },
          ]}
        >
          <Select placeholder="Select your doctor">
            {availabledDoctors.map((doctor, index) => (
              <Option key={index} value={doctor.doctor_id}>
                {doctor.first_name} {doctor.last_name} - {doctor.doctor_id}
              </Option>
            ))}
          </Select>
        </Form.Item>

        {/* Position */}
        <Form.Item
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
        </Form.Item>

        {/* Contract */}
        <Form.Item
          name="contract"
          label="Contract Date"
          rules={[
            {
              required: true,
              message: 'Please select date of contract',
            },
          ]}
        >
          <RangePicker />
        </Form.Item>

        {/* Profile status */}
        <Form.Item
          name="profile_status"
          valuePropName="checked"
          label="Profile status"
        >
          <Switch
            defaultChecked={
              mode === 'update' ? doctorSelected.profile_status : false
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
              'Add doctor'
            ) : (
              'Update doctor'
            )}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );

  useEffect(() => {
    dispatch(fetchDoctorsClinic(clinic_id));
  }, [clinic_id, dispatch]);

  const handleSubmit = (values) => {
    const newDoctor = {
      clinic_id: clinic_id,
      doctor_id: values.doctor_id,
      position: values.position,
      contract_start_date: values.contract[0].toDate().toISOString(),
      contract_end_date: values.contract[1].toDate().toISOString(),
      profile_status: values.profile_status,
    };
    if (mode === 'create') {
      dispatch(createDoctorClinic(newDoctor));
    } else {
      dispatch(updateDoctorClinic(newDoctor));
    }
    setIsShowForm(false);
  };

  return (
    <div className="doctor-content-detail">
      <div className="header">
        <h4 className="title">Doctors Information</h4>
        <Button
          onClick={() => {
            setIsShowForm(true);
            setMode('create');
            form.resetFields();
          }}
          className="button button--main"
          type="button"
        >
          <span>Add new doctor</span>
        </Button>
      </div>
      <Table
        rowClassName="user-row custom-row"
        x={true}
        loading={clinicLoading}
        columns={doctorColumns}
        scroll={{ x: 300 }}
        pagination={{
          position: ['bottomCenter'],
        }}
        dataSource={filteredDoctors}
        rowKey={(record) => record.doctor_id}
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
