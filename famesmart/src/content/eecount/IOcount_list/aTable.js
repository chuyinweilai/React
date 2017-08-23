
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
						<Row type="flex" justify="center">
							<text>{str_number}</text>
						</Row>
                    )
                }
            },
            {
  				colSpan: 1,
				title: '归属业主楼号房间号',
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
            "per_page":20
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
        const lableS = {
            color: '#00A0E9',
            fontSize: '15px',
        }
        function handleSearch(){
        }
		return (
		<div style={{ background: '#fff', padding: 24, margin: 0, minHeight: 80 }}>
			<Row type="flex" justify="space-between" gutter={1}>
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

			</Row>
			<Row>
				<Col span={8} style={{margin:'10px'}}> </Col>
			</Row>
			<Table bordered dataSource={this.state.dataSource} columns={columns} rowKey='key' pagination={false} style={{marginBottom: 20}}/> 
			<Row type="flex" justify="end">
			<Pagination showQuickJumper defaultCurrent={1} current={this.state.pageNum} total={this.state.total} onChange={this._pageChange.bind(this)} />
			</Row>
		</div>
		);
	}
}