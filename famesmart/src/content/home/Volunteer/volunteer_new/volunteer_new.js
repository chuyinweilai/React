
import React,{Component} from "react";
import {

} from 'antd'

import appData from './../../../../assert/Ajax'
import { AreaChart ,Area, XAxis,YAxis, CartesianGrid,Tooltip, Legend, ResponsiveContainer } from 'recharts';

const device = document.body.offsetWidth

export default class volunteer_new extends Component{
	constructor(props){
		super(props);
		this.state = {
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
			<div style={{padding: 15, height: 173 , backgroundColor: '#fff'}}>	
				<text style={{fontSize: 20,paddingBottom: 5, }}>
					志愿者新增趋势
				</text>
					<ResponsiveContainer height={133}>
						<AreaChart  data={this.state.data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
							<defs>
								<linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
									<stop offset="15%" stopColor="#1e8fe6" stopOpacity={1}/>
									<stop offset="95%" stopColor="#1e8fe6" stopOpacity={0.4}/>
								</linearGradient>
							</defs>
							<XAxis dataKey="name" />
							<YAxis />
							<CartesianGrid strokeDasharray="3 3" />
							<Area  name="新增志愿者" type="monotone" dataKey="pv" stroke="#1e8fe6" fillOpacity={1} fill="url(#colorPv)" />
						</AreaChart >
					</ResponsiveContainer>
			</div>
		)
	}
}

