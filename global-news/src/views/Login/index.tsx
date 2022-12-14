import { Button, Checkbox, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';
import styles from './index.module.scss'
import ParticlesBackground from './ParticlesBackground'
import { login } from '../../api/user';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/Auth/hooks/useAuth';

export default function Login() {
  const navigate = useNavigate()
  const { handleLogin } = useAuth()

  const onFinish = (values: any) => {
    console.log('Success:', values);
    handleLogin!(values.username, values.password)
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className={styles.loginPage}>
      <ParticlesBackground></ParticlesBackground>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <h1>全球新闻发布管理系统</h1>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />}
            autoComplete="new-password" placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            autoComplete="new-password"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className={styles.loginBtn}>
            登 录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
