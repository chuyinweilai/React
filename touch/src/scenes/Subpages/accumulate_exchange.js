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

const deviceWidthDp = Dimensions.get('window').width;

export default class accumulate_exchange extends Component {
	constructor(props) {
		super(props);
		const ds = new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !== r2});
		this.state = {
			ds:ds ,
			dataSource:[],
			dataSourceL:[],  
			dataSourceR:[],
		};
		this.leftLefgth = 0;
		this.rightLefgth = 0;
	}

	componentWillMount(){
		appData._Storage('get','userMess',(data)=>{
			let json = JSON.parse(data);
			let  body ={
				"wx_id": json.wx_id,
				"comm_code": json.comm_code
			}
			appData._dataPost('/api/gift/list', body,this._getEvent.bind(this));
		});
	}

	_getEvent(json){
		this.setState({
			dataSource: json
		})
		return null
		this.leftLefgth = 0;
		this.rightLefgth = 0;
		let arrLeft = [];
		let arrRight = [];
		json.forEach((data,index) => {
			if(this.leftLefgth <= this.rightLefgth){
				arrLeft.push(data);
				this.leftLefgth ++;
			} else {
				arrRight.push(data);
				this.rightLefgth ++;
			}
		})
		this.setState({
			dataSourceL:arrLeft,  
			dataSourceR:arrRight,
		})
	}

	_render(rowData){
		let Imguri = '';
		Imguri  = peruri + rowData.pic_path;
		return (
			<TouchableOpacity style={{width: pxToDp(375), padding:pxToDp(20), paddingRight:pxToDp(10)}} onPress={()=>this.props.backCtrl('accumulate_goods_details',rowData)}>
				<View style={{borderRadius:pxToDp(20),backgroundColor:'white'}}>
					<View style={{padding:pxToDp(24), paddingBottom:0,borderBottomWidth:pxToDp(1), }}>
						<Image style={{height:pxToDp(450), width: pxToDp(300), borderRadius:pxToDp(20)}} resizeMode='contain' source ={{uri: Imguri}}/>
						<Text style={{fontSize:pxToDp(30), marginBottom:pxToDp(10)}} numberOfLines={1}>
							{rowData.gift_name}
						</Text>
						<View style={{ paddingBottom:pxToDp(10)}}>
							<Text style={{fontSize:pxToDp(18), color:'#c9c9c9'}}>
								截止时间： 
							</Text>
							<Text style={{fontSize:pxToDp(18), color:'#c9c9c9'}}>
								 {rowData.vld_end}
							</Text>
						</View>
						<View style={{ alignItems:'flex-end', justifyContent:'space-between', paddingBottom:pxToDp(10)}}>
							<View>
								<Text style={{fontSize:pxToDp(18), color:'#c9c9c9'}}>{rowData.change_cnt}/{rowData.change_limit}</Text>
							</View>
						</View>
					</View>
					<View style={{height:pxToDp(80), alignItems:'center', justifyContent:'center'}}>
						<Text style={{fontSize:pxToDp(32), color:'#fd9840'}}>{rowData.change_score}爱心可兑换</Text>
					</View>
				</View>
			</TouchableOpacity>
		)
	}
	
	render() {
		let dataSource1 =  this.state.dataSource
		return (
			<View style={styles.container}>
				<View style={{height:pxToDp(86), flexDirection:'row',backgroundColor:'#f2f2f2',  justifyContent:'space-between', alignItems:'center'}}>
					<TouchableOpacity style={{width:pxToDp(120), flexDirection:'row', alignItems: 'center', justifyContent: 'center'}} onPress={()=>this.props.backCtrl(false)}>
						<Image style={{height:pxToDp(48), width: pxToDp(48)}} source={require('./../../assets/arrow-left.png')} 	resizeMode="contain"/>
						<Text style={{fontSize:pxToDp(30)}}>返回</Text>
					</TouchableOpacity>
					<View style={{flex:1, flexDirection:'row', alignItems: 'center', justifyContent: 'center', }}>
						<Text style={{fontSize: pxToDp(36)}}>兑换列表</Text>
					</View>
					<View style={{width:pxToDp(120), alignItems: 'center', justifyContent: 'center'}}/>
				</View>
				<ListView
					contentContainerStyle = {{flexDirection: 'row', flexWrap: 'wrap',backgroundColor:'#dbdbdb', alignItems:'center'}}
					dataSource ={this.state.ds.cloneWithRows(dataSource1)}
					enableEmptySections = {true}
					renderRow = {this._render.bind(this)}
				/>
				 {/* <ScrollView> 
					<View style={{height: pxToDp(40 + (500*dataSource1.length)),backgroundColor:'#dbdbdb',}}>
						<ListView
							contentContainerStyle = {{flexDirection: 'row', flexWrap: 'wrap'}}
							dataSource ={this.state.ds.cloneWithRows(dataSource1)}
							enableEmptySections = {true}
							renderRow = {this._render.bind(this)}
						/>
					</View>
				 </ScrollView>  */}
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

module.exports = accumulate_exchange;