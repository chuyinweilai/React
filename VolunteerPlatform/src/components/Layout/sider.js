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
						<Menu.Item key="cancel"><Icon type="home"/>注销</Menu.Item>
				</Menu>
			// </Sider>
		)
	}
}