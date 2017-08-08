
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
			name: '',
			mobile: 0,
			number: '',
			id: '',
			access_group_id: 0,

			helpStatus:"",
			helpText:"",
			disable: false,
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
		if(mess !== undefined){
			let arr = mess.apt_code.split('-');
			this.setState({
				name: mess.name,
				mobile: mess.mobile,
				number:mess.number,
				id: mess.id,	
				access_group_id: mess.access_group_id,
				disable: false,
			})
		}else {
			this.setState({
				disable: true
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
		appData_local._dataPost(afteruri, body, (res) =>{
			if(res >= 0 ){
				this._jump('back')
			} else {
				
			}
		})
	}

	//文本
	_input(name,e){
		let value = e.target.value;
		if(name === 'name'){
			this.setState({
				name: value
			})
		} else if(name === 'mobile'){
			if(!(/^1(3|4|5|7|8)\d{9}$/.test(value))){ 
				this.setState({
					helpStatus:"error",
					helpText:"请输入正确的手机号",
					disable: true,
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
		if(value){
			let adate = value._d
			let time = adate.getFullYear() + "-" + (adate.getMonth()+1) + "-" + adate.getDate()
			if(name === 'vld_from'){
				this.setState({
					open_date: time
				})
			} else if(name === 'exp_at'){
				this.setState({
					vld_start: time
				})
			} 
		}
	}

	_inputNum(type,value){
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
							<text style={{fontSize: 24, color: '#1e8fe6'}}>编辑</text>
						</Col>
					</Row>

					<Form style={{paddingTop: '50px'}}>

						<FormItem
							{...formItemLayout}
							label="用户ID">
							{getFieldDecorator('id',{
								initialValue: this.state.id
							})(
								<Input onChange={this._input.bind(this,"id")} disabled/>
							)}
						</FormItem>
						
						<FormItem
							{...formItemLayout}
							label="卡号">
							{getFieldDecorator('number',{
								initialValue: this.state.number
							})(
								<Input onChange={this._input.bind(this,"number")} disabled/>
							)}
						</FormItem>

						<FormItem
							{...formItemLayout}
							label="姓名">
							{getFieldDecorator('name',{
								initialValue: this.state.name
							})(
								<Input onChange={this._input.bind(this,"name")} />
							)}
						</FormItem>

						<FormItem
							{...formItemLayout}
							validateStatus= {this.state.helpStatus}
							help= {this.state.helpText}
							label="手机号">
							{getFieldDecorator('mobile',{
								initialValue: this.state.mobile
							})(
								<Input onChange={this._input.bind(this,'mobile')} />
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