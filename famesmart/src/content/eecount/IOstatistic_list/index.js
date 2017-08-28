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

export default class IOstatistic_list extends Component{
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

	_print(){
		window.print();
	}

	render(){
		return (
			<Layout style={{ minHeight: 80, background: '#fff', padding: '24px 48px 48px' }}>
				<Row type="flex" justify="space-between" gutter={1}>
					<Col  className="printHidden">
						<text style={{fontSize: 24, color: '#aaa'}}>门禁管理/</text>
						<text style={{fontSize: 24, color: '#1e8fe6'}}>统计记录</text>
					</Col>
					<Col className="printHidden">
						<Button style={{height: 32}} onClick={()=>window.print()}>打印</Button>
					</Col>
				</Row>
				<Content>
					<ATable  message={this.mess} Router={this.Router}/>
				</Content>
			</Layout>
		)
	}
} 