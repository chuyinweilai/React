
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
				title: '用户ID',
				dataIndex: 'id',
			},
			{
  				colSpan: 1,
				title: '业主姓名',
				dataIndex: 'name',
			},
			{
  				colSpan: 1,
				title: '等级',
				dataIndex: 'auth_lvl',
			},
			{
				colSpan:1,
				title: '手机',
				dataIndex: 'mobile',
			},
			{
  				colSpan: 1,
				title: '组织',
				dataIndex: 'org',
			},
			{
  				colSpan: 1,
				title: '邮箱',
				dataIndex: 'email',
			},
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
		let afteruri = 'users/search';
		let body={}
		appData_local._dataPost(afteruri,body,(res) => {
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

	//分页器activity/list?page=num
	_pageChange(pageNumber){
		let Token = this.TokenMess;
		let afteruri = 'user/search?page=' + pageNumber;
		let body = {}
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
		let TokenMess = this.TokenMess;
		let afteruri = 'user/search';
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
		} else if(val == 'auth_lvl'){
			body = {
				auth_lvl: val
			}
		} else if(val == 'org'){
			body = {
				org: val
			}
		}
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
		} else if(val == 'auth_lvl'){
			this.setState({
				SearchType: 'auth_lvl',
				SearchText:'输入权限等级'
			})
		} else if(val == 'org'){
			this.setState({
				SearchType: 'org',
				SearchText:'输入组织名称'
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
							<text style={{fontSize: 24, color: '#1e8fe6'}}>平台用户管理</text>
						</Col>
						<Col className="printHidden">
							<Button style={{height: 32}} onClick={()=>window.print()}>打印</Button>
						</Col>
					</Row>
					{/* <Row  className="printHidden" style={{height: 32, margin: 10}}>
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
								<Option key="auth_lvl">权限等级</Option>
								<Option key="org">组织</Option>
							</Select>
						</Col>
					</Row> */}
					<Row>
						<Col span={8} style={{margin:'10px'}}> </Col>
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