import React,{Component} from 'react';
import {
	Layout, 
	Input,
	Menu,
	Button,
	Breadcrumb, 
	Popconfirm,
} from 'antd'
import ATable from './aTable'
import  '../../../App.css'

const { Content } = Layout;

export default class volunteer_edit extends Component{
	constructor(props){
		super(props);
		this.Router;
		this.mess = null;
	}

	componentWillMount(){
		this.Router = this.props.Router;
		this.mess = this.props.message;
	}

	_jump(nextPage,mess){
		this.Router(nextPage,mess,this.mess.nextPage)
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