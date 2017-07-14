import React,{Component} from 'react';
import Home from './home/home'
import Civilization from './civilization/civilization'
import Infraction from './infraction/infraction';
import { Device_Area, Device_Wlist,	Device_Root } from './device';	
import{	Guard,	Patrol, }from './users'
import{	Record,	Patrol_Ctrl }from './cardrec'

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
		else if(name === 'civilization')	
			return <Civilization message={this.mess} Router={this.Router}/>
		else if(name === 'infraction')	
			return <Infraction message={this.mess} Router={this.Router}/>
		else if(name === 'device_area')	
			return <Device_Area message={this.mess} Router={this.Router}/>
		else if(name === 'device_wlist')	
			return <Device_Wlist message={this.mess} Router={this.Router}/>
		else if(name === 'device_root')	
			return <Device_Root message={this.mess} Router={this.Router}/>
		else if(name === 'guard')	
			return <Guard message={this.mess} Router={this.Router}/>
		else if(name === 'patrol')	
			return <Patrol message={this.mess} Router={this.Router}/>
		else if(name === 'record')	
			return <Record message={this.mess} Router={this.Router}/>
		else if(name === 'patrol_ctrl')	
			return <Patrol_Ctrl message={this.mess} Router={this.Router}/>

		
		else return null
	}
	render(){
		this.mess = this.props.message
		return this._router(this.mess.nextPage)
	}
}