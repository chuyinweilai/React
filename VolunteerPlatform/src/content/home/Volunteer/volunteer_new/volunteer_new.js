
import React,{Component} from "react";
import {

} from 'antd'

import {
	Line,
} from "react-chartjs"
import "./volunteer_new.css"
import appData from './../../../../assert/Ajax'

const device = document.body.offsetWidth

export default class volunteer_new extends Component{
	constructor(props){
		super(props);
		this.state = {
			data: {
				labels: [],
				datasets: [
					{
						//
						label: "My First dataset",

						// 边线颜色
						strokeColor: "red",
						
						// 填充颜色
						fillColor: "rgba(225,0,0,0.45)",

						// 圆点颜色
						pointColor: "rgba(220,220,220,1)",

						// 圆点边框
						pointStrokeColor: "#fff",

						// 鼠标所在圆点颜色
						pointHighlightFill: "#00A0E9",

						data: []
					},
				]
			},
			options:{
			//网格线属性
				///Boolean - Whether grid lines are shown across the chart
				scaleShowGridLines : true,

				//String - Colour of the grid lines
				scaleGridLineColor : "rgba(0,0,0,.05)",

				//Number - Width of the grid lines
				scaleGridLineWidth : 1,

				//Boolean - Whether to show horizontal lines (except X axis)
				scaleShowHorizontalLines: true,

				//Boolean - Whether to show vertical lines (except Y axis)
				scaleShowVerticalLines: true,

				// 两点之间是否弧形显示
				bezierCurve : false,

				// 每个点的大小
				pointDotRadius : 0,

				// 每个点的宽度
				pointDotStrokeWidth : 0,

				//每个点的额外半径，即实际触发半径
				pointHitDetectionRadius : 5,	

				// 是否为数据集填充颜色
				datasetFill : true,

				//是否在网格中心标注标签和点
				offsetGridLines : false,

				//每个点的额外半径，即实际触发半径
				pointHitDetectionRadius : 0,

			}
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
			let label = [];
			let adata = []
			res.forEach((value)=>{
				adata.unshift(value.xnumber)
				label.unshift(value.xmonth)
			})
			let obj = this.state.data;
			obj.labels = label;
			obj.datasets[0].data = adata;
			this.setState({
				data:obj
			})
		})
	}

	render(){
		return (
			<div style={{padding: 15, height: 173 , backgroundColor: '#fff'}}>	
				<text style={{fontSize: 16,paddingBottom: 5, fontWeight: "bold"}}>
					志愿者新增趋势
				</text>
				<div style={{marginLeft: 30}}>
					<Line data={this.state.data} options={this.state.options} height="136" width={device*0.3}/>
				</div>
			</div>
		)
	}
}

