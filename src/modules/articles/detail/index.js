import React, { useEffect } from 'react';
import { Col, PageHeader, Row } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RiUserStarFill } from 'react-icons/ri';
import {
  BsTwitter,
  BsFacebook,
  BsLinkedin,
  BsLink45Deg,
  BsBookmarkPlus,
} from 'react-icons/bs';
import moment from 'moment';

import {
  fetchArticle,
  fetchAuthor,
  selectAuthor,
  selectWritingArticle,
} from '../../../store/slices/articlesSlice';
import {
  fetchUser,
  selectUserNeedUpdate,
} from '../../../store/slices/usersSlice';
import Button from '../../../components/Button';
import { APP_NAME } from '../../../constants';

export default function ArticleDetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { article_id } = useParams();
  const article = useSelector(selectWritingArticle);
  const relatedArticles = useSelector(selectAuthor);
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

  // Fetch information about the author
  useEffect(() => {
    // dispatch(fetchUser(article.author_email));
    dispatch(fetchUser('vuhainam1911@gmail.com'));
  }, [dispatch]);

  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={() => navigate('/articles')}
        title={'Article Detail'}
      />
      {Object.keys(author).length > 0 && (
        <Row className="article-detail-content">
          <Col className="left" xs={24} sm={24} md={17} lg={17} xl={17}>
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
            {/* Aritcle more from author */}
            <div className="more-article-author">
              <h3 className="title-more">
                More from {author.full_name} Vu Nam
              </h3>
              <p className="description">
                Top Writer in Self Improvement | Here to help you live and think
                better. Reach out:{' '}
                <a href={`mailto:${author.email}`} className="email">
                  {author.email}
                </a>
              </p>
              <Button className="button button--main">
                <span>Contact</span>
              </Button>
              <div className="created-date">
                <span>Jul 28 </span>
                <span>
                  <RiUserStarFill className="icon" /> Member-only
                </span>
              </div>
              <div className="body">
                <div className="content">
                  <h3 className="title">
                    I Spent 1500 Hours Learning How To Be Productive: Part 2
                  </h3>
                  <p className="description">
                    My top takeaways — I’ve spent over 1500 hours over the past
                    two years compiling notes from videos, books, articles,
                    podcasts, and other
                  </p>
                </div>
                <img
                  src="https://www.vinmec.com/static/img/state-of-the-art-equipment.69543a792b48.jpeg"
                  className="thumbnail"
                  alt="more article of the author"
                />
              </div>
              <div className="footer">
                <span className="type">Productivity</span>
                <span>3 min read</span>
              </div>
            </div>
          </Col>
          <Col className="right" xs={24} sm={24} md={7} lg={7} xl={7}>
            <div className="author-info">
              <img
                src={author.avatar[0].url}
                alt="author avatar"
                className="avatar"
              />
              <h3 className="name">{author.full_name} Vu Nam</h3>
              <p className="joined-from">
                {moment(new Date(author.created_date)).format('MMM Do YY')}
              </p>
              <p className="description">
                Top Writer in Self Improvement | Here to help you live and think
                better. Reach out:{' '}
                <a href={`mailto:${author.email}`} className="email">
                  {author.email}
                </a>
              </p>
              <Button className="button button--main">
                <span>Contact</span>
              </Button>
              <h3 className="title-more">More from {APP_NAME}</h3>
              {[...Array(5).keys()].map((article, index) => (
                <div key={index} className="more-article-item">
                  <div className="info">
                    <div className="header">
                      <img
                        src="https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/288546449_5437053329741926_1343916587488343755_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=da31f3&_nc_ohc=Vcgm49dOKZcAX8NN50V&_nc_ht=scontent.fhan15-1.fna&oh=00_AT_xPsdxzB84bve9mmizMGNKqgFsgAr56ere05QjehRkvw&oe=634619F5"
                        alt="more article thumbnail"
                        className="avatar"
                      />
                      <p className="name">Ng. Quoc Anh</p>
                    </div>
                    <div className="title">
                      Surgical treatment of ureteral junction stenosis
                    </div>
                  </div>
                  <img
                    src="https://vinmec-prod.s3.amazonaws.com/images/20191014_032806_451060_tac-nghen-nieu-quan-b.max-800x800.jpg"
                    alt="more article thumbnail"
                    className="thumbnail"
                  />
                </div>
              ))}
            </div>
          </Col>
        </Row>
      )}
    </>
  );
}
