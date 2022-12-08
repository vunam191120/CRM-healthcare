import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RiArticleLine } from 'react-icons/ri';
import {
  AiFillTags,
  AiOutlineTwitter,
  AiFillYoutube,
  AiFillLinkedin,
} from 'react-icons/ai';
import { Col, Row, Select } from 'antd';
import { FaFacebookSquare } from 'react-icons/fa';
// import moment from 'moment';
// import { Link } from 'react-router-dom';
import { BiSupport } from 'react-icons/bi';
// import { useDispatch, useSelector } from 'react-redux';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Sector,
  BarChart,
  Bar,
} from 'recharts';
import DashboardCard from '../DashboardCard';
import getCurrentUser from '../../helpers/getCurrentUser';
import {
  fetchCount,
  fetchMarketingChart,
  selectDashboardChartView,
  selectDashboardCount,
} from '../../store/slices/dashboardSlice';

const { Option } = Select;

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`PV ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default function DashboardMarketing() {
  const dispatch = useDispatch();
  const [pieIndex, setPieIndex] = useState(0);
  const currentUser = getCurrentUser();
  const chartView = useSelector(selectDashboardChartView);
  const dashboardCount = useSelector(selectDashboardCount);

  // Get total
  useEffect(() => {
    dispatch(fetchCount(currentUser.role_id));
  }, [currentUser.role_id, dispatch]);

  // Get chart
  useEffect(() => {
    dispatch(fetchMarketingChart());
  }, [dispatch]);

  let dataTotalViewBar;
  if (chartView) {
    dataTotalViewBar = chartView.map((item) => ({
      name: item.month.slice(0, 3),
      views: item.view,
    }));
  }

  const dataSupportMade = [
    { name: 'In progress', value: 498 },
    { name: 'Cancel', value: 220 },
    { name: 'Done', value: 600 },
  ];

  const dataArticleType = [
    { name: 'Type Guide', value: 400 },
    { name: 'Type News', value: 300 },
    { name: 'Type A', value: 300 },
    { name: 'Type B', value: 200 },
  ];

  const COLORS_SUPPORT_MADE = ['#5b76d8', '#d36a68', '#3cc196'];

  const COLORS_ARTICLE_TYPE = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const onPieEnter = (_, index) => {
    setPieIndex(index);
  };

  return (
    <div className="dashboard-marketing">
      <div className="header">
        <DashboardCard
          text="Total Supports"
          num={dashboardCount.support}
          icon={<BiSupport className="icon" />}
        />
        <DashboardCard
          text="Total Articles by type"
          num={dashboardCount.type}
          icon={<RiArticleLine className="icon" />}
        />
        <DashboardCard
          text="Total Articles by tag"
          num={dashboardCount.tag}
          icon={<AiFillTags className="icon" />}
        />
        <DashboardCard
          text="Total Articles"
          num={dashboardCount.article}
          icon={<RiArticleLine className="icon" />}
        />
      </div>
      <Row className="content">
        <Col
          sm={24}
          md={14}
          lg={14}
          xl={14}
          xll={14}
          className="support-container left"
        >
          {chartView && (
            <div className="support-content">
              <div className="heading">
                <h3 className="title">Articles visits by month</h3>
                <Select
                  className="dropdown"
                  placeholder="Select month"
                  defaultValue={'this month'}
                >
                  <Option value={'this month'}>This Month</Option>
                  <Option value={'last month'}>Last Month</Option>
                  <Option value={'over last month'}>Over Last Month</Option>
                </Select>
              </div>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart
                  data={dataTotalViewBar}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="views" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </Col>
        <Col
          sm={24}
          md={10}
          lg={10}
          xl={10}
          xll={10}
          className="support-container right"
        >
          <div className="support-content">
            <div className="heading">
              <h3 className="title">Rate of supports </h3>
              <Select
                className="dropdown"
                placeholder="Select month"
                defaultValue={'this month'}
              >
                <Option value={'this month'}>This Month</Option>
                <Option value={'last month'}>Last Month</Option>
                <Option value={'over last month'}>Over Last Month</Option>
              </Select>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  activeIndex={pieIndex}
                  activeShape={renderActiveShape}
                  data={dataArticleType}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  onMouseEnter={onPieEnter}
                >
                  {dataArticleType.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        COLORS_ARTICLE_TYPE[index % COLORS_ARTICLE_TYPE.length]
                      }
                    />
                  ))}
                </Pie>
                <Legend
                  style={{
                    marginTop: 30,
                  }}
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Col>
      </Row>

      <Row className="content">
        <Col
          sm={24}
          md={14}
          lg={14}
          xl={14}
          xll={14}
          className="support-container left"
        >
          <div className="support-content">
            <div className="heading">
              <h3 className="title">Rate of supports </h3>
              <Select
                className="dropdown"
                placeholder="Select month"
                defaultValue={'this month'}
              >
                <Option value={'this month'}>This Month</Option>
                <Option value={'last month'}>Last Month</Option>
                <Option value={'over last month'}>Over Last Month</Option>
              </Select>
            </div>
            <ResponsiveContainer width="100%" height={306}>
              <PieChart>
                <Pie
                  data={dataSupportMade}
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {dataSupportMade.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        COLORS_SUPPORT_MADE[index % COLORS_SUPPORT_MADE.length]
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
        </Col>
        <Col
          sm={24}
          md={10}
          lg={10}
          xl={10}
          xll={10}
          className="social-container right"
        >
          <div className="social-content">
            <div className="heading">
              <h3 className="title">Top Social Media Channel</h3>
            </div>
            <div className="social-list">
              <div className="social-item">
                <FaFacebookSquare className="icon facebook" />
                <div className="info">
                  <p className="num">26.000</p>
                  <p className="text">Likes</p>
                </div>
              </div>
              <div className="social-item">
                <AiOutlineTwitter className="icon twitter" />
                <div className="info">
                  <p className="num">6.460</p>
                  <p className="text">Followers</p>
                </div>
              </div>
              <div className="social-item">
                <AiFillYoutube className="icon youtube" />
                <div className="info">
                  <p className="num">13.911</p>
                  <p className="text">Subscribers</p>
                </div>
              </div>
              <div className="social-item">
                <AiFillLinkedin className="icon linkedin" />
                <div className="info">
                  <p className="num">2.385</p>
                  <p className="text">Followers</p>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
