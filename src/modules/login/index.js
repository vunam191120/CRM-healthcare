import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Form, Input } from 'antd';
import { IoClose } from 'react-icons/io5';
import { RiLockPasswordFill } from 'react-icons/ri';

import loginBg from './../../assets/img/loginBg.png';
import Button from '../../components/Button';
import Spinner from '../../components/Spinner';
import {
  forgotPassword,
  login,
  selectUsersLoading,
} from '../../store/slices/usersSlice';
import healthCareLogo from './../../assets/img/healthCareLogo.png';
import Modal from '../../components/Modal';

export default function LoginForm() {
  const [form] = Form.useForm();
  const [formForgot] = Form.useForm();
  const [forgotPw, setForgotPw] = useState(false);
  const isLoading = useSelector(selectUsersLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('currentUser'))) {
      navigate(-1);
    }
  }, [navigate]);

  const handleSubmit = ({ email, password }) => {
    dispatch(login({ email, password }));
  };

  const handleSubmitForgot = (values) => {
    dispatch(forgotPassword(values.email));
    handleClickClose();
  };

  const handleClickClose = () => {
    setForgotPw(false);
  };

  const renderBody = () => (
    <div className="content content--forgot">
      <div className="close-btn" onClick={handleClickClose}>
        <IoClose className="close-icon" />
      </div>
      <h3 className="title">Forgot Password</h3>
      <div className="icon-title">
        <RiLockPasswordFill />
      </div>
      <p className="message">
        Please Enter Your Email Address To Receive a Vertification Email.
      </p>
      <Form
        className="forgot-form"
        form={formForgot}
        name="forgot"
        onFinish={handleSubmitForgot}
        scrollToFirstError
      >
        {/* Forgot Email */}
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
          <Input className="forgot-input" placeholder="Enter your email!" />
        </Form.Item>

        {/* Button */}
        <Form.Item className="button-container">
          <Button className="button button--main" type="submit">
            {isLoading ? <Spinner /> : 'Send'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );

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
              <h1>MedCares</h1>
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

            {/* Forgot Password */}
            <Form.Item
              style={{ textAlign: 'right' }}
              valuePropName="checked"
              name="forgot_password"
            >
              <span
                className="forgot-pw"
                defaultChecked={false}
                onClick={() => setForgotPw(true)}
              >
                Forgot password?
              </span>
            </Form.Item>

            {/* Button */}
            <Form.Item>
              <Button className="button button--main" type="submit">
                {isLoading ? <Spinner /> : 'Login'}
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Modal
        isOpen={forgotPw}
        className={forgotPw ? 'active' : ''}
        renderBody={renderBody}
      />
    </section>
  );
}
