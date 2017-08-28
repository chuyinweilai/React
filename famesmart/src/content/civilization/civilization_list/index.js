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

export default class civilization_list extends Component{
	constructor(props){
		super(props);
		this.state={
			comm_name:'',
		}
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

	_print(){
		window.print();
	}

	render(){
		return (
			<Layout style={{ minHeight: 80, background: '#fff', padding: '24px 48px 48px' }}>
				<Content>
					<ATable  message={this.mess} Router={this.Router}/>
				</Content>
			</Layout>
		)
	}
} 