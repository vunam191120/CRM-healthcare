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
  createTag,
  deleteTag,
  fetchTags,
  selectTags,
  updateTag,
} from '../../../store/slices/tagsSlice';
import EditableCell from '../../../components/EditableCell';
import Modal from '../../../components/Modal';
import Button from '../../../components/Button';

export default function TagsList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const tags = useSelector(selectTags);
  const [tagID, setTagID] = useState();
  const [isShowDelete, setIsShowDelete] = useState(false);
  const [edittingID, setEdittingID] = useState('');

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  const tagsColumns = [
    {
      title: 'No',
      key: 'index',
      width: 40,
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Tag name',
      key: 'tag name',
      dataIndex: 'tag_name',
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
              onClick={() => handleUpdate(record.tag_id)}
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
                setTagID(record.tag_id);
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

  const isEditing = (record) => record.tag_id === edittingID;

  const edit = (record) => {
    form.setFieldsValue({
      tag_name: '',
      meta_title: '',
      description: '',
      ...record,
    });
    setEdittingID(record.tag_id);
  };

  const handleUpdate = async (tag_id) => {
    const newTag = {};
    const row = await form.validateFields();
    newTag.tag_name = row.tag_name;
    newTag.description = row.description;
    newTag.meta_title = row.meta_title;
    newTag.tag_id = tag_id;
    dispatch(updateTag(newTag));
    setEdittingID('');
  };

  const handleCreate = () => {
    const newTag = {
      tag_name: 'New tag',
      meta_title: 'New meta title',
      description: 'New description',
    };
    dispatch(createTag(newTag));
  };

  const handleDelete = () => {
    dispatch(deleteTag(tagID));
    setIsShowDelete(false);
  };

  const renderBody = () => (
    <div className="content content--confirm">
      <div className="close-btn" onClick={() => setIsShowDelete(false)}>
        <IoClose className="close-icon" />
      </div>
      <IoIosCloseCircleOutline className="icon-title icon-title--delete" />
      <h3 className="message">Are you sure to delete this tag?</h3>
      <h4 className="object">
        {tags.find((tag) => tag.tag_id === tagID).tag_name}
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

  const mergedColumns = tagsColumns.map((col) => {
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

  return (
    <>
      <PageHeader
        onBack={() => navigate(-1)}
        className="site-page-header"
        title={'List tags'}
        extra={
          <Link
            to=""
            onClick={handleCreate}
            className="add-link button button--main"
          >
            <AiFillTag />
            <span style={{ marginLeft: 10 }}>Add new tag</span>
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
          dataSource={tags}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            position: ['bottomCenter'],
          }}
          rowKey={(record) => record.tag_id}
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
