import React from 'react';
import { useParams } from 'react-router-dom';
import { Form, Input } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import {
  resetPassword,
  selectUsersLoading,
} from '../../store/slices/usersSlice';
import Button from '../../components/Button';
import Spinner from '../../components/Spinner';
import resetPasswordLogo from '../../assets/img/resetPaswordLogo.jpg';

export default function ResetPasswordForm() {
  const { token } = useParams();
  const { form } = Form.useForm();
  const isLoading = useSelector(selectUsersLoading);
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    dispatch(
      resetPassword({
        token,
        new_password: values.password,
        confirm_password: values.confirm,
      })
    );
  };

  return (
    <div className="reset-password__container">
      <Form
        className="reset-password__form"
        form={form}
        name="reset_password"
        onFinish={handleSubmit}
        scrollToFirstError
      >
        {/* Header */}
        <Form.Item>
          <img
            src={resetPasswordLogo}
            className="logo"
            alt="logo healthcare mobile"
          />
          <h3 className="title">Create New Password</h3>
        </Form.Item>

        {/* Password */}
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your new password!',
            },
          ]}
          hasFeedback
        >
          <Input.Password
            className="input"
            placeholder="Enter your new password!"
          />
        </Form.Item>

        {/* Confirm Password */}
        <Form.Item
          name="confirm"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error('The two passwords that you entered do not match!')
                );
              },
            }),
          ]}
        >
          <Input.Password
            className="input"
            placeholder="Confirm your password!"
          />
        </Form.Item>

        {/* Button */}
        <Form.Item>
          <Button className="button button--main" type="submit">
            {isLoading ? <Spinner /> : 'Confirm'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
