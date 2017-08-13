
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
	Layout,
	Cascader, 
	Checkbox, 
	DatePicker,
	InputNumber,
	AutoComplete 
} from 'antd';
import moment from 'moment';
import appData_local from './../../../../assert/Ajax_local';
import '../../../../App.css'

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const { TextArea } = Input;
const { Content } = Layout;

class IC_cards_resident_edit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			floors:'',
			rooms: '',
			name: '',
			mobile: 0,
			access_group_id: 0,
			vld_from: null,
			exp_at:null,
			helpStatus:"",
			helpText:"",
			disable: false,
			number:0,
		};
		this.TokenMess;
		this.Router;
		this.mess = null;
	}

	componentWillMount(){
		this.Router = this.props.Router;
		this.mess = this.props.message;
		let mess = this.props.message.message
		this.activeMess = mess;
		appData_local._Storage('get', "Token",(res) =>{
			this.TokenMess = res
		})
		if(mess._action == 'change'){
			let arr = mess.apt_code.split('-');
			this.setState({
				floors:arr[0],
				rooms: arr[2],
				number: mess.number,
				name: mess.name,
				mobile: mess.mobile,
				vld_from: mess.vld_from.split(" ")[0],
				exp_at: mess.exp_at.split(" ")[0],	
				access_group_id: mess.access_group_id,
				disable: false,
			})
		} else if(mess._action == "add"){
			let arr = mess.apt_code.split('-');
			this.setState({
				floors:arr[0],
				rooms: arr[2],
				name: mess.name,
				mobile: mess.mobile,
				disable: false
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

	//提交创建新活动
	_add_active(){
		let activeMess = this.activeMess
		let Token = this.TokenMess;
		let mess  = this.mess;
		let	afteruri  = 'dist_devices/allocate';
		let vld_from = this.state.vld_from ? this.state.vld_from: "";
		let exp_at = this.state.exp_at ? this.state.exp_at: "";
		let body={
			"owner_group":"居民",
			"exp_at": exp_at,
			"vld_from": vld_from,
			"number": this.state.number,
			"apt_code": activeMess.apt_code,
			"access_group_id": this.state.access_group_id,
		}
		appData_local._dataPost(afteruri, body, (res) =>{
			if(res.result > 0 ){
				this._jump('back')
			} else {
				alert(res.message)
			}
		},Token)
	}

	//文本
	_input(name,e){
		let value = e.target.value;
		if(name === 'name'){
			this.setState({
				name: value
			})
		} else if(name === 'number'){
			this.setState({
				number: value
			})
		}  else if(name === 'floors'){
			this.setState({
				floors: value
			})
		} else if(name === 'mobile'){
			if(!(/^1(3|4|5|7|8)\d{9}$/.test(value))){ 
				this.setState({
					helpStatus:"error",
					helpText:"请输入正确的手机号",
					disable: true,
				})
			} else {
				this.setState({
					helpStatus: "",
					helpText: "",
					mobile: value,
					disable: false,
				})
			}
		} else if(name === 'rooms'){
			this.setState({
				rooms: value
			})
		} else if(name === 'access_group_id'){
			this.setState({
				rooms: value
			})
		}
	}

	//时间输入
	_timeInput(name,value){
		// time = this.state.open_data._i
		if(value){
			let adate = value._d
			let time = adate.getFullYear() + "-" + (adate.getMonth()+1) + "-" + adate.getDate()
			if(name === 'vld_from'){
				this.setState({
					vld_from: time
				})
			} else if(name === 'exp_at'){
				this.setState({
					exp_at: time
				})
			} 
		} else {
			if(name === 'vld_from'){
				this.setState({
					vld_from: null
				})
			} else if(name === 'exp_at'){
				this.setState({
					exp_at: null
				})
			} 

		}
	}

	_inputNum(name,value){
		if(name == 'access_group_id'){
			this.setState({
				access_group_id: value
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
			<Layout style={{ background: '#fff', minHeight: 80 ,padding: '24px 48px 48px' }}>
				<Content>
					<Row type="flex" justify="space-between" gutter={1}>
						<Col className="printHidden">
							<text style={{fontSize: 24, color: '#aaa'}}>发卡管理/居民IC卡/</text>
							<text style={{fontSize: 24, color: '#1e8fe6'}}>新增编辑</text>
						</Col>
					</Row>

					<Form style={{paddingTop: '50px'}}>
						<FormItem
							{...formItemLayout}
							label="卡号">
							{getFieldDecorator('number',{
								initialValue: this.state.number
							})(
								<Input type="number" onChange={this._input.bind(this,"number")} />
							)}
						</FormItem>

						<FormItem
							{...formItemLayout}
							label="楼号">
							{getFieldDecorator('floors',{
								initialValue: this.state.floors
							})(
								<Input onChange={this._input.bind(this,"floors")} disabled/>
							)}
						</FormItem>

						<FormItem
							{...formItemLayout}
							label="房间号">
							{getFieldDecorator('rooms',{
								initialValue: this.state.rooms
							})(
								<Input onChange={this._input.bind(this,"rooms")} disabled/>
							)}
						</FormItem>

						<FormItem
							{...formItemLayout}
							label="业主姓名">
							{getFieldDecorator('name',{
								initialValue: this.state.name
							})(
								<Input onChange={this._input.bind(this,"name")} disabled/>
							)}
						</FormItem>

						<FormItem
							{...formItemLayout}
							validateStatus= {this.state.helpStatus}
							help= {this.state.helpText}
							label="手机">
							{getFieldDecorator('mobile',{
								initialValue: this.state.mobile
							})(
								<Input onChange={this._input.bind(this,'mobile')} disabled/>
							)}
						</FormItem>

						<FormItem
							{...formItemLayout}
							label="起始日期">
							{getFieldDecorator('vld_from',{
								initialValue: this.state.vld_from?moment(this.state.vld_from):this.state.vld_from,
							})(
								<DatePicker format="YYYY-MM-DD"   placeholder="选择时间"  onChange={this._timeInput.bind(this,'vld_from')}/>
							)}
						</FormItem>

						<FormItem
							{...formItemLayout}
							label="截止日期">
							{getFieldDecorator('exp_at',{
								initialValue: this.state.exp_at?moment(this.state.exp_at):this.state.exp_at,
							})(
								<DatePicker format="YYYY-MM-DD"   placeholder="选择时间" onChange={this._timeInput.bind(this,'exp_at')} />
							)}
						</FormItem>

						<FormItem
							{...formItemLayout}
							label="权限组">
							{getFieldDecorator('access_group_id',{
								initialValue: this.state.access_group_id
							})(
								<InputNumber onChange={this._inputNum.bind(this,'access_group_id')}/>
							)}
						</FormItem>

					</Form> 

					<Row type="flex" justify="end" gutter={1} >
						<Col span={2}>
							<Button style={this.state.disable ?{}: {backgroundColor:'#1e8fe6', color :'white'}}  onClick={() => this._add_active()} disabled={this.state.disable}>提交</Button>
						</Col>
						<Col span={2}>
							<Button onClick={()=>this._jump('back')}>取消</Button>
						</Col>
					</Row>
				</Content>
			</Layout>
		);
	}
}

const WrappedpointTable = Form.create()(IC_cards_resident_edit);
export default WrappedpointTable;