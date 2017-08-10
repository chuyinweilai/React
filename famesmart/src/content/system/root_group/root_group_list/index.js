
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

export default class root_group_list extends Component {
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
				title: '权限组ID',
				dataIndex: 'group_id',
			},
			{
  				colSpan: 1,
				title: '地址名称',
				dataIndex: 'loc_description',
			}, 
			{
  				colSpan: 1,
				title: '归属区域',
				dataIndex: 'area_code',
			}, 
			{
  				colSpan: 1,
				title: '设备ID',
				dataIndex: 'id',
			}, {
				title:"操作",
				key:"action",
  				colSpan: 3,
				render:(text, record)=>{
					return (
						<Row type="flex" justify="space-between">
							<Button onClick={() =>this._action('change',record)}>编辑</Button>
							<Button onClick={() =>this._action('cancel',record)}>删除</Button>
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
		let afteruri = 'dist_devices/access_group/search_details';
		let body = {
			"group_id":1
		}
		appData_local._dataPost(afteruri,body,(res) => {
			console.log(res)
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
	
	//操作栏功能
	_action(type,mess){
		if(type === "change"){
			this._jump('volunteer_edit', mess)
		}else if(type === "cancel"){
			let afteruri = 'vcity/canceluser';
			let body = {
				"mobile": mess.mobile,
				"comm_code": mess.comm_code
			}
			appData_local._dataPost(afteruri,body,(res) => {
				if(res){
					this._getEvent()
					this.setState({
						pageNum: 1
					})
				} else {
					alert('操作失败')
				}
			})
		}
	}

	//分页器activity/list?page=num
	_pageChange(pageNumber){
		let userMess = this.userMess;
		let afteruri = 'vcity/listuser?page=' + pageNumber ;
		let body = {
			 "comm_code": userMess.comm_code
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
		})
	}

	render() {
		const { dataSource } = this.state;
		let columns = this.columns;
		return (
			<Layout style={{ background: '#fff', padding: '24px 48px 48px' }}>
				<Row type="flex" justify="space-between" gutter={1}>
					<Col  className="printHidden">
						<text style={{fontSize: 24, color: '#aaa'}}>系统功能/</text>
						<text style={{fontSize: 24, color: '#1e8fe6'}}>权限常用组</text>
					</Col>
					<Col className="printHidden">
						<Button style={{height: 32}} onClick={()=>window.print()}>打印</Button>
					</Col>
				</Row>
				<Row  className="printHidden" style={{height: 32, margin: 10}}>
					 <Col span={4}>
					 	<Button>新建</Button>
					 </Col>
					<Col span={20} style={{textAlign:'right'}}>
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
				<Table bordered dataSource={this.state.dataSource} columns={columns} rowKey='key' pagination={false} style={{marginBottom: 20}}/> 
				<Row type="flex" justify="end">
					<Pagination showQuickJumper defaultCurrent={1} current={this.state.pageNum} total={this.state.total} onChange={this._pageChange.bind(this)} />
				</Row>
			</Layout>
		);
	}
}