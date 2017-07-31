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
import '../../../App.css'
import appData from './../../../assert/Ajax';

const { Content } = Layout;

export default class accumulate_history extends Component{
	constructor(props){
		super(props);
		this.state = {
			comm_name:"",
			mobile:0,
			name:'',
		}
		this.Router;
		this.mess = null;
	}

	componentWillMount(){
		this.Router = this.props.Router;
		this.mess = this.props.message;
		appData._Storage('get', "userMess",(res) =>{
			this.setState({
				comm_name: res.comm_name,
				mobile: this.mess.message.mobile,
				name: this.mess.message.name,
			})
		})
	}
	render(){
		return (
			<Layout style={{ padding: '0 24px 24px' }}>
				<Breadcrumb style={{ margin: '12px 0' }} className="printHidden">
				<Breadcrumb.Item>活动积分</Breadcrumb.Item>
				<Breadcrumb.Item>兑换历史</Breadcrumb.Item>
				</Breadcrumb>
				<Content>
					<ATable  message={this.mess} Router={this.Router}/>
				</Content>
			</Layout>
		)
	}
}