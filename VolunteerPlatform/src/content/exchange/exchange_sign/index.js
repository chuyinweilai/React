import React,{Component} from 'react';
import {
	Row,
	Col,
	Layout, 
	Input,
	Menu,
	Button,
	Breadcrumb, 
	Popconfirm,
} from 'antd'
import ATable from './aTable'
import '../../../App.css'

const { Content } = Layout;


export default class exchange_sign extends Component{
	constructor(props){
		super(props);
		this.Router;
		this.mess = null;
	}
	componentWillMount(){
		this.Router = this.props.Router;
		this.mess = this.props.message;
	}

	_jump(nextPage,mess){
		if(nextPage == 'back'){
			this.props.Router(this.props.message.historyPage,mess,this.props.message.nextPage)
		}else {
			this.props.Router(nextPage,mess,this.props.message.nextPage)
		}
	}

	_print(){
		window.print();
	}

	render(){
		return (
			<Layout style={{ padding: '0 24px 24px', backgroundColor: 'white' }}>
					<ATable  message={this.mess} Router={this.Router}/>
			</Layout>
		)
	}
}