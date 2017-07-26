
import React, { PropTypes,Component } from 'react';
import { 
	Col,
	Icon, 
	Row,
	Table, 
	Input, 
	Button, 
	Modal,
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
			count: 0,
		};


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
				title: '积分変动时间',
				dataIndex: 'oper_date',
			}, 
			{
				colSpan:1,
				title: '积分变动原因',
				dataIndex: 'score_type',
				render:(text,record) =>{
					if(text === 1){
						return (<text>礼品兑换</text>)
					} else if(text === 2){
						return (<text>签到积分</text>)
					} else if(text ===3){
						return (<text>手动积分</text>)
					}
				}
			}, 
			{
				colSpan:1,
				title: '积分变动值',
				dataIndex: 'vld_score',
			},
			{
				colSpan:1,
				title: '操作员·',
				dataIndex: 'operator',
			},
			{
				title: '操作',
				colSpan:1,
				render: (text, record, index) => {
					return (
					(
						<Row type="flex" justify="space-around">
							<Button title="Sure to delete?" onClick={() => this._accuCtrl("detail",record)}>
								详情
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
	/**
address:NaN
oper_date:"2017-07-24 17:57:53"
operator:"root"
score_type:1
vld_score:150
	 */
	_getEvent(){
		let userMess = this.mess.message;
		let afteruri = 'vcity/scorelist';
		let body = {
			"wx_id": userMess.wx_id,
			 "comm_code": userMess.comm_code
		}
		appData._dataPost(afteruri,body,(res) => {
			let data = res.data
			data.forEach((value)=>{
				value.address = value.comm_name + value.apt_info+value.floor+value.room
			})
			let pageSum = Math.ceil(res.total/res.per_page)
			let len = data.length;
			this.setState({
				total:res.total,
				dataSource: data,
				count:len,
			})
		})
	}

	_accuCtrl(type,value){
		if(type == "detail"){
			let afteruri = "vcity/history"

		}
	}

	//分页器activity/list?page=num
	_pageChange(pageNumber){
		let userMess = this.userMess;
		let afteruri = 'vcity/scorelist?page=' + pageNumber ;
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
			 
			<Modal
				title="积分变动"
				visible={this.state.visible}
				onOk={()=> this._upData()}
				onCancel={() =>this.setState({visible: false})}
				okText="提交"
				cancelText="取消"
			>
				<Col style={{height: 30}}>所在社区: {this.state.comm_name}</Col>
				<Col style={{height: 30}}>手机号: {this.state.mobile}</Col>
				<Col style={{height: 30}}>兑换商品: {this.state.ch_name}</Col>
				<Col style={{height: 30}}>兑换积分: {this.state.ch_score}</Col>
				<Col style={{height: 60}}>兑换者签名</Col>
				<Row className="printHidden">
					<Col>
						<Button onClick={()=>window.print()}>打印</Button>
					</Col>
				</Row>
			</Modal>
		</div>
		);
	}
}