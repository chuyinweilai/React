import React,{Component} from 'react';
import Home from './home/home'
import Point from './point/point'
import Point2 from './active/active'
import Test from './test/index'


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
		if(name == 'home')	
			return <Home message={this.mess} Router={this.Router}/>
		else if(name == 'point')	
			return <Point message={this.mess} Router={this.Router}/>
		else if(name == 'active')	
			return <Point2 message={this.mess} Router={this.Router}/>
		else if(name == 'test')	
			return <Test message={this.mess} Router={this.Router}/>

		
		else return null
	}
	render(){
		this.mess = this.props.message
		return this._router(this.mess.nextPage)
	}
}