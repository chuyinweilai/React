
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
			peopleSource: [],
			count: 1,
			total:0,
			listMess:{},
			pageSum:1,
			pageNum:1,
            comm_name:'',
            
			SearchType: 'name',
			SearchText:'输入业主姓名查询。'
		};

        this.mycolumns = [
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
                title: '门禁位置',
                dataIndex: 'loc_description',
            },
            {
                colSpan: 1,
                title: '累计次数',
                dataIndex: 'count',
            }
        ];

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
				title: '门禁位置',
				dataIndex: 'loc_description',
			},
            {
                colSpan:1,
                title: '当日累计次数',
                dataIndex: 'count',
            },{
                title:"操作",
                key:"action",
                colSpan: 3,
                render:(text, record)=>{
                    return (
						<Row type="flex" justify="center">
							<Button type="primary" onClick={() =>this._action('change',record)}>查看详情</Button>
						</Row>
                    )
                }
            }
		];

        this.householdcolumns = [
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
                title: '门栋',
                render:(text, record)=>{
                    var str_number = record.owner_code.split('-')[0]
                    return (
						<Row type="flex" justify="center">
							<text>{str_number}</text>
						</Row>
                    )
                }
            },
            {
                colSpan:1,
                title: '房间号',
                render:(text, record)=>{
                    var room_number = record.owner_code.split('-')[1]
                    return (
						<Row type="flex" justify="center">
							<text>{room_number}</text>
						</Row>
                    )
                }
            },
            {
                colSpan:1,
                title: '累计次数',
                dataIndex: 'count',
            },{
                title:"操作",
                key:"action",
                colSpan: 3,
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
            this._getEvent("device")
            this._getEvent("people")
        })
	}

	_jump(nextPage,mess){
		this.Router(nextPage,mess,this.mess.nextPage)
	}

	//获取后台信息
	_getEvent(text){
        let TokenMess = this.TokenMess;
		let userMess = this.userMess;
        let afteruri = 'entrance_records/statistics';
		if(text == 'device'){
            let body = {
                "owner_group":"device",
                "top":3
            }
            appData_local._dataPost(afteruri,body,(res) => {
                let data = res.statistics
                this.setState({
                    dataSource: data,
                })
            },TokenMess)
		}else if(text == 'people'){
            let body = {
                "owner_group":"居民",
                "top":3
            }
            appData_local._dataPost(afteruri,body,(res) => {
                let data = res.statistics
                this.setState({
                    peopleSource: data,
                })
            },TokenMess)

		}


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
		let userMess = this.userMess;
		let afteruri = 'vcity/canceluser?page=' + pageNumber ;
		// let body = {
		// 	 "comm_code": userMess.comm_code
		// }
		appData._dataPost(afteruri,(res) => {
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
		let mycolumns = this.mycolumns;
		let householdcolumns = this.householdcolumns;
        const lableS = {
            color: '#00A0E9',
            fontSize: '15px',
        }
		return (
		<div>
			<Row type="flex" justify="space-between" gutter={1}>
				<Col  className="printHidden">
					<text style={{fontSize: 24, color: '#aaa'}}>门禁管理/</text>
					<text style={{fontSize: 24, color: '#1e8fe6'}}>热点监控</text>
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

			<h3>当日热点门禁</h3>
			<Table columns={columns} dataSource={this.state.dataSource} size="middle" border/>
			<h3>当日热点住户</h3>
			<Table columns={householdcolumns} dataSource={this.state.peopleSource} size="middle"border />
			<Row type="flex" justify="end">
			</Row>
		</div>
		);
	}
}