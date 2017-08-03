import React,{Component} from 'react';
import {Layout, Menu, Icon} from 'antd'
import appData from './../../assert/Ajax';

const { Sider } = Layout;
const { SubMenu,MenuItemGroup } = Menu;

export default class siders extends Component{
	constructor(props){
		super(props);
		this.state={
			user_group: '',
		}
	}
	componentWillMount(){
		appData._Storage('get',"userMess",(res)=>{
			console.log(res.user_group)
			this.setState({
				user_group: res.user_group
			})
		})
	}

	_click(e){
		this.props.Router(e.key)
	}

	_siderList(){
		if("A" == "A"){
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
					<Menu.Item key="activity_list"><Icon type="star-o" />活动管理</Menu.Item>
					<Menu.Item key="accumulate_list"><Icon type="heart-o" />积分管理</Menu.Item>
					<Menu.Item key="volunteer_list"><Icon type="user" />志愿者管理</Menu.Item>
					<Menu.Item key="card_share"><Icon type="user" />发卡管理</Menu.Item>
					<Menu.Item key="QRcode_record"><Icon type="user" />二维码分享记录</Menu.Item>
					<Menu.Item key="cancel"><Icon type="close-circle-o"/>注销</Menu.Item>
				</Menu>
			)
		} else if(this.state.user_group == "B") {
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
					<Menu.Item key="activity_list"><Icon type="star-o" />活动管理</Menu.Item>
					<Menu.Item key="accumulate_list"><Icon type="heart-o" />积分管理</Menu.Item>
					<Menu.Item key="volunteer_list"><Icon type="user" />志愿者管理</Menu.Item>
					<Menu.Item key="QRcode_record"><Icon type="user" />二维码分享记录</Menu.Item>
					<Menu.Item key="cancel"><Icon type="close-circle-o"/>注销</Menu.Item>
				</Menu>
			)
		} else if(this.state.user_group == "C") {
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
					<Menu.Item key="activity_list"><Icon type="star-o" />活动管理</Menu.Item>
					<Menu.Item key="accumulate_list"><Icon type="heart-o" />积分管理</Menu.Item>
					<Menu.Item key="volunteer_list"><Icon type="user" />志愿者管理</Menu.Item>
					<Menu.Item key="QRcode_record"><Icon type="user" />二维码分享记录</Menu.Item>
					<Menu.Item key="cancel"><Icon type="close-circle-o"/>注销</Menu.Item>
				</Menu>
			)
		} else {
			return null
		}
	}

	render(){
		return this._siderList()
	}
}