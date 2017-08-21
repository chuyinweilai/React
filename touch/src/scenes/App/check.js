import React,{Component} from 'react';
import {
	View,
	Text,
	Animated,
	Image
} from 'react-native';
import FadeInView from '../../components/FadeInView'

const peruri = "http://cloudapi.famesmart.com";
const appData = require('./../../components/Ajax')

const Routers  = require('./router');

const APPID = 'wx176d805510bcba9e';
const SECRET = '249ef2079ec5667e7dc5e5c93c600521';
const code = window.location.search;


export default class check extends Component{
	constructor(props){
		super(props);
		this.state={
			pageTurn:false,
			userMess: {},
		};
	}

	componentWillMount(){
		// let cardId = this.props.cardId;
		let cardId = 57197187
		this._login(cardId)
		appData._Storage('set','openId',cardId)
	}

	//成功返回
	_getAccess(CODE){
		let aurl = 'http://cloudapi.famesmart.com/redirect.php?appid=' + APPID + '&secret='+ SECRET + '&code='+ CODE;
		$.ajax({
			url: aurl,
			type:"GET",
			dataType:"json",
			success:(data) =>{
				this._login(data.openid)
				appData._Storage('set','openId',data.openid)
				appData._Storage('set','access_token',data.access_token)
			},
			error:(res) =>{
				alert(res)
			},
		})
	}

	_login(ic_card){
		let afturi = '/api/wxuser/find';
		let body ={
			"ic_card": ic_card,
			"open_id": "",
		}
			console.log(body)
		appData._dataPost(afturi,body, (data) => {
			console.log(data)
			if(data){
				this.setState({
					userMess: data,
					pageTurn: true,
				})
			}else {
				setTimeout(()=>{
					this.props.backCtrl()
				},5000)
				this.setState({
					userMess: openId,
					pageTurn: false,
				})
			}
		});
	}

	_changePage(){
		appData._Storage('get','openId',(res)=>{
			let json = JSON.parse(res)
			this._login(json)
		})
	}

	_pageOut(){
		let userMess = this.state.userMess
		if(this.state.pageTurn){
			console.log(userMess)
			appData._Storage('set','userMess',userMess[0])
			return <Routers />
		} else {
			return (
				<View style={{flex: 1, backgroundColor: '#555',  overflow:'hidden',alignItems:'center', justifyContent: 'center'}}>
					<Text style={{fontSize: '0.4rem', color: 'white'}}>此卡未注册,请至前台办理相关业务</Text>
				</View>
			)
		}
	}
	
	render(){
		return this.state.pageTurn == ""?
		<View>
		</View>
		:this._pageOut()
	}
}

module.exports = check