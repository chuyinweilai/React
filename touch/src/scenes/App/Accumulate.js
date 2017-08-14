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
	ScrollView,
	StyleSheet,
	ListView,
	TouchableOpacity,
	Dimensions
} from 'react-native';

const peruri = "http://cloudapi.famesmart.com";
const appData = require('./../../components/Ajax');
const pxToDp =require('../responsive/px');

export default class Accumulate extends Component {
	constructor() {
		super();
		const ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2})
		this.state = {
			ds : ds,
			changePage: 'home',
			eventsData: [],
			range:[],
		};
	}
	
	componentWillMount(){
		appData._Storage('get','userMess',(data)=>{
			let json = JSON.parse(data);
			this.userMess = json;
			this._getData()
			this._giftRange()
		})
	}

	_giftRange(){
		let json = this.userMess ;
		let bodyUp = {
			"comm_code": json.comm_code,
			"score": json.score,
			"range":"up"
		}
		let bodyDown ={
			"comm_code": json.comm_code,
			"score": json.score,
			"range":"down"
		}
		appData._dataPost('/api/gift/range',bodyUp,(res)=>{
			let rangeArr = this.state.range;
			let arr = res[0]
			if(!res.length){
				let obj = {
					exchange: 'up',
					state: '0'
				};
				rangeArr.push(obj)
				this.setState({
					range:rangeArr
				})
			} else {
				arr.exchange = 'up'
				rangeArr.push(arr)
				this.setState({
					range:rangeArr
				})
			}
		})
		appData._dataPost('/api/gift/range',bodyDown,(res)=>{
			let rangeArr = this.state.range;
			if(!res.length){
				let obj = {
					exchange: 'down',
					state: '0'
				};
				rangeArr.push(obj)
				this.setState({
					range:rangeArr
				})
			} else {
				let arr = res[0]
				arr.exchange = 'down'
				rangeArr.push(arr)
				this.setState({
					range:rangeArr
				})
			}
		})
	}

	_getData(){
		let json = this.userMess ;
		let body = {
			"comm_code": json.comm_code, 
			"flag": 0,
			"type": 0,
			"per_page":5,
		}

		appData._dataPost('/api/volunteer',body,(data)=>{
			if(data.message){
				alert(data.message)
			} else {
				this.setState({
					eventsData: data.data,
				})
			}
		})
	}

	_RouterCtrl(ctrl){
		this.setState({
			changePage:ctrl
		})
	}

	_nowPage() {
		let source = this.userMess.score;
		// let rank = Math.floor((source)/20);
		let stars = [];
		if(source <10){
			stars = [0,0,0,0,0];
			rank=0;
		} else if(10<= source&&source <30){
			stars = [1,0,0,0,0];
			rank=1
		} else if(30<= source &&source <50){
			stars = [1,1,0,0,0];
			rank=2;
		} else if(50<= source &&source  <80){
			stars = [1,1,1,0,0];
			rank=3;
		} else if(80<= source &&source <100){
			stars = [1,1,1,1,0];
			rank=4;
		} else if(100<= source){
			stars = [1,1,1,1,1];
			rank=5;
		}
		return (
			<View style={{flex: 1}}>
				<View style={{height: pxToDp(80),flexDirection:'row', alignItems: 'center', justifyContent:'center', backgroundColor:'#f2f2f2', borderBottomColor:'#B4B4B4', borderBottomWidth:pxToDp(2)}}>
					<View style={{width:pxToDp(50)}}>
					</View>
					<View style={{flex: 1, alignItems:'center', justifyContent:'center',}}>
						<Text style={{fontSize: pxToDp(36)}}>志愿者</Text>
					</View>
					<TouchableOpacity style={{width:pxToDp(50),marginRight: pxToDp(40)}} onPress={()=>this.props.backCtrl('accumulate_ruler')}>
						<Image style={{width: pxToDp(50), height: pxToDp(50)}} source={require('./../../assets/积分细则icon.png')}></Image>
					</TouchableOpacity>
				</View>
				
				<ScrollView style={styles.container} removeClippedSubviews ={true}>
					<View style={{flexDirection:'row', height: pxToDp(264),marginVertical:pxToDp(22)}}>
						<View>
							<Image style={{height: pxToDp(216), width: pxToDp(216), marginHorizontal:pxToDp(62), paddingTop: pxToDp(90), justifyContent:'center', alignItems:'center'}} resizeMode='contain' source={require('./../../assets/icon.png')}>	
								<Text style={{fontSize:pxToDp(20), color: 'white'}}>
									当前爱心数
								</Text>
								<Text style={{fontSize:pxToDp(48), fontWeight:'600', color: 'white'}}>
									{source}
								</Text>
							</Image>
							<View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
								<Text style={{fontSize: pxToDp(36), fontWeight:'600', color:'#69dbcf'}}>
									LV{rank}
								</Text>
								<View style={{height: pxToDp(36)}}>
									<ListView
										contentContainerStyle={{ flexDirection: 'row'}}
										enableEmptySections = {true}
										dataSource={this.state.ds.cloneWithRows(stars)}
										renderRow={this._starsImg.bind(this)}
									/>
								</View>
							</View>
						</View>
						{this.userMess.volunteer ? this._HasRegistVol():this._NoRegistVol()}
					</View>

					<View style={{height: pxToDp(118), flexDirection:'row', backgroundColor:'#e6e6e6',paddingBottom:pxToDp(26)}}>
						<TouchableOpacity style={{flex: 1}} onPress={()=>this.props.backCtrl('accumulate_join')}>
							<Image style={styles.list} source={require('./../../assets/我参与的@2x.png')}>
									<Text style={styles.listText}>我参与的</Text>
							</Image>
						</TouchableOpacity>
						<TouchableOpacity style={{flex: 1}} onPress={()=>this.props.backCtrl('accumulate_active')}>
							<Image style={styles.list} source={require('./../../assets/往期活动@2x.png')} >
								<Text style={styles.listText}>往期活动</Text>
							</Image>
						</TouchableOpacity>
						<TouchableOpacity style={{flex: 1}} onPress={()=>this.props.backCtrl('accumulate_exchange')}>
							<Image style={{flex: 1, flexDirection:'row', alignItems:'center', justifyContent:'center', backgroundColor:'#d96475'}} source={require('./../../assets/积分兑换@2x.png')} >
								<Text style={styles.listText}>爱心兑换</Text>
							</Image>
						</TouchableOpacity>
					</View>
					{this._newActivity()}
				</ScrollView>
			</View>
		);
	}
	
	_starsImg(rowData){
		if(rowData)	return <Image style={{width: pxToDp(36), height: pxToDp(36)}} resizeMode='stretch' source={require('./../../assets/形状-7.png')}/>
		else  return <Image style={{width: pxToDp(36), height: pxToDp(36)}} resizeMode='stretch'  source={require('./../../assets/形状-5.png')}/>
	}

	_rangeShow(rowData, rowId,sectionId){
		let text = ''
		let userMess = this.userMess
		if(rowData.state == 0 ){
			text = ' '
		} else {
			if(rowData.exchange == 'down'){
				text = "当前可兑换" + rowData.gift_name
			}else {
				let score = Number(rowData.change_score) -  Number(userMess.score)
				text = "还差" + score + "爱心可兑换" + rowData.gift_name
			}
		}
		return (
			<View style={{justifyContent:'center'}}>
				<Text style={{width: pxToDp(380), fontSize: pxToDp(32),marginVertical:pxToDp(10)}}>
					{text}
				</Text>
			</View>
		)
	}

	_HasRegistVol(){
		let rangeArr = this.state.range
		return (
			<View>
				<View style={{height: pxToDp(144)}}>
					 <ListView
						dataSource = {this.state.ds.cloneWithRows(rangeArr)}
						enableEmptySections = {true}
						renderRow = {this._rangeShow.bind(this)}/> 
				</View>
				<View style={{ justifyContent:'center'}}>
					<Text style={{width: pxToDp(380), fontSize: pxToDp(32),marginVertical:pxToDp(10)}}>
						……
					</Text>
				</View>
				<View style={{flex: 1, flexDirection:'row', alignItems:'center'}}>
					<View style={{flex: 1}}></View>
					<TouchableOpacity onPress={() => this.props.backCtrl('accumulate_history')}>
						<Text style={{fontSize: pxToDp(24), color:'#ccc'}}>查看更多>></Text>
					</TouchableOpacity>
				</View>
			</View>
		)
	}

	_NoRegistVol(){
		return (
			<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
				<View style={{  height: pxToDp(120)}}>
					<Button 
						title="成为志愿者"
						 onPress={()=>this.props.backCtrl('accumulate_regist')}
					/>
				</View>
			</View>
		)
	}

	// 最新活动列表
	_newActivity(){
		let eventsData = this.state.eventsData
		return (
				<View>
					<View style={{paddingHorizontal:pxToDp(18), borderBottomColor:'#4b4b4b', borderBottomWidth:1, flexDirection:'row',justifyContent:'space-between'}}>
						<Text style={{lineHeight:pxToDp(58), fontSize:pxToDp(32)}}>最新活动</Text>
						<TouchableOpacity style={{flexDirection:'row', justifyContent:'center', alignItems:'center'}}  onPress={()=>this.props.backCtrl('accumulate_more_activity')}>
							<Text style={{lineHeight:pxToDp(32), fontSize:pxToDp(26),paddingTop: pxToDp(8)}}>更多</Text>
							<Image style={{width:pxToDp(28), height:pxToDp(32), margin:0, marginTop: pxToDp(8)}} resizeMode='stretch'  source={require('../../assets/more.png')}/>
						</TouchableOpacity>
					</View>
					<View style={{height: pxToDp(506 *eventsData.length)}}>
						<ListView
						 		style={{height: pxToDp(400*eventsData.length)}}
								dataSource = {this.state.ds.cloneWithRows(eventsData)}
								enableEmptySections = {true}
								renderRow = {this._render.bind(this)}
						/>
					</View>
				</View>
		)
	}

	_render(rowData,rowId,sectionId){
			let imgUri  = rowData.pic_path;
			let ss = imgUri.split(',');
			let type='';
			let title='';
			let text = '';
			if(rowData.detail.length >100){
				text = rowData.detail.slice(0,100)  + "...";
			} else {
				text = rowData.detail
			}
			
			if(rowData.type == 1) {
				type='社区服务'
			} else if(rowData.type == 2) {
				type='公益活动'
			} else if(rowData.type == 3) {
				type='其他'
			} 
			return (
					<View>
						<View style={{flexDirection:'row', alignItems:'center'}}>
							<Image style={{width: pxToDp(41), height:pxToDp(41), margin:pxToDp(16)}} source={require('./../../assets/公益活动icon@2x.png')}/>
							<Text style={{color:'#fdac41', fontSize:pxToDp(18)}}>#{type}#</Text>
							<Text style={{color:'#333', marginLeft: pxToDp(32), fontSize:pxToDp(32)}} numberOfLines={1}>{rowData.title}</Text>
						</View>

						<View>
							<TouchableOpacity onPress={() => this.props.backCtrl('accumulate_details',rowData )}>
								<Text style={{ textAlign:'justify', height:pxToDp(116), paddingHorizontal:pxToDp(30), fontSize:pxToDp(21), lineHeight:pxToDp(29)}}>
									{text}
								</Text>
							</TouchableOpacity>
							<View style={{height: pxToDp(260)}}>
								<ListView
										contentContainerStyle={{flexDirection: 'row', marginVertical:pxToDp(8), paddingHorizontal:pxToDp(30)}}
										dataSource={this.state.ds.cloneWithRows(ss)}
										enableEmptySections = {true}
										renderRow = {this._imageRow.bind(this)}
								/>
							</View>
						</View>
						
						<View style={{paddingBottom:pxToDp(10), flexDirection:'row',justifyContent:'space-between', paddingHorizontal:pxToDp(30),borderBottomWidth:pxToDp(14), borderBottomColor:'#f2f2f2'}}>
							<View >
								<Text style={{ textAlign:'right',fontSize:pxToDp(14), color:'#9c9c9c',marginRight:pxToDp(20)}}>{rowData.pub_date}</Text>
							</View>
							<View style={{flexDirection:'row'}}>
								<Image style={{width: pxToDp(32), height:pxToDp(32),marginRight:pxToDp(10)}} resizeMode='stretch' source={require('./../../assets/爱心icon@2x.png')}/>
								<Text style={{ textAlign:'right',fontSize:pxToDp(14), color:'#9c9c9c',marginRight:pxToDp(20)}}>{rowData.score}</Text>
								<Image style={{width: pxToDp(32), height:pxToDp(32),marginRight:pxToDp(10)}} resizeMode='contain' source={require('./../../assets/加分icon@2x.png')}/>
								<Text style={{textAlign:'right',fontSize:pxToDp(14), color:'#9c9c9c'}}>{rowData.join_limit}</Text>
							</View>
						</View>
					</View>
			)
	}

	_goodsDetails(){
		this.props.backCtrl('accumulate_goods_details')
	}

	_imageRow(rowData){
		return (
			<Image style={{width:pxToDp(342), height:pxToDp(212), margin:pxToDp(8)}} resizeMode="stretch"  source={{uri:peruri + '/storage/'+rowData}}/>
		)
	}

	render(){
		return this._nowPage()
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		overflow:'hidden',
	},
	list:{
		flex: 1, 
		flexDirection:'row', 
		alignItems:'center', 
		justifyContent:'center'
	},
	listText:{
		paddingLeft:pxToDp(110), 
		color: 'white', 
		fontSize:pxToDp(28)
	},
});

module.exports = Accumulate;