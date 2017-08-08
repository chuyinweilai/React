import React,{Component} from 'react';
import Home from './home/home'
import Login from './login/login'
import{
	Statistics_record_list,
	Realtime_record_list,
} from './IO'

import {
	Accumulate_history,
	Accumulate_list,
	Accumulate_exchange,
	Accumulate_add,
	
	Activity_add,
	Activity_list,
	Activity_sign,

	Volunteer_edit,
	Volunteer_list,
} from './operation';	

import{
	IC_cards_resident_list,
	IC_cards_resident_edit,

	IC_cards_patrol_list,
	IC_cards_patrol_edit,

	IC_cards_list,
	QRCode_list,
	
	QRcode_record,
	Unitlist_record,
} from './card_management'

import{
	Community_resident_list,
	Platform_user_list,
	Patrol_user_list,
} from './resident'

import {
	Device_online_list,
	Device_root_list,
	Root_group_list,
	White_list,
} from './system'

import Cancel from './cancel'

export default class mainPage extends Component{
	constructor(props){
		super(props);
		this.Router;
		this.mess = {};
	}
	
	componentWillMount(){
		this.Router = this.props.Router
	}

	_router(name){
		//首页
		if(name === 'home')	
			return <Home message={this.mess} Router={this.Router}/>

		//登录页面
		else if(name === 'login')	
			return <Login message={this.mess} Router={this.Router}/>

		//出入管理
		else if(name === 'statistics_record_list')	
			return <Statistics_record_list message={this.mess} Router={this.Router}/>
		else if(name === 'realtime_record_list')	
			return <Realtime_record_list message={this.mess} Router={this.Router}/>

		//卡片管理
		else if(name === 'IC_cards_resident_list')	
			return <IC_cards_resident_list message={this.mess} Router={this.Router}/>
		else if(name === 'IC_cards_resident_edit')	
			return <IC_cards_resident_edit message={this.mess} Router={this.Router}/>

		else if(name === 'IC_cards_patrol_list')	
			return <IC_cards_patrol_list message={this.mess} Router={this.Router}/>
		else if(name === 'IC_cards_patrol_edit')	
			return <IC_cards_patrol_edit message={this.mess} Router={this.Router}/>
			
		else if(name === 'QRCode_list')	
			return <QRCode_list message={this.mess} Router={this.Router}/>

		else if(name === 'QRcode_record')	
			return <QRcode_record message={this.mess} Router={this.Router}/>
		else if(name === 'unitlist_record')	
			return <Unitlist_record message={this.mess} Router={this.Router}/>

		//米社运维
		else if(name === 'accumulate_history')	
			return <Accumulate_history message={this.mess} Router={this.Router}/>
		else if(name === 'accumulate_list')	
			return <Accumulate_list message={this.mess} Router={this.Router}/>
		else if(name === 'accumulate_exchange')	
			return <Accumulate_exchange message={this.mess} Router={this.Router}/>
		else if(name === 'accumulate_add')	
			return <Accumulate_add message={this.mess} Router={this.Router}/>

		else if(name === 'activity_add')	
			return <Activity_add message={this.mess} Router={this.Router}/>
		else if(name === 'activity_list')	
			return <Activity_list message={this.mess} Router={this.Router}/>
		else if(name === 'activity_sign')	
			return <Activity_sign message={this.mess} Router={this.Router}/>

		else if(name === 'volunteer_edit')	
			return <Volunteer_edit message={this.mess} Router={this.Router}/>
		else if(name === 'volunteer_list')	
			return <Volunteer_list message={this.mess} Router={this.Router}/>

		//用户管理
		else if(name === 'platform_user_list')	
			return <Platform_user_list message={this.mess} Router={this.Router}/>
		else if(name === 'community_resident_list')	
			return <Community_resident_list message={this.mess} Router={this.Router}/>
		else if(name === 'patrol_user_list')	
			return <Patrol_user_list message={this.mess} Router={this.Router}/>

		//系统功能
		else if(name === 'device_online_list')	
			return <Device_online_list message={this.mess} Router={this.Router}/>
		else if(name === 'white_list')	
			return <White_list message={this.mess} Router={this.Router}/>
		else if(name === 'root_group_list')	
			return <Root_group_list message={this.mess} Router={this.Router}/>
		else if(name === 'device_root_list')	
			return <Device_root_list message={this.mess} Router={this.Router}/>

		//注销
		else if(name === 'cancel')	
			return <Cancel message={this.mess} Router={this.Router}/>
		else return null
	}
	render(){
		this.mess = this.props.message
		return this._router(this.mess.nextPage)
	}
}