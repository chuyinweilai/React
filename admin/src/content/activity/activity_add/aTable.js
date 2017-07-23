
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

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const { TextArea } = Input;
// const dateFormat = 'YYYY-MM-DD h:mm:ss';
// moment().format('MMMM Do YYYY, h:mm:ss a');


class pointTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			confirmDirty: false,
			autoCompleteResult: [],
			comm_name:'',
			accu_ctrl: true,
			accu_type: 0,
			children:[],
			point:'',
			type:'',
			typeNum:0,
			accu_sorce: 0,
			theme: '',
			content: '',
			limite: 0,
			open_date: '',
			vld_start: '',
			vld_end: ''
		};
		this.userMess;
		this.Router;
		this.mess = null;
	}

	componentWillMount(){
		this.Router = this.props.Router;
		this.mess = this.props.message;
		
		let mess = this.props.message.message
		this.activeMess = mess;
		appData._Storage('get', "userMess",(res) =>{
			this.setState({
				comm_name: res.comm_name
			})
		})
		if(mess !== undefined){
			this.setState({
				point: mess.comm_name,
				typeNum: mess.type,
				accu_sorce: mess.score,
				theme: mess.title,
				content: mess.detail,
				limite: mess.join_limit,
				open_date: mess.open_date,
				vld_start: mess.vld_start,
				vld_end: mess.vld_end,
				activity_no:  mess.activity_no,
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
		if(name === 'accu_sorce'){
			this.setState({
				accu_sorce: e
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
		}
	}

	//时间输入
	_timeInput(name,value){
		let adate = value._d
		let time = adate.getFullYear() + "-" + (adate.getMonth()+1) + "-" + adate.getDate()
		//  + " " + adate.getHours() + ":" + adate.getMinutes() + ":" + adate.getSeconds() 
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

	//提交创建新活动
	_add_active(upType){
		let afteruri  = '';
		if( upType === 'add'){
			afteruri  = 'activity/add'
		} else if(upType === 'add'){

		}
		let adate = new Date()
		let time = adate.getFullYear() + "-" + (adate.getMonth()+1) + "-" + adate.getDate()
		//  + " " + adate.getHours() + ":" + adate.getMinutes() + ":" + adate.getSeconds()
		let body = {
            "comm_code":  this.userMess .comm_code,
            "title":  this.state.theme,
            "detail":  this.state.content,
            "pic_path": "",
            "join_limit": this.state.limite,
            "type": this.state.accu_type,
            "score": this.state.accu_sorce,
            "pub_date": time,
            "open_date": this.state.open_date,
            "vld_start":  this.state.vld_start,
            "vld_end":  this.state.vld_end
		}
		return null
		appData._dataPost(afteruri, body, (res) =>{
			})
	}

	//选择活动类型，积分
	_selectChange(value){
		console.log(value)
		if(value == 0){
				this.setState({
					accu_ctrl: false,
					accu_type: 0,
				})
				this.props.form.setFieldsValue({
					accumulate: 0,
				});
		} else {
			this.props.form.setFieldsValue({
				accumulate: value.rule_score,
			});
			this.setState({
				accu_ctrl: true,
				accu_type: value.rule_type,
				accu_sorce: value.rule_score,
			})
		}
	}

	render() { 
		const { getFieldDecorator, } = this.props.form;
		const formItemLayout = {
			labelCol: { span: 8 },
			wrapperCol: { span: 7 },
		};

		return (
			<div>
				<Form style={{paddingTop: '100px'}}>
					<FormItem
						{...formItemLayout}
						label="所在社区">
						{getFieldDecorator('point',{
							initialValue: this.state.point
						})(
							<Input placeholder={this.state.comm_name} disabled={true}/>
						)}
					</FormItem>

					<FormItem
						{...formItemLayout}
						label="活动类型">
						{getFieldDecorator('type',{
							initialValue: this.state.typeNum
						})(
							<Selects Childer = {this.state.children} SelectCtrl={(index)=>this._selectChange(index)}>
							</Selects>
						)}
					</FormItem>
					

					<FormItem
						{...formItemLayout}
						label="活动积分">
						{getFieldDecorator('accumulate',{
							initialValue: this.state.accu_sorce
						})(
							<InputNumber onChange={this._input.bind(this,'accu_sorce')} disabled={this.state.accu_ctrl}/>
						)}
					</FormItem>

					<FormItem
						{...formItemLayout}
						label="活动主题">
						{getFieldDecorator('theme',{
							initialValue: this.state.theme
						})(
							<Input placeholder="活动主题" onChange={this._input.bind(this,'theme')} />
						)}
					</FormItem>

					<FormItem
						{...formItemLayout}
						label="活动内容">
						{getFieldDecorator('content',{
							initialValue: this.state.content
						})(
							<TextArea rows={6} placeholder="输入活动内容" onChange={this._input.bind(this,'content')} />
						)}
					</FormItem>

					<FormItem
						{...formItemLayout}
						label="限制人数">
						{getFieldDecorator('limite',{
							initialValue: this.state.limite
						})(
							<InputNumber placeholder="限制人数" onChange={this._input.bind(this,'limite')}  />
						)}
					</FormItem>

					<FormItem
						{...formItemLayout}
						label="活动日期">
						{getFieldDecorator('open_date',{
							initialValue: moment(this.state.open_date, 'YYYY-MM-DD')
						})(
							<DatePicker placeholder="选择活动日期" /* showTime={true} format={dateFormat}*/ onChange={this._timeInput.bind(this,'open_date')}/>
						)}
					</FormItem>

					<FormItem
						{...formItemLayout}
						label="报名开始">
						{getFieldDecorator('vld_start',{
							initialValue: moment(this.state.vld_start, 'YYYY-MM-DD')
						})(
							<DatePicker  placeholder="报名开始日期"  onChange={this._timeInput.bind(this,'vld_start')}/>
						)}
					</FormItem>

					<FormItem
						{...formItemLayout}
						label="报名结束">
						{getFieldDecorator('vld_end',{
							initialValue: moment(this.state.vld_end, 'YYYY-MM-DD')
						})(
							<DatePicker placeholder="报名结束日期"  onChange={this._timeInput.bind(this,'vld_end')}/>
						)}
					</FormItem>
				</Form>
				<Row type="flex" justify="end" gutter={1} >
					<Col span={2}>
						<Button  onClick={() => this._add_active('add')}>提交</Button>
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