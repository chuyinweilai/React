
import React,{Component} from "react";
import {

} from 'antd'
import { PieChart, Pie, Legend, ResponsiveContainer, Sector, Cell, Tooltip } from 'recharts';
import "./transgress.css"

const device = document.body.offsetWidth

export default class transgress extends Component{
	constructor(props){
		super(props);
		this.state = {
			//chatjs setting
			data: [
				{name: '违法用地', value: 400}, 
				{name: '违法建筑', value: 300},
				{name: '违法经营', value: 300}, 
				{name: '违法居住', value: 200}, 
				{name: '违法用地', value: 200}
			],
			COLORS: ['#F7464A', '#46BFBD', '#FDB45C', '#D1692A', '#C7E786'],
		}
	}

	componentWillMount(){
	}

	_legend(e){
  		const { payload } =e;
		return (
				<div className="chart-text">
					<ul>
						 {payload.map ((value,index) =>{
								return (
									<li key={`item-${index}`}>
										<span style={{backgroundColor: value.color, width: 20, height: 20, marginRight: 7 }}></span>{value.value}
									</li>
								)
						 })}
					</ul>
				</div>
		)
	}

	render(){
		let COLORS = this.state.COLORS
		return (
			<div id="trans-box">	
				{/* <text style={{fontSize: 16,paddingBottom: 5, fontWeight: "bold"}}>志愿者变化趋势</text> */}
				<div className="chart-pie">
					<ResponsiveContainer height={300}>
						<PieChart>
							<Pie nameKey="name" dataKey="value" data={this.state.data} fill="#8884d8">
								{this.state.data.map((entry, index) => <Cell key={`cell-${index}`}   fill={COLORS[index % COLORS.length]}/>)}
							</Pie>
							<Tooltip/>
							<Legend verticalAlign="bottom" height={36} content={this._legend.bind(this)}/>
						</PieChart>
					</ResponsiveContainer>
				</div>
			</div>
		)
	}
}

