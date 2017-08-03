
import React,{Component} from "react";
import {

} from 'antd'
import "./warning.css"
import appData from './../../../../assert/Ajax'
import { LineChart, Line,XAxis,YAxis, CartesianGrid,Tooltip, Legend, ResponsiveContainer } from 'recharts';

const device = document.body.offsetWidth

export default class warning extends Component{
	constructor(props){
		super(props);
		this.state = {
			tabCtrl:true,


			color:{
				first:'#000',
				second:'#aaa',	
			},
			backgroundColor: {
				first:'#1e8fe6',
				second:'#efefef',	
			},
			data_1:  [],
			data_2: [
				{ 
					name: 'a', 
					pv: 2400 
				}, { 
					name: 'b', 
					pv: 918 
				},{
					name: 'b', 
					pv: 1420 
				},
			],
		}
	}

	componentWillMount(){
		appData._Storage('get',"userMess",(res) =>{
			this._getEvent(res)
		})
	}

	_getEvent(mess){
		let afteruri = 'vcity/trend'
		let body = {
			'comm_code': mess.comm_code,
		}
		appData._dataPost(afteruri,body,(res) =>{
			let datas = [];
			res.forEach((value)=>{
				let obj = {
					name: value.xmonth,
					pv: value.xnumber,
					uv: Math.floor(Math.random()*10)
				}
				datas.unshift(obj)
			})
			this.setState({
				data_1: datas
			})
		})
	}

	// 边线颜色 strokeColor: "#1e8fe6"  填充颜色 fillColor: "rgba(30, 143, 230,0.45)",
	_tanBtn(name){
		if(name == "civi"){
			this.setState({
				tabCtrl: true,
				color:{
					first:'#000',
					second:'#aaa',	
				},
				backgroundColor: {
					first:'#1e8fe6',
					second:'#efefef',	
				},
			})
		} else if(name == 'pecc'){
			this.setState({
				tabCtrl: false,
				color:{
					first:'#aaa',	
					second:'#000',
				},
				backgroundColor: {
					first:'#efefef',	
					second:'#1e8fe6',
				},
			})
		}
	}

	_tabChange(){
		if(this.state.tabCtrl){
			return (
				<div style={{marginLeft: 30, marginTop: 20}}>
					<ResponsiveContainer height={340}>
						<LineChart data={this.state.data_1} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
							<XAxis dataKey="name" />
							<YAxis />
							<CartesianGrid strokeDasharray="3 3" />
							<Tooltip />
							<Legend verticalAlign="top" height={36}/>
							<Line  name="已处理" type="monotone" dataKey="pv" stroke="#1e8fe6" />
							<Line  name="未处理" type="monotone" dataKey="uv" stroke="#ea7c6b"/>
						</LineChart>
					</ResponsiveContainer>
				</div>
			)
		} else {
			return(
				<div style={{marginLeft: 30, marginTop: 20}}>
					<ResponsiveContainer height={340}>
						<LineChart data={this.state.data_2} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
							<XAxis dataKey="name" />
							<YAxis />
							<CartesianGrid strokeDasharray="3 3" />
							<Tooltip />
							<Legend verticalAlign="top" height={36}/>
							<Line  name="pv of pages" type="monotone" dataKey="pv" stroke="#b2c3b9" fillOpacity={1} fill="url(#colorPv)" />
							<Line  name="uv of pages" type="monotone" dataKey="uv" stroke="#a2a0b9" fillOpacity={1} fill="url(#colorUv)" />
						</LineChart>
					</ResponsiveContainer>
				</div>
			)
		}
	}

	render(){
		return (
			<div id="warning-box">	
				<div className="tab-box">
					<ul className="clearfix">
						<li style={{backgroundColor: this.state.backgroundColor['first']}} onClick={()=>this._tanBtn('civi')}>
							<text style={{fontSize: 16,paddingBottom: 5 , fontSize: 24, color:  this.state.color['first']}}>
								五违报警
							</text>
						</li>
						<li style={{backgroundColor: this.state.backgroundColor['second']}} onClick={()=>this._tanBtn('pecc')}>
							<text style={{fontSize: 16,paddingBottom: 5 , fontSize: 24, color:  this.state.color['second']}}>
								文明报警
							</text>
						</li>
					</ul>
				</div>
				{this._tabChange()}
			</div>
		)
	}
}

