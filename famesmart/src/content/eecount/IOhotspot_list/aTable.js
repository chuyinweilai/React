
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
                title: '当月数字钥匙出入频次',
                dataIndex: 'apt_code',
            },
            {
                colSpan: 1,
                title: '当日累计出入频次',
                dataIndex: 'type',
            },
            {
                colSpan: 1,
                title: '当月累计出入频次',
                dataIndex: 'type',
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
                colSpan:1,
                title: '门禁ID',
                dataIndex: 'access_number',
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
                    var room_number = record.owner_code.split('-')[1] + '-' + record.owner_code.split('-')[2]
                    return (
						<Row type="flex" justify="center">
							<text>{room_number}</text>
						</Row>
                    )
                }
            },
            {
                colSpan:1,
                title: '当日累计次数',
                dataIndex: 'card_id',
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
                "column":"device",
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

	render() {
		const { dataSource } = this.state;
		let columns = this.columns;
		let mycolumns = this.mycolumns;
		let householdcolumns = this.householdcolumns;
        const lableS = {
            color: '#00A0E9',
            fontSize: '15px',
        }
        function handleSearch(){
        }
		return (
		<div style={{ background: '#fff', padding: 24, margin: 0, minHeight: 80 }}>
			<Row>
				<Col span={8} style={{margin:'10px'}}> </Col>
			</Row>
			<h3>当日热点门禁</h3>
			<Table columns={columns} dataSource={this.state.dataSource} size="middle" />
			<h3>当日热点住户</h3>
			<Table columns={householdcolumns} dataSource={this.state.peopleSource} size="middle" />
			{/*<Table bordered dataSource={this.state.dataSource} columns={mycolumns} rowKey='key' pagination={false} style={{marginBottom: 20}}/> */}
			<Row type="flex" justify="end">
			{/*<Pagination showQuickJumper defaultCurrent={1} current={this.state.pageNum} total={this.state.total} onChange={this._pageChange.bind(this)} />*/}
			</Row>
		</div>
		);
	}
}