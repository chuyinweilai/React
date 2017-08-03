
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
import '../../../index.css'

export default class unitlist_record extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [
				{
					floor: 3,
					room: 4,
					mobile:123456,
					user_num: 5,
					qr_sum: 6,
					qr_used: 7,
					qr_percent: 8
				}
			],
			count: 1,
			total:0,
			listMess:{},
			pageSum:1,
			pageNum:1,
		};
		this.Router;
		this.mess = null;
		this.activeMess;

		this.columns = [
			{
				title:'ID',
				dataIndex: 'ID',
				render:(text,record,index)=>(
					<text>{index+1}</text>
				)
			},
			{
				colSpan: 1,
				title:'楼层',
				dataIndex:'floor',
			},
			{
				colSpan: 1,
				title:'房间',
				dataIndex:'room',
			},
			{
				colSpan: 1,
				title:'户主手机',
				dataIndex:'mobile',
			},
			{
				colSpan: 1,
				title:'二维码总数',
				dataIndex:'qr_sum',
			},
			{
				colSpan: 1,
				title:'二维码分享数',
				dataIndex:'qr_used',
			},
			{
				colSpan: 1,
				title:'使用比例',
				dataIndex:'qr_percent',
			},{
				colSpan: 1,
				title:'操作',
				dataIndex:'action',
				render:(text,record)=>(
					<Button onClick={()=>this._action('detail',record)}>详细2</Button>
				)
			}
		];
	}

	componentWillMount(){
		this.Router = this.props.Router;
		this.mess = this.props.message;
		let mess = this.props.message.message
		this.activeMess = mess;
		appData._Storage('get',"userMess",(res) =>{
			this.setState({
				comm_name: res.comm_name
			})
			this.userMess = res
			// this._getEvent()
		})
	}

	//顶部操作功能
	_addAct(type, mess){
		if(type=== "detail"){
			// this._jump('activity_sign', mess)
		}
	}

	_jump(nextPage,mess){
		this.props.Router(nextPage,mess,this.props.message.nextPage)
	}

	//获取后台信息
	_getEvent(){
		let userMess = this.userMess;
		let afteruri = 'cards/unitlist';
		let body = {
			"comm_code": userMess.comm_code,
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
	_action(type,mess,e){
		if(type === "detail"){
			this._jump('room_record',mess)
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
		<div style={{background: '#fff', flex: 1,padding: 24,margin: 0,minHeight: 80}}>
			<Row type="flex" justify="space-between" gutter={1}>
				<Col  className="printHidden"> 
					<text style={{fontSize: 24, color: '#1e8fe6'}}>二维码分享记录</text>
				</Col>
				<Col className="printHidden">
						<Button  style={{height: 32}} onClick={() => window.print()}>打印</Button>
				</Col>
			</Row>
			<Row>
					<Col>
						<Button style={{height: 32, margin: 10}} onClick={()=>this._jump('QRcode_record')}>返回</Button>
						<Row>
							<Col span={8} style={{margin:'10px'}}> 
								活动编号：{this.state.activity_no}
							</Col>
							<Col span={8} style={{margin:'10px'}}> 
								活动主题：{this.state.title}
							</Col>
						</Row>
					</Col>
			</Row>
			<Table 
			bordered 
			dataSource={dataSource} 
			columns={columns} 
			rowKey='key' 
			pagination={false}/> 
			
			<Row style={{marginTop:20}} type="flex" justify="end">
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