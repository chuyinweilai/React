
import React, { PropTypes,Component } from 'react';
import {
	Table,
	Input,
	Icon,
    Select,
	Button,
	Row,
	Col,
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
			
			SearchType: 'id',
			SearchText:'输入门禁ID查询。'
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
  				colSpan: 1,
				title: '门禁ID',
				dataIndex: 'id',
			},
			{
  				colSpan: 1,
				title: '巡更位置',
				dataIndex: 'loc_description',
			},
			{
  				colSpan: 1,
				title: '计划时间',
				dataIndex: 'audit_time',
			},
            {
                title:"详情",
                key:"action",
                colSpan: 2,
                render:(text, record)=>{
                    return (
						<Row type="flex" justify="space-between">
							<Button type="primary" onClick={() =>this._action('change',record)}>查看</Button>
                            <Button type="primary" onClick={() =>this._action('delete',record)}>删除</Button>
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
        let afteruri = 'devices/audit_plan';
        let body = {
            "per_page":"10"
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
        let TokenMess = this.TokenMess;
		if(type === "change"){
            this._jump('patrol_edit', mess)
		}else if(type === "delete"){
			let afteruri = 'device/set_audit';
			let body = {
				"loc_description": mess.loc_description
			}
            appData_local._dataPost(afteruri,body,(res) => {
				if(res){
					this._getEvent()
				} else {
					alert('操作失败')
				}
			},TokenMess)
		}
	}

	//分页器activity/list?page=num
	_pageChange(pageNumber){
        let TokenMess = this.TokenMess;
		let userMess = this.userMess;
		let afteruri = 'devices/audit_plan?page=' + pageNumber ;
		let body = {
            "per_page":"10"
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
				pageNum:pageNumber
			})
		},TokenMess)
	}

	// 搜索框
	_searchMob(val){
		let TokenMess = this.TokenMess;
        let afteruri = 'devices/audit_plan';
		let body = {}
		let searchType =  this.state.SearchType;
		if( searchType == "id"){
			body = {
				"per_page":"10",
				"id": val,
			}
		} else if( searchType == "loc_description"){
			body = {
				"per_page":"10",
				"loc_description": val,
			}
		} else if(searchType == 'audit_time'){
			body = {
				"per_page":"10",
				"audit_time": val
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
		if(val == 'id'){
			this.setState({
				SearchType: 'id',
				SearchText: '输入门禁ID查询。'
			})
		} else if(val == 'loc_description'){
			this.setState({
				SearchType: 'loc_description',
				SearchText: '输入巡更位置查询。'
			})
		} else if(val == 'audit_time'){
			this.setState({
				SearchType: 'audit_time',
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
					<text style={{fontSize: 24, color: '#aaa'}}>巡更管理/</text>
					<text style={{fontSize: 24, color: '#1e8fe6'}}>巡更计划</text>
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
						defaultValue="id"
						style={{width: 100, marginLeft: 20}}
						onChange={this._handleChange.bind(this)}
					>
						<Option key="id">门禁ID</Option>
						<Option key="loc_description">巡更位置</Option>
						<Option key="audit_time">时间</Option>
					</Select>
				</Col>
			</Row>
			<Table bordered  dataSource={this.state.dataSource} columns={columns} rowKey='key' pagination={false} style={{marginBottom: 20}}/>
			<Row type="flex" justify="end">
			<Pagination showQuickJumper defaultCurrent={1} current={this.state.pageNum} total={this.state.total} onChange={this._pageChange.bind(this)} />
			</Row>
		</div>
		);
	}
}