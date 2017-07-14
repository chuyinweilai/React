
import React, { PropTypes,Component } from 'react';
import { Table, Input, Icon, Button, Popconfirm } from 'antd'

import ACell from './aCell';

export default class pointTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [
				{
					Type:'Miku',	
					IP:1,
					area:'2',
					team:'01',
				},
			],
			count: 1,
		};
		this.columns = [
			{
				title: '设备类型',
				dataIndex: 'Type',
			}, 
			{
				title: '设备IP',
				dataIndex: 'IP',
			}, 
			{
				title: '区域名称',
				dataIndex: 'area',
			}, 
			{
				title: '组',
				dataIndex: 'team',
			},
			{
				title: '操作 ',
				dataIndex: 'operation',
				render: (text, record, index) => {
					return (
					this.state.dataSource.length > 0 ?
					(
						<span>
							<Button>修改</Button>
							<Button>删除</Button>
						</span>
					) : null
					);
				},
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