import React, { useEffect, useState, useRef } from 'react';
import { Table, PageHeader, Input, Space, Button } from 'antd';
import { Link } from 'react-router-dom';
import { BiCategoryAlt, BiPencil } from 'react-icons/bi';
import { SearchOutlined, FilterOutlined } from '@ant-design/icons';
import { FiTrash2 } from 'react-icons/fi';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { ImEye } from 'react-icons/im';
import Highlighter from 'react-highlight-words';

import ButtonApp from '../../../components/Button';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '../../../components/Modal';
import {
  deleteService,
  fetchServices,
  selectServices,
  selectServicesLoading,
} from '../../../store/slices/servicesSlice';

const { Column } = Table;

export default function ServicesList() {
  const [isShowDelete, setIsShowDelete] = useState(false);
  const [serviceId, setServiceId] = useState();
  const services = useSelector(selectServices);
  const serviceLoading = useSelector(selectServicesLoading);
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [sortedInfo, setSortedInfo] = useState({});

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            // icon={<HiSearch />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : 'white',
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  useEffect(() => {
    // if (Object.keys(services).length === 0) {
    dispatch(fetchServices());
    // }
  }, [dispatch]);

  const serviceColumns = [
    {
      title: 'No',
      key: 'index',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Service Name',
      // title: ({ sortColumns }) => {
      //   const sortedColumn = sortColumns?.find(
      //     ({ column }) => column.key === 'service name'
      //   );
      //   return (
      //     <div>
      //       <span>Service Name</span>
      //       {sortedColumn ? (
      //         sortedColumn.order === 'ascend' ? (
      //           <CaretUpOutlined
      //             style={{ color: 'white', marginLeft: 'auto' }}
      //           />
      //         ) : (
      //           <CaretDownOutlined style={{ color: 'white' }} />
      //         )
      //       ) : null}
      //     </div>
      //   );
      // },
      dataIndex: 'service_name',
      key: 'service name',
      ...getColumnSearchProps('service_name'),
      sorter: (a, b) => a.service_name.length - b.service_name.length,
      sortOrder:
        sortedInfo.columnKey === 'service name' ? sortedInfo.order : null,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Category',
      key: 'category_name',
      render: (text, record, index) => <p>{record.category.category_name}</p>,
      filters: [
        {
          text: 'Dermatology',
          value: 'Dermatology',
        },
        {
          text: 'Ophthalmology',
          value: 'Ophthalmology',
        },
        {
          text: 'Nutrition',
          value: 'Nutrition',
        },
      ],
      onFilter: (value, record) =>
        record.category.category_name.includes(value),
      filterIcon: (filtered) => (
        <FilterOutlined
          style={{
            color: filtered ? '#1890ff' : 'white',
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
            style={{ marginRight: 10 }}
            className={'button button--view'}
            to={`/services/detail/${record.service_id}`}
          >
            <ImEye />
            <span>View</span>
          </Link>
          <Link
            className={'button button--update'}
            to={`/services/update/${record.service_id}`}
          >
            <BiPencil />
            <span>Update</span>
          </Link>
          <Link
            to=""
            className="button button--delete"
            onClick={() => {
              setIsShowDelete(true);
              setServiceId(record.service_id);
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
      <h3 className="message">Are you sure to delete this category?</h3>
      <div className="btn-container">
        <ButtonApp
          className="button button--light"
          onClick={() => setIsShowDelete(false)}
        >
          Cancel
        </ButtonApp>
        <ButtonApp
          className="button button--main"
          onClick={handleDeleteService}
        >
          Delete
        </ButtonApp>
      </div>
    </div>
  );

  const handleDeleteService = () => {
    dispatch(deleteService(serviceId));
    setIsShowDelete(false);
  };

  const handleChange = (pagination, filter, sorter) => {
    setSortedInfo(sorter);
  };

  return (
    <>
      <PageHeader
        className="site-page-header"
        title={'List Service'}
        extra={
          <Link className="add-link button button--main" to="create">
            <BiCategoryAlt />
            <span style={{ marginLeft: 10 }}>Add New Service</span>
          </Link>
        }
      />
      <Table
        onChange={handleChange}
        rowClassName="custom-row"
        x={true}
        loading={serviceLoading}
        columns={serviceColumns}
        scroll={{ x: 300 }}
        pagination={{
          position: ['bottomCenter'],
        }}
        dataSource={services}
        rowKey={(record) => record.service_id}
      >
        <Column title={serviceColumns.title} key={serviceColumns.key} />
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
