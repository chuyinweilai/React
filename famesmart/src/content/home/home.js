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

import Active from './active/active.js'
import {
	Accumulate_list,
	Accumulate_date,
	Accumulate_exchange,
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
			<Layout id="home-box">
				<Row type="flex" justify="space-between" gutter={1}>
					<Col span={2} className="printHidden">
						<text style={{fontSize: 24, color: '#1e8fe6', padding:'24px'}}>首页</text>
					</Col>
				</Row>

				<Content style={{ padding: "9px" }}>
					<Row gutter={16} style={{marginBottom:16}}>
						<Col span = {12}>
							 <Accumulate_list/> 
						</Col>
						<Col span = {12}>
							  <Accumulate_exchange/>  
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