
import React, { PropTypes,Component } from 'react';
import { 
	Table, 
	Input, 
	Icon, 
	Button, 
	Row,
	Col,
	Popconfirm, 
	Pagination,
	Menu, 
	Layout,
	Dropdown 
} from 'antd'
import appData_local from './../../../../assert/Ajax_local';
import  '../../../../App.css'
const { Content } = Layout;

export default class IC_cards_resident_list extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [],
			count: 1,
			total:0,
			listMess:{},
			pageSum:1,
			pageNum:1,
		};

		this.columns = [
			{
				colSpan:1,
				title: 'ID',
				dataIndex: 'sid',
				render:(text,record,index) =>(
					<text>{index + 1}</text>
				)
			},
			{
  				colSpan: 1,
				title: '巡更人员姓名',
				dataIndex: 'name',
			},
			{
				colSpan:1,
				title: '手机',
				dataIndex: 'mobile',
			},
			{
  				colSpan: 1,
				title: '卡号',
				dataIndex: 'number',
			}, 
			{
				colSpan:1,
				title: '权限组',
				dataIndex: 'access_group_id',
			},
			{
				title:"操作",
				key:"action",
  				colSpan: 3,
				render:(text, record)=>{
					return (
						<Row type="flex" justify="space-between">
							<Button onClick={() =>this._action('add',record)}>新增</Button> 
							<Button onClick={() =>this._action('change',record)}>编辑</Button>
							<Button onClick={() =>this._action('cancel',record)}>删除</Button>
						</Row>
					)
				}
			}
		];
		this.Router;
		this.mess = null;
		this.TokenMess = ''
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
		let afteruri = 'dist_devices/search';
		let body = {
			"per_page":10,
			"owner_group": '物业'
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
		}, TokenMess)
	}
	
	//操作栏功能
	_action(type,mess){
		mess.owner_group='物业';
		let Token = this.TokenMess;

		if(type === "change"){
			mess._action = 'change';
			this._jump('IC_cards_patrol_edit', mess);
		}
		if(type === "add"){
			mess._action = 'add';
			this._jump('IC_cards_patrol_edit', mess)
		}
		else if(type === "cancel"){
			let afteruri = 'dist_devices/checkin';
			let body = {
				"number": mess.number,
			}
			appData_local._dataPost(afteruri,body,(res) => {
				if(res.result){
					this._getEvent();
					this.setState({
						pageNum: 1
					})
				} else {
					alert('操作失败')
				}
			},Token)
		}
	}

	//分页器activity/list?page=num
	_pageChange(pageNumber){
		let Token = this.TokenMess;
		let afteruri = 'devices/search?page=' + pageNumber;
		let body = {
			"owner_group": '物业'
			
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
		},Token)
	}

	render() {
		const { dataSource } = this.state;
		let columns = this.columns;
		return (
			<Layout style={{ background: '#fff', minHeight: 80 ,padding: '24px 48px 48px' }}>
				<Content>
				<Row type="flex" justify="space-between" gutter={1} className="printHidden">
					<Col>
						<text style={{fontSize: 24, color: '#aaa'}}>发卡管理/</text>
						<text style={{fontSize: 24, color: '#1e8fe6'}}>巡更IC卡</text>
					</Col>
					<Col>
						<Button style={{height: 32}} onClick={()=>window.print()}>打印</Button>
					</Col>
				</Row>
				<Row>
					<Col span={8} style={{margin:'10px'}}> </Col>
				</Row>
				<Table bordered dataSource={this.state.dataSource} columns={columns} rowKey='key' pagination={false} style={{marginBottom: 20}}/> 
				<Row type="flex" justify="end" className="printHidden">
					<Pagination showQuickJumper defaultCurrent={1} current={this.state.pageNum} total={this.state.total} onChange={this._pageChange.bind(this)} />
				</Row>
				</Content>
			</Layout>
		);
	}
}