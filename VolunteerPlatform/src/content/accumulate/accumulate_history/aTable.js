
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
			_visible: false,
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
						<text>{index+1}</text>
					)
				}
			}, 
			{
				colSpan:1,
				title: '积分変动时间',
				dataIndex: 'change_date',
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
				dataIndex: 'used_score',
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
							<Button onClick={() => this._accuCtrl("detail",record)}>
								详情
							</Button>
						</Row>
					)
					);
				},
			}
		];
	}
	
	
	componentWillMount(){
		this.Router = this.props.Router;
		this.mess = this.props.message;
		appData._Storage('get',"userMess",(res) =>{
			this.setState({
				comm_name: res.comm_name,
				mobile: this.mess.message.mobile,
				name: this.mess.message.name,
			})
			this.userMess = res
			this._getEvent()
		})
	}

	_jump(nextPage,mess){
		if(nextPage == 'back'){
			this.Router(this.mess.historyPage,mess,this.mess .nextPage)
		}else {
			this.Router(nextPage,mess,this.mess.nextPage)
		}
	}
	
	//获取后台信息
	_getEvent(){
		let userMess = this.mess.message;
		let afteruri = 'vcity/scorelist';
		let body = {
			"wx_id": userMess.wx_id,
			"comm_code": userMess.comm_code,
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
		console.log(value)
		if(type == "detail"){
			this.setState({
				used_score: value.used_score,
				_visible: true
			})
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
		<div style={{ background: '#fff', padding: 24, margin: 0, minHeight: 80 }}>
			<Row type="flex" justify="space-between" gutter={1}>
				<Col>
					<Button onClick={()=>this._jump('back')}>返回</Button>
					<div>
						所在社区:{this.state.comm_name}
					</div>
					<div>
						手机:{this.state.mobile}
					</div>
					<div>
						姓名:{this.state.name}
					</div>
				</Col>
				<Col span={2} className="printHidden">
						<Button onClick={() => this._print()}>打印</Button>
				</Col>
			</Row>
			<Row>
				<Col span={8} style={{margin:'10px'}}> </Col>
			</Row>
			<Table bordered dataSource={dataSource} columns={columns} rowKey='key' pagination={false} style={{marginBottom: 20}}/> 
			<Row type="flex" justify="end">
			 	<Pagination showQuickJumper defaultCurrent={1} current={this.state.pageNum} total={this.state.total} onChange={this._pageChange.bind(this)} />
			 </Row>
			 
			<Modal
				title="积分变动"
				visible={this.state._visible}
				onOk={() =>this.setState({_visible: false})}
				onCancel={() =>this.setState({_visible: false})}
				okText="确认" 
				cancelText="取消"
			>
				<Col style={{height: 30}}>所在社区: {this.state.comm_name}</Col>
				<Col style={{height: 30}}>手机号: {this.state.mobile}</Col>
				<Col style={{height: 30}}>兑换商品: {this.state.ch_name}</Col>
				<Col style={{height: 30}}>兑换积分: {this.state.used_score}</Col>
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