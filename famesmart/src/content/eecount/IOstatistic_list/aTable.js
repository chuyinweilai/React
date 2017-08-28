
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
	Dropdown 
} from 'antd'
import appData_local from './../../../assert/Ajax_local';
import appData from './../../../assert/Ajax';
import ACell from './aCell';
import  '../../../App.css'
const { Option, OptGroup } = Select
const Search = Input.Search;

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
			comm_name:'',

			SearchType: 'status',
			SearchText:'输入状态查询。'
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
				title: '门禁ID',
				dataIndex: 'access_number',
			},
			{
  				colSpan: 1,
				title: '门禁位置',
				dataIndex: 'loc_description',
			},
            {
                colSpan:1,
                title: '当日IC卡出入频次',
                dataIndex: 'card_id',
            },
			{
  				colSpan: 1,
				title: '当日数字钥匙出入频次',
				dataIndex: 'attempted_at',
			},
            {
                colSpan: 1,
                title: '当月数字钥匙出入频次',
                dataIndex: 'apt_code',
            },
			{
  				colSpan: 1,
				title: '当日累计出入频次',
				dataIndex: 'type',
			},
            // {
            //     colSpan: 1,
            //     title: '当月累计出入频次',
            //     dataIndex: 'type',
            // }
		];
		
		this.Router;
		this.mess = null;
	}

	componentWillMount(){
		this.Router = this.props.Router;
		this.mess = this.props.message;
		appData._Storage('get',"userMess",(res) =>{
			this.setState({
				comm_name: res.comm_name
			})
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
		let afteruri = 'entrance_records/residents';
		let body = {
			 // "comm_code": userMess.comm_code
		}
        appData_local._dataGet(afteruri,(res) => {
			let data = res.data
			let pageSum = Math.ceil(res.total/res.per_page)
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
		if(type === "change"){
			this._jump('eecount_edit', mess)
		}else if(type === "cancel"){
			let afteruri = 'vcity/canceluser';
			let body = {
				"mobile": mess.mobile,
				"comm_code": mess.comm_code
			}
			appData._dataPost(afteruri,body,(res) => {
				if(res){
					this._getEvent()
				} else {
					alert('操作失败')
				}
			})
		}
	}

	//分页器activity/list?page=num
	_pageChange(pageNumber){
		let userMess = this.userMess;
		let afteruri = 'users?page=' + pageNumber ;
		// let body = {
		// 	 "comm_code": userMess.comm_code
		// }
		appData._dataGet(afteruri,(res) => {
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
		let afteruri = 'users/search';
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
		if(val == 'status'){
			this.setState({
				SearchType: 'status',
				SearchText: '输入状态查询。'
			})
		} else if(val == 'alert_lvl'){
			this.setState({
				SearchType: 'alert_lvl',
				SearchText: '输入等级查询。'
			})
		} else if(val == 'month'){
			this.setState({
				SearchType: 'month',
				SearchText:'输入时间查询。'
			})
		}
	}

	render() {
		const { dataSource } = this.state;
		let columns = this.columns;
        const lableS = {
            color: '#00A0E9',
            fontSize: '15px',
        }
		return (
		<div>
			<Row type="flex" justify="space-between" gutter={1}>
				<Col  className="printHidden">
					<text style={{fontSize: 24, color: '#aaa'}}>门禁管理/</text>
					<text style={{fontSize: 24, color: '#1e8fe6'}}>统计记录</text>
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
						defaultValue="status"
						style={{width: 100, marginLeft: 20}}
						onChange={this._handleChange.bind(this)}
					>
						<Option key="status">状态</Option>
						<Option key="alert_lvl">等级</Option>
						<Option key="month">时间</Option>
					</Select>
				</Col>
			</Row>
			{/* <Row type="flex" justify="space-between" gutter={1}>
				<Col lg={8} md={12} sm={16} xs={24} style={{ marginBottom: 16 }}>
					<Select
						mode="multiple"
						size="large"
						style={{ width: '80%' }}
						placeholder="Please select"
					>
						<OptGroup label="状态" style={lableS}>
							<Option style={{ marginLeft: 16 }} value="(status='新建')">新建</Option>
							<Option style={{ marginLeft: 16 }} value="(status='分发')">分发</Option>
							<Option style={{ marginLeft: 16 }} value="(status='关闭')">关闭</Option>
						</OptGroup>
						<OptGroup label="等级" style={lableS} >
							<Option style={{ marginLeft: 16 }} value="(alert_lvl='高')">高</Option>
							<Option style={{ marginLeft: 16 }} value="(alert_lvl='中')">中</Option>
							<Option style={{ marginLeft: 16 }} value="(alert_lvl='低')">低</Option>
						</OptGroup>
						<OptGroup label="时间" style={lableS} >
							<Option style={{ marginLeft: 16 }} value="month">最近一个月</Option>
						</OptGroup>
					</Select>
					<Button size="large" type="primary" onClick={handleSearch}>搜索</Button>
				</Col>
				<Col span={2} className="printHidden">
					<Button type="primary" onClick={() => this._print()}>打印</Button>
				</Col>

			</Row> */}
			<Table bordered dataSource={this.state.dataSource} columns={columns} rowKey='key' pagination={false} style={{marginBottom: 20}}/> 
			<Row type="flex" justify="end">
			<Pagination showQuickJumper defaultCurrent={1} current={this.state.pageNum} total={this.state.total} onChange={this._pageChange.bind(this)} />
			</Row>
		</div>
		);
	}
}