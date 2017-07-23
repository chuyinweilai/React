import React,{Component} from 'react';
import Home from './home/home'
import Login from './login/login'
import {
	Accumulate_history,
	Accumulate_list,
	Accumulate_exchange,
} from './accumulate';	
import{	
	Activity_add,
	Activity_list,
	Activity_sign,
}from './activity'
import{
	Volunteer_edit,
	Volunteer_list,
} from './volunteer'

export default class mainPage extends Component{
	constructor(props){
		super(props);
		this.Router;
		this.mess = {};
	}
	
	componentWillMount(){
		this.Router = this.props.Router
	}

	_router(name){
		if(name === 'home')	
			return <Home message={this.mess} Router={this.Router}/>
		else if(name === 'login')	
			return <Login message={this.mess} Router={this.Router}/>
		else if(name === 'activity_add')	
			return <Activity_add message={this.mess} Router={this.Router}/>
		else if(name === 'activity_list')	
			return <Activity_list message={this.mess} Router={this.Router}/>
		else if(name === 'activity_sign')	
			return <Activity_sign message={this.mess} Router={this.Router}/>
		else if(name === 'volunteer_edit')	
			return <Volunteer_edit message={this.mess} Router={this.Router}/>
		else if(name === 'volunteer_list')	
			return <Volunteer_list message={this.mess} Router={this.Router}/>
		else if(name === 'accumulate_history')	
			return <Accumulate_history message={this.mess} Router={this.Router}/>
		else if(name === 'accumulate_list')	
			return <Accumulate_list message={this.mess} Router={this.Router}/>
		else if(name === 'accumulate_exchange')	
			return <Accumulate_exchange message={this.mess} Router={this.Router}/>
		else return null
	}
	render(){
		this.mess = this.props.message
		return this._router(this.mess.nextPage)
	}
}