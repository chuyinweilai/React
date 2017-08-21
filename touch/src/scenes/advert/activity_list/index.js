
import React,{Component} from 'react';
import {
	Text,
	View,
	ListView,
	StyleSheet,
} from 'react-native';
const appData = require('./../../../components/Ajax');
export default class activity_list extends Component{
	constructor(props){
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

		this.state={
			ds: ds,
			dataSource:[]
		}
		this.userMess = {};
	}

	componentWillMount(){
		this._getEvent()
	}

	_getEvent(){
		let afteruri = '/api/vcity/scoresheet';
		let body = {
			comm_code: 'M0001',
		}
		appData._dataPost(afteruri, body, (res) =>{
			this.setState({
				dataSource: res.data,
			})
		})
		setTimeout(()=>{
			this._getEvent()
		},3600000)
		
	}

	_render(row){
		let mobile = row.mobile;
		return (
			<View style={{height: "0.7rem", flexDirection: 'row', alignItems:'center', justifyContent:'center', borderBottomWidth: 2, borderColor: 'white'}}>
				<View style={{flex: 1}}>
					<Text style={styles.text}>{row.name}</Text>
				</View>
				<View style={{flex: 1}}>
					<Text style={styles.text}>{mobile.substring(0,3)}****{mobile.substring(7,11)}</Text>
				</View>
				<View style={{flex: 1}}>
					<Text style={styles.text}>{row.score}</Text>
				</View>
			</View>
		)
	}

	render(){
		return(
			<View style={styles.containbox}>
				<View style={styles.titles}>
					<Text style={{fontSize: '0.3rem', color: 'white',fontFamily: 'SimHei', }}>志愿者积分排名</Text>
				</View>
				<View style={{flex: 1, paddingHorizontal: '0.1rem'}}>
					<View style={{flexDirection: 'row', height: "0.4rem",justifyContent:'center', borderBottomWidth: 3, borderColor: 'white'}}>
						<View style={{flex: 1, alignItems: 'center'}}>
							<Text style={styles.listText}>姓名</Text>
						</View>
						<View style={{flex: 1, alignItems: 'center'}}>
							<Text style={styles.listText}>手机号</Text>
						</View>
						<View style={{flex: 1, alignItems: 'center'}}>
							<Text style={styles.listText}>积分</Text>
						</View>
					</View>
					<ListView
						enableEmptySections = {true}
						dataSource={this.state.ds.cloneWithRows(this.state.dataSource)}
						renderRow={this._render.bind(this)}
					/>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	containbox:{
		flex: 1,
		// alignItems: 'center',
	},
	titles:{
		margin: '0.2rem',
		paddingVertical: '0.1rem',
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 3,
		borderRadius: '0.1rem',
		borderColor: 'white'
	},
	listText:{
		fontSize: '0.22rem',
		lineHeight: '0.4rem',
		color: 'white',
		fontFamily: 'SimHei',
	},
	text:{
		fontSize: '0.17rem',
		textAlign: 'center',
		color: 'white',
		fontFamily: 'SimHei',
	}
})
