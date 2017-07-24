
import React, { PropTypes,Component } from 'react';
import { 
	Col,
	Icon, 
	Row,
	Table, 
	Input, 
	Button, 
	Pagination,
	Popconfirm, 
} from 'antd'
import '../../../App.css'
import ACell from './aCell';
import appData from './../../../assert/Ajax';

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
		};
		// ID	手机	姓名	性别	当前积分	操作		

		this.columns = [
			{
				title: 'ID',
				colSpan:1,
				dataIndex: 'ID',
				render:(text,record,index) => {
					return(
						<text>{index}</text>
					)
				}
			}, 
			{
				colSpan:1,
				title: '手机',
				dataIndex: 'mobile',
			}, 
			{
				colSpan:1,
				title: '姓名',
				dataIndex: 'name',
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
			},
			{
				title: '操作',
				colSpan:2,
				render: (text, record, index) => {
					return (
					(
						<Row type="flex" justify="space-around">
							<Button title="Sure to delete?" onClick={() => this._accuCtrl("add",record)}>
								 积分+
							</Button>
							<Button title="Sure to delete?" onClick={() => this._accuCtrl("del",record)}>
								积分-
							</Button>
							<Button title="Sure to delete?" onClick={() => this._accuCtrl("history",record)}>
								积分历史
							</Button>
						</Row>
					) : null
					);
				},
			}
		];
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
		let afteruri = 'vcity/listuser';
		let body = {
			 "comm_code": userMess.comm_code
		}
		appData._dataPost(afteruri,body,(res) => {
			console.log(res)
			res.forEach((value)=>{
				value.address = value.comm_name + value.apt_info+value.floor+value.room
			})
			let pageSum = Math.ceil(res.length/res.per_page)
			let len = res.length;
			this.setState({
				total:res.length,
				dataSource: res,
				count:len,
			})
		})
	}

	_accuCtrl(type,value){
		if(type == "add"){
			this._jump('accumulate_add',value)
		} else if(type == "del"){
			this._jump('accumulate_exchange',value)
		}else if(type == "history"){
			this._jump('accumulate_history',value)
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
		<div>
			 <Table bordered dataSource={dataSource} columns={columns} rowKey='key' pagination={false} style={{marginBottom: 20}}/> 
			 <Row type="flex" justify="end">
			 	<Pagination showQuickJumper defaultCurrent={1} current={this.state.pageNum} total={this.state.total} onChange={this._pageChange.bind(this)} />
			 </Row>
		</div>
		);
	}
}