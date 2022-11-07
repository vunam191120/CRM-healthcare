import React, { useEffect } from 'react';
import { Col, PageHeader, Row } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  BsTwitter,
  BsFacebook,
  BsLinkedin,
  BsLink45Deg,
  BsBookmarkPlus,
} from 'react-icons/bs';

import {
  fetchArticle,
  fetchAuthor,
  selectWritingArticle,
} from '../../../store/slices/articlesSlice';
import {
  fetchUser,
  selectUserNeedUpdate,
} from '../../../store/slices/usersSlice';

export default function ArticleDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { article_id } = useParams();
  const article = useSelector(selectWritingArticle);
  const author = useSelector(selectUserNeedUpdate);

  useEffect(() => {
    dispatch(fetchArticle(article_id));
  }, [article_id, dispatch]);

  // Fetch all articles were created by the author
  useEffect(() => {
    if (article.author_id) {
      dispatch(fetchAuthor(article.author_id));
    }
  }, [article.author_id, dispatch]);

  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={() => navigate('/articles')}
        title={'Article Detail'}
      />
      {Object.keys(author).length > 0 && (
        <Row className="article-detail-content">
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            {/* Article content */}
            <div className="article-content">
              <div className="header">
                <div className="author-info">
                  {Object.keys(author).length > 0 && (
                    <img
                      src={author.avatar[0].url}
                      alt="author avatar"
                      className="avatar"
                    />
                  )}
                  <div>
                    <h3 className="name">{author.full_name} Vu Nam</h3>
                    <p className="time">
                      <span>Sep 27</span>
                      <span>·</span>
                      <span>3 min read</span>
                      <span>·</span>
                    </p>
                  </div>
                </div>
                <div className="author-social">
                  <BsTwitter className="icon" />
                  <BsFacebook className="icon" />
                  <BsLinkedin className="icon" />
                  <BsLink45Deg className="icon" />
                  <BsBookmarkPlus style={{ marginLeft: 10 }} className="icon" />
                </div>
              </div>
              <div
                className="article-content view ql-editor"
                dangerouslySetInnerHTML={{ __html: article.content }}
              ></div>
            </div>
          </Col>
        </Row>
      )}
    </>
  );
}
