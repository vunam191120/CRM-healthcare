import { PageHeader } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import QuillEditor from '../../../components/QuillEditor/QuillEditor';

export default function ArticleForm({ mode }) {
  const navigate = useNavigate();
  return (
    <>
      <PageHeader
        className="site-page-header"
        onBack={() => navigate('/')}
        title={'Create article'}
      />
      <QuillEditor />
    </>
  );
}
