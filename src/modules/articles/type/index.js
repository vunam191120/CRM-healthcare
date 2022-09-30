import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, PageHeader, Form, Popconfirm, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { BiPencil } from 'react-icons/bi';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { FiTrash2 } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import { MdDone, MdClose } from 'react-icons/md';
import { AiFillTag } from 'react-icons/ai';

import {
  createType,
  deleteType,
  fetchTypes,
  selectTypes,
  updateType,
} from '../../../store/slices/typesSlice';
import EditableCell from '../../../components/EditableCell';
import Modal from '../../../components/Modal';
import Button from '../../../components/Button';

export default function TypesList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const types = useSelector(selectTypes);
  const [typeID, setTypeID] = useState();
  const [isShowDelete, setIsShowDelete] = useState(false);
  const [edittingID, setEdittingID] = useState('');

  useEffect(() => {
    dispatch(fetchTypes());
  }, [dispatch]);

  const renderBody = () => (
    <div className="content content--confirm">
      <div className="close-btn" onClick={() => setIsShowDelete(false)}>
        <IoClose className="close-icon" />
      </div>
      <IoIosCloseCircleOutline className="icon-title icon-title--delete" />
      <h3 className="message">Are you sure to delete this type?</h3>
      <h4 className="object">
        {types.find((type) => type.type_id === typeID).type_name}
      </h4>
      <div className="btn-container">
        <Button
          className="button button--light"
          onClick={() => setIsShowDelete(false)}
        >
          Cancel
        </Button>
        <Button className="button button--main" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </div>
  );

  const typesColumns = [
    {
      title: 'No',
      key: 'index',
      width: 40,
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Type name',
      key: 'type name',
      dataIndex: 'type_name',
      width: '25%',
      editable: true,
    },
    {
      title: 'Meta title',
      key: 'meta title',
      dataIndex: 'meta_title',
      width: '25%',
      editable: true,
    },
    {
      title: 'Description',
      key: 'description',
      dataIndex: 'description',
      width: '25%',
      editable: true,
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <div className="button-container">
            <Typography.Link
              className="button-edit-cell button button-main"
              onClick={() => handleUpdate(record.type_id)}
              style={{
                marginRight: 8,
              }}
              type="submit"
            >
              <MdDone className="icon" />
              <span>Save</span>
            </Typography.Link>
            <Popconfirm
              title="Sure to cancel?"
              onConfirm={() => setEdittingID('')}
            >
              <Typography.Link className="button button-edit-cell">
                <MdClose className="icon" />
                <span>Cancel</span>
              </Typography.Link>
            </Popconfirm>
          </div>
        ) : (
          <div className="button-container">
            <Typography.Link
              className="button button--update "
              disabled={edittingID !== ''}
              onClick={() => edit(record)}
              style={{ marginLeft: '0' }}
            >
              <BiPencil />
              <span>Update</span>
            </Typography.Link>
            <Typography.Link
              className="button button--delete "
              disabled={edittingID !== ''}
              onClick={() => {
                setIsShowDelete(true);
                setTypeID(record.type_id);
              }}
            >
              <FiTrash2 />
              <span>Delete</span>
            </Typography.Link>
          </div>
        );
      },
    },
  ];

  const isEditing = (record) => record.type_id === edittingID;

  const edit = (record) => {
    form.setFieldsValue({
      type_name: '',
      meta_title: '',
      description: '',
      ...record,
    });
    setEdittingID(record.type_id);
  };

  const mergedColumns = typesColumns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const handleCreate = () => {
    const newType = {
      type_name: 'New type',
      meta_title: 'New meta title',
      description: 'New description',
    };
    dispatch(createType(newType));
  };

  const handleUpdate = async (type_id) => {
    const newType = {};
    const row = await form.validateFields();
    newType.type_name = row.type_name;
    newType.description = row.description;
    newType.meta_title = row.meta_title;
    newType.type_id = type_id;
    dispatch(updateType(newType));
    setEdittingID('');
  };

  const handleDelete = () => {
    dispatch(deleteType(typeID));
    setIsShowDelete(false);
  };

  return (
    <>
      <PageHeader
        onBack={() => navigate(-1)}
        className="site-page-header"
        title={'List types'}
        extra={
          <Link
            to=""
            onClick={handleCreate}
            className="add-link button button--main"
          >
            <AiFillTag />
            <span style={{ marginLeft: 10 }}>Add new type</span>
          </Link>
        }
      />
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          dataSource={types}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            position: ['bottomCenter'],
          }}
          rowKey={(record) => record.type_id}
        />
      </Form>
      <Modal
        className={`${isShowDelete ? 'active' : ''}`}
        onClickClose={() => setIsShowDelete(false)}
        isOpen={isShowDelete}
        renderBody={renderBody}
      />
    </>
  );
}
