
import React, { PropTypes,Component } from 'react';
import { 
	Table, 
	Input, 
	Icon, 
	Button, 
	Row,
	Col,
	Radio,
	Collapse,
	Popconfirm, 
	Pagination,
	Menu, 
	Dropdown 
} from 'antd'
import appData from './../../../../assert/Ajax';
import '../../../../App.css'
import '../../../../index.css'
import './index.css'
import {Filters} from './../../../../components/filter'
const Panel = Collapse.Panel;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const Search = Input.Search;

export default class unitlist_record extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [],
			count: 1,
			total:0,
			listMess:{},
			pageSum:1,
			pageNum:1,
			apt_code: '',
			apt_info: '',
		};
		this.Router;
		this.mess = null;
		this.activeMess;

		this.columns = [
			{
				title:'ID',
				dataIndex: 'ID',
				render:(text,record,index)=>(
					<text>{index+1}</text>
				)
			},
			{
				colSpan: 1,
				title:'楼层',
				dataIndex:'floor',
			},
			{
				colSpan: 1,
				title:'房间',
				dataIndex:'room',
			},
			{
				colSpan: 1,
				title:'分享人手机',
				dataIndex:'mobile',
			},
			{
				colSpan: 1,
				title:'分享时间',
				dataIndex:'vld_start',
			},
			{
				colSpan: 1,
				title:'分享对象',
				dataIndex:'user_type',
			},
			{
				colSpan: 1,
				title:'分享信息',
				dataIndex:'memo',
			},
			{
				colSpan: 1,
				title:'二维码',
				dataIndex:'card_no',
			},
			{
				colSpan: 1,
				title:'二维码类型',
				dataIndex:'card_type',
			},
			{
				colSpan: 1,
				title:'有效期',
				dataIndex:'vld_end',
			},
		];
	}

	componentWillMount(){
		this.Router = this.props.Router;
		this.mess = this.props.message;
		let mess = this.props.message.message
		this.activeMess = mess;
		console.log(mess)
		appData._Storage('get',"userMess",(res) =>{
			this.setState({
				comm_name: res.comm_name,
				apt_code: mess.apt_code,
				apt_info: mess.apt_info,
			})
			this.userMess = res
			this._getEvent()
		})
	}

	_jump(nextPage,mess){
		this.props.Router(nextPage,mess,this.props.message.nextPage)
	}

	//获取后台信息
	_getEvent(){
		let userMess = this.userMess;
		let afteruri = 'cards/qr/detail';
		let body = {
			"comm_code": userMess.comm_code,
  			"apt_code": this.activeMess.apt_code
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
	_action(type,mess,e){
		if(type === "detail"){
			this._jump('room_record',mess)
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

	//折叠面板
	_searchMob(val){
		let userMess = this.userMess;
		let activeMess = this.activeMess;
		let afteruri = 'cards/qr/search' ;
		let body = {
			 "comm_code": userMess.comm_code,
			"apt_code": activeMess.apt_code,
			"mobile": val,
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
	
	render() {
		const { dataSource } = this.state;
		let columns = this.columns;
		return (
		<div style={{background: '#fff', flex: 1,padding: 24,margin: 0,minHeight: 80}}>
			<Row type="flex" justify="space-between" gutter={1}  className="printHidden">
				<Col> 
					<text style={{fontSize: 24, color: '#aaa'}}>卡片管理/电子钥匙分享记录/</text>
					<text style={{fontSize: 24, color: '#1e8fe6'}}>详情</text>
				</Col>
				<Col>
						<Button  style={{height: 32}} onClick={() => window.print()}>打印</Button>
				</Col>
			</Row>
			<Row>
				<Col>
					<Button  className="printHidden" style={{height: 32, margin: 10}} onClick={()=>this._jump('QRcode_record')}>返回</Button>
					<Row>
						<Col span={5} style={{margin:'10px'}}> 
							楼栋编号:{this.state.apt_code}
						</Col>
						<Col span={5} style={{margin:'10px'}}> 
							楼栋信息:{this.state.apt_info}
						</Col>
						<Col span={13} style={{textAlign:'right'}}>
							<Search
							 	className="printHidden"
								placeholder="输入手机号进行搜索"
								style={{ minWidth: 200, maxWidth: 300 }}
								onSearch={value => this._searchMob(value)}
							/>
						</Col>
					</Row>
				</Col>
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
		</div>
		);
	}
}