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
			this.setState({
				user_group: res.user_group
			})
		})
	}

	_click(e){
		this.props.Router(e.key)
	}

	_siderList(){
		let LoginType = 'server'
		appData._Storage('get',"LoginType",(res)=>{
			LoginType = res
		})

		if(LoginType == "cloude"){
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
					<Menu.Item key="coordinate"><Icon type="close-circle-o"/>定位</Menu.Item>

					<SubMenu key = "card_management" title={<span><Icon type="credit-card" /><span>卡片管理</span></span>}>
						<Menu.Item key="QRCode_list"><Icon type="barcode" />电子钥匙</Menu.Item>
						<Menu.Item key="QRcode_record"><Icon type="user" />电子钥匙分享记录</Menu.Item>
					</SubMenu>

						<SubMenu key = "operation" title={<span><Icon type="appstore" /><span>米社运维</span></span>}>
							<Menu.Item key="activity_list"><Icon type="star-o" />活动管理</Menu.Item>
							<Menu.Item key="accumulate_list"><Icon type="heart-o" />积分管理</Menu.Item>
							<Menu.Item key="volunteer_list"><Icon type="user" />志愿者管理</Menu.Item>
					</SubMenu> 
					<Menu.Item key="cancel"><Icon type="close-circle-o"/>注销</Menu.Item>
				</Menu>
			)
		} else if(LoginType == "server") {
			return (
				<Menu
					mode="inline"
					collapsible = 'true'
					theme = 'dark'
					defaultSelectedKeys={['IC_cards_resident_list']}
					defaultOpenKeys={['card_management']}
					style={{ height: '100%',borderRight: 0 }}
					onSelect = {this._click.bind(this)}
				>

					<Menu.Item key="five_list"><Icon type="star-o" />五违管理</Menu.Item>
					<Menu.Item key="civilization_list"><Icon type="star-o" />文明管理</Menu.Item>
					<Menu.Item key="report_list"><Icon type="star-o" />报警汇总</Menu.Item>

					<SubMenu key = "IO" title={<span><Icon type="credit-card" /><span>出入管理</span></span>}>
						<Menu.Item key="IOcount_list"><Icon type="key" />实时记录</Menu.Item>
						<Menu.Item key="IOstatistic_list"><Icon type="key" />统计记录</Menu.Item>
					</SubMenu>
					
					<SubMenu key = "patrol" title={<span><Icon type="credit-card" /><span>巡更管理</span></span>}>
						<Menu.Item key="patrolPlan_list"><Icon type="key" />巡更计划</Menu.Item>
						<Menu.Item key="patrol_list"><Icon type="key" />巡更记录</Menu.Item>
					</SubMenu>

					<SubMenu key = "card_management" title={<span><Icon type="credit-card" /><span>卡片管理</span></span>}>
						<Menu.Item key="IC_cards_resident_list"><Icon type="barcode" />居民IC卡</Menu.Item>
						<Menu.Item key="IC_cards_patrol_list"><Icon type="barcode" />巡更IC卡</Menu.Item>
					</SubMenu>

					<SubMenu key = "resident" title={<span><Icon type="database" /><span>用户管理</span></span>}>
						<Menu.Item key="platform_user_list"><Icon type="smile-o" />平台用户管理</Menu.Item>
						<Menu.Item key="community_resident_list"><Icon type="usergroup-add" />社区居民管理</Menu.Item>
						<Menu.Item key="patrol_user_list"><Icon type="usergroup-add" />巡更用户管理</Menu.Item>
					</SubMenu>

					<SubMenu key = "system" title={<span><Icon type="tool" /><span>系统功能</span></span>}>
						<Menu.Item key="device_online_list"><Icon type="shake" />设备在线情况</Menu.Item>
						{/* <Menu.Item key="white_list"><Icon type="solution" />设备白名单</Menu.Item> */}
						<Menu.Item key="root_group_list"><Icon type="fork" />权限常用组</Menu.Item>
						{/* <Menu.Item key="device_root_list"><Icon type="setting" />权限管理</Menu.Item> */}
					</SubMenu>

					<Menu.Item key="cancel"><Icon type="close-circle-o"/>注销</Menu.Item>
				</Menu>
			)
		}  else {
			return null
		}
	}

	render(){
		return this._siderList()
	}
}