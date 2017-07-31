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
			<Row type="flex" justify="space-between">
				<Col>
					<image className="logo"/>
					<h1 style={{color: 'white', }}>社区积分管理系统</h1>
				</Col>
				<Col>
					<span style={{color: 'white', marginRight: 20}}>所在社区：{this.state.comm_name}</span>
					<span style={{color: 'white', marginRight: 20}}>操作员：{this.state.user_id}</span>
				</Col>
			</Row>
		</Header>
		)
	}
}