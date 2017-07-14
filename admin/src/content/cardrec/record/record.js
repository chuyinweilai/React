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

const { Content } = Layout;


export default class record extends Component{
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
				<Breadcrumb.Item>刷卡管理</Breadcrumb.Item>
				<Breadcrumb.Item>刷卡记录</Breadcrumb.Item>
				</Breadcrumb>
				<Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 80 }}>
					<div>
						<h2>刷卡记录</h2>
					</div>
					<ATable />
				</Content>
			</Layout>
		)
	}
}