import React,{Component} from 'react';
import Home from './home/home'
import Login from './login/login'
import {
	Accumulate_add,
	Accumulate_detail,
	Accumulate_exchange,
} from './accumulate';	
import{	
	Volunteer_add,
	Volunteer_ative,
	Volunteer_sign,
	Volunteer_user, 
}from './volunteer'

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
		else if(name === 'Volunteer_add')	
			return <Volunteer_add message={this.mess} Router={this.Router}/>
		else if(name === 'Volunteer_ative')	
			return <Volunteer_ative message={this.mess} Router={this.Router}/>
		else if(name === 'Volunteer_sign')	
			return <Volunteer_sign message={this.mess} Router={this.Router}/>
		else if(name === 'Volunteer_user')	
			return <Volunteer_user message={this.mess} Router={this.Router}/>
		else if(name === 'Accumulate_add')	
			return <Accumulate_add message={this.mess} Router={this.Router}/>
		else if(name === 'Accumulate_detail')	
			return <Accumulate_detail message={this.mess} Router={this.Router}/>
		else if(name === 'Accumulate_exchange')	
			return <Accumulate_exchange message={this.mess} Router={this.Router}/>
		else return null
	}
	render(){
		this.mess = this.props.message
		return this._router(this.mess.nextPage)
	}
}