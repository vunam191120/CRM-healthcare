import React, { useEffect } from 'react';
import { GiPerson } from 'react-icons/gi';
import { MdPayment } from 'react-icons/md';
import { Col, Row, Select, Table } from 'antd';
import { BsCalendar2Date } from 'react-icons/bs';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

import DashboardCard from '../DashboardCard';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchPayments,
  selectPayments,
  selectPaymentsIsLoading,
} from '../../store/slices/paymentsSlice';
import { formatDateAndTime } from '../../helpers/formatDate';
import { Link } from 'react-router-dom';
import { ImEye } from 'react-icons/im';
import { BiExport, BiPencil } from 'react-icons/bi';
import {
  fetchCount,
  fetchSaleChart,
  fetchSalePie,
  selectDashboardChartIncome,
  selectDashboardCount,
  selectDashboardPieStatus,
  selectDashboardPieType,
} from '../../store/slices/dashboardSlice';
import getCurrentUser from '../../helpers/getCurrentUser';
const { Option } = Select;

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
  name,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function DashboardSale() {
  const dispatch = useDispatch();
  const currentUser = getCurrentUser();
  const paymentLoading = useSelector(selectPaymentsIsLoading);
  const dashboardCount = useSelector(selectDashboardCount);
  const chartIncome = useSelector(selectDashboardChartIncome);
  const pieStatus = useSelector(selectDashboardPieStatus);
  const pieType = useSelector(selectDashboardPieType);
  const payments = useSelector(selectPayments);

  useEffect(() => {
    dispatch(fetchPayments(11));
  }, [dispatch]);

  // Get total
  useEffect(() => {
    dispatch(fetchCount(currentUser.role_id));
  }, [currentUser.role_id, dispatch]);

  // Get chart
  useEffect(() => {
    dispatch(fetchSaleChart());
  }, [dispatch]);

  // Get pie
  useEffect(() => {
    dispatch(fetchSalePie());
  }, [dispatch]);

  const paymentColumns = [
    {
      title: 'ID',
      key: 'id',
      dataIndex: 'payment_id',
    },
    {
      title: 'Patient ID',
      key: 'patient id',
      render: (record) => (
        <Link to={`/patients/detail/${record.patient_id}`}>
          {record.patient_id}
        </Link>
      ),
    },
    {
      title: 'Created date',
      key: 'created date',
      render: (record) => formatDateAndTime(record.created_date),
    },
    {
      title: 'Amount',
      key: 'amount',
      dataIndex: 'amount',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
    },
    {
      title: 'Paid on',
      key: 'Paid on',
      dataIndex: 'paid_on',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record, index) => (
        <div className="button-container">
          <Link
            style={{ marginRight: 10 }}
            className={'button button--view'}
            to={`/clinics/detail/${11}/payments/detail/${record.payment_id}`}
          >
            <ImEye />
            <span>View</span>
          </Link>
          <Link
            className={'button button--update'}
            to={`update/${record.payment_id}`}
          >
            <BiPencil />
            <span>Update</span>
          </Link>
          <Link
            className={'button button--update'}
            style={{ marginRight: 10 }}
            onClick={() => {}}
          >
            <BiExport />
            <span>Export</span>
          </Link>
        </div>
      ),
    },
  ];

  let dataIncome;
  if (chartIncome) {
    dataIncome = chartIncome.map((item) => ({
      name: item.month.slice(0, 3),
      income: item.total,
    }));
  }

  let dataAppointmentMade;
  if (pieStatus) {
    dataAppointmentMade = pieStatus.map((item) => ({
      name: item.name,
      value: item.value,
    }));
  }

  let dataTypeAppointment;
  if (pieType) {
    dataTypeAppointment = pieType.map((item) => ({
      name: item.name,
      value: item.value,
    }));
  }

  const COLORS_APPOINTMENT_MADE = ['#d36a68', '#5b76d8', '#3cc196', '#FFBB28'];

  const COLORS_APPOINTMENT_TYPE = ['#5b76d8', '#3cc196'];

  return (
    <>
      <div className="header sale">
        <DashboardCard
          text="Total Appointments"
          num={dashboardCount.appointment}
          icon={<BsCalendar2Date className="icon" />}
        />
        <DashboardCard
          text="Total Payments"
          num={dashboardCount.payment}
          icon={<MdPayment className="icon" />}
        />
        <DashboardCard
          text="Total Patients"
          num={dashboardCount.patient}
          icon={<GiPerson className="icon" />}
        />
      </div>
      <Row className="content">
        <Col
          sm={24}
          md={14}
          lg={14}
          xl={14}
          xll={14}
          className="income-container left"
        >
          <div className="income-content">
            <div className="heading">
              <h3 className="title">Annual Income </h3>
              <Select
                className="dropdown"
                placeholder="Select year"
                defaultValue={'2022'}
              >
                <Option value={'2022'}>This Year</Option>
                <Option value={'2021'}>Last Year</Option>
                <Option value={'2020'}>Over Last Year</Option>
              </Select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={dataIncome}
                margin={{
                  top: 5,
                  right: 40,
                }}
              >
                <CartesianGrid strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="income"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Col>
        <Col
          sm={24}
          md={10}
          lg={10}
          xl={10}
          xll={10}
          className="pie-charts-appointment right"
        >
          {pieStatus && (
            <div className="pie-appointment-content">
              <div className="heading">
                <h3 className="title">Rate of appointments created </h3>
                <Select
                  className="dropdown"
                  placeholder="Select Month"
                  defaultValue={'this month'}
                >
                  <Option value={'this month'}>This Month</Option>
                  <Option value={'last month'}>Last Month</Option>
                  <Option value={'over last month'}>Over Last Month</Option>
                </Select>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={dataAppointmentMade}
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {dataAppointmentMade.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          COLORS_APPOINTMENT_MADE[
                            index % COLORS_APPOINTMENT_MADE.length
                          ]
                        }
                      />
                    ))}
                  </Pie>
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </Col>
      </Row>
      <Row className="content">
        <Col
          sm={24}
          md={12}
          lg={12}
          xl={12}
          xll={12}
          className="pie-charts-appointment"
        >
          {pieType && (
            <div className="pie-appointment-content">
              <div className="heading">
                <h3 className="title">Rate type of appointment </h3>
                <Select
                  className="dropdown"
                  placeholder="Select Month"
                  defaultValue={'this month'}
                >
                  <Option value={'this month'}>This Month</Option>
                  <Option value={'last month'}>Last Month</Option>
                  <Option value={'over last month'}>Over Last Month</Option>
                </Select>
              </div>
              <ResponsiveContainer width="100%" height={290}>
                <PieChart>
                  <Pie
                    data={dataTypeAppointment}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {dataAppointmentMade.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          COLORS_APPOINTMENT_TYPE[
                            index % COLORS_APPOINTMENT_TYPE.length
                          ]
                        }
                      />
                    ))}
                  </Pie>
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </Col>
        <Col
          sm={24}
          md={12}
          lg={12}
          xl={12}
          xll={12}
          className="payment-container right"
        >
          <div className="payment-content">
            <div className="heading">
              <h3 className="title">Payment</h3>
              <Select
                className="dropdown"
                placeholder="Select payment"
                defaultValue={'lastest'}
              >
                <Option value="lastest">Lastest Payment</Option>
                <Option value="oldest">Oldest Payment</Option>
              </Select>
            </div>
            <Table
              rowClassName="custom-row"
              x={true}
              loading={paymentLoading}
              columns={paymentColumns}
              scroll={{ x: 300 }}
              pagination={false}
              dataSource={payments.slice(0, 3)}
              rowKey={(record) => record.payment_id}
            ></Table>
          </div>
        </Col>
      </Row>
    </>
  );
}
