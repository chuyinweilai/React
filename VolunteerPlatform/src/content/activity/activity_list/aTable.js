
import React, { PropTypes,Component } from 'react';
import { 
	Table, 
	Input, 
	Icon, 
	Button, 
	Row,
	Col,
	Popconfirm, 
	Pagination,
	Menu, 
	Dropdown 
} from 'antd'
import appData from './../../../assert/Ajax';
import '../../../App.css'

require('./index.css');
export default class pointTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [],
			count: 1,
			total:0,
			listMess:{},
			pageSum:1,
			pageNum:1,
		};

		this.columns = [
			{
				colSpan:1,
				title: 'ID',
				render:(text,record,index) => {
					return(
						<text>{index}</text>
					)
				}
			},
			{
				colSpan:1,
				title: '活动编号',
				dataIndex: 'activity_no',
			},
			{
  				colSpan: 1,
				title: '活动日期',
				dataIndex: 'open_date',
			}, 
			{
				colSpan:1,
				title: '活动类型',
				dataIndex: 'type',
				render:(text,record) => {
					let test = ''
					if(text === 1 ){
						test = '社区服务'
					} else if(text === 2){
						test = '公益活动'
					} else if(text === 3){
						test = '其他'
					}
					return <div>{test}</div>
				}
			}, 
			{
				colSpan:1,
				title: '活动积分',
				dataIndex: 'score',
			},
			{
				colSpan:1,
				title: '活动主题',
				dataIndex: 'title',
			},
			{
				colSpan:1,
				title: '活动内容',
				dataIndex: 'detail',
				width: '300px',
				render:(text,record) => {
					if(text.length > 20){
						let str = text.substring(-1,20);
						return (
							<text>{str}......</text>
						)
					} else {
						return (
							<text>{text}</text>
						)
					}
				}
			},
			{
				colSpan:1,
				title: '人数限制',
				dataIndex: 'join_limit',
			},
			{
				colSpan:1,
				title: '报名开始',
				dataIndex: 'vld_start',
			},
			{
				colSpan:1,
				title: '报名截止',
				dataIndex: 'vld_end',
			},
			{
				colSpan:1,
				title: '活动状态',
				dataIndex: 'vld_flag',
				render:(text,record) => {
					let test = ''

					if(text === 1 ){
						test = '有效'
					} else if(text === 2){
						test = '无效'
					}
					return <div>{test}</div>
				}
			},
			{
				colSpan:1,
				title: '报名人数',
				dataIndex: 'join_cnt',
			},
			{
				colSpan:1,
				title: '签到人数',
				dataIndex: 'sign_cnt',
			},
			{
				title:"操作",
				key:"action",
  				colSpan: 3,
				render:(text, record)=>{
					return (
						<Row type="flex" justify="space-between">
							<Button onClick={() =>this._action('sign',record)}>签到</Button>
							<Button onClick={() =>this._action('change',record)}>修改</Button>
							<Button onClick={() =>this._action('refuse',record)}>取消</Button>
						</Row>
					)
				}
			}
		];
		
		this.Router;
		this.mess = null;
	}

	componentWillMount(){
		this.Router = this.props.Router;
		this.mess = this.props.message;
		appData._Storage('get',"userMess",(res) =>{
			this.userMess = res
			this._getEvent()
		})
	}

	_jump(nextPage,mess){
		this.Router(nextPage,mess,this.mess.nextPage)
	}

	//获取后台信息
	_getEvent(){
		let userMess = this.userMess;
		let afteruri = 'activity/list';
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
			})
		})
	}
	
	//操作栏功能
	_action(type,mess){
		if(type=== "sign"){
			this._jump('activity_sign', mess)
		} else if(type === "change"){
			this._jump('activity_add', mess)
		}else if(type === "refuse"){
			
		}
	}

	//分页器activity/list?page=num
	_pageChange(pageNumber){
		let userMess = this.userMess;
		let afteruri = 'activity/list?page=' + pageNumber ;
		
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
		const { dataSource } = this.state;
		let columns = this.columns;
		return (
		<div>
			 <Table 
				bordered 
				dataSource={dataSource} 
				columns={columns} 
				rowKey='key' 
				pagination={false}/> 
			 <Row type="flex" justify="end">
			 	<Pagination
					showQuickJumper 
					defaultCurrent={1} 
					current={this.state.pageNum} 
					total={this.state.total} 
					onChange={this._pageChange.bind(this)} />
			 </Row>
		</div>
		);
	}
}