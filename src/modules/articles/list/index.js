import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, PageHeader } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { BiPencil } from 'react-icons/bi';
import { RiArticleLine } from 'react-icons/ri';
// import { HiSearch } from 'react-icons/hi';
import { FiTrash2 } from 'react-icons/fi';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { ImEye } from 'react-icons/im';
// import Highlighter from 'react-highlight-words';  --- highlight similar with list of services

import Button from '../../../components/Button';
import Modal from '../../../components/Modal';
import {
  fetchArticles,
  selectArticles,
  selectArticlesLoading,
} from '../../../store/slices/articlesSlice';

export default function ArticlesList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isShowDelete, setIsShowDelete] = useState(false);
  const [articleId, setArticleId] = useState();
  const articles = useSelector(selectArticles);
  const aritclesLoading = useSelector(selectArticlesLoading);

  // const [searchText, setSearchText] = useState('');
  // const [searchedColumn, setSearchedColumn] = useState('');
  // const searchInput = useRef(null);
  // const [sortedInfo, setSortedInfo] = useState({});

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  const articlesColumns = [
    {
      title: 'No',
      key: 'index',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Title',
      key: 'title',
      dataIndex: 'title',
    },
    {
      title: 'Meta title',
      key: 'metal title',
      dataIndex: 'meta_title',
    },
    {
      title: 'Author',
      key: 'author id',
      dataIndex: 'author_id',
    },
    {
      title: 'Summary',
      key: 'summary',
      dataIndex: 'summary',
      width: 200,
    },
    {
      title: 'Image',
      key: 'image',
      dataIndex: 'image',
    },
    {
      title: 'Content',
      key: 'content',
      dataIndex: 'content',
      width: 300,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record, index) => (
        <div className="button-container">
          <Link
            style={{ marginRight: 10 }}
            className={'button button--view'}
            to={`detail/${record.article_id}`}
          >
            <ImEye />
            <span>View</span>
          </Link>
          <Link
            className={'button button--update'}
            to={`update/${record.article_id}`}
          >
            <BiPencil />
            <span>Update</span>
          </Link>
          <Link
            to=""
            className="button button--delete"
            onClick={() => {
              setIsShowDelete(true);
              setArticleId(record.article_id);
            }}
          >
            <FiTrash2 />
            <span>Delete</span>
          </Link>
        </div>
      ),
    },
  ];

  const handleDeleteArticle = () => {};

  const renderBody = () => (
    <div className="content content--confirm">
      <div className="close-btn" onClick={() => setIsShowDelete(false)}>
        <IoClose className="close-icon" />
      </div>
      <IoIosCloseCircleOutline className="icon-title icon-title--delete" />
      <h3 className="message">Are you sure to delete this article?</h3>
      <div className="btn-container">
        <Button
          className="button button--light"
          onClick={() => setIsShowDelete(false)}
        >
          Cancel
        </Button>
        <Button className="button button--main" onClick={handleDeleteArticle}>
          Delete
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={() => navigate('/')}
        title={'List Articles'}
        extra={
          <Link className="add-link button button--main" to="create">
            <RiArticleLine />
            <span style={{ marginLeft: 10 }}>Add new article</span>
          </Link>
        }
      />
      <Table
        rowClassName="custom-row"
        x={true}
        loading={aritclesLoading}
        bordered
        columns={articlesColumns}
        scroll={{ x: 300 }}
        pagination={{
          position: ['bottomCenter'],
        }}
        dataSource={articles}
        rowKey={(record) => record.article_id}
        column={articlesColumns}
      ></Table>
      <Modal
        className={`${isShowDelete ? 'active' : ''}`}
        onClickClose={() => setIsShowDelete(false)}
        isOpen={isShowDelete}
        renderBody={renderBody}
      />
    </>
  );
}
