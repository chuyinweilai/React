import React,{Component} from 'react';
import {
	Row,
	Col,
	Layout, 
	Menu,
	Button,
	Breadcrumb, 
} from 'antd'
import '../../App.css'
import "./home.css"

import Active from './active'
import {
	Accumulate_list,
	Accumulate_date,
} from './accumulate'
import {
	Volunteer_new,
	Volunteer_change,
} from './Volunteer'


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
		this.Router(nextPage,mess,this.mess.nextPage)
	}

	render(){
		return (
			<Layout className="gutter-example">
				<Breadcrumb style={{ margin: '12px 0' }}>
					<Breadcrumb.Item>首页</Breadcrumb.Item>
				</Breadcrumb>
				<Content>
					<Row gutter={16} style={{marginBottom: 12}}>
						<Col span={12} >
								<Accumulate_date/>
						</Col>
						<Col span={12}>
							<Accumulate_list/>
						</Col>
					</Row>

					<Row gutter={16}>
						<Col span={7} >
								<Active/>
						</Col>
						<Col span={10}>
								<Row gutter={16} style={{height: 358,}}>
									<div style={{marginBottom: 12}}>
										<Volunteer_change/>
									</div>
									<div  style={{marginBottom: 12}}>
										<Volunteer_new/>
									</div>
								</Row>
						</Col>
						<Col span={7}>
							<Accumulate_date/>
						</Col>
					</Row>
				</Content>
			</Layout>
		)
	}
}