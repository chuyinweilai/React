
import React, { PropTypes,Component } from 'react';
import { 
	Col, 
	Row, 
	Icon, 
	Form, 
	Input, 
	Select, 
	Modal,
	Button, 
	Tooltip, 
	Upload, 
	message,
	Cascader, 
	Checkbox, 
	DatePicker,
	InputNumber,
	AutoComplete 
} from 'antd';
import appData from './../../../../assert/Ajax'
import moment from 'moment';
import '../../../../App.css'
import "./index.css"
import $ from 'jquery';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const { TextArea } = Input;

class pointTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			comm_name:'',
			rule_ctrl: true,
			change_score:0,
			gift_name: '',
			change_limit: 1,
			vld_start: 0,
			vld_end: 0,
			thumbUrl:'',
			pic_path:'',
			pic_list:[],
			updataType: true,
			volType: false,
			_modal: false,			

			vld_start_Type: '',
			vld_start_Text: '',
			vld_end_Type: '',
			vld_end_Text:''
		};
		this.userMess;
		this.Router;
		this.mess = null;
	}

	componentWillMount(){
		this.Router = this.props.Router;
		this.mess = this.props.message;
		this._initState();
	}

	_initState(){
		let mess = this.props.message.message
		this.activeMess = mess;
		appData._Storage('get', "userMess",(res) =>{
			this.userMess = res
			this.setState({
				comm_name: res.comm_name
			})
		})
		if(mess !== undefined){
			if(mess.pic_path !== "" ){
				this.setState({
					pic_list: mess.pic_path.split(",")
				})
			}
			this.setState({
				gift_name: mess.gift_name,
				change_score: mess.change_score,
				change_limit: mess.change_limit,
				vld_start: mess.vld_start,
				vld_end: mess.vld_end,
				activity_no:  mess.activity_no,
				pic_path:mess.pic_path,
			})
		} else {
			let adate = new Date()
			let time = adate.getFullYear() + "-" + (adate.getMonth()+1) + "-" + adate.getDate()
			this.setState({
				vld_start: time,
				vld_end: time,
				updataType: false,
			})
		}
	}
	
	_jump(nextPage,mess){
		if(nextPage == 'back'){
			this.props.Router(this.props.message.historyPage,mess,this.props.message.nextPage)
		}else {
			this.props.Router(nextPage,mess,this.props.message.nextPage)
		}
	}

	//文本
	_input(name,e){
		if(name === 'gift_name'){
			let value = e.target.value;
			this.setState({
				gift_name: value
			})
		} else if(name === 'change_score'){
			this.setState({
				change_score: e
			})
		}  else if(name === 'change_limit'){
			this.setState({
				change_limit: e
			})
		} 
	}

	//时间输入
	_timeInput(name,value){
		if(value){
			let adate = value._d
			let time = adate.getFullYear() + "-" + (adate.getMonth()+1) + "-" + adate.getDate()
			if(name === 'vld_start'){
				this.setState({
					vld_start: time
				})
			} else if(name === 'vld_end'){
				this.setState({
					vld_end: time
				})
			}
		}
	}


	//图片上传
	_imgUp(){
		let that = this
		let arr = []
		if(this.activeMess !== undefined){
			let ss = this.activeMess.pic_path;
			if( ss!== undefined && ss !== ''){
				ss.split(",").forEach((value,index)=>{
					arr.push({
						uid: index,
						name: index,
						status: 'done',
						url: 'http://cloudapi.famesmart.com/storage/' + value,
					});
				})
			}
		}
		
		const props = {
			action: 'http://cloudapi.famesmart.com/api/gift/filesave',
			listType: 'picture',
			defaultFileList : arr,	
			disabled: this.state.updataType,
			onRemove :(file)=>{
				let arr = this.state.pic_list;
				let aurl = file.url;
				arr.forEach((val,index)=>{
					if('http://cloudapi.famesmart.com/storage/' + val == aurl){
						arr.splice(index,1);
					}
				})
				this.setState({
					pic_list:arr,
				})
			},
			beforeUpload:(file, fileList)=>{
				this.setState({
					disable: true,
				})
				this._updataDone(fileList[0])
			},
			className:'upload-list-inline',
		}
		
		return (
			<Row gutter={40} style={{ padding: 10}}>
				<Col span={8}>
					<Upload {...props}>
					<Button>
						<Icon type="upload" /> 图片上传
					</Button>
					</Upload>
				</Col>
			</Row>
		)
	}

	_updataDone(obj){
		let that = this;
		let form = new FormData();
		form.append("photo", obj);
		$.ajax({
			"async": true,
			"crossDomain": true,
			"url": "http://cloudapi.famesmart.com/api/activity/filesave",
			"method": "POST",
			"headers": {
				"cache-control": "no-cache",
				"postman-token": "1bb66cf0-3e09-9e44-ebe0-2f166b9d998a"
			},
			"processData": false,
			"contentType": false,
			"mimeType": "multipart/form-data",
			"data": form
		}).done(function(response) {
			let json = JSON.parse(response);
			let pic_list = that.state.pic_list;
			pic_list.push( json.path)
			that.setState({
				pic_list: pic_list,
				disable: false,
			})
		});
	}

	//提交创建新活动
	_add_active(type,e){
		let bol = this.state.updataType;
		if(!bol){
			e.preventDefault();
			this.props.form.validateFields((err, values) => {
				if (!err) {
					let adate = new Date()
					let time = adate.getFullYear() + "-" + (adate.getMonth()+1) + "-" + adate.getDate()

					let pic_list = this.state.pic_list;
					let pic_path = '';
					pic_list.forEach((val, index)=>{
						if(index){
							pic_path += "," + val;
						}else {
							pic_path = val;
						}
					})
					
					if(moment(time).isBefore(this.state.vld_start) || moment(time).isSame(this.state.vld_start)){
						this.setState({
							vld_start_Type: '',
							vld_start_Text: '',
						})
						if(moment(this.state.vld_start).isBefore(this.state.vld_end) || moment(this.state.vld_start).isSame(this.state.vld_end)){
							this.setState({
								vld_end_Type: '',
								vld_end_Text: ''
							})
							this._success(pic_path,time)
						} else {
							this.setState({
								vld_end_Type: 'error',
								vld_end_Text:'结束时间不得早于开始时间'
							})
						}
					} else {
						this.setState({
							vld_start_Type: 'error',
							vld_start_Text: '开始时间不得早于当天时间',
						})
					}
				}
			})
		}
	}

	_success(pic_path,time){
		let afteruri  = '';
		let body  = {}
		if(this.activeMess == undefined){
				afteruri  = 'gift/add';
				body = {
					"comm_code":  this.userMess.comm_code,
					"gift_name":  this.state.gift_name,
					"detail": this.state.gift_name,
					"pic_path":pic_path,
					"change_limit": this.state.change_limit,
					"change_score": this.state.change_score,
					"vld_start":  this.state.vld_start,
					"vld_end":  this.state.vld_end,
				}
		} else {
				afteruri  = 'gift/edit';
				body= {
					"comm_code":  this.userMess.comm_code,
					"gift_name":  this.state.gift_name,
					"gift_no":this.activeMess.gift_no,
					"detail": this.state.gift_name,
					"pic_path": pic_path,
					"change_limit": this.state.change_limit,
					"change_score": this.state.change_score,
					"pub_date": time,
					"vld_start":  this.state.vld_start,
					"vld_end":  this.state.vld_end,
				}
		}
		appData._dataPost(afteruri, body, (res) =>{
			if(res){
				this._jump('back')
			}
		})
	}

	//操作栏功能
	_action(type){
		if(type === "cancel"){
			let afteruri = "gift/cancel";
			let body ={   
				"comm_code": this.activeMess.comm_code,
				"gift_no":this.activeMess.gift_no,
			}
			appData._dataPost(afteruri,body,(res)=>{
				if(res){
					this.setState({
						_modal: false,
					})
					this._jump('back')
				}
			})
		}
	}

	_render(){
			if(this.state.updataType){
				return (
					<Row type="flex" justify="end" gutter={1} >
						<Col span={2}>
							<Button type="danger" onClick={()=> {this.setState({_modal: true})}}  disabled={this.state.volType}>商品下架</Button>
						</Col>
						<Col span={2}>
							<Button type="primary" onClick={()=>this.setState({updataType: false})} disabled={this.state.volType}>编辑</Button>								
						</Col>
						<Col span={2}>
							<Button onClick={()=>this._jump('back')}>返回</Button>
						</Col>
					</Row>
				)
			} else {
				return (
					<Row type="flex" justify="end" gutter={1} >
						<Col span={2}>
							<Button type="danger" onClick={()=> {this.setState({_modal: true})}}>商品下架</Button>
						</Col>
						<Col span={2}>
							<Button type="primary" onClick={this._add_active.bind(this,'add')}>提交</Button>
						</Col>
						<Col span={2}>
							<Button onClick={()=>this.setState({updataType: true})}>退出编辑</Button>
						</Col>
					</Row>
				)
			}
	}

	render() { 
		const { getFieldDecorator, } = this.props.form;
		const formItemLayout = {
			labelCol: { span: 8 },
			wrapperCol: { span: 7 },
		};

		return (
			<div style={{ padding: 24, margin: 0, minHeight: 80 }}>
				<Col  className="printHidden">
					<text style={{fontSize: 24, color: '#aaa'}}>米社运维/兑换商品管理/</text>
					<text style={{fontSize: 24, color: '#1e8fe6'}}>兑换商品详情</text>
				</Col>
				<Form  style={{paddingTop: '50px'}} >
					<FormItem
						{...formItemLayout}
						label="商品名称">
						{getFieldDecorator('gift_name',{
							initialValue: this.state.gift_name,
							rules:[
								{
									required: true, message: '请输入商品名称'
								}
							]
						})(
							<Input placeholder="商品名称" onChange={this._input.bind(this,'gift_name')} disabled={this.state.updataType}/>
						)}
					</FormItem>
					
					<FormItem
						{...formItemLayout}
						label="兑换积分">
						{getFieldDecorator('change_score',{
							initialValue: this.state.change_score,
							rules:[
								{
									required: true, message: '请输入兑换积分'
								}
							]
						})(
							<InputNumber placeholder="兑换积分" onChange={this._input.bind(this,'change_score')} disabled={this.state.updataType} />
						)}
					</FormItem>
					
					<FormItem
						{...formItemLayout}
						label="总数量">
						{getFieldDecorator('change_limit',{
							initialValue: this.state.change_limit,
							rules:[
								{
									required: true, message: '请输入兑换数量'
								}
							]
						})(
							<InputNumber min={1} placeholder="总数量" onChange={this._input.bind(this,'change_limit')} disabled={this.state.updataType} />
						)}
					</FormItem>
					
					<FormItem
						{...formItemLayout}
						validateStatus = {this.state.vld_start_Type}
						help={this.state.vld_start_Text}
						label="兑换开始">
						{getFieldDecorator('vld_start',{
							initialValue: moment(this.state.vld_start, 'YYYY-MM-DD'),
							rules:[
								{
									required: true, message: '请选择开始日期'
								}
							]
						})(
							<DatePicker  placeholder="兑换开始日期"	showToday  onChange={this._timeInput.bind(this,'vld_start')} disabled={this.state.updataType}/>
						)}
					</FormItem>
					
					<FormItem
						{...formItemLayout}
						validateStatus = {this.state.vld_end_Type}
						help={this.state.vld_end_Text}
						label="兑换结束">
						{getFieldDecorator('vld_end',{
							initialValue: moment(this.state.vld_end, 'YYYY-MM-DD'),
							rules:[
								{
									required: true, message: '请选择结束日期'
								}
							]
						})(
							<DatePicker placeholder="兑换结束日期"  onChange={this._timeInput.bind(this,'vld_end')} disabled={this.state.updataType}/>
						)}
					</FormItem>

					<Row gutter={40}>
						{this._imgUp()}
					</Row>
				
					<FormItem>
						{this.activeMess !== undefined?this._render():
							<Row type="flex" justify="end" gutter={1} >
								<Col span={2}>
									<Button type="primary" onClick={this._add_active.bind(this,'add')}>提交</Button>
								</Col>
								<Col span={2}>
									<Button onClick={()=>this._jump('back')}>返回</Button>
								</Col>
							</Row>
						}
					</FormItem>
				</Form>
				 <Modal
					visible = {this.state._modal}
				 	onOk={this._action.bind(this,'cancel')}
					onCancel = {()=> {this.setState({_modal: false})}}
				 >
					<Row>
						<Col>是否确认下架商品？</Col>
					</Row>
				 </Modal>
			</div>
		);
	}
}

const WrappedpointTable = Form.create()(pointTable);
export default WrappedpointTable;