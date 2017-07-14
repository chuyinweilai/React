import React,{Component} from 'react';
import {
	Layout, 
	Input,
	Menu,
	Button,
	Breadcrumb, 
	Popconfirm,
} from 'antd'

const { Content } = Layout;


export default class civilization extends Component{
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
			<Layout style={{ padding: '0 24px 24px' }}>
				<Breadcrumb style={{ margin: '12px 0' }}>
				<Breadcrumb.Item>文明管理</Breadcrumb.Item>
				</Breadcrumb>
				<Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 80 }}>
					<div>
						<h2>文明管理</h2>
					</div>
				</Content>
			</Layout>
		)
	}
}