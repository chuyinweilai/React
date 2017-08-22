import React, { Component } from 'react';
import './App.css';

import { 
Layout, 
Menu, 
Icon,
Button,
Breadcrumb,
notification,
} from 'antd';

import Headers from './components/Layout/header';
import Siders from './components/Layout/sider';
import Router from './content/Router';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
class App extends Component {
	constructor(props){
		super(props);
		this.state={
			collapsed:false,
			message:{
				nextPage: 'login',
				historyPage: '',
				mess:'',
			},
		}
	}

	componentWillMount(){
		setInterval(()=>{
			let time = 2000*Math.random()
			setTimeout(()=>{
				this._onNotification()
			},time)
		},10000)
	}

	_Router(nextPage,mess,historyPage){
		let obj= {
			nextPage: nextPage,
			historyPage: historyPage,
			message: mess
		}
		this.setState({
			message: obj
		})
	}

	onCollapse(collapsed) {
		this.setState({ collapsed });
	}

	_onNotification (){
		let  a = Math.ceil(Math.random()*10);
		let title = '';
		let note = ''
		if(a < 3 ){
			title =  '五违报警';
			note = "发现车辆违规停靠";
		} else if(a>=3 && a < 6){
			title = '文明报警'
			note = "发现草地违规占用";
		} else if( a>=6){
			title = '设备报警'
			note = "B区摄像头离线";
		}
		notification.open({
			message: title,
			description: note,
			placement:'bottomRight',
			icon: <Icon type="close-circle" style={{ color: '#f04134' }} />,
		});
	}

	render() {
		if(this.state.message.nextPage === "login"){
			return ( 
				<Layout>
					<Router message={this.state.message} Router={(nextPage,mess,historyPage) => this._Router(nextPage,mess,historyPage)}/>
				</Layout>
			);
		} else {
			return ( 
				<Layout>
					<Header className="header printHidden">
						<Headers className="header printHidden">
						</Headers>
					</Header>
					<Layout style={{backgroundColor:'#fff'}}>
						<Sider 
							collapsible = 'true'
							collapsed={this.state.collapsed}
							onCollapse={this.onCollapse.bind(this)}
							width={200} 
							className="siders printHidden"
							>
							<Siders message={this.state.message} Router={(nextPage,mess, historyPage) => this._Router(nextPage,mess,historyPage)}>
							</Siders>
						</Sider>
						<Router message={this.state.message} Router={(nextPage,mess,historyPage) => this._Router(nextPage,mess,historyPage)}/>
					</Layout>
				</Layout>
			);
		}
	}
}
export default App;
