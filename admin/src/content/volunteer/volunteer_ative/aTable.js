
import React, { PropTypes,Component } from 'react';
import { 
	Table, 
	Input, 
	Icon, 
	Button, 
	Row,
	Col,
	Popconfirm, 
	Menu, 
	Dropdown 
} from 'antd'
import appData from './../../../assert/Ajax';
import ACell from './aCell';

require('./index.css');
export default class pointTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [],
			count: 1,
		};
		this.columns = [
			{
				title: 'ID',
				dataIndex: 'id',
				// render:
				// width: '20px',
				render:(text,record,index) => {
					console.log(record,index)
					// let text = record
					return(
						<text>{index}</text>
					)
				}
			},
			{
				title: '活动编号',
				dataIndex: 'activity_no',
  				// sorter: true,
  				// render: name => `${name.first} ${name.last}`,
				// width: '100px',
			},
			{
				title: '活动日期',
				dataIndex: 'open_date',
  				colSpan: 1,
				// width: '100px',
			}, 
			{
				title: '活动类型',
				dataIndex: 'type',
				// width: '100px',
				render:(text,record) => {
					console.log(text)
					let test = ''
					// 	1:社区服务
					// 2:公益活动
					// 3:其他

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
				title: '活动积分',
				dataIndex: 'score',
				// width: "100px",
			},
			{
				title: '活动主题',
				dataIndex: 'title',
				// width: '100px',
			},
			{
				title: '活动内容',
				dataIndex: 'detail',
				// width: '200px',
				render:(text,record) => (<text  className="active_content">{text}</text>)
			},
			{
				title: '人数限制',
				dataIndex: 'join_limit',
				// width: '100px',
			},
			{
				title: '报名开始',
				dataIndex: 'vld_start',
				// width: '100px',
			},
			{
				title: '报名截止',
				dataIndex: 'vld_end',
				// width: '100px',
			},
			{
				title: '活动状态',
				dataIndex: 'vld_flag',
				// width: '100px',
			},
			{
				title: '报名人数',
				dataIndex: 'join_cnt',
				// width: '100px',
			},
			{
				title: '签到人数',
				dataIndex: 'sign_cnt',
				// width: '100px',
			},
			{
				title:"操作",
				key:"action",
  				// colSpan: 3,
				render:(text, record)=>(
					<Row type="flex" justify="space-between">
						<Button onClick={() =>this._action('sign')}>签到</Button>
						<Button onClick={() =>this._action('change')}>修改</Button>
						<Button onClick={() =>this._action('refuse')}>取消</Button>
					</Row>
				)
			}
		];
	}

	componentWillMount(){
		console.log("active")
		appData._Storage('get',"userMess",(res) =>{
			console.log(res)
			this.userMess = res
			this._getEvent()
		})
	}

	//获取后台信息
	_getEvent(){
		let userMess = this.userMess;
		let afteruri = 'activity/list';
		let body = {
			 "comm_code": userMess.comm_code
		}
		appData._dataPost(afteruri,body,(res) => {
			let data = res.data;
			let len = data.length;
			this.setState({
				dataSource: data,
				count:len,
			})
		})
	}
	

	render() {
		const { dataSource } = this.state;
		let columns = this.columns;
		return (
		<div>
			 <Table bordered 
			 //pagination={{ pageSize: 50 }} scroll={{ y: 600 }} 
			 dataSource={this.state.dataSource} 
			 columns={columns} rowKey='key'/> 
		</div>
		);
	}
}