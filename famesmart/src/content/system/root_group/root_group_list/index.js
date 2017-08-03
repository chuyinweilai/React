
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
import appData from './../../../../assert/Ajax';
import  '../../../../App.css'

export default class root_group_list extends Component {
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
				title: '手机',
				dataIndex: 'mobile',
			},
			{
  				colSpan: 1,
				title: '姓名',
				dataIndex: 'name',
				render:(text) => {
					return(
						<text style={{color: '#1e8fe6',}}>{text}</text>
					)
				}
			}, 
			{
  				colSpan: 1,
				title: '性别',
				dataIndex: 'gender',
			}, 
			{
  				colSpan: 1,
				title: 'IC卡',
				dataIndex: 'ic_card',
			}, 
			{
  				colSpan: 1,
				title: '居住类型',
				dataIndex: 'type',
				render:(text,record) => {
					let test = ''
					if(text === 'Y' ){
						test = '业主'
					}  else if(text === 'Z'){
						test = '租户'
					} 
					return <div>{test}</div>
				}
			}, 
			{
  				colSpan: 1,
				title: '楼栋',
				dataIndex: 'apt_code',
			}, 
			{
  				colSpan: 1,
				title: '楼层',
				dataIndex: 'floor',
			}, 
			{
  				colSpan: 1,
				title: '房间号',
				dataIndex: 'room',
			}, 
			{
  				colSpan: 1,
				title: '职业',
				dataIndex: 'occupation',
			}, 
			{
				colSpan:1,
				title: 'EMAIL',
				dataIndex: 'email',
			},
			{
				colSpan:1,
				title: '志愿者类型',
				dataIndex: 'vol_tag ',
				render:(text,record) => {
					return <text>{record.vol_tag}</text>
				}
			}, 
			{
				colSpan:1,
				title: '注册时间',
				dataIndex: 'register_date',
			},
			{
				title:"操作",
				key:"action",
  				colSpan: 3,
				render:(text, record)=>{
					return (
						<Row type="flex" justify="space-between">
							<Button onClick={() =>this._action('change',record)}>编辑</Button>
							<Button onClick={() =>this._action('cancel',record)}>注销</Button>
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

	_jump(nextPage,mess){
		this.Router(nextPage,mess,this.mess.nextPage)
	}

	//获取后台信息
	_getEvent(){
		let userMess = this.userMess;
		let afteruri = 'vcity/listuser';
		let body = {
			 "comm_code": userMess.comm_code
		}
		appData._dataPost(afteruri,body,(res) => {
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
			this._jump('volunteer_edit', mess)
		}else if(type === "cancel"){
			let afteruri = 'vcity/canceluser';
			let body = {
				"mobile": mess.mobile,
				"comm_code": mess.comm_code
			}
			appData._dataPost(afteruri,body,(res) => {
				if(res){
					this._getEvent()
					this.setState({
						pageNum: 1
					})
				} else {
					alert('操作失败')
				}
			})
		}
	}

	//分页器activity/list?page=num
	_pageChange(pageNumber){
		let userMess = this.userMess;
		let afteruri = 'vcity/listuser?page=' + pageNumber ;
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
			<Layout style={{ background: '#fff', padding: '24px 48px 48px' }}>
				<Row type="flex" justify="space-between" gutter={1}>
					<Col  className="printHidden">
						<text style={{fontSize: 24, color: '#aaa'}}>系统功能/</text>
						<text style={{fontSize: 24, color: '#1e8fe6'}}>权限常用组</text>
					</Col>
					<Col className="printHidden">
						<Button style={{height: 32}} onClick={()=>window.print()}>打印</Button>
					</Col>
				</Row>
				<Row>
					<Col span={8} style={{margin:'10px'}}> </Col>
				</Row>
				<Table bordered dataSource={this.state.dataSource} columns={columns} rowKey='key' pagination={false} style={{marginBottom: 20}}/> 
				<Row type="flex" justify="end">
					<Pagination showQuickJumper defaultCurrent={1} current={this.state.pageNum} total={this.state.total} onChange={this._pageChange.bind(this)} />
				</Row>
			</Layout>
		);
	}
}