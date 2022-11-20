import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Image, PageHeader, Table } from 'antd';

import Button from '../../../components/Button';
import Spinner from '../../../components/Spinner';
import {
  fetchMedicalRecord,
  selectMedicalRecordIsLoading,
  selectMedicalRecordNeedUpdate,
} from '../../../store/slices/medicalRecordsSlice';

export default function MedicalRecordDetail() {
  const { record_id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const medicalRecordNeedUpdate = useSelector(selectMedicalRecordNeedUpdate);
  const { medical_record, images, prescriptions } = medicalRecordNeedUpdate;
  const isLoading = useSelector(selectMedicalRecordIsLoading);

  useEffect(() => {
    dispatch(fetchMedicalRecord(record_id));
  }, [dispatch, record_id]);

  const productColumns = [
    {
      title: 'Product Name',
      key: 'product_name',
      dataIndex: 'product_name',
    },
    {
      title: 'Quantity',
      key: 'quantity',
      dataIndex: 'quantity',
    },
    {
      title: 'Description',
      key: 'description',
      dataIndex: 'description',
    },
  ];

  return (
    <>
      {Object.keys(medicalRecordNeedUpdate).length > 0 ? (
        <>
          <PageHeader
            className="site-page-header"
            onBack={() => navigate(-1)}
            title={'Medical Record'}
          />

          <div className="clinic-detail-content">
            {/* Medical Record Detail */}
            <div className="medical-detail-container info-list">
              <div className="title-container">
                <h3 className="title">Medical Record Information</h3>
              </div>
              <div className="info-list">
                <div className="info-item">
                  <span className="info-title">Patient Name: </span>
                  <span className="info-text">
                    {medical_record.patient_name}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-title">Email: </span>
                  <span className="info-text">{medical_record.email}</span>
                </div>
                <div className="info-item">
                  <span className="info-title">Age: </span>
                  <span className="info-text">{medical_record.age}</span>
                </div>
                <div className="info-item">
                  <span className="info-title">Address: </span>
                  <span className="info-text">
                    {medical_record.patient_address}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-title">Diagnose: </span>
                  <span className="info-text">{medical_record.diagnose}</span>
                </div>
                <div className="info-item">
                  <span className="info-title">Disease Progression: </span>
                  <span className="info-text">
                    {medical_record.disease_progression}
                  </span>
                </div>
              </div>
            </div>

            {/* Document */}
            <div className="medical-detail-container document-list">
              <div className="title-container">
                <h3 className="title">Documents</h3>
                <Button className="button button--main">
                  <span>Download All</span>
                </Button>
              </div>
              <Image.PreviewGroup className="document-list">
                {images.map((item, index) => (
                  <Image width={200} key={index} src={item.url} />
                ))}
              </Image.PreviewGroup>
            </div>

            <div className="medical-detail-container prescription-list">
              <div className="title-container">
                <h3 className="title">Prescription</h3>
              </div>
              {/* Prescription */}
              <div className="prescription">
                <Table
                  className="medical-record-table"
                  x={true}
                  loading={isLoading}
                  scroll={{ x: 300 }}
                  pagination={{
                    position: ['bottomCenter'],
                  }}
                  columns={productColumns}
                  dataSource={prescriptions}
                  rowKey={(record) => record.prescription_id}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="medical-detail-container loading">
          <Spinner />
          <p style={{ marginBottom: 40 }} className="text-loading">
            Loading ...
          </p>
        </div>
      )}
    </>
  );
}
