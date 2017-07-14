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
					<Menu.Item key="home">option1</Menu.Item>
					<SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
						<Menu.Item key="2">option2</Menu.Item>
						<Menu.Item key="3">option3</Menu.Item>
						<Menu.Item key="4">option4</Menu.Item>
					</SubMenu>
					<SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
						<Menu.Item key="5">option5</Menu.Item>
						<Menu.Item key="6">option6</Menu.Item>
						<Menu.Item key="7">option7</Menu.Item>
						<Menu.Item key="8">option8</Menu.Item>
					</SubMenu>
					<SubMenu key="sub3" title={<span><Icon type="notification" />志愿者</span>}>
						<Menu.Item key="point">积分管理（列表打印）</Menu.Item>
						<Menu.Item key="active">活动发布（列表+From表单）</Menu.Item>
						{/* <Menu.Item key="11">签到</Menu.Item> */}
						<Menu.Item key="12">积分兑换</Menu.Item>
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