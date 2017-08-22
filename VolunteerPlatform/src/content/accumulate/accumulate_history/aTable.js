
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
			comm_name: '',
			mobile:0 ,
			name: "",
			used_score:0,
			dataSource: [],
			count: 0,
			detail_val:{}
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
				title: '积分变动时间',
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
				render:(text,record)=>{
						if(record.score_type == 1){
							return <text> - {record.used_score}</text>
						} else {
							return <text> + {record.activity_score}</text>
						}
				}
			},
			{
				colSpan:1,
				title: '操作员',
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
		if(type == "detail"){
			this.setState({
				detail_val:value,
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

	_modal(){
		if(this.state._visible){
			let aValue = this.state.detail_val;
			let type =''
			let score = 0
			if(aValue.score_type == 1){
				type ='礼品兑换';
				score =  "-" + aValue.used_score
			}else if(aValue.score_type == 2) {
				type ='签到积分'
				score = "+" + aValue.activity_score
			}else if(aValue.score_type == 3) {
				type ='手动积分'
				score =  "+" + aValue.activity_score
			}
			let aurl = "http://cloudapi.famesmart.com/Mirai/PC/printPage/index.html?comm_name=" +this.state.comm_name + "&mobile=" + this.state.mobile + "&change_date=" + aValue.change_date + "&type=" + type + "&score=" + score;
			return (
				<Modal
					title="积分变动"
					style={{height: 300}}
					visible={this.state._visible}
					onOk={()=>window.print()}
					onCancel={() =>this.setState({_visible: false})}
					okText="打印" 
					cancelText="确认"
				>
					<iframe style={{border: 'none',height: 250, overflow: 'hidden'}} src={encodeURI(aurl)}></iframe> 
				</Modal>
			)
		}
	}
	
	render() {
		const { dataSource } = this.state;
		let columns = this.columns;
		return (
		<div style={{padding: 24, margin: 0, minHeight: 80 }}>
			<Row type="flex" justify="space-between" gutter={1}>
				<Col className="printHidden">
					<text style={{fontSize: 24, color: '#aaa'}}>积分管理/</text>
					<text style={{fontSize: 24, color: '#1e8fe6'}}>积分历史</text>
				</Col>
				<Col span={2} className="printHidden">
						<Button style={{height: 32}}  onClick={() => window.print()}>打印</Button>
				</Col>
			</Row>
			<Row>
				<Col>
					<Button style={{height: 32, margin: 10}} onClick={()=>this._jump('back')}>返回</Button>
					<div>
						<Col span={5} style={{margin:'10px'}}> 
							姓名:{this.state.name}
						</Col>
						<Col span={5} style={{margin:'10px'}}> 
							手机:{this.state.mobile}
						</Col>
					</div>
				</Col>
			</Row>
			<Table bordered dataSource={dataSource} columns={columns} rowKey='key' pagination={false} style={{marginBottom: 20}}/> 
			<Row type="flex" justify="end">
			 	<Pagination showQuickJumper defaultCurrent={1} current={this.state.pageNum} total={this.state.total} onChange={this._pageChange.bind(this)} />
			 </Row>
			 
			 {this._modal()}
		</div>
		);
	}
}