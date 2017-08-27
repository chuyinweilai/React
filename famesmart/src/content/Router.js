import React,{Component} from 'react';
import Home_1 from './home/home'
import Home_2 from './home/home2'
import Home_3 from './home/home3'
import Login from './login/login'

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
	Device_address_list,
	
	Device_root_list,
	Root_group_list,
	Root_group_edit,
	White_list,
} from './system'

//------------------------------------

import{
    IOcount_detial,
    IOcount_list,
	IOstatistic_list,
    IOhotspot_list,
} from './eecount'

import{
    Civilization_list,
} from './civilization'

import{
    Doorlock_list,
} from './doorlock'

import{
    Doorlock_userlist,
} from './doorlockusers'

import{
    Patrol_list,
    Patrol_edit,
    PatrolPlan_list,
} from './patrol'

import{
    Patrol_userlist,
} from './patrolusers'

import{
    Devarea_list,
} from './devarea'

import{
    Five_list,
} from './five'

import{
    Report_list,
} from './report'
import Cancel from './cancel'
import Coordinate from './coordinate/coordinate'
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
		if(name === 'home1')	
			return <Home_1 message={this.mess} Router={this.Router}/>
		else if(name === 'home2')	
			return <Home_2 message={this.mess} Router={this.Router}/>
		else if(name === 'home3')	
			return <Home_3 message={this.mess} Router={this.Router}/>

		//登录页面
		else if(name === 'login')	
			return <Login message={this.mess} Router={this.Router}/>

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
		else if(name === 'device_address_list')	
			return <Device_address_list message={this.mess} Router={this.Router}/>
		else if(name === 'white_list')	
			return <White_list message={this.mess} Router={this.Router}/>
		else if(name === 'root_group_list')	
			return <Root_group_list message={this.mess} Router={this.Router}/>
		else if(name === 'root_group_edit')	
			return <Root_group_edit message={this.mess} Router={this.Router}/>
		else if(name === 'device_root_list')	
			return <Device_root_list message={this.mess} Router={this.Router}/>
		
        else if(name === 'IOcount_detial')
            return <IOcount_detial message={this.mess} Router={this.Router}/>
        else if(name === 'IOcount_list')
            return <IOcount_list message={this.mess} Router={this.Router}/>
        else if(name === 'IOstatistic_list')
            return <IOstatistic_list message={this.mess} Router={this.Router}/>
        else if(name === 'IOhotspot_list')
            return <IOhotspot_list message={this.mess} Router={this.Router}/>
        else if(name === 'patrol_list')
            return <Patrol_list message={this.mess} Router={this.Router}/>
        else if(name === 'patrol_edit')
            return <Patrol_edit message={this.mess} Router={this.Router}/>
        else if(name === 'doorlock_list')
            return <Doorlock_list message={this.mess} Router={this.Router}/>
        else if(name === 'doorlock_userlist')
            return <Doorlock_userlist message={this.mess} Router={this.Router}/>
        else if(name === 'patrol_userlist')
            return <Patrol_userlist message={this.mess} Router={this.Router}/>
        else if(name === 'patrolPlan_list')
            return <PatrolPlan_list message={this.mess} Router={this.Router}/>
        else if(name === 'devarea_list')
            return <Devarea_list message={this.mess} Router={this.Router}/>
        else if(name === 'civilization_list')
            return <Civilization_list message={this.mess} Router={this.Router}/>
        else if(name === 'five_list')
            return <Five_list message={this.mess} Router={this.Router}/>
        else if(name === 'report_list')
            return <Report_list message={this.mess} Router={this.Router}/>

		//注销
		else if(name === 'cancel')	
			return <Cancel message={this.mess} Router={this.Router}/>

		//定位
		else if(name === 'coordinate')	
			return <Coordinate message={this.mess} Router={this.Router}/>
		else return null
	}
	render(){
		this.mess = this.props.message
		return this._router(this.mess.nextPage)
	}
}