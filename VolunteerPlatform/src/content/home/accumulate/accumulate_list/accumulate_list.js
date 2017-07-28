
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

export default class accumulate_list extends Component {
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
				title: '姓名',
				dataIndex: 'name',
				render: (text)=>(
					<text style={{color: '#49a9ee'}}>{text}</text>
				)
			}, 
			{
				colSpan:1,
				title: '手机',
				dataIndex: 'mobile',
			}, 
			{
				colSpan:1,
				title: '性别',
				dataIndex: 'gender',
			},
			{
				colSpan:1,
				title: '当前积分',
				dataIndex: 'score',
				render: (text)=>(
					<text style={{color: 'red'}}>{text}</text>
				)
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
		let afteruri = 'wxuser/topscore';
		let body = {
			 "comm_code": userMess.comm_code
		}
		console.log(body)
		appData._dataPost(afteruri,body,(res) => {
			console.log(res)
			let pageSum = Math.ceil(res.total/res.per_page)
			let data = res.data.slice(0, 5);
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
		<div style={{padding: 5, backgroundColor: '#fff', height: 358}}>
			<text style={{fontSize: 16,paddingBottom: 5}}>
				积分排名
			</text>
			<Table bordered={false}
				dataSource={this.state.dataSource} 
				columns={columns} rowKey='key' pagination={false}/>  
		</div>
		);
	}
}