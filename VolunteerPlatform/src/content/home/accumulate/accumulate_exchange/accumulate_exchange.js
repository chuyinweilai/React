
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
	Dropdown 
} from 'antd'
import appData from './../../../../assert/Ajax';
import '../../../../App.css'
import './accumulate_exchange.css'

export default class accumulate_exchange extends Component {
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
				title: '名称',
				dataIndex: 'gift_name',
				render: (text)=>(
					<text style={{color: '#49a9ee'}}>{text}</text>
				)
			}, 
			{
				colSpan:1,
				title: '兑换积分',
				dataIndex: 'change_score',
				render: (text)=>(
					<text style={{color: 'red'}}>{text}</text>
				)
			}, 
			{
				colSpan:1,
				title: '已兑换数量',
				dataIndex: 'change_cnt',
				render: (text)=>(
					<text style={{color: '#FF8C00'}}>{text}</text>
				)
			},
			{
				colSpan:1,
				title: '总数量',
				dataIndex: 'change_limit',
			},
		];
		
		this.Router;
		this.mess = null;
	}

	componentWillMount(){
		this.Router = this.props.Router;
		this.mess = this.props.message;
		appData._Storage('get',"userMess",(res) =>{
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
		let afteruri = 'gift/list';
		let body = {
			 "comm_code": userMess.comm_code
		}
		appData._dataPost(afteruri,body,(res) => {
			console.log(res)
			// let pageSum = Math.ceil(res.total/res.per_page)
			let data = res.slice(0, 5);
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
		}else if(type === "refuse"){
			
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
		<div style={{padding: 5, backgroundColor: '#fff', minHeight: 358}}>
			<text style={{fontSize: 16,paddingBottom: 5}}>
				兑换热度表
			</text>
			<Table 
				style={{ height: 154}}
				bordered={false}
				dataSource={this.state.dataSource} 
				columns={columns} rowKey='key' pagination={false}/>  
		</div>
		);
	}
}