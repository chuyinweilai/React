
import React, { PropTypes,Component } from 'react';
import { 
	Col, 
	Row, 
	Icon, 
	Form, 
	Input, 
	Select, 
	Button, 
	Modal,
	Tooltip, 
	Cascader, 
	Checkbox, 
	DatePicker,
	InputNumber,
	AutoComplete,
	Breadcrumb, 
} from 'antd';
// import Selects from './aCell';
import appData from './../../../../assert/Ajax'
import moment from 'moment';
import '../../../../App.css'
import '../../../../index.css'

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const { TextArea } = Input;

class pointTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mobile: 0,
			score:0,
			rule_score: 0,
			rule_name: '',
			rule_no: 0,
			comm_name: "",
			disable:true,
			visible: false,
			type_list:[],
		};
		this.userMess;
		this.choMess;
		this.Router;
		this.mess = null;
		this.Children = [];
		this.change_mess = [];
	}

	componentWillMount(){
		this.Router = this.props.Router;
		this.mess = this.props.message;
		
		let mess = this.props.message.message
		this.choMess = mess;
		appData._Storage('get', "userMess",(res) =>{
		this.userMess = res;
			this.setState({
				comm_name: res.comm_name,
				mobile: mess.mobile,
				score: mess.score,
			})
			this._getEvents(res)
		})
	}
	
	_getEvents(mess){
		let afteruri = 'vcity/listrule'
		let body = {
			comm_code: mess.comm_code
		}
		appData._dataPost(afteruri,body,(res) => {
			let others = {
				comm_code:"M0001",
				rule_name:"其他",
				rule_score:0,
				rule_no:0,
			}
			res.push(others)
			this.setState({
				type_list:res,
			})
			res.forEach((val) => {
				this.Children.push(
					<Option key={val.rule_no}>{val.rule_name}</Option>
				)
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

	_input(name,e){
		if(name === 'rule_score'){
			this.setState({rule_score: e})
		}
	}

	//选择活动类型，积分
	_selectChange(value){
		this.state.type_list.forEach((val)=> {
			if(value == val.rule_no){
				this.setState({
					rule_no: value,
					rule_name: val.rule_name,
					rule_score: val.rule_score,
				})
				this.props.form.setFieldsValue({
					rule_name: val.rule_name,
					rule_score: val.rule_score
				})
				if(value == 0) this.setState({ disable: false})
				else  this.setState({ disable: true})
			}
		});
	}

	//提交创建新活动

	_upData(){
		let afteruri  = 'volunteer/sign2';
		let body = {
			"wx_id": this.choMess.wx_id,
			"comm_code": this.choMess.comm_code,
			"operator": this.userMess.user_id,
			"activity_score": this.state.rule_score,
			"activity_no": this.state.rule_no,
		}
		appData._dataPost(afteruri, body, (res) =>{
			if(res){
				this.setState({
					visible: false,
				})
				this._jump('back') 
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
			<div style={{padding: 24, margin: 0, minHeight: 80 }}>
				<Row type="flex" justify="space-between" gutter={1}>
					<Col className="printHidden">
						<text style={{fontSize: 24, color: '#aaa'}}>积分管理/</text>
						<text style={{fontSize: 24, color: '#1e8fe6'}}>手动积分</text>
					</Col>
				</Row>
				<Form style={{paddingTop: '50px'}}  className="printHidden">
					<FormItem
						{...formItemLayout}
						label="手机号">
						{getFieldDecorator('mobile',{
							initialValue: this.state.mobile
						})(
							<Input onChange={this._input.bind(this,"mobile")} disabled/>
						)}
					</FormItem>

					<FormItem
						{...formItemLayout}
						label="当前积分">
						{getFieldDecorator('score',{
							initialValue: this.state.score
						})(
							<Input onChange={this._input.bind(this,"score")} disabled/>
						)}
					</FormItem>

					<FormItem
						{...formItemLayout}
						label="积分原因">
						{getFieldDecorator('rule_name',{
							initialValue: this.state.rule_name
						})(
							<Select placeholder="请选择兑换商品" onChange={this._selectChange.bind(this)}>
								{this.Children}
							</Select>
						)}
					</FormItem>

					<FormItem
						{...formItemLayout}
						label="积分值">
						{getFieldDecorator('rule_score',{
							initialValue: this.state.rule_score
						})(
							<InputNumber disabled={this.state.disable} onChange={this._input.bind(this,"rule_score")}/>
						)}
					</FormItem>

				</Form>

				<Row type="flex" justify="end" gutter={1} className="printHidden">
					<Col span={2}>
						<Button style={{backgroundColor:'#1e8fe6', color: 'white'}} onClick={() =>this.setState({visible: true})} disabled={this.state.btnAble}>确认</Button>
					</Col>
					<Col span={2}>
						<Button onClick={()=>this._jump('back')}>取消</Button>
					</Col>
				</Row>
				
				<Modal
					title="兑换信息"
					visible={this.state.visible}
					onOk={()=> this._upData()}
					onCancel={() =>this.setState({visible: false})}
					okText="提交"
					cancelText="取消">
					<Col style={{height: 30}}>手机号: {this.state.mobile}</Col>
					<Col style={{height: 30}}>变动类型:  手动积分</Col>
					<Col style={{height: 30}}>变动内容: {this.state.rule_name}</Col>
					<Col style={{height: 30}}>积分变动值: {this.state.rule_score}</Col>
					<Col style={{height: 30}}>剩余积分: {this.state.rule_score + this.choMess.score}</Col>
					<Col style={{height: 60}}>签名</Col>
				</Modal>
			</div>
		);
	}
}

const WrappedpointTable = Form.create()(pointTable);
export default WrappedpointTable;