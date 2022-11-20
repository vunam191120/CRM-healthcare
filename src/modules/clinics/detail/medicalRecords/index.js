import { Table } from 'antd';
import React, { useEffect } from 'react';
import { ImEye } from 'react-icons/im';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Tag from '../../../../components/Tag';
import { formatDateAndTime } from '../../../../helpers/formatDate';
import {
  fetchMedicalRecordByClinic,
  selectMedicalRecordIsLoading,
  selectMedicalRecords,
} from '../../../../store/slices/medicalRecordsSlice';

export default function ClinicMedicalRecords() {
  const dispatch = useDispatch();
  const { clinic_id } = useParams();
  const medicalRecordLoading = useSelector(selectMedicalRecordIsLoading);
  const medicalRecords = useSelector(selectMedicalRecords);

  const medicalRecordColumns = [
    {
      title: 'ID',
      key: 'id',
      dataIndex: 'record_id',
    },
    // {
    //   title: 'Address',
    //   key: 'patient_address',
    //   dataIndex: 'patient_address',
    // },
    {
      title: 'Created date',
      key: 'created date',
      render: (record) => formatDateAndTime(record.created_date),
    },
    {
      title: 'Status',
      key: 'status',
      render: (record) => <Tag status={record.status} />,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record) => (
        <div className="button-container">
          <Link
            to={`/medical-record/detail/${record.record_id}`}
            className="button button--view"
          >
            <ImEye className="icon" />
            <span>View</span>
          </Link>
        </div>
      ),
    },
  ];

  useEffect(() => {
    dispatch(fetchMedicalRecordByClinic(clinic_id));
  }, [clinic_id, dispatch]);

  return (
    <>
      <Table
        className="medical-record-table"
        x={true}
        loading={medicalRecordLoading}
        scroll={{ x: 300 }}
        pagination={{
          position: ['bottomCenter'],
        }}
        columns={medicalRecordColumns}
        dataSource={medicalRecords}
        rowKey={(record) => record.record_id}
      />
    </>
  );
}
