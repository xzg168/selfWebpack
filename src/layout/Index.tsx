import React, { useState } from 'react';
import { Layout } from 'antd';
import Main from './Main';
import LeftNav from './LeftNav';
import HeaderNav from './HeaderNav';
import './layout.css';
export default function Index() {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout>
      <LeftNav collapsed={collapsed} />
      <Layout>
        <HeaderNav toggle={toggle} collapsed={collapsed} />
        <Main />
      </Layout>
    </Layout>
  );
}
