import React, { useEffect } from 'react';
import { FaUserNurse, FaClinicMedical } from 'react-icons/fa';
import { RiNurseFill } from 'react-icons/ri';
import { GiPerson } from 'react-icons/gi';
import { Col, Row, Select, Table } from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { BiPencil } from 'react-icons/bi';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { AiFillStar } from 'react-icons/ai';

import DashboardCard from '../../components/DashboardCard';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAppointments,
  selectAppointments,
  selectAppointmentsIsLoading,
} from '../../store/slices/appointmentsSlice';
import doctor1 from '../../assets/img/doctor-avatar.jpeg';

const { Option } = Select;

export default function Dashboard() {
  const dispatch = useDispatch();
  const appointmentsLoading = useSelector(selectAppointmentsIsLoading);
  const appointments = useSelector(selectAppointments);

  useEffect(() => {
    dispatch(fetchAppointments(11));
  }, [dispatch]);

  const data = [
    {
      name: 'Jan',
      Male: 4000,
      Female: 2400,
    },
    {
      name: 'Feb',
      Male: 3000,
      Female: 1398,
    },
    {
      name: 'Mar',
      Male: 2000,
      Female: 9800,
    },
    {
      name: 'Apr',
      Male: 2780,
      Female: 3908,
    },
    {
      name: 'May',
      Male: 1890,
      Female: 4800,
    },
    {
      name: 'Jun',
      Male: 2390,
      Female: 3800,
    },
    {
      name: 'July',
      Male: 3490,
      Female: 4300,
    },
    {
      name: 'Aug',
      Male: 2390,
      Female: 3800,
    },
    {
      name: 'Sep',
      Male: 3490,
      Female: 4300,
    },
    {
      name: 'Okt',
      Male: 2390,
      Female: 3800,
    },
    {
      name: 'Nov',
      Male: 3490,
      Female: 4300,
    },
    {
      name: 'Des',
      Male: 3490,
      Female: 4300,
    },
  ];

  const dataBar = [
    {
      name: 'M',
      Male: 2000,
      Female: 2400,
    },
    {
      name: 'T',
      Male: 200,
      Female: 1200,
    },
    {
      name: 'W',
      Male: 300,
      Female: 3000,
    },
    {
      name: 'T',
      Male: 2000,
      Female: 2400,
    },
    {
      name: 'F',
      Male: 200,
      Female: 1200,
    },
    {
      name: 'S',
      Male: 300,
      Female: 3000,
    },
    {
      name: 'S',
      Male: 300,
      Female: 3000,
    },
  ];

  const appointmentColumns = [
    { title: 'Patient Name', key: 'patient name', dataIndex: 'name' },
    { title: 'Gender', key: 'gender', dataIndex: 'gender' },
    {
      title: 'Date',
      key: 'date',
      render: (record) => moment(record.created_date).format('DD-MM-YYYY'),
    },
    {
      title: 'Time',
      key: 'time',
      render: (record) => record.time,
    },
    {
      title: 'Actions',
      key: 'action',
      render: (record) => (
        <div className="button-container">
          <Link
            to={`/clinics/detail/11/appointments/update/${record.appointment_id}`}
            className={'button button--update'}
            style={{ marginRight: 10 }}
            onClick={() => {}}
          >
            <BiPencil />
            <span>Update</span>
          </Link>
        </div>
      ),
    },
  ];

  return (
    <div className="dashboard-container">
      <div className="header">
        <DashboardCard
          text="Total Doctors"
          num="120"
          icon={<FaUserNurse className="icon" />}
        />
        <DashboardCard
          text="Total Staffs"
          num="40"
          icon={<RiNurseFill className="icon" />}
        />
        <DashboardCard
          text="Total Patients"
          num="1130"
          icon={<GiPerson className="icon" />}
        />
        <DashboardCard
          text="Total Clinics"
          num="20"
          icon={<FaClinicMedical className="icon" />}
        />
      </div>
      <Row className="content">
        <Col
          sm={24}
          md={16}
          lg={16}
          xl={16}
          xll={16}
          className="patient-visit-container left"
        >
          <div className="patient-visit-content">
            <div className="heading">
              <h3 className="title">Patient Visit Online</h3>
              <Select
                className="dropdown"
                placeholder="Select year"
                defaultValue={'2022'}
              >
                <Option value={'2022'}>This Year</Option>
                <Option value={'2021'}>Last Year</Option>
                <Option value={'2010'}>Over Last Year</Option>
              </Select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={data}
                margin={{
                  top: 5,
                  right: 40,
                }}
              >
                <CartesianGrid strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="left" orientation="left" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="Male"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="Female"
                  stroke="#82ca9d"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Col>

        <Col
          sm={24}
          md={8}
          lg={8}
          xl={8}
          xll={8}
          className="patient-visit-container right"
        >
          <div className="patient-visit-content barchart">
            <div className="heading">
              <h3 className="title">Patients</h3>
              <Select
                className="dropdown"
                placeholder="Select week"
                defaultValue={'this week'}
              >
                <Option value="this week">This Week</Option>
                <Option value="last week">Last Week</Option>
                <Option value="over last week">Over Last Week</Option>
              </Select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={dataBar}
                barGap={4}
                barSize={10}
                barCategoryGap={20}
                // wrapperStyle={{
                //   paddingBottom: '30px',
                // }}
                margin={{
                  left: 10,
                  right: 10,
                }}
              >
                <CartesianGrid stroke="#eee" vertical={false} />
                <XAxis dataKey="name" />
                <Tooltip />
                <Legend
                  wrapperStyle={{
                    paddingTop: '30px',
                    paddingBottom: '20px',
                  }}
                  verticalAlign={'top'}
                  align={'right'}
                />
                <Bar dataKey="Male" fill="#8884d8" />
                <Bar dataKey="Female" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Col>
      </Row>

      <Row className="content">
        {/* Appointment */}
        <Col
          sm={24}
          md={16}
          lg={16}
          xl={16}
          xll={16}
          className="appointments-container left"
        >
          <div className="appointments-content">
            <div className="heading">
              <h3 className="title">Appointment</h3>
              <Select
                className="dropdown"
                placeholder="Select week"
                defaultValue={'lastest'}
              >
                <Option value="lastest">Lastest Appointment</Option>
                <Option value="oldest">Oldest Appointment</Option>
              </Select>
            </div>
            <Table
              rowClassName="custom-row"
              x={true}
              loading={appointmentsLoading}
              columns={appointmentColumns}
              scroll={{ x: 300 }}
              pagination={false}
              dataSource={appointments.slice(0, 3)}
              rowKey={(record) => record.appointment_id}
            ></Table>
          </div>
        </Col>

        {/* Reviews */}
        <Col
          sm={24}
          md={8}
          lg={8}
          xl={8}
          xll={8}
          className="patient-review-container right"
        >
          <div className="patient-review-content">
            <div className="heading">
              <h3 className="title">Appointment</h3>
              <Link to="" className="button button--main">
                View All
              </Link>
            </div>
            <div className="review-list">
              {Array(3)
                .fill(0)
                .map((item, index) => (
                  <div className="review-item" key={index}>
                    <img
                      alt="avatar patient"
                      className="avatar"
                      src={doctor1}
                    />
                    <div className="info">
                      <h4 className="name">Dr. Sair Naif</h4>
                      <p className="specific">Orthapedic</p>
                      <div className="star-list">
                        <AiFillStar className="icon" />
                        <AiFillStar className="icon" />
                        <AiFillStar className="icon" />
                        <AiFillStar className="icon" />
                        <AiFillStar className="icon" />
                      </div>
                    </div>
                    <p className="total-patients">150 patients</p>
                  </div>
                ))}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
