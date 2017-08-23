
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
import moment from 'moment';
import appData from './../../../../assert/Ajax';
import  './../../../../App.css'

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const { TextArea } = Input;


class pointTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name:'',
			mobile: 0,
			gender:"男",
			type_name:'',
			type:'Y',
			vol_tag:'普通志愿者',
			comm_name: "",
			apt_code: "",
			floor: "",
			room: "",
			email: "",
			occupation: '',
			ic_card: '',
			birthday:'',

			indisable: false,
			disable: false,
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
				vol_tag: mess.vol_tag,
				apt_code: mess.apt_code,
				floor: mess.floor,
				room: mess.room,
				birthday: mess.birthday,

				indisable: true,
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
		}  else if(name === 'apt_code'){
			let value = e.target.value;
			this.setState({
				apt_code: value
			})
		}  else if(name === 'floor'){
			let value = e.target.value;
			this.setState({
				floor: value
			})
		}  else if(name === 'room'){
			let value = e.target.value;
			this.setState({
				room: value
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
		} else if(type == "vol_tag"){
			this.setState({
				vol_tag: value
			})
		}
	}

	//提交
	_add_active(e){
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				if(this.mess.message !==  undefined){
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
						"wx_id": this.activeMess.wx_id
					}
					appData._dataPost(afteruri, body, (res) =>{
						if(res >= 0 ){
							this._jump('back')
						}
					})
				} else {
					let	afteruri  = 'vcity/adduser'
					let body = {
						"comm_code":  this.userMess.comm_code,
						"type": this.state.type,
						"name": this.state.name,
						"mobile": this.state.mobile,
						"vol_tag": this.state.vol_tag,
						"occupation": this.state.occupation,
						"ic_card": this.state.ic_card,
						"email": this.state.email,
						"gender": this.state.gender,
						"apt_code":  this.state.apt_code,
						"floor":  this.state.floor,
						"room":  this.state.room,
						"birthday": this.state.birthday,
					}
					appData._dataPost(afteruri, body, (res) =>{
						if(res >= 0 ){
							this._jump('back')
						}
					})
				}
			}
		});
		return null
	}

	render() { 
		const { getFieldDecorator, } = this.props.form;
		const formItemLayout = {
			labelCol: { span: 8 },
			wrapperCol: { span: 7 },
		};
		return (
			<div style={{ padding: 24, margin: 0, minHeight: 80 }}>
				<Row type="flex" justify="space-between" gutter={1}>
					<Col className="printHidden">
						<text style={{fontSize: 24, color: '#aaa'}}>志愿者管理/</text>
						<text style={{fontSize: 24, color: '#1e8fe6'}}>修改(新增)志愿者</text>
					</Col>
				</Row>

				<Form style={{paddingTop: '50px'}} onSubmit={this._add_active.bind(this)}>
					<FormItem
						{...formItemLayout}
						label="姓名">
						{getFieldDecorator('name',{
							initialValue: this.state.name,
							rules: [{ required: true, message: '请输入姓名信息!' }],
						})(
							<Input onChange={this._input.bind(this,"name")} disabled={this.state.indisable}/>
						)}
					</FormItem>

					<FormItem
						{...formItemLayout}
						label="性别">
						{getFieldDecorator('gender',{
							initialValue: this.state.gender == ""?"male": this.state.gender,
						})(
							<Select onChange={this._selectChange.bind(this,'gender')} disabled={this.state.indisable}>
								<Option key="male">男</Option>
								<Option key="lady">女</Option>
							</Select>
						)}
					</FormItem>

					<FormItem
						{...formItemLayout}
						label="手机">
						{getFieldDecorator('mobile',{
							initialValue: this.state.mobile,
							rules: [
								{ required: true, message: '请填写手机号!' },
								{ pattern: /^1[3|4|5|8][0-9]\d{8}$/, message: '手机号格式有误！'}
							],
						})(
							<Input onChange={this._input.bind(this,'mobile')}  disabled={this.state.indisable}/>
						)}
					</FormItem>

					<FormItem
						{...formItemLayout}
						label="楼号">
						{getFieldDecorator('apt_code',{
							initialValue: this.state.apt_code,
							rules: [{ required: true, message: '请填写楼号!' }],
						})(
							<Input onChange={this._input.bind(this,'apt_code')}  disabled={this.state.indisable}/>
						)}
					</FormItem>

					<FormItem
						{...formItemLayout}
						label="楼层">
						{getFieldDecorator('floor',{
							initialValue: this.state.floor,
							rules: [{ required: true, message: '请填写楼层!' }],
						})(
							<Input onChange={this._input.bind(this,'floor')}  disabled={this.state.indisable}/>
						)}
					</FormItem>

					<FormItem
						{...formItemLayout}
						label="房间号">
						{getFieldDecorator('room',{
							initialValue: this.state.room,
							rules: [{ required: true, message: '请填写房间号!' }],
						})(
							<Input onChange={this._input.bind(this,'room')}  disabled={this.state.indisable}/>
						)}
					</FormItem>

					<FormItem
						{...formItemLayout}
						label="居住类型">
						{getFieldDecorator('type_name',{
							initialValue: this.state.type_name == ""?"Y": this.state.type_name,
						})(
							<Select onChange={this._selectChange.bind(this,'type_name')} >
								<Option key="Y">业主</Option>
								<Option key="Z">租户</Option>
							</Select>
						)}
					</FormItem>

					<FormItem
						{...formItemLayout}
						label="志愿者类型">
						{getFieldDecorator('vol_tag',{
							initialValue: this.state.vol_tag == ""?"普通志愿者": this.state.vol_tag,
						})(
							<Select onChange={this._selectChange.bind(this,'vol_tag')}>
								<Option key="普通志愿者">普通志愿者</Option>
								<Option key="楼组长">楼组长</Option>
							</Select>
						)}
					</FormItem>

					<FormItem
						{...formItemLayout}
						label="职业">
						{getFieldDecorator('occupation',{
							initialValue: this.state.occupation,
						})(
							<Input  onChange={this._input.bind(this,"occupation")}/>
						)}
					</FormItem>

					<FormItem
						{...formItemLayout}
						label="IC卡">
						{getFieldDecorator('ic_card',{
							initialValue: this.state.ic_card,
						})(
							<Input  onChange={this._input.bind(this,"ic_card")}/>
						)}
					</FormItem>

					<FormItem
						{...formItemLayout}
						label="email">
						{getFieldDecorator('email',{
							initialValue: this.state.email
						})(
							<Input onChange={this._input.bind(this,'email')}/>
						)}
					</FormItem>

					<FormItem >
						<Row type="flex" justify="end" gutter={1} >
							<Col span={2}>
								<Button style={this.state.disable ?{}: {backgroundColor:'#1e8fe6', color :'white'}} htmlType="submit">提交</Button>
							</Col>
							<Col span={2}>
								<Button onClick={()=>this._jump('back')}>取消</Button>
							</Col>
						</Row>
					</FormItem> 
				</Form>
			</div>
		);
	}
}

const WrappedpointTable = Form.create()(pointTable);
export default WrappedpointTable;