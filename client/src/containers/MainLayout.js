import React from 'react';
import PropTypes from 'prop-types';

import { Layout, Menu } from 'antd';

const { Header, Content, Footer } = Layout;

const MainLayer = props => (
  <Layout className="layout">
    <Header>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
      </Menu>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
        {props.children}
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>
      <em>Footer text</em>
    </Footer>
  </Layout>

);

MainLayer.propTypes = {
  children: PropTypes.element,
};

MainLayer.defaultProps = {
  children: <div />,
};

export default MainLayer;
