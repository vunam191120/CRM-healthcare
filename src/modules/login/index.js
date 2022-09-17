import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Form, Input } from 'antd';

import loginBg from './../../assets/img/loginBg.png';
import Button from '../../components/Button';
import Spinner from '../../components/Spinner';
import { login, selectUsersLoading } from '../../store/slices/usersSlice';
import healthCareLogo from './../../assets/img/healthCareLogo.png';

export default function LoginForm() {
  const [form] = Form.useForm();
  // const error = useSelector(selectUsersError);
  const isLoading = useSelector(selectUsersLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('currentUser'))) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = ({ email, password }) => {
    dispatch(login({ email, password }));
  };

  return (
    <section className="login-container">
      <Row className="login-row">
        <Col xs={0} sm={0} md={12} lg={12} xl={14}>
          <img className="login__img" src={loginBg} alt="login img" />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={10}>
          <Form
            className="login-content"
            form={form}
            name="login"
            onFinish={handleSubmit}
            scrollToFirstError
          >
            {/* Text */}
            <div className="login-text">
              <img
                src={healthCareLogo}
                className="login__img--mobile"
                alt="logo healthcare mobile"
              />
              <h1>HealthCare</h1>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta
                nobis in repellat, animi quibusdam. Beatae, doloribus.
              </p>
            </div>

            {/* Email */}
            <Form.Item
              name="email"
              rules={[
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ]}
            >
              <Input className="login-input" placeholder="Enter your email!" />
            </Form.Item>

            {/* Password */}
            <Form.Item
              style={{ marginTop: 10 }}
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password
                className="login-input"
                placeholder="Enter your password!"
              />
            </Form.Item>

            {/* Button */}
            <Form.Item>
              <Button className="login-btn" type="submit">
                {isLoading ? <Spinner /> : 'Login'}
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </section>
  );
}
