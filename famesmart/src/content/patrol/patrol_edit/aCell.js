
import React, { PropTypes,Component } from 'react';
import { Form, Input, Select, Button } from 'antd';
import appData from './../../../assert/Ajax'
import '../../../App.css'


const FormItem = Form.Item;
const Option = Select.Option;
const Children = [];

export default class Selects extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			vals:'',
			type_list:[]
		};
	}
	componentWillMount(){
		let num = this.props.value
		this._login(num)
		this._select = this.props.SelectCtrl

	}
		
	_login(num){
		let afteruri = 'vcity/listrule'
		appData._Storage('get', 'userMess',(res)=>{
			this.userMess = res;
			this.setState({
				comm_name:res.comm_name,
			})
			let body={
				comm_code: res.comm_code
			}
			appData._dataPost(afteruri,body,(data) =>{
				let others = {
					comm_code:"M0001",
					rule_name:"其他",
					rule_no:0,
				}
				data.push(others)
				this.setState({
					type_list:data,
				})
				data.forEach((val) => {
					if(num == val.rule_no){
						this.setState({
							vals : val.rule_name
						})
					}
					Children.push(
						<Option key={val.rule_no}>{val.rule_name}</Option>
					)
				})
			})
		})
	}
	
	//选择活动类型，积分
	_selectChange(index){
		let type = this.state.type_list;
		console.log(type)
		if(index == 0){
			this._select(index)
		} else {
			type.forEach((value) => {
				if(value.rule_no == index){	
					this._select(value)
					this.setState({
						vals: value.rule_name
					})
				}
			})
		}
	}

	render() {
		return (
			<span>
				<Select
					value={this.state.vals}
					placeholder="请选择活动类型" 
					onChange={this._selectChange.bind(this)}
				>
					{Children}
				</Select>
			</span>
		);
	}
}
