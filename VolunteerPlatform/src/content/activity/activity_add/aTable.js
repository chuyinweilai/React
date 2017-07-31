
import React, { PropTypes,Component } from 'react';
import { 
	Col, 
	Row, 
	Icon, 
	Form, 
	Input, 
	Select, 
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
import Selects from './aCell';
import appData from './../../../assert/Ajax'
import moment from 'moment';
import '../../../App.css'
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
			children:[],
			point:'',
			type: 1,
			typeVals: '社区服务',
			rule_sorce: 5,
			rule_no:1,
			theme: '',
			content: '',
			limite: 1,
			open_date: 0,
			vld_start: 0,
			vld_end: 0,
			thumbUrl:'',
			pic_path:'',
			address: '',

			pic_list:[],
			disable: false,
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
			let typeVal = ''
			if(mess.type == 1){
				typeVal= '社区服务'
			} else if(mess.type == 2){
				typeVal= '公益活动'
			} else if(mess.type == 3){
				typeVal= '其他'
			}
			if(mess.pic_path !== "" ){
				this.setState({
					pic_list: mess.pic_path.split(",")
				})
			}
			this.setState({
				open_add:mess.open_add,
				point: mess.comm_name,
				rule_sorce: mess.score,
				rule_no: mess.score_type,
				type: mess.type,
				typeVals: typeVal,
				theme: mess.title,
				content: mess.detail,
				limite: mess.join_limit,
				open_date: mess.open_date,
				vld_start: mess.vld_start,
				vld_end: mess.vld_end,
				activity_no:  mess.activity_no,
				pic_path:mess.pic_path,
			})
		} else {
			let adate = new Date()
			let time = adate.getFullYear() + "-" + (adate.getMonth()+1) + "-" + adate.getDate()
			this.setState({
				open_date: time,
				vld_start: time,
				vld_end: time,
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
		if(name === 'rule_sorce'){
			this.setState({
				rule_sorce: e
			})
		} else if(name === 'theme'){
			let value = e.target.value;
			this.setState({
				theme: value
			})
		} else if(name === 'content'){
			let value = e.target.value;
			this.setState({
				content: value
			})
		} else if(name === 'limite'){
			this.setState({
				limite: e
			})
		} else if(name === 'address'){
			let value = e.target.value;
			this.setState({
				open_add: value
			})
		}
	}

	//时间输入
	_timeInput(name,value){
		if(value){
			let adate = value._d
			let time = adate.getFullYear() + "-" + (adate.getMonth()+1) + "-" + adate.getDate()
			if(name === 'open_date'){
				this.setState({
					open_date: time
				})
			} else if(name === 'vld_start'){
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

	//选择活动类型，积分
	_selectChange(value, type){
		if(type == 'rule_no'){
			if(value == 0){
				this.setState({
					rule_ctrl: false,
					rule_no: value.rule_no,
				})
				this.props.form.setFieldsValue({
					accumulate: 0,
				});
			} else {
				this.props.form.setFieldsValue({
					accumulate: value.rule_score,
				});
				this.setState({
					rule_ctrl: true,
					rule_no: value.rule_no,
					rule_sorce: value.rule_score,
				})
			}
		} else if(type == 'type'){
			this.setState({
				type: value
			})
		}
	}

	//图片上传
	_imgUp(){
		let that = this
		let arr = []
		if(this.activeMess !== undefined){
			let ss = this.activeMess.pic_path;
			if( ss!== undefined || ss !== ''){
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
			action: 'http://cloudapi.famesmart.com/api/activity/filesave',
			listType: 'picture',
			defaultFileList : arr,	
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
			<Upload {...props}>
			<Button>
				<Icon type="upload" /> upload
			</Button>
			</Upload>
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
			// let pic_paths = that.state.pic_path;
			// if(pic_paths.length){
			// 	pic_paths +=( "," + json.path);
			// } else {
			// 	pic_paths += json.path;
			// }
			that.setState({
				// pic_path: pic_paths,
				pic_list: pic_list,
				disable: false,
			})
		});
	}

	//提交创建新活动
	_add_active(){
		let afteruri  = '';
		let body  = {}
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
		if(this.activeMess == undefined){
 				afteruri  = 'activity/add';
				body = {
					"comm_code":  this.userMess.comm_code,
					"title":  this.state.theme,
					"detail":  this.state.content,
					"pic_path":pic_path,
					"join_limit": this.state.limite,
					"type": this.state.type,
					"score_type": this.state.rule_no,
					"score": this.state.rule_sorce,
					"pub_date": time,
					"open_date": this.state.open_date,
					"vld_start":  this.state.vld_start,
					"vld_end":  this.state.vld_end,
					"open_add": this.state.open_add,
				}
		} else {
				afteruri  = 'activity/update';
				body= {
					"comm_code":  this.userMess.comm_code,
					"title":  this.state.theme,
					"detail":  this.state.content,
					"pic_path": pic_path,
					"join_limit": this.state.limite,
					"type": this.state.type,
					"score_type": this.state.rule_no,
					"score": this.state.rule_sorce,
					"pub_date": time,
					"open_date": this.state.open_date,
					"vld_start":  this.state.vld_start,
					"vld_end":  this.state.vld_end,
					"activity_no": this.activeMess.activity_no,
					"join_cnt": this.activeMess.join_cnt,
					"sign_cnt": this.activeMess.sign_cnt,
					"open_add": this.state.open_add,
				}
		}
			console.log(body)
		appData._dataPost(afteruri, body, (res) =>{
			if(res){
				this._jump('back')
			}
		})
	}

	render() { 
		const { getFieldDecorator, } = this.props.form;
		const formItemLayout = {
			labelCol: { span: 6 },
			wrapperCol: { span: 18 },
		};

		return (
			<div style={{ background: '#fff', padding: 24, margin: 0, minHeight: 80 }}>
				<Form>
					<Row gutter={40}>
						<Col span={8}>
							<FormItem
								{...formItemLayout}
								label="积分类型">
								{getFieldDecorator('rule_no',{
									initialValue: this.state.rule_no
								})(
									<Selects Childer = {this.state.children} SelectCtrl={(index)=>this._selectChange(index,"rule_no")}>
									</Selects>
								)}
							</FormItem>
						</Col>
						<Col span={8}>
							<FormItem
								{...formItemLayout}
								label="活动类型">
								{getFieldDecorator('type',{
									initialValue: this.state.typeVals
								})(
									<Select onChange={(index)=>this._selectChange(index,"type")}>
										<Option key="1">社区服务</Option>
										<Option key="2">公益活动</Option>
										<Option key="3">其他</Option>
									</Select>
								)}
							</FormItem> 
						</Col>
					</Row>
					
					<Row gutter={40}>
						<Col span={8}>
							<FormItem
								{...formItemLayout}
								label="活动积分">
								{getFieldDecorator('accumulate',{
									initialValue: this.state.rule_sorce
								})(
									<InputNumber onChange={this._input.bind(this,'rule_sorce')} disabled={this.state.rule_ctrl}/>
								)}
							</FormItem>
						</Col>
						<Col span={8}>
							<FormItem
								{...formItemLayout}
								label="活动主题">
								{getFieldDecorator('theme',{
									initialValue: this.state.theme
								})(
									<Input placeholder="活动主题" onChange={this._input.bind(this,'theme')} />
								)}
							</FormItem>
						</Col>
						 <Col span={8}>
							<FormItem
								{...formItemLayout}
								label="活动地点">
								{getFieldDecorator('address',{
									initialValue: this.state.open_add
								})(
									<Input placeholder="活动地点" onChange={this._input.bind(this,'address')} />
								)}
							</FormItem>
						</Col> 
						<Col span={8}>
							<FormItem
								{...formItemLayout}
								label="限制人数">
								{getFieldDecorator('limite',{
									initialValue: this.state.limite
								})(
									<InputNumber min={1} placeholder="限制人数" onChange={this._input.bind(this,'limite')}  />
								)}
							</FormItem>
						</Col>
					</Row>

					<Row gutter={40}>
						<Col span={8}>
							<FormItem
								{...formItemLayout}
								label="活动日期">
								{getFieldDecorator('open_date',{
									initialValue: moment(this.state.open_date, 'YYYY-MM-DD')
								})(
									<DatePicker placeholder="选择活动日期" /* showTime={true} format={dateFormat}*/ onChange={this._timeInput.bind(this,'open_date')}/>
								)}
							</FormItem>
						</Col>
						<Col span={8}>
							<FormItem
								{...formItemLayout}
								label="报名开始">
								{getFieldDecorator('vld_start',{
									initialValue: moment(this.state.vld_start, 'YYYY-MM-DD')
								})(
									<DatePicker  placeholder="报名开始日期"	showToday  onChange={this._timeInput.bind(this,'vld_start')}/>
								)}
							</FormItem>
						</Col>
						<Col span={8}>
							<FormItem
								{...formItemLayout}
								label="报名结束">
								{getFieldDecorator('vld_end',{
									initialValue: moment(this.state.vld_end, 'YYYY-MM-DD')
								})(
									<DatePicker placeholder="报名结束日期"  onChange={this._timeInput.bind(this,'vld_end')}/>
								)}
							</FormItem>
						</Col>
					</Row>
					<Row gutter={40}>
						{this._imgUp()}
					</Row>
					
					<Row gutter={40}>
						<FormItem
							//labelCol={{ span: 1 }}
							//wrapperCol= {{ span: 20 }}
							label="活动内容">
							{getFieldDecorator('content',{
								initialValue: this.state.content
							})(
								<TextArea rows={6} placeholder="输入活动内容" onChange={this._input.bind(this,'content')} />
							)}
						</FormItem>
					</Row>
				</Form>

				<Row type="flex" justify="end" gutter={1} >
					<Col span={2}>
						<Button  onClick={() => this._add_active('add')} disabled={this.state.disable}>提交</Button>
					</Col>
					<Col span={2}>
						<Button onClick={()=>this._jump('back')}>取消</Button>
					</Col>
				</Row>
			</div>
		);
	}
}

const WrappedpointTable = Form.create()(pointTable);
export default WrappedpointTable;