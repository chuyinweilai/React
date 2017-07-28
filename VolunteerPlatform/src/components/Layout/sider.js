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

	render(){
		return (	// <Sider width={200} style={{ background: '#fff' }}>
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
						<Menu.Item key="activity_list"><Icon type="home" />活动管理</Menu.Item>
						<Menu.Item key="accumulate_list"><Icon type="home" />积分管理</Menu.Item>
						<Menu.Item key="volunteer_list"><Icon type="home" />志愿者管理</Menu.Item>
					{/* <SubMenu key='volunteer' title={<span><Icon type="user" />志愿者活动</span>}> */}
						{/* <Menu.Item key="Volunteer_add">新增（修改）活动</Menu.Item> */}
						{/* <Menu.Item key="Volunteer_sign">活动签到</Menu.Item> */}
					{/* <SubMenu key='Accumulate' title={<span><Icon type="shake" />兑换商品</span>}> */}
						{/* <Menu.Item key="accumulate_exchange">积分兑换</Menu.Item>
						<Menu.Item key="accumulate_history">积分历史</Menu.Item> */}
					{/* </SubMenu> */}
				</Menu>
			// </Sider>
		)
	}
}