import React,{Component} from 'react';
import {Layout, Menu, } from 'antd'

const { Sider } = Layout;
const { SubMenu } = Menu;

export default class siders extends Component{
	constructor(props){
		super(props);
	}
	componentWillMount(){
	}

	_click(e){
		this.props.Router(e.key)
	}

	_setMenu(){
		return (
				<Menu
					mode="inline"
					collapsible = 'true'
					theme = 'dark'
					defaultSelectedKeys={['home']}
					defaultOpenKeys={['sub1']}
					style={{ height: '100%',borderRight: 0 }}
					onSelect = {this._click.bind(this)}
				>
					<Menu.Item key="home">首页</Menu.Item>
					<Menu.Item key="2">五违管理</Menu.Item>
					<Menu.Item key="3">文明管理</Menu.Item>
					<Menu.Item key="4">发卡管理</Menu.Item>
					<Menu.Item key="5">刷卡管理</Menu.Item>
					<Menu.Item key="6">志愿者</Menu.Item>
					<Menu.Item key="7">用户管理</Menu.Item>
					<Menu.Item key="point">积分管理</Menu.Item>
					<Menu.Item key="test">test</Menu.Item>
				</Menu>
		)
	}
	render(){
		return (
			<Sider width={200} style={{ background: '#fff' }}>
					{this._setMenu()}
			</Sider>
		)
	}
}