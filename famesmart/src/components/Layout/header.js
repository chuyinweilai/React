import React,{Component} from 'react';
import {Row, Col, Layout, Menu, Breadcrumb, Icon} from 'antd'
import appData from './../../assert/Ajax';

const { Header } = Layout;

export default class headers extends Component{
	constructor(props){
		super(props);
		this.state={
			comm_name:'',
			userNmae:'',
		}
	}
	componentWillMount(){
		appData._Storage('get',"userMess",(res) =>{
			this.setState({
				comm_name: res.comm_name,
				user_id: res.name
			})
		})
	}

	render(){
		return (
		<Header className="header" style={{padding: 0}}>
				<span style={{float:'left'}}>
					<img style={{width:100, height: 30, display:'inline-block', margin: 10, marginTop: 20}} className="logo" src="./icon/LOGO.png"/> 
				</span>
				<span style={{float:'left'}}>
					<text style={{color: 'white', fontSize: 30, display:'inline-block'}}>智慧社区管理平台</text> 
				</span>
				<span style={{float:'right'}}>
					<span style={{color: 'white', marginRight: 20}}>所在社区：{this.state.comm_name}</span>
					<span style={{color: 'white', marginRight: 20}}>操作员：{this.state.user_id}</span>
				</span>
		</Header>
		)
	}
}