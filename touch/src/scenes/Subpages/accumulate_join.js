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

export default class accumulate_join extends Component {
	constructor(props) {
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

		super(props);
		this.state = {
			ds:ds,
			dataSource1:[],
		};
		this.date = ''
	}

	componentWillMount(){
		appData._Storage('get','userMess',(data)=>{
			let json = JSON.parse(data);
			let  body ={
				"wx_id": json.wx_id,
				"comm_code": json.comm_code
			}
			appData._dataPost('/api/volunteer/mine', body,this._getEvent.bind(this));
		});
	}

	_getEvent(data){
		this.setState({
			dataSource1: data
		})
	}
	
	_render(rowData){
		let imgUri  = rowData.pic_path;
		let ss = imgUri.split(',');
		return(
			<TouchableOpacity style={{height:pxToDp(224), flexDirection:'row',alignItems:'center', justifyContent:'center', borderBottomColor:'#999',borderBottomWidth:pxToDp(1)}} onPress={() => this.props.backCtrl('accumulate_details',rowData )}>
				<View style={{marginHorizontal:pxToDp(30)}}>
					<Text style={{width:pxToDp(400), fontSize:pxToDp(40), marginVertical:pxToDp(26), color:'#999'}}>{rowData.title}</Text>
					<View style={{paddingVertical:pxToDp(11),flexDirection:'row', justifyContent:'space-between'}}>
						<View style={{flexDirection:'row', justifyContent:'center'}}>
							<Image style={{width: pxToDp(42), height:pxToDp(42),marginRight:pxToDp(10)}} resizeMode='stretch' source={require('./../../assets/爱心icon@2x.png')}/>
							<Text style={{fontSize:pxToDp(36), color:'#999'}}>+</Text>
							<Text style={{fontSize:pxToDp(38), color:'#999'}}>{rowData.score}分</Text>
						</View>
						<View style={{justifyContent:'flex-end'}}>
							<Text style={{fontSize:pxToDp(14), color:'#999'}}>{rowData.open_date}</Text>
						</View>
					</View>
				</View>

				<Image style={{marginVertical:pxToDp(20), width:pxToDp(230),height: pxToDp(190)}} source = {{uri: peruri +  '/storage/'  + ss[0]}}/>
			</TouchableOpacity>
		)
	}

	render() {
		let dataSource1  = this.state.dataSource1;
		return (
			<ScrollView style={styles.container}>
				<View style={{height:pxToDp(86), flexDirection:'row',backgroundColor:'#f2f2f2',  justifyContent:'space-between'}}>
					<TouchableOpacity style={{width:pxToDp(120), flexDirection:'row', alignItems: 'center', justifyContent: 'center'}} onPress={() => this.props.backCtrl(false)}>
						<Image style={{height:pxToDp(48), width: pxToDp(48)}} source={require('./../../assets/arrow-left.png')} 	resizeMode="contain"/>
						<Text style={{fontSize:pxToDp(30)}}>返回</Text>
					</TouchableOpacity>
					<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
						<Text style={{fontSize: pxToDp(36)}}>我参与的</Text>
					</View>
					<View style={{width:pxToDp(120), alignItems: 'center', justifyContent: 'center'}}/>
				</View>
				<View>
					<View style={{height: pxToDp(224*dataSource1.length)}}>
						<ListView 
							dataSource={this.state.ds.cloneWithRows(dataSource1)}
							enableEmptySections = {true}
							renderRow = {this._render.bind(this)}
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

module.exports =accumulate_join;