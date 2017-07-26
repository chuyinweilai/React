
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
			type:'',
			vol_tag:'',
			comm_name: "",
			apt_info: "",
			floor: "",
			room: "",
			email: 0,
		};
		this.userMess;
		this.Router;
		this.mess = null;
	}

	/**
	 * apt_code:""
apt_info:""
comm_code:"M0001"
comm_name:""
created_at:null
credit:68
floor:0
gender:""
id:15
login_time:null
mobile:"13900000444"
name:""
nickname:"访客"
register_date:null
room:0
score:0
score_changed:0
type:"Y"
unit_code:0
updated_at:null
vld_end:null
vld_flag:0
vld_start:null
vol_tag:""
volunteer:1
wx_id:"5"
	 */
	componentWillMount(){
		this.Router = this.props.Router;
		this.mess = this.props.message;
		
		let mess = this.props.message.message
		console.log(mess)
		this.activeMess = mess;
		appData._Storage('get', "userMess",(res) =>{
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
				name: mess.name,
				mobile: mess.mobile,
				gender: mess.gender,
				type:type_name,
				vol_tag: mess.vol_tag,
				comm_name: mess.comm_name,
				apt_info: mess.apt_info,
				floor: mess.floor,
				room: mess.room,
				email: mess.email,
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

/*
				name: mess.name,
				mobile: mess.mobile,
				gender: mess.gender,
				type:type_name,
				vol_tag: mess.vol_tag,
				comm_name: 
				apt_info: 
				floor: 
				room: 
				email: mess.email,
*/
	_input(name,e){
		if(name === 'name'){
			this.setState({
				name: e
			})
		} else if(name === 'gender'){
			let value = e.target.value;
			this.setState({
				gender: value
			})
		} else if(name === 'comm_name'){
			this.setState({
				comm_name: e
			})
		} else if(name === 'apt_info'){
			this.setState({
				apt_info: e
			})
		} else if(name === 'floor'){
			this.setState({
				floor: e
			})
		} else if(name === 'room'){
			this.setState({
				room: e
			})
		} else if(name === 'email'){
			this.setState({
				email: e
			})
		}
	}

	//提交创建新活动
	_add_active(upType){
		let afteruri  = '';
		if( upType === 'updata'){
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
	_selectChange(type,value){
		if(type == "gender"){
			this.setState({
				gender:  value
			})
		} else if(type == "type"){
			this.setState({
				type: value
			})
		} else if(type == "vol_type"){
			this.setState({
				vol_type: value
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
				<Form style={{paddingTop: '50px'}}>
					<FormItem
						{...formItemLayout}
						label="姓名">
						{getFieldDecorator('name',{
							initialValue: this.state.name
						})(
							<Input onChange={this._input.bind(this,"name")}/>
						)}
					</FormItem>

					<FormItem
						{...formItemLayout}
						label="性别">
						{getFieldDecorator('gender',{
							initialValue: this.state.gender
						})(
							<Select onChange={this._selectChange.bind(this,'gender')}>
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
							<Input onChange={this._input.bind(this,'mobile')}/>
						)}
					</FormItem>

					<FormItem
						{...formItemLayout}
						label="居住类型">
						{getFieldDecorator('type',{
							initialValue: this.state.type
						})(
							<Select onChange={this._selectChange.bind(this,'type')}>
								<Option key="Y">业主</Option>
								<Option key="Z">租户</Option>
							</Select>
						)}
					</FormItem>

					<FormItem
						{...formItemLayout}
						label="志愿者类型">
						{getFieldDecorator('vol_type',{
							initialValue: this.state.type
						})(
							<Select onChange={this._selectChange.bind(this,'vol_type')}>
								<Option key="0">业主</Option>
								<Option key="1">租户</Option>
							</Select>
						)}
					</FormItem>

					<FormItem
						{...formItemLayout}
						label="社区">
						{getFieldDecorator('comm_name',{
							initialValue: this.state.comm_name
						})(
							<Input  onChange={this._input.bind(this,"comm_name")}/>
						)}
					</FormItem>

					<FormItem
						{...formItemLayout}
						label="单元">
						{getFieldDecorator('apt_info',{
							initialValue: this.state.apt_info
						})(
							<Input  onChange={this._input.bind(this,"apt_info")}/>
						)}
					</FormItem>

					<FormItem
						{...formItemLayout}
						label="楼层">
						{getFieldDecorator('floor',{
							initialValue: this.state.floor
						})(
							<Input onChange={this._input.bind(this,"floor")}/>
						)}
					</FormItem>

					<FormItem
						{...formItemLayout}
						label="房间">
						{getFieldDecorator('room',{
							initialValue: this.state.room
						})(
							<Input onChange={this._input.bind(this,"room")}/>
						)}
					</FormItem>


					<FormItem
						{...formItemLayout}
						label="email">
						{getFieldDecorator('email',{
							initialValue: this.state.email
						})(
							<Input onChange={this._input.bind(this,'email')}  />
						)}
					</FormItem>

				</Form>
				<Row type="flex" justify="end" gutter={1} >
					<Col span={2}>
						<Button  onClick={() => this._add_active('updata')}>提交</Button>
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