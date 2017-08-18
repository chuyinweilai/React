/**
 * React Native for Web Starter App
 * https://github.com/grabcode/react-native-web-starter
 * Follow me https://twitter.com/grabthecode
 */

import React, { Component } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity
} from 'react-native';

const Accumulate = require('./Accumulate');
//积分 子页面
const Accumulate_Ruler = require('./../Subpages/accumulate_ruler');
const Accumulate_Join = require('./../Subpages/accumulate_join');
const Accumulate_Active = require('./../Subpages/accumulate_active');
const Accumulate_Exchange = require('./../Subpages/accumulate_exchange');
const Accumulate_Goods_Details = require('./../Subpages/accumulate_goods_details');
const Accumulate_Details = require('./../Subpages/accumulate_details');
const Accumulate_History = require('./../Subpages/accumulate_history');
const Accumulate_Regist = require('./../Subpages/accumulate_regist');
const Accumulate_More_activity = require('./../Subpages/accumulate_more_activity');


const pxToDp =require('../responsive/px');

export default class routers extends Component {
	constructor() {
		super();
		this.state={
			_Pctrl: true,
		}
		this.nowPage = 'Accumulate';
		this.HomeRouterPage = ''
		this.sendMess;
	}

	componentDidMount(){
		let data = new Date();
	}
	//页面切换
	showPage(){
		if(this.state._Pctrl){
			return(
				<View style={{flex: 1}}>
					<Accumulate  backCtrl={(bol,message) => this._RouterCtrl(bol,message)}/>
				</View>
			)
		} else {
			const name = this.HomeRouterPage;
			if(name == 'Accumulate') return <Accumulate  backCtrl={(bol,message) => this._RouterCtrl(bol,message)}/>
			//志愿者--规则
			if(name == 'accumulate_ruler') {return <Accumulate_Ruler backCtrl={(bol,message) => this._RouterCtrl(bol,message)}/>} 
			//志愿者--注册
			else if(name == 'accumulate_regist') {return <Accumulate_Regist backCtrl={(bol,message) => this._RouterCtrl(bol,message)}/>} 
			//志愿者--我的参与
			else if(name == 'accumulate_join') {return <Accumulate_Join mess={this.sendMess}  backCtrl={(bol,message) => this._RouterCtrl(bol,message)}/>} 
			//志愿者--往期活动
			else if(name == 'accumulate_active') {return <Accumulate_Active backCtrl={(bol,message) => this._RouterCtrl(bol,message)}/>} 
			//志愿者--积分兑换
			else if(name == 'accumulate_exchange') {return <Accumulate_Exchange backCtrl={(bol,message) => this._RouterCtrl(bol,message)}/>} 
			//志愿者--兑换详情
			else if(name == 'accumulate_goods_details') {return <Accumulate_Goods_Details mess={this.sendMess} backCtrl={(bol,message) => this._RouterCtrl(bol,message)}/>}
			//志愿者--活动详情
			else if(name == 'accumulate_details'){return <Accumulate_Details mess={this.sendMess}  backCtrl={(bol,message) => this._RouterCtrl(bol,message)} mess={this.sendMess}/>}
			//志愿者--活动历史
			else if(name == 'accumulate_history'){return <Accumulate_History mess={this.sendMess}  backCtrl={(bol,message) => this._RouterCtrl(bol,message)}/>}
			//志愿者--最新活动
			else if(name == 'accumulate_more_activity'){return <Accumulate_More_activity mess={this.sendMess}  backCtrl={(bol,message) => this._RouterCtrl(bol,message)}/>}
		}
	}
	
	//路由控制
	_RouterCtrl(control, data){
		if(control){
			this.HomeRouterPage = control;
			this.setState({
				_Pctrl: false,
			})
			this.sendMess = data
		}else {
			this.setState({
				_Pctrl: true,
			})
			this.sendMess = data
		}
	}

	render() {
		return (
		<View style={styles.container}>
			{this.showPage()}
		</View>
		);
	}	
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: '#F5FCFF'
	},
	Icon: {
		width:pxToDp(70), 
		height: pxToDp(110),
	},
	content: {
		flex:1, 
		borderBottomColor:'#4b4b4b', 
		borderBottomWidth:1
	},
	touchableBox:{
		borderTopColor:'#9a9a9a', 
		borderTopWidth:1, 
		height:pxToDp(130), 
		flexDirection: 'row',
		backgroundColor:'white',
		overflow:'hidden',
	},
	touchable: {
		flex: 1, 
		alignItems:'center', 
		justifyContent:'center',
		borderRightColor:'#4b4b4b',
		borderRightWidth:pxToDp(1), 
		paddingTop:pxToDp(10)
	},
	touchableText:{
		width: pxToDp(75),
		height: pxToDp(26),
		marginTop:pxToDp(10)
	}
});

module.exports = routers;