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
const appData = require('./../../components/Ajax')
const pxToDp = require('../responsive/px');

export default class accumulate_more_activity extends Component {
	constructor(props) {
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			ds: ds,
			dataSource:([]),
		};
	}

	componentWillMount(){
		appData._Storage('get','userMess',(data)=>{
			let json = JSON.parse(data);
			this.userMess = json;
			this._getData()
		})
	}

	_getData(){
		let json = this.userMess ;
		let body = {
			"comm_code": json.comm_code, 
			"flag": 0,
			"type": 0,
			"per_page": 0,
		}

		appData._dataPost('/api/volunteer',body,(data)=>{
			if(data.message){
				this._setPage(true)
			}else {
				this.setState({
					dataSource: data,
				})
			}
		})
	}



	_render(rowData){
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
							<Text style={{color:'#fdac41', fontSize:pxToDp(24)}}>#{type}#</Text>
							<Text style={{color:'#333', marginLeft: pxToDp(32), fontSize:pxToDp(32)}} numberOfLines={1}>{rowData.title}</Text>
						</View>

						<View>
							<TouchableOpacity onPress={() => this.props.backCtrl('accumulate_details',rowData )}>
								<Text style={{ textAlign:'justify', height:pxToDp(124), paddingHorizontal:pxToDp(30), fontSize:pxToDp(24), lineHeight:pxToDp(36)}}>
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

	_imageRow(rowData){
		return (
			<Image style={{width:pxToDp(342), height:pxToDp(212), margin:pxToDp(8)}} resizeMode="stretch"  source={{uri:peruri + '/storage/'+rowData}}/>
		)
	}

	_goodsDetails(rowData){
		this.props.backCtrl('accumulate_details',rowData)
	}

	render() {
		let dataSource = this.state.dataSource
		return (
			<View style={styles.container}>
				<View style={{height:pxToDp(86), flexDirection:'row', justifyContent:'space-between', backgroundColor:'#f2f2f2',}}>
					<TouchableOpacity style={{width:pxToDp(120), alignItems: 'center', justifyContent: 'center', flexDirection:'row'}} onPress={()=>this.props.backCtrl(false)}>
						<Image style={{height:pxToDp(48), width: pxToDp(48)}} source={require('./../../assets/arrow-left.png')} 	resizeMode="contain"/>
						<Text style={{fontSize:pxToDp(30)}}>返回</Text>
					</TouchableOpacity>
					<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
						<Text style={{fontSize:pxToDp(32)}}>最新活动</Text>
					</View>
					<View style={{width:pxToDp(120), alignItems: 'center', justifyContent: 'center'}}/>
				</View>
				<ScrollView>
					<ListView
							dataSource = {this.state.ds.cloneWithRows(this.state.dataSource)}
							enableEmptySections = {true}
							renderRow = {this._render.bind(this)}
					/>
				</ScrollView>
			</View>
		);
	}
}
const styles = StyleSheet.create({
    container: {
      	flex: 1,
    },
    banners:{
		height:pxToDp(387),
		backgroundColor:'gray',
    },
    BScontrol:{
		width: pxToDp(14),
		height: pxToDp(14),
		borderRadius:50,
		marginHorizontal: pxToDp(3.5),
		backgroundColor: '#FFF',
    },
    logo: {
		flex: 1,
		flexDirection:'row',
		height: pxToDp(232),
		paddingVertical: pxToDp(22)
    },
    welcome: {
		fontSize: pxToDp(20),
		textAlign: 'center',
		margin: pxToDp(10)
    },
    instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5
    },
    touchable: {
		backgroundColor: '#CAE6FE'
    }
});

module.exports = accumulate_more_activity;