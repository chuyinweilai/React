
import React, { PropTypes,Component } from 'react';
import { 
	Col, 
	Row, 
	Form, 
	Input, 
	Button, 
	Layout,
} from 'antd';
import appData_local from './../../../../assert/Ajax_local';
import '../../../../App.css'
import Device_address_list from './../../device_online/device_address_list'
const FormItem = Form.Item;
const { Content } = Layout;


class root_group_edit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id:0,
			garage:"",
			bld_entrance:"",
			description:"",
			main_entrance:"",
			managed_service:"",
			shared_service:"",
		};

	/*
	*/
		this.Router;
		this.mess = null;
	}

	componentWillMount(){
		this.Router = this.props.Router;
		this.mess = this.props.message;
		let mess = this.props.message.message
		this.activeMess = mess;
		appData_local._Storage('get',"Token",(res) =>{
			this.TokenMess = res
		})
		if(mess !== undefined){
			this.setState({
				garage: mess.garage,
				bld_entrance: mess.bld_entrance,
				description: mess.description,
				main_entrance: mess.main_entrance,
				managed_service: mess.managed_service,
				shared_service: mess.shared_service,
			})
		}
		// else if(mess._action == "add") {
		// 	this.setState({
		// 	})
		// }
	}

	_jump(nextPage,mess){
		this.Router("root_group_list",mess,this.mess.nextPage)
	}

	//提交创建新活动
	_add_active(){
		let	afteruri  = '';
		let mess = this.activeMess;
		let Token = this.TokenMess;
		let body = {}
		if(mess !== undefined){
			afteruri  = 'access_group/edit'
			body={
				id:mess.id,
				garage:this.state.garage,
				bld_entrance: this.state.bld_entrance,
				description:this.state.description,
				main_entrance: this.state.main_entrance,
				managed_service: this.state.managed_service,
				shared_service: this.state.shared_service,
			}
		} else {
			afteruri  = 'access_group/add'
			body={
				garage:this.state.garage,
				bld_entrance: this.state.bld_entrance,
				description:this.state.description,
				main_entrance: this.state.main_entrance,
				managed_service: this.state.managed_service,
				shared_service: this.state.shared_service,
			}

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
		if(name === 'description'){
			this.setState({
				description: value
			})
		} else if(name === 'main_entrance'){
			this.setState({
				main_entrance: value
			})
		} else if(name === 'bld_entrance'){
			this.setState({
				bld_entrance: value
			})
		} else if(name === 'garage'){
			this.setState({
				garage: value
			})
		} else if(name === 'managed_service'){
			this.setState({
				managed_service: value
			})
		} else if(name === 'shared_service'){
			this.setState({
				shared_service: value
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
			<Layout style={{ background: '#fff', padding: '24px 48px 48px' }}>
				<Content>
					<Row type="flex" justify="space-between" gutter={1} className="printHidden">
						<Col>
							<text style={{fontSize: 24, color: '#aaa'}}>系统功能/权限常用组/</text>
							<text style={{fontSize: 24, color: '#1e8fe6'}}>编辑</text>
						</Col>
					</Row>

					<Row>
						<Col span={14}>
					
							<Row type="flex" justify="space-between" gutter={12} style={{marginTop: 60,marginLeft:60}}>
									<text style={{fontSize: 12, color: '#aaa'}}>注：</text>
								<Col span={24}>
									<text style={{fontSize: 12, color: '#aaa',paddingLeft:24}}>1、all: 所有组；own所属组； none：无权限组；</text>
								</Col>
								<Col span={24}>
									<text style={{fontSize: 12, color: '#aaa',paddingLeft:24}}>2、填写多个权限组，请按照：“1,2,3,4,5”的格式填写。请确保每一项都填写</text>
								</Col>
							</Row>

							<Form style={{paddingTop: '50px'}}>
								<FormItem
									{...formItemLayout}
									label="名称">
									{getFieldDecorator('description',{
										initialValue: this.state.description
									})(
										<Input onChange={this._input.bind(this,"description")}/>
									)}
								</FormItem>

								<FormItem
									{...formItemLayout}
									label="大门">
									{getFieldDecorator('main_entrance',{
										initialValue: this.state.main_entrance
									})(
										<Input onChange={this._input.bind(this,"main_entrance")}/>
									)}
								</FormItem>

								<FormItem
									{...formItemLayout}
									validateStatus= {this.state.helpStatus}
									help= {this.state.helpText}
									label="楼道">
									{getFieldDecorator('bld_entrance',{
										initialValue: this.state.bld_entrance
									})(
										<Input onChange={this._input.bind(this,'bld_entrance')}/>
									)}
								</FormItem>

								<FormItem
									{...formItemLayout}
									label="车库">
									{getFieldDecorator('garage',{
										initialValue: this.state.garage
									})(
										<Input onChange={this._input.bind(this,'garage')}/>
									)}
								</FormItem>

								<FormItem
									{...formItemLayout}
									label="公共管理点">
									{getFieldDecorator('managed_service',{
										initialValue: this.state.managed_service
									})(
										<Input onChange={this._input.bind(this,'managed_service')}/>
									)}
								</FormItem>

								<FormItem
									{...formItemLayout}
									label="公共服务点">
									{getFieldDecorator('shared_service',{
										initialValue: this.state.shared_service
									})(
										<Input onChange={this._input.bind(this,'shared_service')}/>
									)}
								</FormItem>
							</Form> 

							<Row type="flex" justify="end" className="printHidden" style={{marginTop:50}}>
								<Col span={12} style={{textAlign:"center"}}>
									<Button style={this.state.disable ?{}: {backgroundColor:'#1e8fe6', color :'white'}}  onClick={() => this._add_active()} disabled={this.state.disable}>提交</Button>
								</Col>
								<Col span={12} style={{textAlign:"center"}}>
									<Button onClick={()=>this._jump('back')}>取消</Button>
								</Col>
							</Row>
						</Col>
						<Col span={10}>
								<Device_address_list></Device_address_list>
						</Col>
					</Row>
				</Content>

			</Layout>
		);
	}
}

const WrappedpointTable = Form.create()(root_group_edit);
export default WrappedpointTable;