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
  deleteArticle,
  fetchArticles,
  selectArticles,
  selectArticlesLoading,
} from '../../../store/slices/articlesSlice';

export default function ArticlesList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isShowDelete, setIsShowDelete] = useState(false);
  const [article, setArticle] = useState();
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
      title: 'Thumbnail',
      key: 'image',
      render: (text, record, index) => (
        <img
          src={`${record.image}`}
          alt="article thumbnail"
          className="article-thumbnail"
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
              setArticle(record);
            }}
          >
            <FiTrash2 />
            <span>Delete</span>
          </Link>
        </div>
      ),
    },
  ];

  const handleDeleteArticle = () => {
    dispatch(deleteArticle(article.article_id));
    setIsShowDelete(false);
  };

  const renderBody = () => (
    <div className="content content--confirm">
      <div className="close-btn" onClick={() => setIsShowDelete(false)}>
        <IoClose className="close-icon" />
      </div>
      <IoIosCloseCircleOutline className="icon-title icon-title--delete" />
      <h3 className="message">Are you sure to delete this article?</h3>
      <h4 className="object">{article.title}</h4>
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
