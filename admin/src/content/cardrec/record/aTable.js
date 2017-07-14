
import React, { PropTypes,Component } from 'react';
import { Table, Input, Icon, Button, Popconfirm } from 'antd'

import ACell from './aCell';

export default class pointTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [
			{
				CardID:'Miku',	
				type:'各种类型',
				area: 'Corey',
				time: '2017-7-14 19:29:15',
				num:'404',
				card_type:'长期卡'
			},
		],
			count: 1,
		};
		this.columns = [
			{
				title: '卡号',
				dataIndex: 'CardID',
			}, 
			{
				title: '门禁类型',
				dataIndex: 'type',
			}, 
			{
				title: '门禁位置',
				dataIndex: 'area',
			}, 
			{
				title: '进入时间',
				dataIndex: 'time',
			},
			{
				title: '归属业主楼号房间号',
				dataIndex: 'num',
			},
			{
				title: '卡号类型（长期卡，临时卡）',
				dataIndex: 'card_type',
			},
		];
	}
	render() {
		const { dataSource } = this.state;
		let columns = this.columns;
		return (
		<div>
			{/* <Button className="editable-add-btn" onClick={this.handleAdd.bind(this)}>Add</Button> */}
			 <Table bordered dataSource={dataSource} columns={columns} rowKey='key'/> 
		</div>
		);
	}
}