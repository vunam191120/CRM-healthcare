import {
  PageHeader,
  Form,
  Input,
  Row,
  Col,
  Select,
  Upload,
  Image,
  Typography,
  message,
  Tooltip,
} from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { SiStatuspal } from 'react-icons/si';
import { FaRegEye } from 'react-icons/fa';
import { AiFillTag } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import QuillEditor from '../../../components/QuillEditor/QuillEditor';
import {
  createTag,
  fetchTags,
  selectTags,
  selectTagsLoading,
} from '../../../store/slices/tagsSlice';
import { fetchTypes, selectTypes } from '../../../store/slices/typesSlice';
import {
  selectArticlesLoading,
  updateTitleWritingArticle,
  updateContentWritingArticle,
  updateSummaryWritingArticle,
  updateUploadingFilesWritingArticle,
  deleteUploadingFileWritingArticle,
  updateTagsWritingArticle,
  updateTypesWritingArticle,
  updateThumbnailWritingArticle,
  deleteThumbnailWritingArticle,
  clearWritingArticle,
  uploadDocument,
  selectWritingArticle,
  resetUploadingFileWritingAritcle,
  createArticle,
  fetchArticle,
  updateArticle,
  fetchPreviousDocs,
} from '../../../store/slices/articlesSlice';
import Button from '../../../components/Button';
import Spinner from '../../../components/Spinner';
import Modal from '../../../components/Modal';

const { Option } = Select;

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

export default function ArticleForm({ mode }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { article_id } = useParams();
  const [isCreateTag, setIsCreateTag] = useState(false);
  const tags = useSelector(selectTags);
  const types = useSelector(selectTypes);
  const articleLoading = useSelector(selectArticlesLoading);
  const tagsLoading = useSelector(selectTagsLoading);
  const writingArticle = useSelector(selectWritingArticle);
  const [preview, setPreview] = useState({
    isOpen: false,
    title: '',
    src: '',
  });
  const [oldImage, setOldImage] = useState(false);
  const [isPreviewArticle, setIsPreviewArticle] = useState(false);

  const quillEditor = useMemo(
    () => (
      <Form.Item className="article-input-group">
        <h3 className="title">Content</h3>
        <Form.Item>
          <QuillEditor
            files={writingArticle.uploadingFiles}
            content={writingArticle.content}
            action={updateContentWritingArticle}
            keyContent="content"
          />
        </Form.Item>
      </Form.Item>
    ),
    [writingArticle.content, writingArticle.uploadingFiles]
  );

  useEffect(() => {
    if (mode === 'update') {
      dispatch(fetchArticle(article_id));
    }
  }, [mode, dispatch, article_id]);

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTypes());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchPreviousDocs());
  }, [dispatch]);

  useEffect(() => {
    // Clean writing article whenever the mode update end
    if (mode === 'update') {
      return () => {
        dispatch(clearWritingArticle());
      };
    }
  }, [dispatch, form, mode]);

  // Fill input corresponding to approiate mode for draft saving
  useEffect(() => {
    form.setFieldsValue({
      title: writingArticle.title,
      summary: writingArticle.summary,
      tags: writingArticle.tags,
      types: writingArticle.types,
      thumbnail: writingArticle.image
        ? writingArticle.image
        : writingArticle.thumbnail,
    });
  }, [
    dispatch,
    form,
    writingArticle.image,
    writingArticle.summary,
    writingArticle.tags,
    writingArticle.thumbnail,
    writingArticle.title,
    writingArticle.types,
  ]);

  const handleClose = () => {
    setPreview({ ...preview, isOpen: false });
    setIsPreviewArticle(false);
  };

  const handlePreview = (file) => {
    setPreview({
      ...preview,
      src: file.url,
      title: file.title,
      isOpen: true,
    });
  };

  const handleCreateTag = () => {
    const { tag_name } = form.getFieldsValue();
    const newTag = {
      tag_name,
      meta_title: tag_name,
      description: `New description for ${tag_name}`,
    };
    form.setFieldsValue({
      tag_name: '',
    });
    dispatch(createTag(newTag));
  };

  const handleUploadDocuments = () => {
    const formData = new FormData();
    for (let file of writingArticle.uploadingFiles) {
      formData.append('article', file);
    }
    dispatch(uploadDocument(formData));
    dispatch(resetUploadingFileWritingAritcle());
  };

  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('meta_title', values.title);
    formData.append('content', writingArticle.content);
    formData.append('summary', values.summary);
    for (let tag of values.tags) {
      formData.append('tags', tag);
    }
    for (let type of values.types) {
      formData.append('types', type);
    }
    formData.append(
      'author_id',
      JSON.parse(localStorage.getItem('currentUser')).user_id
    );
    if (mode === 'create') {
      formData.append('article', writingArticle.image[0]);
      dispatch(createArticle(formData));
      dispatch(clearWritingArticle());
    } else if (mode === 'update') {
      if (oldImage) {
        formData.append('article', writingArticle.image[0]);
      }
      formData.append('article_id', article_id);
      dispatch(updateArticle(formData));
    }
  };

  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={() => navigate('/articles')}
        title={`${mode === 'create' ? 'Add new' : 'Update'} article`}
      />
      <Row className={`article-input-container`}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Form
            className="articleForm"
            {...formItemLayout}
            form={form}
            onFinish={handleSubmit}
            name="articles"
            scrollToFirstError
          >
            <Row>
              <Col xs={24} sm={24} md={19} lg={19} xl={19} className="left">
                {/* Title */}
                <Form.Item className="article-input-group">
                  <h3 className="title">Title</h3>
                  <Form.Item
                    name="title"
                    rules={[
                      {
                        required: true,
                        message: 'Please input title for your article!',
                      },
                    ]}
                  >
                    <Input
                      onChange={(e) =>
                        dispatch(updateTitleWritingArticle(e.target.value))
                      }
                      className="input"
                      placeholder="Enter your title!"
                    />
                  </Form.Item>
                </Form.Item>

                {/* Content */}
                {quillEditor}

                {/* Summary */}
                <Form.Item className="article-input-group">
                  <h3 className="title">Summary</h3>
                  <Form.Item
                    name="summary"
                    rules={[
                      {
                        required: true,
                        message: 'Please input summary for your article!',
                      },
                    ]}
                  >
                    <Input.TextArea
                      className="input"
                      placeholder="Enter your summary"
                      showCount
                      maxLength={100}
                      rows={3}
                      onChange={(e) =>
                        dispatch(updateSummaryWritingArticle(e.target.value))
                      }
                    />
                  </Form.Item>
                </Form.Item>

                <Row>
                  <Col xs={0} sm={0} md={0} lg={0} xl={0}>
                    {/* Documents */}
                    <Form.Item>
                      <h3 className="title-upload">Documents</h3>
                      <Form.Item valuePropName="fileList">
                        <Upload
                          multiple
                          onRemove={(file) => {
                            dispatch(deleteUploadingFileWritingArticle(file));
                          }}
                          beforeUpload={(file) => {
                            // Fake sending document to action props succesfully
                            file.status = 'done';
                            const reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onload = (event) => {
                              file.title = file.name;
                              file.url = event.target.result;
                              dispatch(
                                updateUploadingFilesWritingArticle(file)
                              );
                            };
                            return false;
                          }}
                          listType="picture-card"
                          fileList={writingArticle.uploadingFiles}
                          onPreview={handlePreview}
                        >
                          <div>
                            <PlusOutlined />
                            <div
                              style={{
                                marginTop: 8,
                              }}
                            >
                              Upload
                            </div>
                          </div>
                        </Upload>
                      </Form.Item>
                    </Form.Item>

                    {/* Upload documents button */}
                    {writingArticle.uploadingFiles.length > 0 && (
                      <Form.Item>
                        <Button
                          className="button button--main button-upload"
                          type="button"
                          onClick={handleUploadDocuments}
                        >
                          {articleLoading ? <Spinner /> : 'Upload documents'}
                        </Button>
                      </Form.Item>
                    )}
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    {/* Previous images */}
                    {writingArticle.uploadedFiles.length > 0 && (
                      <Form.Item className="article-input-group">
                        <h3 className="title">Previous uploaded images</h3>
                        <Swiper
                          slidesPerView={
                            writingArticle.uploadedFiles.length > 2 ? 3 : 1
                          }
                          spaceBetween={30}
                          pagination={{
                            clickable: true,
                          }}
                          modules={[Pagination, Navigation]}
                          className="mySwiper"
                          navigation={true}
                        >
                          {writingArticle.uploadedFiles.map((doc, index) => {
                            const url = !doc.url ? doc : doc.url;
                            return (
                              <SwiperSlide
                                style={{
                                  marginRight: 10,
                                  display: 'inline-block',
                                }}
                                key={index}
                              >
                                <Tooltip
                                  key={index}
                                  className="uploaded-item"
                                  title={
                                    <span
                                      onClick={() => {
                                        navigator.clipboard.writeText(url);
                                        message.success(
                                          'Copied url to clipboard'
                                        );
                                      }}
                                      style={{ cursor: 'pointer' }}
                                    >
                                      Click to get URL
                                    </span>
                                  }
                                >
                                  <Image src={url} />
                                </Tooltip>
                              </SwiperSlide>
                            );
                          })}
                        </Swiper>
                      </Form.Item>
                    )}
                  </Col>
                </Row>
              </Col>
              <Col xs={24} sm={24} md={5} lg={5} xl={5} className="right">
                {/* Tags */}
                <Form.Item className="article-input-group">
                  <h3 className="title">Tags</h3>
                  <Form.Item
                    name="tags"
                    rules={[
                      {
                        required: true,
                        message: 'Please input tags for your article!',
                      },
                    ]}
                  >
                    <Select
                      mode="multiple"
                      style={{
                        width: '100%',
                      }}
                      placeholder="Select one or many tags"
                      optionLabelProp="label"
                      onChange={(value) =>
                        dispatch(updateTagsWritingArticle(value))
                      }
                    >
                      {tags.map((tag, index) => (
                        <Option
                          key={index}
                          value={tag.tag_id}
                          label={tag.tag_name}
                        >
                          <div className="demo-option-label-item">
                            {tag.tag_name}
                          </div>
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Typography.Link
                    onClick={() => setIsCreateTag(true)}
                    className="create-tag-btn"
                  >
                    <AiFillTag />
                    <span>Create new tag</span>
                  </Typography.Link>
                  {isCreateTag && (
                    <div className="create-tag-container">
                      <div className="create-tag-content">
                        {/* Create new tags */}
                        <Form.Item
                          name="tag_name"
                          label="Tag name"
                          rules={[
                            {
                              required: true,
                              message: 'Please input tag!',
                            },
                          ]}
                        >
                          <Input
                            className="input"
                            placeholder="Enter your tag!"
                          />
                        </Form.Item>

                        <div className="button-container">
                          <Button
                            onClick={() => handleCreateTag()}
                            className="button button--main"
                            type="button"
                          >
                            {tagsLoading ? <Spinner /> : 'Create tag'}
                          </Button>
                          <Button
                            onClick={() => setIsCreateTag(false)}
                            className="button button--light"
                            type="button"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </Form.Item>

                {/* Types */}
                <Form.Item className="article-input-group">
                  <h3 className="title">Types</h3>
                  <Form.Item
                    className="article-input-group--select"
                    name="types"
                    rules={[
                      {
                        required: true,
                        message: 'Please input types for your article!',
                      },
                    ]}
                  >
                    <Select
                      mode="multiple"
                      style={{
                        width: '100%',
                      }}
                      placeholder="Select one or many types"
                      // defaultValue={['china']}
                      optionLabelProp="label"
                      onChange={(value) =>
                        dispatch(updateTypesWritingArticle(value))
                      }
                    >
                      {types.map((type, index) => (
                        <Option
                          key={index}
                          value={type.type_id}
                          label={type.type_name}
                        >
                          <div className="demo-option-label-item">
                            {type.type_name}
                          </div>
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <p className="note">
                    Select variety of types for the article
                  </p>
                </Form.Item>

                {/* Thumbnail */}
                <Form.Item
                  className="article-input-group"
                  valuePropName="fileList"
                >
                  <h3 className="title">
                    Thumbnail - {JSON.stringify(oldImage, null, 2)}
                  </h3>
                  <Form.Item name="thumbnail">
                    <Upload
                      className="upload-thumbnail-container"
                      onRemove={() => {
                        dispatch(deleteThumbnailWritingArticle());
                      }}
                      beforeUpload={(file) => {
                        // Fake sending document to action props succesfully
                        if (mode === 'update') {
                          setOldImage(true);
                        }
                        file.status = 'done';
                        const reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = (event) => {
                          file.url = event.target.result;
                          file.title = file.name;
                          dispatch(updateThumbnailWritingArticle(file));
                        };
                        return false;
                      }}
                      listType="picture-card"
                      fileList={writingArticle.image}
                      onPreview={handlePreview}
                    >
                      <div>
                        <PlusOutlined />
                        <div
                          style={{
                            marginTop: 8,
                          }}
                        >
                          Upload
                        </div>
                      </div>
                    </Upload>
                  </Form.Item>
                </Form.Item>

                {/* Preview and button */}
                <Form.Item className="article-input-group">
                  <h3 className="title">Add the article</h3>
                  <div className="info-container">
                    <div className="item">
                      <SiStatuspal className="icon" />
                      <p className="text">
                        <span>
                          Status: <strong>Draft</strong>
                        </span>
                        <span className="edit-btn">Edit</span>
                      </p>
                    </div>
                    <div className="item">
                      <FaRegEye className="icon" />
                      <p className="text">
                        <span>
                          Privacy: <strong>Public</strong>
                        </span>
                        <span className="edit-btn">Edit</span>
                      </p>
                    </div>
                  </div>
                  <div className="submit-container">
                    <div className="submit-content">
                      <Button className="button button--main" type="submit">
                        {articleLoading ? (
                          <Spinner />
                        ) : (
                          `${mode === 'create' ? 'Add' : 'Update'}`
                        )}
                      </Button>
                      <Button
                        onClick={() => setIsPreviewArticle(true)}
                        className="button button--main"
                        type="button"
                      >
                        Preview
                      </Button>
                    </div>
                  </div>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      {/* Modal for preview thumbnail image */}
      <Modal
        className={preview.isOpen && 'active'}
        isOpen={preview.isOpen}
        renderBody={() => (
          <div className="content content-preview">
            <div className="close-btn" onClick={handleClose}>
              <IoClose className="close-icon" />
            </div>
            <h3 className="title">{preview.title}</h3>
            <img className="modal-image" src={preview.src} alt="Preivew img" />
          </div>
        )}
        onClose={handleClose}
      />

      {/* Modal for preview article */}
      <Modal
        className={isPreviewArticle && 'active'}
        isOpen={isPreviewArticle}
        renderBody={() => (
          <div className="content article-preview">
            <div className="close-btn" onClick={handleClose}>
              <IoClose className="close-icon" />
            </div>
            <h3 className="title">Article preview</h3>
            <div className="article-container">
              <div
                className="article-content view ql-editor"
                dangerouslySetInnerHTML={{ __html: writingArticle.content }}
              ></div>
            </div>
          </div>
        )}
        onClose={handleClose}
      />
    </>
  );
}
