/**
 * React Native for Web Starter App
 * https://github.com/grabcode/react-native-web-starter
 * Follow me https://twitter.com/grabthecode
 */

import React, { Component } from 'react';
import {
	Text,
	View,
	Image,
  	Button,
	Switch,
	ListView,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	Dimensions
} from 'react-native';

const peruri = "http://cloudapi.famesmart.com";
const appData = require('./../../components/Ajax');
const pxToDp =require('../responsive/px');

export default class details extends Component {
	constructor(props) {
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			ds:ds,
			SwitchIsOn:false,
			text: '报名',
			color: '#d0d0d0',
			astate: true,
		};
		this.userMess = {};
		this.data = 0;
	}

	componentWillMount(){
		appData._Storage('get','userMess',(data)=>{
			let json = JSON.parse(data)
			this.userMess = json;
			let body = {
				"wx_id": json.wx_id,
				"comm_code": json.comm_code,
				"activity_no": this.props.mess.activity_no
			}
			appData._dataPost('/api/volunteer/status',body,(data) => {
				this.data = data;
				this._joinState(data)
			})
		})
	}

	_joinState(data){
		if(data == 0){
			this.setState({
				text: '取消',
				color: 'red',
				astate: false,
			})
		} else if(data == 1){
			this.setState({
				text: '取消',
				color: '#d0d0d0',
				astate: true,
			})
		} else if(data == 7){
			this.setState({
				text: '报名',
				color: '#69bdd0',
				astate: false,
			})
		}else if(data == 9 || data == 8){
			this.setState({
				text: '报名',
				color: '#d0d0d0',
				astate: true,
			})
		} 
	}

	_imageRow(rowData){
		return (
			<Image style={{width:pxToDp(342), height:pxToDp(212), margin:pxToDp(8)}} resizeMode="stretch"  source={{uri:peruri + '/storage/' + rowData}}/>
		)
	}

	_details(){
		let rowData = this.props.mess;
		let imgUri  = rowData.pic_path;
		let ss = imgUri.split(',');
		let type='';
		let title='';
		if(rowData.type == 1) {
			type='社区服务'
		} else if(rowData.type == 2) {
			type='公益活动'
		} else if(rowData.type == 3) {
			type='其他'
		} 
		return (
			<ScrollView>
				<View>
					<View style={{flexDirection:'row', alignItems:'center'}}>
						<Image style={{width: pxToDp(41), height:pxToDp(41), margin:pxToDp(16)}} source={require('./../../assets/公益活动icon@2x.png')}/>
						<Text style={{color:'#fdac41', fontSize:pxToDp(24)}}>#{type}#</Text>
						<Text style={{color:'#333', marginLeft: pxToDp(32), fontSize:pxToDp(32)}} numberOfLines={1}>{rowData.title}</Text>
					</View>

					<View>
							<Text style={{ textAlign:'justify', minHeight:pxToDp(176), paddingHorizontal:pxToDp(30), fontSize:pxToDp(24), lineHeight:pxToDp(36)}}>
							{rowData.detail}
						</Text>
						<ListView
								contentContainerStyle={{flexDirection: 'row', paddingHorizontal:pxToDp(30),  marginVertical:pxToDp(8), }}
								dataSource={this.state.ds.cloneWithRows(ss)}
								enableEmptySections = {true}
								renderRow = {this._imageRow.bind(this)}
						/>
					</View>
				</View>
				<View style={styles.container}>

					<View style={{height: pxToDp(60), marginTop:pxToDp(20), marginHorizontal:pxToDp(20), flexDirection:'row' ,borderBottomColor:'#ddd', borderBottomWidth: pxToDp(2),alignItems:'center', justifyContent:'space-between'}}>	
							{/* <Image style={{width: pxToDp(32), height:pxToDp(32),marginRight:pxToDp(10)}} resizeMode='contain' source={require('./../../assets/爱心icon@2x.png')}/> */}
							<Text style={{fontSize:pxToDp(26), color:'#9c9c9c'}}>爱心值：</Text>
							<Text style={{fontSize:pxToDp(26), color:'#9c9c9c'}}> +{rowData.score}</Text>
					</View>
					
					<View style={{height: pxToDp(60), marginHorizontal:pxToDp(20), flexDirection:'row', alignItems:'center', borderBottomColor:'#ddd', borderBottomWidth: pxToDp(2), justifyContent:'space-between'}}>
						<Text style={{fontSize:pxToDp(26), color: '#9c9c9c'}}>活动时间：</Text>
						<Text style={{fontSize:pxToDp(26), color: '#9c9c9c'}}>{rowData.open_date}</Text>
					</View>
					
					<View style={{height: pxToDp(60), marginHorizontal:pxToDp(20), flexDirection:'row', borderBottomColor:'#ddd', borderBottomWidth: pxToDp(2), alignItems:'center', justifyContent:'space-between'}}>
						<Text style={{fontSize:pxToDp(26), color: '#9c9c9c'}}>活动地点：</Text>
						<Text style={{fontSize:pxToDp(26), color: '#9c9c9c'}}>{rowData.open_add}</Text>
					</View>
					
					<View style={{height: pxToDp(60), marginHorizontal:pxToDp(20), flexDirection:'row', borderBottomColor:'#ddd', borderBottomWidth: pxToDp(2),alignItems:'center', justifyContent:'space-between'}}>
							<Text style={{textAlign:'right',fontSize:pxToDp(26), color:'#9c9c9c'}}>招募人数：</Text>
							<Text style={{textAlign:'right',fontSize:pxToDp(26), color:'#9c9c9c'}}>{rowData.join_limit}</Text>
					</View>
					
					<View style={{height: pxToDp(60), marginHorizontal:pxToDp(20), flexDirection:'row', alignItems:'center', borderBottomColor:'#ddd', borderBottomWidth: pxToDp(2),justifyContent:'space-between'}}>
						<Text style={{fontSize:pxToDp(26), color: '#9c9c9c'}}>活动开始日：</Text>
						<Text style={{fontSize:pxToDp(26), color: '#9c9c9c'}}>{rowData.vld_start}</Text>
					</View>
					
					<View style={{height: pxToDp(60), marginHorizontal:pxToDp(20), flexDirection:'row', alignItems:'center',borderBottomColor:'#ddd', borderBottomWidth: pxToDp(2), justifyContent:'space-between'}}>
						<Text style={{fontSize:pxToDp(26), color: '#9c9c9c'}}>活动截止日：</Text>
						<Text style={{fontSize:pxToDp(26), color: '#9c9c9c'}}>{rowData.vld_end}</Text>
					</View>
					
					<View style={{height: pxToDp(86), marginHorizontal:pxToDp(20), flexDirection:'row', borderBottomColor:'#ddd', borderBottomWidth: pxToDp(2), alignItems:'center', justifyContent:'space-between'}}>
						<Text style={{fontSize:pxToDp(32), color: '#69bdd0'}}>已有{rowData.join_cnt}人报名</Text>
						<TouchableOpacity style={[{width: pxToDp(164), height: pxToDp(64),borderRadius:pxToDp(20), alignItems:'center', justifyContent:'center'},{ backgroundColor: this.state.color, }]} onPress={()=> this._join(rowData)} disabled={this.state.astate}>
							<Text style={{fontSize:pxToDp(40), color: 'white'}}>{this.state.text}</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		)
	}

	//报名参加
	_join(rowData){
		let state = this.data;
		let body = {
			"wx_id": this.userMess.wx_id,
			"comm_code": rowData.comm_code,
			"activity_no":rowData.activity_no
		}
		if(state == 0){
			appData._dataPost('/api/volunteer/cancel',body,(res) => {
				appData._dataPost('/api/volunteer/status',body,(data) => {
					this.data = data;
					this._joinState(data)
				})
			})
		} else if(state == 7){
			appData._dataPost('/api/volunteer/register',body,(res) => {		
				appData._dataPost('/api/volunteer/status',body,(data) => {
					this.data = data;
					this._joinState(data)
				})		
			})
		}
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={{height:pxToDp(86), flexDirection:'row',backgroundColor:'#f2f2f2',  justifyContent:'space-between'}}>
					<TouchableOpacity style={{flexDirection:'row',width:pxToDp(120), alignItems: 'center', justifyContent: 'center'}} onPress={()=>this.props.backCtrl(false)}>
						<Image style={{height:pxToDp(48), width: pxToDp(48)}} source={require('./../../assets/arrow-left.png')} 	resizeMode="contain"/>
						<Text style={{fontSize:pxToDp(30)}}>返回</Text>
					</TouchableOpacity>
					<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
						<Text style={{fontSize: pxToDp(36)}}>活动详情</Text>
					</View>
					<View style={{width:pxToDp(120), alignItems: 'center', justifyContent: 'center'}}/>
				</View>

				{this._details()}
			</View>
		);
	}
	}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	list:{
		flex: 1, 
		flexDirection:'row', 
		alignItems:'center', 
		justifyContent:'center'
	},
	listText:{
		paddingLeft:pxToDp(80), 
		color: 'white', 
		fontSize:pxToDp(28)
	},
});

module.exports = details;