
import React, { PropTypes,Component } from 'react';
import { Table, Input, Icon, Button, Popconfirm } from 'antd'
import '../../../App.css'
import ACell from './aCell';

export default class pointTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [
			{
				name:'Miku',	
				id:1,
				email:'chuyin@Miku.com',
				cardID:1111111111,
			},
		],
			count: 1,
		};
		this.columns = [
			{
				title: '卡号',
				dataIndex: 'cardID',
				width: '30%',
			}, 
			{
				title: '用户ID',
				dataIndex: 'id',
			},
			{
				title: '操作',
				dataIndex: 'operation',
				render: (text, record, index) => {
					return (
					this.state.dataSource.length > 0 ?
					(
						<div>
							<Button>更新</Button>
							<Button>删除</Button>
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