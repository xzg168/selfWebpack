import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Switch, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Home from '../pages/Home';
import About from '../pages/About';
const { Content } = Layout;

export default function Main() {
  return (
    <div className="appContent">
      <Scrollbars
        autoHide
        style={{
          background: '#ffffff',
          height: '100%',
          /* overflowY: 'auto', */
        }}
      >
        <Content>
          <Switch>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route path="/about">
              <About />
            </Route>
          </Switch>
        </Content>
      </Scrollbars>
    </div>
  );
}
