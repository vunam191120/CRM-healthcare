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
} from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { SiStatuspal } from 'react-icons/si';
import { FaRegEye } from 'react-icons/fa';
import { AiFillTag } from 'react-icons/ai';

import QuillEditor from '../../../components/QuillEditor/QuillEditor';
import {
  createTag,
  fetchTags,
  selectTags,
  selectTagsLoading,
} from '../../../store/slices/tagsSlice';
import { fetchTypes, selectTypes } from '../../../store/slices/typesSlice';
import {
  selectArticleNeedUpdate,
  selectArticlesLoading,
} from '../../../store/slices/articlesSlice';
import Button from '../../../components/Button';
import Spinner from '../../../components/Spinner';

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
  const [isCreateTag, setIsCreateTag] = useState(false);
  const [content, setContent] = useState('');
  const tags = useSelector(selectTags);
  const types = useSelector(selectTypes);
  const [oldImage, setOldImage] = useState(false);
  const [preview, setPreview] = useState({
    isOpen: false,
    title: '',
    src: '',
  });
  const [documents, setDocuments] = useState([]);
  const articleLoading = useSelector(selectArticlesLoading);
  const tagsLoading = useSelector(selectTagsLoading);
  const articleNeedUpdate = useSelector(selectArticleNeedUpdate);

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTypes());
  }, [dispatch]);

  const handleChangeContent = useCallback(() => {
    return setContent;
  }, []);

  const handleSubmit = () => {};

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

  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={() => navigate('/articles')}
        title={'Add new article'}
      />
      <div className="article-input-container">
        <Form
          className="articleForm"
          {...formItemLayout}
          form={form}
          onFinish={handleSubmit}
          name="articles"
          scrollToFirstError
        >
          <Row>
            <Col xs={24} sm={24} md={18} lg={18} xl={18} className="left">
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
                  <Input className="input" placeholder="Enter your title!" />
                </Form.Item>
              </Form.Item>

              {/* Content */}
              <Form.Item className="article-input-group">
                <h3 className="title">Content</h3>
                <Form.Item>
                  <QuillEditor
                    content={content}
                    setContent={handleChangeContent}
                  />
                </Form.Item>
              </Form.Item>

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
                  />
                </Form.Item>
              </Form.Item>

              <Row>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  {/* Documents */}
                  <Form.Item>
                    <h3 className="title-upload">Documents</h3>
                    <Form.Item valuePropName="fileList">
                      <Upload
                        multiple
                        onRemove={(file) => {
                          if (mode === 'create') {
                            const index = documents.indexOf(file);
                            const newDocuments = documents.slice();
                            newDocuments.splice(index, 1);
                            setDocuments(newDocuments);
                          } else {
                            // dispatch(deleteImage(file));
                          }
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
                            // if (mode === 'update') {
                            //   setAvatar([file]);
                            //   dispatch(changeUserNeedUpdateAvatar(file));
                            // }
                            setDocuments((oldFile) => [...oldFile, file]);
                          };
                          return false;
                        }}
                        listType="picture-card"
                        fileList={
                          mode === 'update'
                            ? articleNeedUpdate.documents
                            : documents
                        }
                        // onPreview={handlePreview}
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
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  {/* Previews */}
                  <Form.Item>
                    <h3 className="title-preview">Uploaded and Preview</h3>
                    <Form.Item name="preview">
                      <Image.PreviewGroup>
                        {/* <Image
                          width={104}
                          src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
                        /> */}
                      </Image.PreviewGroup>
                    </Form.Item>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col xs={24} sm={24} md={6} lg={6} xl={6} className="right">
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
                    // defaultValue={['china']}
                    optionLabelProp="label"
                  >
                    {tags.map((tag, index) => (
                      <Option
                        key={index}
                        value={tag.tag_name}
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
                  >
                    {types.map((type, index) => (
                      <Option
                        key={index}
                        value={type.type_name}
                        label={type.type_name}
                      >
                        <div className="demo-option-label-item">
                          {type.type_name}
                        </div>
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <p className="note">Select variety of types for the article</p>
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
                        `${
                          mode === 'create' ? 'Add article' : 'Update article'
                        }`
                      )}
                    </Button>
                    <Button className="button button--main" type="submit">
                      Preview
                    </Button>
                  </div>
                </div>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
}
