import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Button } from 'antd';

import Input from '../../components/Input';
import loginBg from './../../assets/img/loginBg.png';
import Spinner from '../../components/Spinner';
import {
  login,
  selectUsersError,
  selectUsersLoading,
} from '../../store/slices/usersSlice';

export default function LoginForm() {
  const [account, setAccount] = useState({
    username: '',
    password: '',
  });
  const error = useSelector(selectUsersError);
  const isLoading = useSelector(selectUsersLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('currentUser'))) {
      navigate('/');
    }
  }, []);

  const handleChange = (e) => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    dispatch(login({ username: account.username, password: account.password }));
  };

  return (
    <section className="login-container">
      <Row className="login-row">
        <Col md={20} xl={14}>
          <img className="login__img" src={loginBg} alt="login img" />
        </Col>
        <Col md={4} xl={10}>
          <form className="login-content">
            <h1>HealthCare</h1>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta
              nobis in repellat, animi quibusdam. Beatae, doloribus.
            </p>
            <div className="input-group">
              <Input
                id="username"
                type="username"
                name="username"
                required
                className="input-form"
                placeholder="Username"
                onChange={handleChange}
                value={account.username}
              />
            </div>
            <div className="input-group">
              <Input
                id="password"
                type="password"
                name="password"
                required
                className="input-form"
                placeholder="Password"
                onChange={handleChange}
                value={account.password}
              />
            </div>
            <p className="login-error">{error}</p>
            <Button
              size="large"
              className="login-btn"
              type="submit"
              onClick={handleSubmit}
            >
              {isLoading ? <Spinner /> : 'Login'}
            </Button>
          </form>
        </Col>
      </Row>
    </section>
  );
}
