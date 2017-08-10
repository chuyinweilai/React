
import React, { PropTypes,Component } from 'react';
import { 
	Table, 
	Input, 
	Icon, 
	Button, 
	Row,
	Col,
	Select,
	Popconfirm, 
	Pagination,
	Menu, 
	Layout,
	Dropdown 
} from 'antd'
import appData_local from './../../../../assert/Ajax_local';
import  '../../../../App.css'
const Search = Input.Search;
const Option = Select.Option;

export default class device_online_list extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [],
			count: 1,
			total:0,
			listMess:{},
			pageSum:1,
			pageNum:1,
			comm_name:'',
		};

		this.columns = [
			{
				colSpan:1,
				title: 'ID',
				render:(text,record,index) => {
					return(
						<text>{index+1}</text>
					)
				}
			},
			{
				colSpan:1,
				title: '设备ID',
				dataIndex: 'id',
			},
			{
  				colSpan: 1,
				title: '设备类型',
				dataIndex: 'type',
			}, 
			{
  				colSpan: 1,
				title: '设备序列号',
				dataIndex: 'number',
			}, 
			{
  				colSpan: 1,
				title: '设备IP',
				dataIndex: 'ip_addr',
			}, 
			{
  				colSpan: 1,
				title: '设备MAC地址',
				dataIndex: 'mac_addr',
			}, 
			{
  				colSpan: 1,
				title: '安装位置',
				dataIndex: 'loc_description',
			}, 
			{
  				colSpan: 1,
				title: '控制方式',
				dataIndex: 'control_method',
			}, 
			{
  				colSpan: 1,
				title: '上次通信时间',
				dataIndex: 'room',
			}, 
			{
  				colSpan: 1,
				title: '状态',
				dataIndex: 'status',
			}, 
		];
		
		this.Router;
		this.mess = null;
	}

	componentWillMount(){
		this.Router = this.props.Router;
		this.mess = this.props.message;
		appData_local._Storage('get',"Token",(res) =>{
			this.TokenMess = res
			this._getEvent()
		})
	}

	_jump(nextPage,mess){
		this.Router(nextPage,mess,this.mess.nextPage)
	}

	//获取后台信息
	_getEvent(){
		let Token = this.TokenMess;
		let afteruri = 'devices/search';
		let body = {};
		appData_local._dataPost(afteruri,body,(res) => {
			let data = res.data
			let pageSum = Math.ceil(res.total/res.per_page)
			let len = data.length;
			this.setState({
				total:res.total,
				dataSource: data,
				count:len,
			})
		},Token)
	}
	
	//分页器activity/list?page=num
	_pageChange(pageNumber){
		let Token = this.TokenMess;
		let afteruri = 'devices/search';
		let body = {
			"per_page": pageNumber
		}
		appData_local._dataPost(afteruri,body,(res) => {
			let pageSum = Math.ceil(res.total/res.per_page)
			let data = res.data;
			let len = data.length;
			this.setState({
				total:res.total,
				dataSource: data,
				count:len,
				pageNum:pageNumber
			})
		},Token)
	}

	// 搜索框
	_searchMob(val){
		// let TokenMess = this.TokenMess;
		// let afteruri = 'user/2';
		// let body = {}
		// let searchType =  this.state.SearchType;
		// if( searchType == "name"){
		// 	body = {
		// 		"name": val,
		// 	}
		// } else if( searchType == "mobile"){
		// 	body = {
		// 		"mobile": val,
		// 	}
		// } else if( searchType == "apt_code"){
		// 	body = {
		// 		"apt_code": val,
		// 	}
		// }
		// appData_local._dataPost(afteruri,body,(res) => {
		// 	let pageSum = Math.ceil(res.total/res.per_page)
		// 	let data = res.data;
		// 	let len = data.length;
		// 	this.setState({
		// 		total:res.total,
		// 		dataSource: data,
		// 		count:len,
		// 	})
		// },TokenMess)
	}

	render() {
		const { dataSource } = this.state;
		let columns = this.columns;
		return (
			<Layout style={{ background: '#fff', padding: '24px 48px 48px' }}>
				<Row type="flex" justify="space-between" gutter={1}>
					<Col  className="printHidden">
						<text style={{fontSize: 24, color: '#aaa'}}>系统功能/</text>
						<text style={{fontSize: 24, color: '#1e8fe6'}}>设备在线情况</text>
					</Col>
					<Col className="printHidden">
						<Button style={{height: 32}} onClick={()=>window.print()}>打印</Button>
					</Col>
				</Row>
				<Row  className="printHidden" style={{height: 32, margin: 10}}>
					<Col span={24} style={{textAlign:'right'}}>
						<Search
							className="printHidden"
							placeholder={this.state.SearchText}
							style={{ minWidth: 200, maxWidth: 300 }}
							onSearch={value => this._searchMob(value)}
						/>
						{/* <Select
							defaultValue="apt_code"
							style={{width: 100, marginLeft: 20}}
							onChange={this._handleChange.bind(this)}
						>
							<Option key="name">姓名</Option>
							<Option key="mobile">手机号</Option>
							<Option key="apt_code">住宅</Option>
						</Select> */}
					</Col>
				</Row>
				{/* <Row>
					<Col span={8} style={{margin:'10px'}}> </Col>
				</Row> */}
				<Table bordered dataSource={this.state.dataSource} columns={columns} rowKey='key' pagination={false} style={{marginBottom: 20}}/> 
				<Row type="flex" justify="end">
					<Pagination showQuickJumper defaultCurrent={1} current={this.state.pageNum} total={this.state.total} onChange={this._pageChange.bind(this)} />
				</Row>
			</Layout>
		);
	}
}