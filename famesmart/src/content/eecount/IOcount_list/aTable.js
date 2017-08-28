
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
			
			SearchType: 'access_number',
			SearchText:'输入卡号查询。'
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
				dataIndex: 'id',
			},
			{
  				colSpan: 1,
				title: '门禁类型',
				dataIndex: 'access_type',
			},
			{
  				colSpan: 1,
				title: '门禁位置',
				dataIndex: 'loc_description',
			},
            {
                colSpan:1,
                title: '卡号',
                dataIndex: 'access_number',
            },
			{
  				colSpan: 1,
				title: '最近一次进入时间',
				dataIndex: 'attempted_at',
			},
            {
                colSpan: 1,
                title: '归属业主楼号',
                render:(text, record)=>{
                	var str_number = record.owner_code.split('-')[0]
                    return (
							<text>{str_number}</text>
                    )
                }
            },
            {
  				colSpan: 1,
				title: '归属业主楼号房间号',
				dataIndex: 'owner_code',
                // render:(text, record)=>{
				// 	console.log(record)
                //     var room_number = record.owner_code.split('-')[1] + '-' + record.owner_code.split('-')[0]
                //         return (
				// 			<Row type="flex" justify="center">
				// 				<text>{room_number}</text>
				// 			</Row>
                //         )
                // }
			}, 
			{
  				colSpan: 1,
				title: '卡号类型（长期卡/临时卡）',
				dataIndex: 'type',
			},
            {
                title:"操作",
                key:"action",
                colSpan: 2,
                render:(text, record)=>{
                    return (
						<Row type="flex" justify="center">
							<Button type="primary" onClick={() =>this._action('change',record)}>查看详情</Button>
						</Row>
                    )
                }
            }
		];
		
		this.Router;
		this.mess = null;
        this.TokenMess = '';
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
		let userMess = this.userMess;
		let afteruri = 'entrance_records/search';
		let body = {
            "owner_group":"居民",
            "per_page":10
		}
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
	
	//操作栏功能
	_action(type,mess){
		if(type === "change"){
			this._jump('IOcount_detial', mess)
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
        let TokenMess = this.TokenMess;
		let userMess = this.userMess;
		let afteruri = 'entrance_records/search?page=' + pageNumber ;
		let body = {
            "owner_group":"居民",
            "per_page":10
		}
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
	
	// 搜索框
	_searchMob(val){
		let TokenMess = this.TokenMess;
		let afteruri = 'entrance_records/search';
		let body = {}
		let searchType =  this.state.SearchType;
		if( searchType == "access_number"){
			body = {
				"owner_group":"居民",
				"per_page": 10,
				"access_number": val,
			}
		} else if( searchType == "owner_code"){
			body = {
				"owner_group":"居民",
				"per_page": 10,
				"owner_code": val,
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
		if(val == 'access_number'){
			this.setState({
				SearchType: 'access_number',
				SearchText: '输入卡号查询。'
			})
		} else if(val == 'owner_code'){
			this.setState({
				SearchType: 'owner_code',
				SearchText: '输入楼号房间号查询。如："1-101"'
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
					<text style={{fontSize: 24, color: '#1e8fe6'}}>实时记录</text>
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
						defaultValue="access_number"
						style={{width: 100, marginLeft: 20}}
						onChange={this._handleChange.bind(this)}
					>
						<Option key="access_number">卡号</Option>
						<Option key="owner_code">楼号房间号</Option>
					</Select>
				</Col>
			</Row>

			<Table bordered dataSource={this.state.dataSource} columns={columns} rowKey='key' pagination={false} style={{marginBottom: 20}}/> 
			<Row type="flex" justify="end">
			<Pagination showQuickJumper defaultCurrent={1} current={this.state.pageNum} total={this.state.total} onChange={this._pageChange.bind(this)} />
			</Row>
		</div>
		);
	}
}