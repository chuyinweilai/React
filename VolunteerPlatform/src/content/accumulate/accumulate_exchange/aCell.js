
import React, { PropTypes,Component } from 'react';
import { Table, Input, Icon, Button, Popconfirm } from 'antd'
import '../../../App.css'

export default class pointCell extends Component  {
	constructor(props){
		super(props);
		this.state = {
			value: this.props.value,
			editable: false,
		}
	}
	componentWillMount(){
	}

	handleChange (e) {
		const value = e.target.value;
		this.setState({ value });
	}

	check () {
		this.setState({ editable: false });
		if (this.props.onChange) {
		this.props.onChange(this.state.value);
		}
	}

	edit() {
		this.setState({ editable: true });
	}
	
	render() {
		const { value, editable } = this.state;
		return (
		<div className="editable-cell">
			{
			editable ?
				<div className="editable-cell-input-wrapper">
					<Input
						value={value}
						onChange={this.handleChange.bind(this)}
						onPressEnter={this.check.bind(this)}
					/>
					<Icon
						type="check"
						className="editable-cell-icon-check"
						onClick={this.check.bind(this)}
					/>
				</div>
				:
				<div className="editable-cell-text-wrapper">
				{value || ' '}
				<Icon
					type="edit"
					className="editable-cell-icon"
					onClick={this.edit.bind(this)}
				/>
				</div>
			}
		</div>
		);
	}
}
