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
	TouchableOpacity,
	Dimensions
} from 'react-native';

const peruri = "http://cloudapi.famesmart.com";
const appData = require('./../../components/Ajax');
const pxToDp =require('../responsive/px');

export default class details extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
		this.mess = {};
		this.userMess = {};
	}

	componentWillMount(){
		this.mess = this.props.mess
		appData._Storage('get','userMess',(data) =>{
			this.userMess = JSON.parse(data)
		})
	}

	_getEvent(json){
		// this.setState({
    	// 	dataSource: json.data
		// })
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={{height:pxToDp(86), flexDirection:'row',backgroundColor:'#f2f2f2',  justifyContent:'space-between'}}>
					<TouchableOpacity style={{flexDirection:'row',width:pxToDp(120), alignItems: 'center', justifyContent: 'center'}} onPress={()=>this.props.backCtrl('accumulate_exchange')}>
						<Image style={{height:pxToDp(48), width: pxToDp(48)}} source={require('./../../assets/arrow-left.png')} 	resizeMode="contain"/>
						<Text style={{fontSize:pxToDp(30)}}>返回</Text>
					</TouchableOpacity>
					<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
						<Text style={{fontSize: pxToDp(36)}}>兑换详情</Text>
					</View>
					<View style={{width:pxToDp(120), alignItems: 'center', justifyContent: 'center'}}/>
				</View>
				<View>
					<Image style={{height:pxToDp(350)}} resizeMode='contain' source={{uri: peruri+ this.mess.pic_path}}/>
					<View style={{height:pxToDp(166), padding: pxToDp(20)}}>
						<View style={{flexDirection:'row',flex: 1}}>
							<View style={{flex: 1}}>
								<Text style={{fontSize:pxToDp(48)}}>{this.mess.gift_name}</Text>
							</View>
							{/* <TouchableOpacity style={{width: pxToDp(34),height:pxToDp(34), backgroundColor:'#f9c'}}>
								<Image/>
							</TouchableOpacity> */}
						</View>
						<View style={{flexDirection:'row',justifyContent:'space-between'}}>
							<Text style={{fontSize:pxToDp(28), color:'#999'}}>兑换爱心数： {this.mess.change_score}</Text>
							<Text style={{fontSize:pxToDp(28), color:'#fd9840'}}>当前爱心数： {this.userMess.score}</Text>
						</View>
					</View>
					<View style={{height:pxToDp(56), backgroundColor:'#ededed', paddingHorizontal: pxToDp(20), flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
						<Text style={{fontSize:pxToDp(20), color:'#a9a9a9'}}>当前已兑换：{this.mess.change_cnt}人</Text>
						<Text style={{fontSize:pxToDp(20), color:'#a9a9a9'}}>兑换截止日期：{this.mess.vld_end}</Text>
					</View>
				</View>
				<View>
					<View style={{height: pxToDp(68), flexDirection:'row', justifyContent:'space-between', paddingHorizontal:pxToDp(20), paddingVertical:pxToDp(16),borderBottomWidth:pxToDp(1)}}>
						<View>
							<Text style={{fontSize: pxToDp(30), color:'#69bdd0'}}>推荐活动</Text>
						</View>
						<TouchableOpacity disabled>
							<Text style={{fontSize: pxToDp(30), color:'#69bdd0'}}>更多</Text>
						</TouchableOpacity>
					</View>
					<View style={{height: pxToDp(70), flexDirection:'row', justifyContent:'space-between', paddingHorizontal:pxToDp(20), paddingVertical:pxToDp(16),borderBottomWidth:pxToDp(1)}}>
						<TouchableOpacity disabled>
							<Text style={{fontSize: pxToDp(32)}}>社区养老院周末公益清洁志愿活动征集 >></Text>
						</TouchableOpacity>
					</View>
				</View>
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