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

export default class exchange_list extends Component{
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

	render(){
		return (
			<Layout style={{ padding: '0 24px 24px' , backgroundColor: 'white'}}>
					<ATable  message={this.mess} Router={this.Router}/>
			</Layout>
		)
	}
} 