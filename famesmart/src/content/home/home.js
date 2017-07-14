import React,{Component} from 'react';
import {
	Layout, 
	Menu,
	Button,
	Breadcrumb, 
} from 'antd'

const { Content } = Layout;


export default class home extends Component{
	constructor(props){
		super(props);
		this.Router;
		this.mess;
	}

	componentWillMount(){
		this.Router = this.props.Router;
		this.mess = this.props.message;
	}

	_jump(nextPage,mess){
		console.log(nextPage,mess,this.mess.nextPage)
		this.Router(nextPage,mess,this.mess.nextPage)
	}

	render(){
		return (
			<Layout style={{ padding: '0 24px 24px' }}>
				<Breadcrumb style={{ margin: '12px 0' }}>
				<Breadcrumb.Item>Home</Breadcrumb.Item>
				<Breadcrumb.Item>List</Breadcrumb.Item>
				<Breadcrumb.Item>App</Breadcrumb.Item>
				</Breadcrumb>
				<Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 80 }}>
					<div>
						<h2>首页</h2>
						<Button type="primary" onClick={() => this._jump('point',1111)}>积分页面</Button>
					</div>
				</Content>
			</Layout>
		)
	}
}