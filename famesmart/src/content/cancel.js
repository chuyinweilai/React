import React,{Component} from 'react';
import {
	Row,
	Col,
	Layout, 
	Menu,
	Button,
	Breadcrumb, 
} from 'antd'
import appData from './../assert/Ajax';

export default class cancel extends Component{
	constructor(props){
		super(props);
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
		return (
		<div style={{flex: 1, background: '#fff',padding: 24,margin: 0,minHeight: 80}}>

		</div>)
	}
}