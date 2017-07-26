import React,{Component} from 'react';
import {Layout, Menu, Breadcrumb, Icon} from 'antd'

const { Header } = Layout;

export default class headers extends Component{
	render(){
		return (
		<Header className="header" >
				<div className="logo"/>
				<div style={{color: 'white', fontSize: 34}}>上海凡米</div>
			<Menu
				theme="dark"
				mode="horizontal"
				defaultSelectedKeys={['2']}
				style={{ lineHeight: '64px' }}
			>
				{/* <Menu.Item key="1">nav 1</Menu.Item>
				<Menu.Item key="2">nav 2</Menu.Item>
				<Menu.Item key="3">nav 3</Menu.Item>
				<Menu.Item key="4">nav 3</Menu.Item> */}
			</Menu>
		</Header>
		)
	}
}