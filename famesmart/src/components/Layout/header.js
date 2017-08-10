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
				user_id: res.user_id
			})
		})
	}

	render(){
		return (
		<Header className="header" >
			<Row>
				<Col span={4}>
					 <img style={{margin:10,width: '80%', height: 40, display:'inline-block'}} className="logo" src="./icon/LOGO.jpg"/> 
				</Col>
				<Col span={13}>
					<text style={{color: 'white', fontSize: 30, display:'inline-block'}}>智慧社区管理平台</text> 
				</Col>
				<Col span={5}>
					<span style={{color: 'white', marginRight: 20}}>所在社区：{this.state.comm_name}</span>
					<span style={{color: 'white', marginRight: 20}}>操作员：{this.state.user_id}</span>
				</Col>
			</Row>
		</Header>
		)
	}
}