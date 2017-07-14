
import React, { PropTypes,Component } from 'react';
import { Table, Input, Icon, Button, Popconfirm, Col } from 'antd'

import ACell from './aCell';

export default class pointTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [
			{
				'location-type':'Miku',	
				'IP':1,
				'MAC':'chuyin@Miku.com',
				'device_area':'1',
				'state': 'emmmm',
				'control':'no',
			},
			{
				'location-type':'Miku',	
				'IP':1,
				'MAC':'chuyin@Miku.com',
				'device_area':'2',
				'state': 'emmmm',
				'control':'no',
			},
		],
			count: 1,
		};
		
		this.columns = [
			{
				title: '设备类型',
				dataIndex: 'location-type',
			}, 
			{
				title: '设备IP',
				dataIndex: 'IP',
			}, 
			{
				title: '设备MAC地址',
				dataIndex: 'MAC',
			}, 
			{
				title: '区域名称',
				dataIndex: 'device_area',
			},
			{
				title: '状态',
				dataIndex: 'state',
			},
			{
				title: '控制方式',
				dataIndex: 'control',
			},
			{
				title: '操作',
				render: (text, record, index) => {
					return (
					this.state.dataSource.length > 0 ?
					(
						<div>
							<Button title="Sure to delete?" onConfirm={() => this.onDelete(index)}>
								 更新配置
							</Button>
							<Button title="Sure to delete?" onConfirm={() => this.onDelete(index)}>
								查询状态
							</Button>
						</div>
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