
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
import appData from './../../../assert/Ajax';
import '../../../App.css'
import '../../../index.css'

export default class QRcode_record extends Component {
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

		this.columns = [];
		
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
		<div style={{background: '#fff', flex: 1,padding: 24,margin: 0,minHeight: 80}}>
			<Row type="flex" justify="space-between" gutter={1}>
				<Col  className="printHidden"> 
					<text style={{fontSize: 24, color: '#1e8fe6'}}>二维码分享记录</text>
				</Col>
				<Col className="printHidden">
				{/* <span style={{ marginRight: 10}}>
						<Button style={{height: 32, backgroundColor: '#1e8fe6', color: 'white'}}  onClick = {()=>this._addAct('add')}>新增活动</Button>
				</span> */}
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
		</div>
		);
	}
}