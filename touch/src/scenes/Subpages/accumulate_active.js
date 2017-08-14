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
	ListView,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	Dimensions
} from 'react-native';

const peruri = "http://cloudapi.famesmart.com";
const appData = require('./../../components/Ajax');
const pxToDp =require('../responsive/px');

export default class accumulate_active extends Component {
	constructor(props) {
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
		this.state = {
			ds: ds,
			dataSource: '',
			type: 1,
			borColor1: '#69bdd0ff',
			borColor2: '#69bdd000',
			borColor3: '#69bdd000',

		};
		this.userMess;
	}

	componentWillMount(){
		appData._Storage('get','userMess',(data)=>{
			let json = JSON.parse(data);
			this.userMess = json;
			this._getData(1)
		})
	}

	_getData(type){
		let json = this.userMess ;
		let body = {
			"comm_code": json.comm_code, 
			"flag": 1,
			'type': type,
			"per_page": 0,
		}

		appData._dataPost('/api/volunteer',body,(data)=>{
				this.setState({
					dataSource: data,
				})
		})
	}
	
	_render(rowData){
		let imgUri  = rowData.pic_path;
		let ss = imgUri.split(',');
		return (
					<TouchableOpacity style={{marginHorizontal:pxToDp(24), flexDirection:'row',alignItems:'center', justifyContent:'center', borderBottomColor:'#999',borderBottomWidth:pxToDp(1), paddingVertical: pxToDp(14)}}>
						<Image style={{marginTop:pxToDp(20), width:pxToDp(230),height: pxToDp(190)}} source={{uri: peruri +  '/storage/' + ss[0]}}/>
						<View style={{marginHorizontal:pxToDp(30)}}>
							<Text style={{width:pxToDp(400), fontSize:pxToDp(40), marginBottom:pxToDp(76)}}>{rowData.title}</Text>
							<View style={{flexDirection:'row', justifyContent:'space-between'}}>
								<View style={{justifyContent:'flex-end'}}>
									<Text style={{fontSize:pxToDp(14), color:'#999'}}>{rowData.pub_date}</Text>
								</View>
								<View style={{flexDirection:'row', justifyContent:'center'}}>
									<Image style={{width: pxToDp(42), height:pxToDp(42),marginRight:pxToDp(10)}} resizeMode='stretch' source={require('./../../assets/爱心icon@2x.png')}/>
									<Text style={{fontSize:pxToDp(36), color:'#999'}}>+</Text>
									<Text style={{fontSize:pxToDp(38), color:'#999'}}>{rowData.score}</Text>
								</View>
							</View>
						</View>
					</TouchableOpacity>
		)
	}

	_changePage(type){
		this.setState({
			dataSource: '',
		})
		if(type == 1){
			this.setState({
				borColor1: '#69bdd0ff',
				borColor2: '#69bdd000',
				borColor3: '#69bdd000',
			})
			this._getData(1)
		} else if(type == 2){
			this.setState({
				borColor1: '#69bdd000',
				borColor2: '#69bdd0ff',
				borColor3: '#69bdd000',
			})
			this._getData(2)
		} else if(type == 3){
			this.setState({
				borColor1: '#69bdd000',
				borColor2: '#69bdd000',
				borColor3: '#69bdd0ff',
			})
			this._getData(3)
		} 
	}

	render() {
		let dataSource1 = this.state.dataSource;
		return (
			<ScrollView style={styles.container}>
				<View style={{height:pxToDp(86), flexDirection:'row',backgroundColor:'#f2f2f2',  justifyContent:'space-between'}}>
					<TouchableOpacity style={{flexDirection:'row',width:pxToDp(120), alignItems: 'center', justifyContent: 'center'}} onPress={()=>this.props.backCtrl(false)}>
						<Image style={{height:pxToDp(48), width: pxToDp(48)}} source={require('./../../assets/arrow-left.png')} 	resizeMode="contain"/>
						<Text style={{fontSize:pxToDp(30)}}>返回</Text>
					</TouchableOpacity>
					<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
						<Text style={{fontSize: pxToDp(36)}}>往期活动</Text>
					</View>
					<View style={{width:pxToDp(120), alignItems: 'center', justifyContent: 'center'}}/>
				</View>
				<View>
					<View style={{height:pxToDp(100), flexDirection:'row',backgroundColor:'#999'}}>
						<TouchableOpacity style={{flex: 1, marginHorizontal: pxToDp(20), marginTop:pxToDp(20),alignItems:'center',borderBottomColor: this.state.borColor1 , borderBottomWidth:pxToDp(12)}} onPress={this._changePage.bind(this,1)}>
							<Text style={{width:pxToDp(180), textAlign:'center', color:'white', fontSize:pxToDp(34)}}>
								社区服务
							</Text>
						</TouchableOpacity>
						<TouchableOpacity style={{flex: 1, marginHorizontal: pxToDp(20), marginTop:pxToDp(20), alignItems:'center',borderBottomColor: this.state.borColor2 , borderBottomWidth:pxToDp(12)}} onPress={this._changePage.bind(this,2)}>
							<Text style={{width:pxToDp(180), textAlign:'center', color:'white', fontSize:pxToDp(34)}}>
								公益活动
							</Text>
						</TouchableOpacity>
						<TouchableOpacity style={{flex: 1, marginHorizontal: pxToDp(20), marginTop:pxToDp(20), alignItems:'center',borderBottomColor: this.state.borColor3 , borderBottomWidth:pxToDp(12)}} onPress={this._changePage.bind(this,3)}>
							<Text style={{width:pxToDp(180), textAlign:'center', color:'white', fontSize:pxToDp(34)}}>
								其他
							</Text>
						</TouchableOpacity>
					</View>
					<View style={{height: pxToDp(210 * dataSource1.length + 30)}}>
						<ListView 
							dataSource={this.state.ds.cloneWithRows(dataSource1)}
							enableEmptySections={true}
							renderRow = { this._render.bind(this)}
						/>
					</View>
				</View>
			</ScrollView>
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

module.exports = accumulate_active;