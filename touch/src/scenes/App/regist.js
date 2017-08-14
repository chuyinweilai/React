import React,{Component} from 'react';
import {
	View,
	Text,
	Image,
	ListView,
	TextInput,
	TouchableOpacity,
} from 'react-native';

const peruri = "http://cloudapi.famesmart.com";
const appData = require('./../../components/Ajax');
const pxToDp =require('../responsive/px');

export default class regist extends Component{
	constructor(props){
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1 ,r2) => r1 !== r2})
		this.state={
			ds: ds,
			dataSource1:[],
			dataSource2:[],
			headIcon: '',
			changep: true,
			add: '',
			warningText: ''
		};
		this.left= 0;
		this.right = 0;
		this.openId = '';
		this.userMess = {};					//用户信息
		this.address = [];
	}

	componentWillMount(){
		appData._Storage('get', 'openId',(res)=>{
			let json = JSON.parse(res);
			this.userMess.openId = json;
		})
	}

	_login(){
		let mobile = this.userMess.mobile
		let afturi = '/api/residents/list/'+ mobile
		appData._dataGet(afturi, (data) => {
			if(data.length){
				this._updata(data[0])
			}else {
				alert('该社区无房屋信息')
			}
		});
	}

	_userMess(id,mess){
		if(id == 'nickname'){
			this.userMess.nickname = mess			
		} 
		else if(id == 'tel'){
			this.userMess.mobile = mess
			if(/^1(3|4|5|7|8)\d{9}$/.test(mess)){
				this.setState({
					warningText: ''
				})
				this.userMess.bol = true;
			} else {
				this.userMess.bol = false;
				this.setState({
					warningText: '请填入正确的手机号'
				})
			}
		} 
	}

	_changePage(bol){
		if(this.userMess.bol){
			this._login();
		} else{
			alert('您输入的信息有误')
		}
	}

	//提交数据
	_updata(dataChoose){
		let userMess = this.userMess;
		let address = {};
		address=dataChoose;
		if(userMess.nickname == undefined || userMess.nickname == "" ){
			userMess.nickname = userMess.mobile
		}
		let data = {
			"wx_id": userMess.openId,
			"nickname":  userMess.mobile,
			"name": address.name,
			"gender": address.gender,
			"mobile": userMess.mobile,
			"comm_code": address.comm_code,
			"apt_code": address.apt_code,
			"unit_code": address.unit_code,
			"floor": address.floor,
			"room": address.room,
			"type": address.type,
			"comm_name": address.comm_name,
			"apt_info": address.apt_info,
		}
		// console.log(data)
		appData._dataPost('/api/wxuser/add',data,(res)=>{
			if(res == undefined){
				this.userMess.nickname = ''
				alert ('该手机号无效')
			} else {
				this.userMess.nickname = ''
				this.props.backCtrl(true)
			}
		})
	}

	render(){
		return (
			<Image style={{flex: 1,justifyContent:'center', alignItems:'center'}}  source={require('./../../assets/图层-1@2x.png')}>
				<View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
					<View style={{height: pxToDp(200), justifyContent:'center', alignItems:'center', marginBottom: pxToDp(70)}}>
						<Text style={{fontSize: pxToDp(60), color: '#fff',fontFamily:'微软雅黑', textShadowOffset:{width:1, height:3}, textShadowRadius:pxToDp(10) ,textShadowColor:'#444', paddingBottom: pxToDp(24)}} >景城品雅苑社区</Text>
						<Text style={{fontSize: pxToDp(60), color: '#fff',fontFamily:'微软雅黑', textShadowOffset:{width:1, height:3}, textShadowRadius:pxToDp(10) ,textShadowColor:'#444'}}>志愿者中心</Text>
					</View>
						{/* {this._choosePage()} */}
					
					<View style={{width: pxToDp(544), paddingHorizontal: pxToDp(40), paddingTop: pxToDp(50), paddingBottom: pxToDp(20),backgroundColor: '#f6f4e6', borderRadius: pxToDp(32),justifyContent:'center', alignItems:'center'}}>
						{/* <View style={{width: pxToDp(474), height: pxToDp(72), flexDirection: 'row',  padding: pxToDp(20), marginBottom:pxToDp(46),alignItems: 'center', backgroundColor:'#fff', borderRadius:pxToDp(16)}}>
							<Image style={{width: pxToDp(90), height: pxToDp(28)}} resizeMode="contain" source={require('./../../assets/昵称@2x.png')}/>
							<TextInput 
										style={{width: pxToDp(350),height: pxToDp(50), fontSize: pxToDp(28), padding:pxToDp(10), lineHeight: pxToDp(50) }} 
										selectTextOnFocus ={true} 
										maxLength = {6} 
										defaultValue = {this.userMess.nickname}
										placeholder='请输入昵称' 
										onChangeText={this._userMess.bind(this,'nickname')}/>
						</View> */}
						
						<View style={{width: pxToDp(474), height: pxToDp(72), flexDirection: 'row',  padding: pxToDp(20), alignItems: 'center', backgroundColor:'#fff', borderRadius:pxToDp(16)}}>
							<Image style={{width: pxToDp(90), height: pxToDp(28)}} source={require('./../../assets/手机号@2x.png')}/>
							<TextInput 
										style={{width: pxToDp(350),height: pxToDp(50), fontSize: pxToDp(28), padding:pxToDp(10), lineHeight: pxToDp(50) }} 
										placeholder="请输入手机号"
										defaultValue = {this.userMess.mobile}
										selectTextOnFocus ={true} 
										maxLength = {11} 
										onChangeText={this._userMess.bind(this,'tel')}/>
						</View>
						
						<View style={{flexDirection: 'row',  height:pxToDp(24), alignItems: 'center', paddingLeft: pxToDp(150)}}>
						</View>
						
						<TouchableOpacity style={{width: pxToDp(140),height: pxToDp(50), backgroundColor: '#96cccc', borderRadius:pxToDp(10), alignItems:'center', justifyContent: 'center'}}  onPress={this._changePage.bind(this,false)}>
							<Text style={{fontSize: pxToDp(32), color: 'white'}}>提交</Text>
						</TouchableOpacity> 
					</View>

					<View style={{height: pxToDp(200)}}>
					</View>
					
					{/* <TouchableOpacity style={{height: pxToDp(100), margin: pxToDp(10), backgroundColor: '#69bdd0', borderRadius:pxToDp(20), alignItems:'center', justifyContent: 'center'}}  onPress={this._changePage.bind(this,false)}>
						<Text style={{fontSize: pxToDp(42), color: 'white'}}>下一步</Text>
					</TouchableOpacity> */}
				</View>
				<View style={{justifyContent:'flex-end', alignItems:'center'}}>
					<Text style={{fontSize: pxToDp(20), color: '#fff',fontFamily:'微软雅黑', textShadowOffset:{width:1, height:2}, textShadowRadius:pxToDp(10) ,textShadowColor:'#444', paddingBottom: pxToDp(24)}} >Designed By FAME @copyright 1.0.0</Text>
				</View>
			</Image>
		)
	}
}
module.exports = regist;