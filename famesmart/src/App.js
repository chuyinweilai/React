import React, { Component } from 'react';
import './App.css';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Header, Content, Sider } = Layout;

class App extends Component {
  render() {
    return ( 
	<Layout>
		<Header className="header" >
		<div className="logo"/>
		<Menu
			theme="dark"
			mode="horizontal"
			defaultSelectedKeys={['2']}
			style={{ lineHeight: '64px' }}
		>
			<Menu.Item key="1">nav 1</Menu.Item>
			<Menu.Item key="2">nav 2</Menu.Item>
			<Menu.Item key="3">nav 3</Menu.Item>
			<Menu.Item key="4">nav 3</Menu.Item>
		</Menu>
		</Header>
    <Layout>
      <Sider width={200} style={{ background: '#fff' }}
			>
        <Menu
          mode="inline"
		  collapsible = 'true'
		  theme = 'dark'
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%',borderRight: 0 }}
        >
            <Menu.Item key="1">option1</Menu.Item>
            <Menu.Item key="2">option2</Menu.Item>
            <Menu.Item key="3">option3</Menu.Item>
            <Menu.Item key="4">option4</Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '12px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
          Content
        </Content>
      </Layout>
    </Layout>
  </Layout>
    );
  }
}
export default App;
