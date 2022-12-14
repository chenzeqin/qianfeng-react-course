import React from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Layout, Menu, Avatar, Dropdown } from 'antd';
import type { MenuProps } from 'antd'
import { logout } from '../utils/auth';
import { User } from '../views/User/type';
import { useAuth } from '../components/Auth/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
const { Header } = Layout;

interface HeaderProps {
  collapsed: boolean,
  setCollapsed: (collapsed: boolean) => void
}

export default function AppHeader(props: HeaderProps) {
  const navigate = useNavigate()
  const { collapsed, setCollapsed } = props
  const jsonStr = localStorage.getItem('user')

  let user: Partial<User> = {
    username: '',
  }
  if (jsonStr) user = JSON.parse(jsonStr)

  const { token, handleLogout } = useAuth()
  const handleClick: MenuProps['onClick'] = ({ item, key, keyPath, domEvent }) => {
    console.log(item, key, keyPath, domEvent)
    if (key === '1') {
      navigate('/profile')
    }
    if (key === '2') {
      if (token) handleLogout!()
    }
  }
  const menu = (
    <Menu onClick={handleClick} items={[
      {
        key: '1',
        label: user.username || '未登录',
        disabled: !user.id
      },
      {
        key: '2',
        label: '退出',
        danger: true
      },
    ]}>
    </Menu>
  );
  return (
    <Header>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: () => setCollapsed(!collapsed),
      })}
      <div className="profile">
        <span>{user.username ? `欢迎 ${user.username}` : `请登录`}</span>
        <Dropdown overlay={menu}>
          <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
          {/* <Avatar src="https://joeschmoe.io/api/v1/random" /> */}
        </Dropdown>
      </div>
    </Header >
  )
}
