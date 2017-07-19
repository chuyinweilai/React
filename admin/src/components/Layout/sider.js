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
					<SubMenu key='volunteer' title={<span><Icon type="user" />志愿者活动</span>}>
						<Menu.Item key="Volunteer_ative">活动管理</Menu.Item>
						<Menu.Item key="Volunteer_add">新增（修改）活动</Menu.Item>
						<Menu.Item key="Volunteer_sign">活动签到</Menu.Item>
						<Menu.Item key="Volunteer_user">用户管理</Menu.Item>
					</SubMenu>
					<SubMenu key='Accumulate' title={<span><Icon type="shake" />兑换商品</span>}>
						<Menu.Item key="Accumulate_detail">积分详情</Menu.Item>
						<Menu.Item key="Accumulate_exchange">兑换商品</Menu.Item>
						<Menu.Item key="Accumulate_add">新增（修改）商品</Menu.Item>
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