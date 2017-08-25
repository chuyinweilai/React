
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
	Modal, 
	Dropdown 
} from 'antd'
import appData from './../../../assert/Ajax';
import '../../../App.css'
import '../../../index.css'

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

			record:{},
			_visible:false,
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
				title: '活动日期',
				dataIndex: 'open_date',
				render:(text)=>{
					let str = text.substring(0,10)
					return (
						<text>{str}</text>
					)
				}
			}, 
			{
				colSpan:1,
				title: '活动编号',
				dataIndex: 'activity_no',
			},
			{
				colSpan:1,
				title: '活动分类',
				dataIndex: 'type',
				render:(text,record) => {
					let test = ''
					if(text === 1 ){
						test = '社区服务'
					} else if(text === 2){
						test = '公益活动'
					} else if(text === 3){
						test = '其他'
					}
					return <div>{test}</div>
				}
			}, 
			{
				colSpan:1,
				title: '活动积分',
				dataIndex: 'score',
			},
			{
				colSpan:1,
				title: '活动主题',
				dataIndex: 'title',
			},
			{
				colSpan:1,
				title: '活动内容',
				dataIndex: 'detail',
				width: '300px',
				render:(text,record) => {
					if(text.length > 20){
						let str = text.substring(-1,20);
						return (
							<text>{str}......</text>
						)
					} else {
						return (
							<text>{text}</text>
						)
					}
				}
			},
			{
				colSpan:1,
				title: '人数限制',
				dataIndex: 'join_limit',
			},
			{
				colSpan:1,
				title: '报名开始',
				dataIndex: 'vld_start',
				render:(text)=>{
					let str = text.substring(0,10)
					return (
						<text>{str}</text>
					)
				}
			},
			{
				colSpan:1,
				title: '报名截止',
				dataIndex: 'vld_end',
				render:(text)=>{
					let str = text.substring(0,10)
					return (
						<text>{str}</text>
					)
				}
			},
			{
				colSpan:1,
				title: '活动状态',
				dataIndex: 'vld_flag',
				render:(text,  ) => {
					let test = ''
					if(text == 0 ){
						test = '有效'
					} else if(text == 1 ){
						test = '签到中'
					} else if(text == 2){
						test = '无效'
					} else if(text == 3){
						test = '已结束'
					}
					return <div>{test}</div>
				}
			},
			{
				colSpan:1,
				title: '报名人数',
				dataIndex: 'join_cnt',
			},
			{
				colSpan:1,
				title: '签到人数',
				dataIndex: 'sign_cnt',
			},
			{
				title:"操作",
				key:"action",
  				colSpan: 2,
				render:(text, record)=>{
					let disable = [];
					return (
						<Row type="flex" gutter={6} justify="center">
							<Col>
								<Button onClick={() =>this._action('sign',record)}>签到</Button>
							</Col>
							<Col>
								<Button onClick={() =>this._action('change',record)}>详情</Button>
							</Col>
						</Row>
					)
				}
			}
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

	//顶部操作功能
	_addAct(type){
		if(type=== "add"){
			this._jump('activity_add')
		}
	}

	_jump(nextPage,mess){
		this.Router(nextPage,mess,this.mess.nextPage)
	}

	//获取后台信息
	_getEvent(){
		let userMess = this.userMess;
		let afteruri = 'activity/list';
		let body = {
			"comm_code": userMess.comm_code,
		}
		appData._dataPost(afteruri,body,(res) => {
			let pageSum = Math.ceil(res.total/res.per_page)
			let data = res.data;
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
		if(type=== "sign"){
			this._jump('activity_sign', mess)
		} else if(type === "change"){
			this._jump('activity_add', mess)
		}else if(type === "cancel"){
			let afteruri = "activity/cancel"
			let body ={   
				"comm_code": mess.comm_code,
            	"activity_no":  mess.activity_no
			}
			appData._dataPost(afteruri,body,(res)=>{
				if(res){
					this.setState({
						_visible: false,
					})
					this._getEvent()
				}
			})
		}
	}

	//分页器activity/list?page=num
	_pageChange(pageNumber){
		let userMess = this.userMess;
		let afteruri = 'activity/list?page=' + pageNumber ;
		
		let body = {
			 "comm_code": userMess.comm_code
		}
		appData._dataPost(afteruri,body,(res) => {
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
		return (
		<div style={{background: '#fff',padding: 24,margin: 0,minHeight: 80}}>
			<Row type="flex" justify="space-between" gutter={1}>
				<Col  className="printHidden">
					<text style={{fontSize: 24, color: '#1e8fe6'}}>活动管理</text>
				</Col>
				<Col className="printHidden">
					<span style={{ marginRight: 10}}>
							<Button style={{height: 32, backgroundColor: '#1e8fe6', color: 'white'}}  onClick = {()=>this._addAct('add')}>新增活动</Button>
					</span>
					<span>
							<Button  style={{height: 32}} onClick={() => window.print()}>打印</Button>
					</span>
				</Col>
			</Row>
			<Row>
				<Col span={8} style={{margin:'10px'}}> </Col>
			</Row>
			<Table 
			bordered 
			dataSource={dataSource} 
			columns={columns} 
			rowKey='key' 
			pagination={false}/> 
			
			<Row style={{marginTop:20}} type="flex" justify="end">
			<Pagination
				showQuickJumper 
				defaultCurrent={1} 
				current={this.state.pageNum} 
				total={this.state.total} 
				onChange={this._pageChange.bind(this)} />
			</Row>
			
			 <Modal
				visible={this.state._visible}
				title="活动取消"
				onCancel={() => this.setState({_visible: false})}
				onOk={() =>this._action('cancel',this.state.record)}
			>
				<span>是否取消？</span>
			</Modal> 
		</div>
		);
	}
}