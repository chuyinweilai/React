
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
const { Content } = Layout;

export default class community_resident_list extends Component {
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
			SearchType: 'apt_code',
			SearchText:'输入住宅号查询。如：1-3-301'
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
				title: '手机',
				dataIndex: 'mobile',
			},
			{
  				colSpan: 1,
				title: '姓名',
				dataIndex: 'name',
				render:(text) => {
					return(
						<text style={{color: '#1e8fe6',}}>{text}</text>
					)
				}
			}, 
			{
  				colSpan: 1,
				title: '性别',
				dataIndex: 'gender',
			}, 
			{
  				colSpan: 1,
				title: 'IC卡',
				dataIndex: 'ic_card',
			}, 
			{
  				colSpan: 1,
				title: '居住类型',
				dataIndex: 'type',
				render:(text,record) => {
					let test = ''
					if(text === 'Y' ){
						test = '业主'
					}  else if(text === 'Z'){
						test = '租户'
					} 
					return <div>{test}</div>
				}
			}, 
			{
  				colSpan: 1,
				title: '楼栋',
				dataIndex: 'apt_code',
				render:(text,record,index) =>{
					let arr = record.apt_code.split('-');
					return (
						<text>{arr[0]}</text>
					)
				}
			}, 
			{
  				colSpan: 1,
				title: '楼层',
				dataIndex: 'floor',
				render:(text,record,index) =>{
					let arr = record.apt_code.split('-');
					return (
						<text>{arr[1]}</text>
					)
				}
			}, 
			{
  				colSpan: 1,
				title: '房间号',
				dataIndex: 'room',
				render:(text,record,index) =>{
					let arr = record.apt_code.split('-');
					return (
						<text>{arr[2]}</text>
					)
				}
			}, 
			{
  				colSpan: 1,
				title: '职业',
				dataIndex: 'occupation',
			}, 
			{
				colSpan:1,
				title: 'EMAIL',
				dataIndex: 'email',
			},
			{
				colSpan:1,
				title: '志愿者类型',
				dataIndex: 'vol_tag ',
				render:(text,record) => {
					return <text>{record.vol_tag}</text>
				}
			}, 
			{
				colSpan:1,
				title: '注册时间',
				dataIndex: 'register_date',
			},
			// {
			// 	title:"操作",
			// 	key:"action",
  			// 	colSpan: 3,
			// 	render:(text, record)=>{
			// 		return (
			// 			<Row type="flex" justify="space-between">
			// 				<Button onClick={() =>this._action('change',record)}>编辑</Button>
			// 				<Button onClick={() =>this._action('cancel',record)}>注销</Button>
			// 			</Row>
			// 		)
			// 	}
			// }
		];
		
		this.TokenMess = '';
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
		let TokenMess = this.TokenMess;
		let afteruri = 'residents/search';
		let body={}
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
		},TokenMess)
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

	// 搜索框
	_searchMob(val){
		let TokenMess = this.TokenMess;
		// let activeMess = this.activeMess;
		// SearchType
		let afteruri = 'residents/search' ;
		let body = {}
		let searchType =  this.state.SearchType;
		if( searchType == "name"){
			body = {
				"name": val,
			}
		} else if( searchType == "mobile"){
			body = {
				"mobile": val,
			}
		} else if( searchType == "apt_code"){
			body = {
				"apt_code": val,
			}
		}
		console.log(body)
		appData_local._dataPost(afteruri,body,(res) => {
			console.log(res)
			let pageSum = Math.ceil(res.total/res.per_page)
			let data = res.data;
			let len = data.length;
			this.setState({
				total:res.total,
				dataSource: data,
				count:len,
			})
		},TokenMess)
	}

	_handleChange(val){
		if(val == 'name'){
			this.setState({
				SearchType: 'name',
				SearchText: '请输入用户名'
			})
		} else if(val == 'mobile'){
			this.setState({
				SearchType: 'mobile',
				SearchText: '请输入手机号'
			})
		} else if(val == 'apt_code'){
			this.setState({
				SearchType: 'mobile',
				SearchText:'输入住宅号查询。如：1-3-301'
			})
		}
	}

	render() {
		const { dataSource } = this.state;
		let columns = this.columns;
		return (
			<Layout style={{ minHeight: 80, background: '#fff', padding: '24px 48px 48px' }}>
				<Content>	
					<Row type="flex" justify="space-between" gutter={1}>
						<Col  className="printHidden">
							<text style={{fontSize: 24, color: '#aaa'}}>用户管理/</text>
							<text style={{fontSize: 24, color: '#1e8fe6'}}>社区居民管理</text>
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
							<Select
								defaultValue="apt_code"
								style={{width: 100, marginLeft: 20}}
								onChange={this._handleChange.bind(this)}
							>
								<Option key="name">姓名</Option>
								<Option key="mobile">手机号</Option>
								<Option key="apt_code">住宅</Option>
							</Select>
						</Col>
					</Row>
					<Table bordered dataSource={this.state.dataSource} columns={columns} rowKey='key' pagination={false} style={{marginBottom: 20}}/> 
					<Row type="flex" justify="end">
						<Pagination showQuickJumper defaultCurrent={1} current={this.state.pageNum} total={this.state.total} onChange={this._pageChange.bind(this)} />
					</Row>
				</Content>
			</Layout>
		);
	}
}