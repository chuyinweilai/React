...	...
import {
	Bar,
	Line,
	Radar,
} from 'react-chartjs'

const  data = {
	labels: ["January", "February", "March", "April", "May", "June", "July"],
	datasets: [
		{
			//
			label: "My First dataset",

			// 填充颜色
			fillColor: "#6fc",

			// 边线颜色
			strokeColor: "rgba(220,220,220,1)",
			
			// 圆点颜色
			pointColor: "rgba(220,220,220,1)",

			// 圆点边框
			pointStrokeColor: "#fff",

			// 鼠标所在圆点颜色
			pointHighlightFill: "#fff",

			// 鼠标所在圆点边框颜色
			pointHighlightStroke: "#6fc",
			data: [65, 59, 80, 81, 56, 55, 40]
		},
	]
}

const options ={

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
		//Boolean - Whether the line is curved between points
		bezierCurve : true,
		
	// 两点间贝塞尔曲线的张力
		//Number - Tension of the bezier curve between points
		bezierCurveTension : 0.4,

	//是否显示每个点
		//Boolean - Whether to show a dot for each point
		pointDot : true,

	// 每个点的大小
		//Number - Radius of each point dot in pixels
		pointDotRadius : 4,

	// 每个点的宽度
		//Number - Pixel width of point dot stroke
		pointDotStrokeWidth : 1,

	//每个点的额外半径，即实际触发半径
		//Number - amount extra to add to the radius to cater for hit detection outside the drawn point
		pointHitDetectionRadius : 20,

	//是否为数据集添加边框
		//Boolean - Whether to show a stroke for datasets
		datasetStroke : true,

	//数据集边框宽
		//Number - Pixel width of dataset stroke
		datasetStrokeWidth : 2,

	// 是否为数据集填充颜色
		//Boolean - Whether to fill the dataset with a colour
		datasetFill : false,

	//是否在网格中心标注标签和点
		//Boolean - Whether to horizontally center the label and point dot inside the grid
		offsetGridLines : false
}

export default class home extends Component{
	...	...
	render(){
		return 	<Bar data={data} options={options} width="800" height="350" />
	}

}