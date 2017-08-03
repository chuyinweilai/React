
import React,{Component} from "react";
import {

} from 'antd'

import "./record.css"
import appData from './../../../../assert/Ajax'
import { LineChart, AreaChart, Area, Line,XAxis,YAxis, CartesianGrid,Tooltip, Legend, ResponsiveContainer } from 'recharts';

const device = document.body.offsetWidth

export default class record extends Component{
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
			data:[],
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
				data: datas
			})
		})
	}

	render(){
		return (
			<div id="record-box">	
				<text style={{fontSize: 16,paddingBottom: 5 , fontSize: 24, color:  this.state.color['first']}}>
						出入记录
				</text>
				<div>
					<ResponsiveContainer height={340}>
						<AreaChart data={this.state.data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
							<defs>
								<linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
									<stop offset="5%" stopColor="#b2c3b9" stopOpacity={0.8}/>
									<stop offset="95%" stopColor="#b2c3b9" stopOpacity={0.1}/>
								</linearGradient>
								<linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
									<stop offset="5%" stopColor="#a2a0b9" stopOpacity={0.8}/>
									<stop offset="95%" stopColor="#a2a0b9" stopOpacity={0.1}/>
								</linearGradient>
							</defs>
							<XAxis dataKey="name" />
							<YAxis />
							<CartesianGrid strokeDasharray="3 3" />
							<Tooltip />
							<Legend verticalAlign="top" height={36}/>
							<Area  name="pv of pages" type="monotone" dataKey="pv" stroke="#b2c3b9" fillOpacity={1} fill="url(#colorPv)" />
							<Area  name="uv of pages" type="monotone" dataKey="uv" stroke="#a2a0b9" fillOpacity={1} fill="url(#colorUv)" />
						</AreaChart>
					</ResponsiveContainer>
				</div>
			</div>
		)
	}
}

