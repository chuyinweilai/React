import React,{Component} from 'react';
import {
		Animated,
		Image
} from 'react-native';
import FadeInView from '../../components/FadeInView'

const peruri = "http://cloudapi.famesmart.com";
const appData = require('./../../components/Ajax')
const _wx = require('./../../wx/wx')

const Routers  = require('./router');
const Regist  = require( './regist');

const APPID = 'wx176d805510bcba9e';
const SECRET = '249ef2079ec5667e7dc5e5c93c600521';
const code = window.location.search;


export default class check extends Component{
	constructor(props){
		super(props);
		this.state={
			pageTurn: false,
			userMess: {},
			timeClock: false,
		};
	}

	componentWillMount(){
		this._login(777)
		appData._Storage('set','openId',777)
		// let as = /[^/code=?][0-9a-zA-Z]*[$/9a-zA-Z]?/;
		// let arr = code.split('&')[0];
		// let COD = arr.match(as)[0];
		// appData._Storage('get','code',(res)=>{
		// 	if(res !== undefined && COD == JSON.parse(res)){
		// 			window.location.href ='http://cloudapi.famesmart.com/Vcity/web/index.html'
		// 	} else{
		// 		appData._Storage('set','code', COD)
		// 		this._getAccess(COD)
		// 	}
		// })
		// setTimeout(() => {
		// 	this.setState({
		// 		timeClock: false
		// 	})
		// },3000)
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

	_login(openId){
		let afturi = '/api/wxuser/'+ openId
		appData._dataGet(afturi, (data) => {
			if(data){
				this.setState({
					userMess: data,
					pageTurn: true,
				})
			}else {
				this.setState({
					userMess: openId,
					pageTurn: false,
				})
			}
		});
	}
	
	_animate(){
		if(this.state.timeClock){
			return (
				<FadeInView style={{flex : 1}}>
						<Image style={{flex : 1}} resizeMode="stretch" source={require('./../../assets/book.jpg')}/>
				</FadeInView>
			)
		} else {
			return this._pageOut()
		}
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
			appData._Storage('set','userMess',userMess[0])
			return <Routers/>
		} else {
			return <Regist backCtrl = {()=>this._changePage()}/>
		}
	}
	
	render(){
		return this._animate()
	}
}

module.exports = check