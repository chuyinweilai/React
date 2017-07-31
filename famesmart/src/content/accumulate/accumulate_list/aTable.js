
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
	Dropdown,
	Breadcrumb, 
} from 'antd'
import '../../../App.css'
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
				colSpan:1,
				title: '姓名',
				dataIndex: 'name',
				render:(text) => {
					return(
						<text style={{color: '#1e8fe6',}}>{text}</text>
					)
				}
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
				render:(text) => {
					return(
						<text style={{color: '#ea7c6b',}}>{text}</text>
					)
				}
			},
			{
				title: '操作',
				colSpan:2,
				render: (text, record, index) => {
					return (
					(
						<Row type="flex" justify="space-around">
							<Button onClick={() => this._accuCtrl("add",record)}>
								 手动积分
							</Button>
							<Button onClick={() => this._accuCtrl("del",record)}>
								积分兑换
							</Button>
							<Button onClick={() => this._accuCtrl("history",record)}>
								积分历史
							</Button>
						</Row>
					)
					);
				},
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
		let afteruri = 'vcity/scoresheet';
		let body = {
			 "comm_code": userMess.comm_code
		}
		appData._dataPost(afteruri,body,(res) => {
			let pageSum = Math.ceil(res.total/res.per_page)

			let data = res.data
			data.forEach((value)=>{
				value.address = value.comm_name + value.apt_info+value.floor+value.room
			})
			let len = data.length;
			this.setState({
				total:res.total,
				dataSource: data,
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
				pageNum:pageNumber
			})
		})
	}

	render() {
		const { dataSource } = this.state;
		let columns = this.columns;
		return (
		<div style={{ padding: 24, margin: 0, minHeight: 80 }}>
			<Row type="flex" justify="space-between" gutter={1}>
				<Col span={2} className="printHidden">
					<text style={{fontSize: 24, color: '#1e8fe6'}}>积分管理</text>
				</Col>
				<Col span={2} className="printHidden">
					<Button style={{height: 32}} onClick={() =>  window.print()}>打印</Button>
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
			pagination={false} 
			style={{marginBottom: 20}}/> 
			<Row type="flex" justify="end">
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