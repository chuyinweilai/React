
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

			score: 5,
			score_type:1,
			score_name:'',

			theme: '',
			content: '',
			limite: 1,
			open_date: 0,
			vld_start: 0,
			vld_end: 0,
			thumbUrl:'',
			pic_path:'',
			address: '',
			score_list:[],
			pic_list:[],
			updataType: true,
		};
		this.userMess;
		this.Router;
		this.mess = null;
		this.Children = [];
		this.score_list=[];
		
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
				score: mess.score,
				score_type: mess.score_type,
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
			this._select_1(mess.score_type);
		} else {
			let adate = new Date()
			let time = adate.getFullYear() + "-" + (adate.getMonth()+1) + "-" + adate.getDate()
			this.setState({
				open_date: time,
				vld_start: time,
				vld_end: time,
				updataType: false,
			})
			this._select_1(1);
		}
	}

	//活动类型
	_select_1(num){
		let afteruri = 'vcity/listrule';
		appData._Storage('get', 'userMess',(res)=>{
			let body={
				comm_code: res.comm_code
			}
			appData._dataPost(afteruri,body,(data) =>{
				let others = {
					comm_code:"M0001",
					rule_name:"其他",
					score_type:0,
					rule_no: 0
				}
				data.push(others)
				let array = []
				data.forEach((vals, index)=> {
					if(vals.rule_no == num){
						this.setState({
							score_name: vals.rule_name,
						})
					}
					let opt = <Option key={vals.rule_no}>{vals.rule_name}</Option>;
					array.push(opt)
				});
				this.setState({
					score_list: array,
				})
			})
		})
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
		if(name === 'score'){
			this.setState({
				score: e
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
		if(type == 'score_type'){
			if(value == 0){
				this.setState({
					rule_ctrl: false,
					score_type: value.score_type,
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
					score_type: value.score_type,
					score: value.rule_score,
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
			action: 'http://cloudapi.famesmart.com/api/activity/filesave',
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
								"score_type": this.state.score_type,
								"score": this.state.score,
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
								"score_type": this.state.score_type,
								"score": this.state.score,
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
					appData._dataPost(afteruri, body, (res) =>{
						if(res){
							this._jump('back')
						}
					})
				}
			})
		}
	}

	_render(){
			if(this.state.updataType){
				return (
					<Row type="flex" justify="end" gutter={1} >
						<Col span={2}>
							<Button type="primary" onClick={()=>this.setState({updataType: false})} >编辑</Button>								
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
							<Button type="primary" onClick={this._add_active.bind(this,'add')}>提交</Button>
						</Col>
						<Col span={2}>
							<Button onClick={()=>this.setState({updataType: true})}>取消</Button>
						</Col>
					</Row>
				)
			}
	}

	render() { 
		const { getFieldDecorator, } = this.props.form;
		const formItemLayout = {
			labelCol: { span: 6 },
			wrapperCol: { span: 18 },
		};

		return (
			<div style={{ padding: 24, margin: 0, minHeight: 80 }}>
				<Col  className="printHidden">
					<text style={{fontSize: 24, color: '#aaa'}}>活动管理/</text>
					<text style={{fontSize: 24, color: '#1e8fe6'}}>新增（修改）活动</text>
				</Col>
				<Form  style={{paddingTop: '50px'}} >
					<Row gutter={40}>
						<Col span={8}>
							<FormItem
								{...formItemLayout}
								label="积分类型">
								{getFieldDecorator('score_type',{
									initialValue: this.state.score_name
								})(
									<Select 
										onChange={(index)=>this._selectChange(index,"score_type")} 
										disabled={this.state.updataType}
										>
										{this.state.score_list}
									</Select>
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
									<Select onChange={(index)=>this._selectChange(index,"type")} disabled={this.state.updataType}>
										<Option key="1">社区服务</Option>
										<Option key="2">公益活动</Option>
										<Option key="3">其他</Option>
									</Select>
								)}
							</FormItem> 
						</Col>
						<Col span={8}>
							<FormItem
								{...formItemLayout}
								label="活动积分">
								{getFieldDecorator('accumulate',{
									initialValue: this.state.score
								})(
									<InputNumber onChange={this._input.bind(this,'score')} disabled={this.state.rule_ctrl}/>
								)}
							</FormItem>
						</Col>
					</Row>
					
					<Row gutter={40}>
						<Col span={8}>
							<FormItem
								{...formItemLayout}
								label="活动主题">
								{getFieldDecorator('theme',{
									initialValue: this.state.theme,
									rules:[
										{
											required: true, message: '请输入活动主题'
										},{
											max: 20,message:'超过输入最大长度！'
										}
									]
								})(
									<Input placeholder="活动主题" onChange={this._input.bind(this,'theme')} disabled={this.state.updataType}/>
								)}
							</FormItem>
						</Col>
						 <Col span={8}>
							<FormItem
								{...formItemLayout}
								label="活动地点">
								{getFieldDecorator('address',{
									initialValue: this.state.open_add,
									rules:[
										{
											required: true, message: '请输入活动主题'
										}
									]
								})(
									<Input placeholder="活动地点" onChange={this._input.bind(this,'address')} disabled={this.state.updataType} />
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
									<InputNumber min={1} placeholder="限制人数" onChange={this._input.bind(this,'limite')} disabled={this.state.updataType} />
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
									<DatePicker placeholder="选择活动日期" disabled={this.state.updataType} onChange={this._timeInput.bind(this,'open_date')}/>
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
									<DatePicker  placeholder="报名开始日期"	showToday  onChange={this._timeInput.bind(this,'vld_start')} disabled={this.state.updataType}/>
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
									<DatePicker placeholder="报名结束日期"  onChange={this._timeInput.bind(this,'vld_end')} disabled={this.state.updataType}/>
								)}
							</FormItem>
						</Col>
					</Row>

					<Row gutter={40}>
						{this._imgUp()}
					</Row>
					
					<Row gutter={40}>
						<FormItem
							label="活动内容">
							{getFieldDecorator('content',{
								initialValue: this.state.content,
								rules:[
									{ max: 300, message:'超过输入最大长度！'},
									{required: true, message:"请输入活动内容"}
									]
							})(
								<TextArea rows={6} placeholder="输入活动内容" onChange={this._input.bind(this,'content')} disabled={this.state.updataType}/>
							)}
						</FormItem>
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
			</div>
		);
	}
}

const WrappedpointTable = Form.create()(pointTable);
export default WrappedpointTable;