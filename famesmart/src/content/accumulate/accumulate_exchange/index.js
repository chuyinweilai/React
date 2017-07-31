import React,{Component} from 'react';
import {
	Row,
	Col,
	Layout, 
	Input,
	Menu,
	Button,
	Breadcrumb, 
	Popconfirm,
} from 'antd'
import ATable from './aTable'
import appData from './../../../assert/Ajax';
import '../../../App.css'

const { Content } = Layout;

export default class accumulate_exchange extends Component{
	constructor(props){
		super(props);
		this.Router;
		this.mess = null;
	}

	componentWillMount(){
		this.Router = this.props.Router;
		this.mess = this.props.message;
		appData._Storage('get', "userMess",(res) =>{
			this.setState({
				comm_name: res.comm_name
			})
		})
	}

	_jump(nextPage,mess){
		this.Router(nextPage,mess,this.mess.nextPage)
	}
	render(){
		return (
			<Layout style={{ padding: '0 24px 24px' }}>
				<Breadcrumb style={{ margin: '12px 0' }} className="printHidden">
				<Breadcrumb.Item>活动积分</Breadcrumb.Item>
				<Breadcrumb.Item>积分列表</Breadcrumb.Item>
				<Breadcrumb.Item>积分兑换</Breadcrumb.Item>
				</Breadcrumb>
				<Content>
 					<ATable  message={this.mess} Router={this.Router}/> 
				</Content>
			</Layout>
		)
	}
}