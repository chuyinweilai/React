/**
 * React Radius 
 * @author Corey
 * 
 * 	parameter：
 * 	data: Array,
 * 	style: Object,
 * 	bgColor: String,
 * 	onChange: Function,
 */

import React,{Component} from 'react'
import './index.css'
export  class Filters extends Component{
	constructor(props){
		super(props);
		this.state={
			data : {
				value:[],
				bgColor: '',
				choosed: 0,
			},
			style:{},
			className:"",
		}
		this.onchange = null;
	}

	componentWillMount(){
		let bgColor = '';
		if(this.props.bgColor == '' ||this.props.bgColor == undefined ){
			bgColor="#1e8fe6"
		} else {
			bgColor = this.props.bgColor;
		}
		this.setState({
			style: this.props.style,
			data:{ 
				value: this.props.data,
				bgColor: bgColor,
				choosed: -1,				
			},
			className:this.props.className,
		})
		this.onchange  = this.props.onChange;
	}

	_list(val,index){
		if(index == this.state.data.choosed){
			return (
				<li className="checkbox">
					<button type="checkbox" className="filter-click-btn"  id={index} onClick={this._btnClick.bind(this, index)}/>
					<label htmlFor={index} style={{flex: 7}}>
						<text>{val}</text>
					</label>
				</li>
			)
		} else {
			return (
				<li className="checkbox">
					<button type="checkbox" key={index} id={index} onClick={this._btnClick.bind(this, index)}/>
					<label htmlFor={index} style={{flex: 7}}>
						<text>{val}</text>
					</label>
				</li>
			)
		}
	}

	_btnClick(index,e){
		let class_name = e.target.id
		let obj = JSON.parse(JSON.stringify(this.state.data));
		obj['choosed']= class_name
		this.setState({
			data:obj,
		})
		if(class_name == 'filter-click-btn'){
			this.onchange(false, index)
		} else {
			this.onchange(e.target.innerHTML, index)
		}
	} 

	render(){
		let arr = this.state.data.value
		return (
			<div style={this.state.style} className={this.state.className}>
				<ul id="filter-list" className="clear">
					{arr.map((value,index) =>this._list(value,index))}		
				</ul>
			</div>
		)
	}
}
export  default {Filters}