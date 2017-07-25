
import React, { PropTypes,Component } from 'react';
import { 
	Col,
	Row ,
	Icon, 
	Table, 
	Input, 
	Menu, 
	Button, 
	Pagination,
	Dropdown,
	Popconfirm, 
} from 'antd'

import ACell from './aCell';
import appData from './../../../assert/Ajax'
import '../../../App.css'

const { Column, ColumnGroup } = Table;



// const data = [
// 	{
// 		name:'Miku',	
// 		id:1,
// 		num:'1',
// 		room:'2',
// 		cardID:3,
// 		startData:'2017/7/14',
// 		endData:'2017/7/15',
// 		root: '1,2,3,4,5,',
// 	}
// ];
export default class pointTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [],
			pageCtrl: true,
			comm_name:0,
			activity_no:0,
			title:'',
			count: 1,
			pageNum:1,
			total:0,
		};
		// 编号	手机	姓名	性别	IC卡号	职业	业主/租客	操作

		this.columns = [
			{
				title: '编号',
				dataIndex: 'name',
				colSpan:1,
			},
			{
				title: '手机',
				colSpan:1,
				dataIndex: 'id',
			}, 
			{
				title: '姓名',
				colSpan:1,
				dataIndex: 'num',
			}, 
			{
				title: '性别',
				colSpan:1,
				dataIndex: 'room',
			},
			{
				title: 'IC卡号',
				colSpan:1,
				dataIndex: 'cardID',
			},
			{
				title: '职业',
				colSpan:1,
				dataIndex: 'startData',
			},
			{
				title: '业主/租客',
				colSpan:1,
				dataIndex: 'endData',
			},
			{
				colSpan:1,
				title:"操作",
				key:"action",
				render:(text, record)=>(
					<span>
						<Button>签到</Button>
					</span>
				)
			},
		];
		this.activeMess = null;
	}

	componentWillMount(){
		let mess = this.props.message.message
		this.activeMess = mess;
		this.setState({
			// comm_name: mess.comm_name,
			activity_no:  mess.activity_no,
			title: mess.title,
		})
		appData._Storage('get','userMess',(res) => {
			this._login(res,mess)
			this.setState({
				comm_name: res.comm_name,
			})
		})
	}

	_login(data,mess){
		let afteruri = 'activity/check'
		let body = {
			comm_code: mess.comm_code,
			activity_no:mess.activity_no,
		}
		appData._dataPost(afteruri, body, (res) =>{
			console.log(res)
			let pageSum = Math.ceil(res.length/res.per_page)
			let len = res.length;
			this.setState({
				pageCtrl: true,
				dataSource: res,
				total:res.length,
				count:len,
			})
		})
	}

	_jump(nextPage,mess){
		if(nextPage == 'back'){
			this.props.Router(this.props.message.historyPage,mess,this.props.message.nextPage)
		}else {
			this.props.Router(nextPage,mess,this.props.message.nextPage)
		}
	}

	_showPage(){
		if(this.state.pageCtrl){
			<Table bordered columns={this.columns} dataSource={this.state.dataSource} />
		} else {

		}
	}

	//分页器activity/list?page=num
	_pageChange(pageNumber){
		let userMess = this.userMess;
		let afteruri = 'activity/check?page=' + pageNumber ;
		let body = {
			 "comm_code": userMess.comm_code
		}
		appData._dataPost(afteruri,body,(res) => {
			let pageSum = Math.ceil(res.total/res.per_page)
			let data = res.data;
			let len = data.length;
			this.setState({
				total:res.total,
				dataSource: data,
				count:len,
				pageNum:pageNumber
			})
		})
	}

	render() {
		return (
			<div>
				<Row style={{marginBottom: 20}}>
					<Col span={8}>所在社区：{this.state.comm_name}</Col>
					<Col span={8}>活动编号：{this.state.activity_no}</Col>
					<Col span={8}>活动主题：{this.state.title}</Col>
				</Row>
				<Table bordered columns={this.columns} dataSource={this.state.dataSource} pagination={false}/>
				<Row type="flex" justify="end">
					<Pagination showQuickJumper defaultCurrent={1} current={this.state.pageNum} total={this.state.total} onChange={this._pageChange.bind(this)} />
				</Row>
			</div>
		);
	}
}