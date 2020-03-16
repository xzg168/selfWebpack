import React from 'react';
import { Layout, Menu, Typography } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
const { Sider } = Layout;
import logo from './images/logo.png';

interface Props {
  collapsed: boolean;
}

export default function LeftNav(props: Props) {
  return (
    <Sider trigger={null} collapsible collapsed={props.collapsed} width={240}>
      <div className="nav-header">
        <img src={logo} width="48" />
        <div className="logo-title" style={{ color: '#fff' }}>
          <Typography.Title
            level={4}
            style={{ marginBottom: '0', letterSpacing: '8px', color: '#fff' }}
          >
            某某平台
          </Typography.Title>
          <p>信息平台</p>
        </div>
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
          <UserOutlined />
          <Link to="/home">
            <span>Home</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <VideoCameraOutlined />
          <Link to="/about">
            <span>About</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <UploadOutlined />
          <span>nav 3</span>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}
