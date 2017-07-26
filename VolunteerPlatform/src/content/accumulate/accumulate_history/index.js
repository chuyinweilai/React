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

export default class accumulate_history extends Component{
	constructor(props){
		super(props);
		this.state = {
			comm_name:"",
			mobile:0,
			name:'',
		}
		this.Router;
		this.mess = null;
	}

	componentWillMount(){
		this.Router = this.props.Router;
		this.mess = this.props.message;
		console.log(this.mess)
		appData._Storage('get', "userMess",(res) =>{
			this.setState({
				comm_name: res.comm_name,
				mobile: this.mess.message.mobile,
				name: this.mess.message.name,
			})
		})
	}

	_jump(nextPage,mess){
		if(nextPage == 'back'){
			this.Router(this.mess.historyPage,mess,this.mess .nextPage)
		}else {
			this.Router(nextPage,mess,this.mess.nextPage)
		}
	}
	render(){
		return (
			<Layout style={{ padding: '0 24px 24px' }}>
				<Breadcrumb style={{ margin: '12px 0' }} className="printHidden">
				<Breadcrumb.Item>活动积分</Breadcrumb.Item>
				<Breadcrumb.Item>积分列表</Breadcrumb.Item>
				<Breadcrumb.Item>兑换历史</Breadcrumb.Item>
				</Breadcrumb>
				<Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 80 }}>
					<Row type="flex" justify="space-between" gutter={1}>
						<Col span={3}>
							<Button onClick={()=>this._jump('back')}>返回</Button>
							<div>
								所在社区:{this.state.comm_name}
							</div>
							<div>
								手机:{this.state.mobile}
							</div>
							<div>
								姓名:{this.state.name}
							</div>
						</Col>
						<Col span={2} className="printHidden">
								<Button onClick={() => this._print()}>打印</Button>
						</Col>
					</Row>
					<Row>
						<Col span={8} style={{margin:'10px'}}> </Col>
					</Row>
					<ATable  message={this.mess} Router={this.Router}/>
				</Content>
			</Layout>
		)
	}
}