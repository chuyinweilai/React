import React,{Component} from 'react';
import ReactDom,{Component} from 'react-dom';

export default class TabBox extends Component{
	constructor(props){
		super(props)
		this.setState = {

		}
	}

	render(){
		return (
			<div id="tabs">
					<ul className="tabUl">
						<li className="tabList"></li>
						<li className="tabList"></li>
						<li className="tabList"></li>
						<li className="tabList"></li>
					</ul>
			</div>
		)
	}


}	