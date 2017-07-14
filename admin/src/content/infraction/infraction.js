import React,{Component} from 'react';
import {
	Layout, 
	Menu,
	Button,
	Breadcrumb, 
} from 'antd'
const { Content } = Layout;


export default class infraction extends Component{
	constructor(props){
		super(props);
		this.Router;
		this.mess = null;
	}

	componentWillMount(){
		this.Router = this.props.Router;
		this.mess = this.props.message;
		console.log(this.mess)
	}

	_jump(nextPage,mess){
		this.Router(nextPage,mess,this.mess.nextPage)
	}
	render(){
		return (
			<Layout style={{ padding: '0 24px 24px' }}>
				<Breadcrumb style={{ margin: '12px 0' }}>
				<Breadcrumb.Item>五违管理页面</Breadcrumb.Item>
				</Breadcrumb>
				<Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 80 }}>
					<div>
						<h2>五违管理页面</h2>

					</div>
				</Content>
			</Layout>
		)
	}
}