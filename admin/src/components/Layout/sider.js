import React,{Component} from 'react';
import {Layout, Menu, Icon} from 'antd'

const { Sider } = Layout;
const { SubMenu,MenuItemGroup } = Menu;

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
					<Menu.Item key="home"><Icon type="home" />首页</Menu.Item>
					<Menu.Item key='infraction'><Icon type="api" />五违管理</Menu.Item>
					<Menu.Item key="civilization"><Icon type="heart-o" />文明管理</Menu.Item>
					<SubMenu key='civilbeh' title={<span><Icon type="exception" />任务分发</span>}>
					</SubMenu>
					<SubMenu key='cardrec' title={<span><Icon type='credit-card' />刷卡管理</span>}>
						<Menu.Item key="record">刷卡记录</Menu.Item>
						<Menu.Item key="patrol_ctrl">巡更管理</Menu.Item>
					</SubMenu>
					<SubMenu key='users' title={<span><Icon type="user" />用户管理</span>}>
						<Menu.Item key="guard">门禁用户表</Menu.Item>
						<Menu.Item key="patrol">巡更用户表</Menu.Item>
					</SubMenu>
					<SubMenu key='device' title={<span><Icon type="shake" />设备管理</span>}>
						<Menu.Item key="device_area">设备区域对应表</Menu.Item>
						<Menu.Item key="device_wlist">设备白名单</Menu.Item>
						<Menu.Item key="device_root">权限常用组</Menu.Item>
					</SubMenu>
					<SubMenu key='districtImg' title={<span><Icon type='global' />小区布局</span>}>
					</SubMenu>
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