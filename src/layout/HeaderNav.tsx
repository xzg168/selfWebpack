import React from 'react';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Layout, Button } from 'antd';
const { Header } = Layout;

interface Props {
  toggle: () => void;
  collapsed: boolean;
}
export default function HeaderNav(props: Props) {
  const style = { fontSize: 18 };
  return (
    <Header style={{ padding: 0, background: '#fff' }}>
      <Button type="link" onClick={props.toggle}>
        {props.collapsed ? (
          <MenuUnfoldOutlined style={style} />
        ) : (
          <MenuFoldOutlined style={style} />
        )}
      </Button>
    </Header>
  );
}
