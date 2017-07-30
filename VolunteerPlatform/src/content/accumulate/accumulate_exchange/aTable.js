
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
			mobile: 0,
			score:0,
			ch_score: 0,
			ch_name: '',
			ch_number:1,
			gift_no: "",
			comm_name: "",
			maxNumber: 0,
			btnAble:true,
			visible: false,
		};
		this.userMess;
		this.choMess;
		this.Router;
		this.mess = null;
		this.Children = [];
		this.change_mess = [];
	}

		//gift/list
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
		let afteruri = "gift/list"
		let body = {
			comm_code: mess.comm_code
		}
		appData._dataPost(afteruri,body,(data) => {
			this.change_mess = data
			data.forEach((value) => {
				this.Children.push(
					<Option key={value.gift_no}>{value.gift_name}</Option>
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
		if(name === 'mobile'){
			this.setState({
				mobile: e
			})
		} else if(name === 'score'){
			this.setState({
				score: e
			})
		} else if(name === 'ch_number'){
			let score = this.state.ch_score * e;
			if(score > this.choMess.score){
				this.setState({
					btnAble: true,
				})
			} else {
				this.setState({
					btnAble: false,
				})
			}
			this.setState({
				ch_number: e,
			})

			// this.props.form.setFieldsValue({
			// 	ch_score: score*e
			// })
		}
	}

	//选择活动类型，积分
	_selectChange(value){
		this.change_mess.forEach((val)=> {
			if(value == val.gift_no){
				let maxNumber = Number(val.change_limit-val.change_cnt)
					if(this.choMess.score < val.change_score || maxNumber <=0){
						this.setState({
							btnAble: true,
							maxNumber: 0
						})
					} else {
						this.setState({
							btnAble: false,
						})
					}
				this.setState({
					gift_no: value,
					ch_name: val.gift_name,
					maxNumber: maxNumber
				})
				this.props.form.setFieldsValue({
					ch_score: val.change_score
				})
				this.setState({
					ch_score:  val.change_score
				})
			}
		});
	}

	//提交创建新活动

	_upData(){
		let afteruri  = 'gift/change';
		let body = {
			"wx_id": this.choMess.wx_id,
			"comm_code":this.choMess.comm_code,
			"gift_no":this.state.gift_no,
			"operator":this.userMess.user_id,
			"change_num":this.state.ch_number,
			"used_score":this.state.ch_score * this.state.ch_number,
		}
		appData._dataPost(afteruri, body, (res) =>{
			if(res){
				this.setState({
					visible: false,
				})
			let data = this.userMess;
			this._getEvents(data)
				// this._jump('back') 
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
				
				<Row type="flex" justify="space-between" gutter={1}>
					<Col span={19}>所在社区:{this.state.comm_name}</Col>
				</Row>
				<Row>
					<Col span={8} style={{margin:'10px'}}> </Col>
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
						label="积分">
						{getFieldDecorator('score',{
							initialValue: this.state.score
						})(
							<Input onChange={this._input.bind(this,"score")} disabled/>
						)}
					</FormItem>

					<FormItem
						{...formItemLayout}
						label="可兑换商品">
						{getFieldDecorator('changed',{
							initialValue: this.state.changed
						})(
							<Select placeholder="请选择兑换商品" onChange={this._selectChange.bind(this)}>
								{this.Children}
							</Select>
						)}
					</FormItem>

					<FormItem
						{...formItemLayout}
						label="兑换数量">
						{getFieldDecorator('ch_number',{
							initialValue: this.state.ch_number
						})(
							<InputNumber 
								min = {1}
								max = {this.state.maxNumber}
							 	onChange={this._input.bind(this,"ch_number")}/>
						)}
					</FormItem>

					<FormItem
						{...formItemLayout}
						label="所需积分">
						{getFieldDecorator('ch_score',{
							initialValue: this.state.ch_score
						})(
							<Input onChange={this._input.bind(this,"ch_score")} disabled/>
						)}
					</FormItem>

				</Form>

				<Row type="flex" justify="end" gutter={1} className="printHidden">
					<Col span={2}>
						<Button  onClick={() =>this.setState({visible: true})} disabled={this.state.btnAble}>确认</Button>
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
					<Col style={{height: 30}}>所在社区: {this.state.comm_name}</Col>
					<Col style={{height: 30}}>手机号: {this.state.mobile}</Col>
					<Col style={{height: 30}}>兑换商品: {this.state.ch_name}</Col>
					<Col style={{height: 30}}>兑换积分: {this.state.ch_score}</Col>
					<Col style={{height: 60}}>兑换者签名</Col>
					<Row className="printHidden">
						<Col>
							<Button onClick={()=>window.print()}>打印</Button>
						</Col>
					</Row>
				</Modal>
			</div>
		);
	}
}

const WrappedpointTable = Form.create()(pointTable);
export default WrappedpointTable;