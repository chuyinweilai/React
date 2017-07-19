import React,{Component} from 'react';
import {
	Layout, 
	Input,
	Menu,
	Button,
	Breadcrumb, 
	Popconfirm, 
	Row, 
	Col
} from 'antd'
import ATable from './aTable'
import appData from './../../../assert/Ajax';
const { Content  } = Layout;


export default class volunteer_ative extends Component{
	constructor(props){
		super(props);
		this.state ={

		};
		this.Router;
		this.mess = null;
		this.userMess = {}
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
				<Breadcrumb.Item>志愿者活动</Breadcrumb.Item>
				<Breadcrumb.Item>活动管理</Breadcrumb.Item>
				</Breadcrumb>
				<Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 80 }}>
					<Row type="flex" justify="space-between" >
						<Col span={8}>所在社区</Col>
						<Col span={3}>
								<Button style={{marginRight: 10}}  >新增活动</Button>
								<Button onClick={()=>{window.print()}}>打印</Button>
					</Col>
					</Row>
					<Row>
						<Col span={8} style={{margin:'10px'}}> </Col>
					</Row>
					<ATable />
				</Content>
			</Layout>
		)
	}
}