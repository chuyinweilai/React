import React, { Component } from 'react';
import './App.css';

import { 
Layout, 
Menu, 
Icon,
Button,
Breadcrumb,
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
