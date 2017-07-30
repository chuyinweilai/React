
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
// import Selects from './aCell';
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
			name:'',
			mobile: 0,
			gender:[],
			type_name:'',
			type:'',
			vol_tag:'',
			comm_name: "",
			apt_info: "",
			floor: "",
			room: "",
			email: 0,
			occupation: '',
			ic_card: '',

			disable: true,
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
			this.userMess = res
			this.setState({
				comm_name: res.comm_name
			})
		})
		if(mess !== undefined){
			let type_name="";
			if(mess.type == "Y"){
				type_name = '业主'
			} else if(mess.type == "Z"){
				type_name = "租户"
			}
			this.setState({
				type:mess.type,
				name: mess.name,
				mobile: mess.mobile,
				gender: mess.gender,
				type_name:type_name,
				vol_tag: mess.vol_tag,
				occupation: mess.occupation,
				ic_card: mess.ic_card,
				email: mess.email,
				vol_tag: mess.vol_tag
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
		let value = e.target.value;
		if(name === 'name'){
			this.setState({
				name: value
			})
		} else if(name === 'gender'){
			let value = e.target.value;
			this.setState({
				gender: value
			})
		} else if(name === 'mobile'){
			this.setState({
				mobile: value
			})
		} else if(name === 'occupation'){
			this.setState({
				occupation: value
			})
		} else if(name === 'ic_card'){
			this.setState({
				ic_card: value
			})
		} else if(name === 'email'){
			let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
			if(reg.test(value)){
				this.setState({
					disable: false,
					email: value
				})
			} else {
				this.setState({
					disable: true
				})
			}
		}
	}

	//选择活动类型，积分
	_selectChange(type,value){
		if(type == "gender"){
			this.setState({
				gender:  value
			})
		} else if(type == "type_name"){
			this.setState({
				type: value
			})
		} else if(type == "vol_type"){
			this.setState({
				vol_type: value
			})
		}
	}

	//提交创建新活动
	_add_active(){
		let	afteruri  = 'vcity/edituser'
		let body = {
			"comm_code":  this.userMess.comm_code,
			"type": this.state.type,
			"name": this.state.name,
			"mobile": this.state.mobile,
			"vol_tag": this.state.vol_tag,
			"occupation": this.state.occupation,
			"ic_card": this.state.ic_card,
			"email": this.state.email,
		}
		appData._dataPost(afteruri, body, (res) =>{
			if(res >= 0 ){
				this._jump('back')
			} else {
				
			}
		})
	}

	render() { 
		const { getFieldDecorator, } = this.props.form;
		const formItemLayout = {
			labelCol: { span: 8 },
			wrapperCol: { span: 7 },
		};
		return (
			<div style={{ background: '#fff', padding: 24, margin: 0, minHeight: 80 }}>
				<Form style={{paddingTop: '50px'}}>
					<FormItem
						{...formItemLayout}
						label="姓名">
						{getFieldDecorator('name',{
							initialValue: this.state.name
						})(
							<Input onChange={this._input.bind(this,"name")} disabled/>
						)}
					</FormItem>

					<FormItem
						{...formItemLayout}
						label="性别">
						{getFieldDecorator('gender',{
							initialValue: this.state.gender
						})(
							<Select onChange={this._selectChange.bind(this,'gender')} disabled>
								<Option key="male">男</Option>
								<Option key="lady">女</Option>
							</Select>
						)}
					</FormItem>

					<FormItem
						{...formItemLayout}
						label="手机">
						{getFieldDecorator('mobile',{
							initialValue: this.state.mobile
						})(
							<Input onChange={this._input.bind(this,'mobile')} disabled/>
						)}
					</FormItem>

					<FormItem
						{...formItemLayout}
						label="居住类型">
						{getFieldDecorator('type_name',{
							initialValue: this.state.type_name
						})(
							<Select onChange={this._selectChange.bind(this,'type_name')}>
								<Option key="Y">业主</Option>
								<Option key="Z">租户</Option>
							</Select>
						)}
					</FormItem>

					<FormItem
						{...formItemLayout}
						label="志愿者类型">
						{getFieldDecorator('vol_tag',{
							initialValue: this.state.vol_tag
						})(
							<Select onChange={this._selectChange.bind(this,'vol_tag')} disabled>
								<Option key="0">普通志愿者</Option>
								<Option key="1">楼组长</Option>
							</Select>
						)}
					</FormItem>

					<FormItem
						{...formItemLayout}
						label="职业">
						{getFieldDecorator('occupation',{
							initialValue: this.state.occupation
						})(
							<Input  onChange={this._input.bind(this,"occupation")}/>
						)}
					</FormItem>

					<FormItem
						{...formItemLayout}
						label="IC卡">
						{getFieldDecorator('ic_card',{
							initialValue: this.state.ic_card
						})(
							<Input  onChange={this._input.bind(this,"ic_card")}/>
						)}
					</FormItem>

					<FormItem
						{...formItemLayout}
						label="email">
						{getFieldDecorator('email',{
							rules: [{
								type: 'email', message: 'The input is not valid E-mail!',
							}, {
								required: true, message: 'Please input your E-mail!',
							}],
							initialValue: this.state.email
						})(
							<Input onChange={this._input.bind(this,'email')}/>
						)}
					</FormItem>

				</Form>

				<Row type="flex" justify="end" gutter={1} >
					<Col span={2}>
						<Button  onClick={() => this._add_active()} disabled={this.state.disable}>提交</Button>
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