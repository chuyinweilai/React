import React,{Component} from 'react';
import {
	Row,
	Col,
	Layout, 
	Menu,
	Button,
	Modal,
	Breadcrumb, 
} from 'antd'
import appData from './../assert/Ajax';

export default class cancel extends Component{
	constructor(props){
		super(props);
		this.state={
			_visible: true,
		}
		this.Router;
		this.mess;
	}

	componentWillMount(){
		this.Router = this.props.Router;
		this.mess = this.props.message;
		this._cancel()
	}

	_cancel(){
		appData._Storage('del',"userMess")
		this.Router('login')
	}

	_jump(nextPage,mess){
		this.Router(nextPage,mess,this.mess.nextPage)
	}

	render(){
		return null
		// return (
		// <div style={{flex: 1, background: '#fff',padding: 24,margin: 0,minHeight: 80}}>
		// 	 <Modal
		// 		visible={this.state._visible}
		// 		title="注销"
		// 		onCancel={() => this.setState({_visible: false})}
		// 		onOk={()=> this._cancel()}
		// 	>
		// 		<span>是否注销？</span>
		// 	</Modal> 
		// </div>)
	}
}