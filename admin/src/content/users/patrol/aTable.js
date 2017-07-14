
import React, { PropTypes,Component } from 'react';
import { Table, Input, Icon, Button, Popconfirm, Menu, Dropdown } from 'antd'

import ACell from './aCell';

export default class pointTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			
			dataSource: [
				{
					name:'Miku',	
					id:1,
					num:'1',
					room:'2',
					cardID:3,
					startData:'2017/7/14',
					endData:'2017/7/15',
					root: 'user',
				},
			],
			count: 1,
		};
		this.columns = [
			{
				title: '姓名',
				dataIndex: 'name',
				width: '30%',
			},
			{
				title: 'id',
				dataIndex: 'id',
			}, 
			{
				title: '巡更设备ID',
				dataIndex: 'num',
			}, 
			{
				title: '巡更时间',
				dataIndex: 'startData',
			},
			{
				title:"操作",
				key:"action",
				render:(text, record)=>(
					<span>
						<Button>变更</Button>
						<Button>删除</Button>
					</span>
				)
			}
		];
	}

	render() {
		const { dataSource } = this.state;
		let columns = this.columns;
		return (
		<div>
			<Button>新增</Button>
			 <Table bordered dataSource={dataSource} columns={columns} rowKey='key'/> 
		</div>
		);
	}
}