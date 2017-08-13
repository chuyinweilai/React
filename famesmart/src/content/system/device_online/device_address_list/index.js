

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
			loginType:'loc_type',
			SearchText:'输入住宅号查询。如：1-3-301'
		};

		this.columns = [
			{
				colSpan:1,
				title: '分类',
				dataIndex: 'loc_type',
			},
			{
  				colSpan: 1,
				title: '编号',
				dataIndex: 'loc_code',
			}, 
			{
  				colSpan:1,
				title: '位置',
				dataIndex: 'loc_description',
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
		let body = {
			per_page: 7,
			device_type:"02"
		};
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
		let afteruri = 'devices/search?page=' + pageNumber;
		let body = {
			per_page: 7,
			device_type:"02"
		};
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

    _handleChange(val){
		if(val == 'loc_type'){
			this.setState({
				SearchType: 'loc_type',
				SearchText: '请输入分类名'
			})
		} else if(val == 'loc_code'){
			this.setState({
				SearchType: 'loc_code',
				SearchText: '请输入编号'
			})
		} else if(val == 'loc_description'){
			this.setState({
				SearchType: 'loc_description',
				SearchText:'输入位置信息'
			})
		}
	}
	
	// 搜索框
	_searchMob(val){
		let TokenMess = this.TokenMess;
		let afteruri = 'devices/search';
		let body = {}
		let searchType =  this.state.SearchType;
		if( searchType == "loc_type"){
			body = {
				"per_page":7,
				"device_type":"02",
				"loc_type": val,
			}
		} else if( searchType == "loc_code"){
			body = {
				"per_page":7,
				"device_type":"02",
				"loc_code": val,
			}
		} else if( searchType == "loc_description"){
			body = {
				"per_page":7,
				"device_type":"02",
				"loc_description": val,
			}
		}
		appData_local._dataPost(afteruri,body,(res) => {
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

	render() {
		const { dataSource } = this.state;
		let columns = this.columns;
		return (
			<Layout style={{ background: '#fff', padding: '24px 48px 48px' }}>
				<Row  className="printHidden" style={{height: 32, margin: 10}}>
					<Col span={16} style={{textAlign:'right'}}>
						<Search
							className="printHidden"
							placeholder={this.state.SearchText}
							style={{ minWidth: 100, maxWidth: 200 }}
							onSearch={value => this._searchMob(value)}
						/>
					</Col>
					<Col span={8} style={{textAlign:'right'}}>
						 <Select
							defaultValue="loc_type"
							style={{width: 80, marginLeft: 20}}
							onChange={this._handleChange.bind(this)}
						>
							<Option key="loc_type">分类</Option>
							<Option key="loc_code">编号</Option>
							<Option key="loc_description">位置</Option>
						</Select> 
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