
import React, { PropTypes,Component } from 'react';
import { 
	Table, 
	Input, 
	Icon, 
	Button, 
	Popconfirm, 
	Menu, 
	Dropdown,
	Row ,
	Col,
} from 'antd'

import ACell from './aCell';
const { Column, ColumnGroup } = Table;



const data = [
	{
		name:'Miku',	
		id:1,
		num:'1',
		room:'2',
		cardID:3,
		startData:'2017/7/14',
		endData:'2017/7/15',
		root: '1,2,3,4,5,',
	}
];
export default class pointTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: this.props.value,
			editable: this.props.editable || false,
			selectedRowKeys: [],  // Check here to configure the default column
			loading: false,
			hasSelected:false,
			dataSource: [
				{
					name:'Miku',	
					id:1,
					num:'1',
					room:'2',
					cardID:3,
					startData:'2017/7/14',
					endData:'2017/7/15',
					root: '1,2,3,4,5,',
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
				title: '楼号',
				dataIndex: 'num',
			}, 
			{
				title: '房间号',
				dataIndex: 'room',
			},
			{
				title: '卡号',
				dataIndex: 'cardID',
			},
			{
				title: '起始日期',
				dataIndex: 'startData',
			},
			{
				title: '截止日期',
				dataIndex: 'endData',
			},
			{
				title: '权限',
				dataIndex: 'root',
			},{
				title:"操作",
				key:"action",
				render:(text, record)=>(
					<span>
					<Button>编辑</Button>
					</span>
				)
			},
		];
		this.menu = (
			<Menu>
				<Menu.Item>
					<Button
						type="primary"
						onClick={()=>this.start(0)}
						disabled={!this.state.hasSelected}
						loading={this.state.loading}>权限组1</Button>
				</Menu.Item>
				<Menu.Item>
					<Button
						type="primary"
						onClick={()=>this.start(1)}
						disabled={!this.state.hasSelected}
						loading={this.state.loading}>权限组2</Button>
				</Menu.Item>
			</Menu>
		);
	}
	start () {
		this.setState({ loading: true });
		// ajax request after empty completing
		setTimeout(() => {
		this.setState({
			selectedRowKeys: [],
			loading: false,
		});
		}, 1000);
	}
	onSelectChange (selectedRowKeys) {
		console.log('selectedRowKeys changed: ', selectedRowKeys);
		this.setState({ 
			selectedRowKeys,
		});
	}
	render() {
		const { loading, selectedRowKeys,dataSource } = this.state;
		const rowSelection = {
			selectedRowKeys,
			onChange: this.onSelectChange.bind(this),
		};
		let hasSelected = selectedRowKeys.length > 0;
		return (
		<div>
			<div style={{ marginBottom: 16 }}>
			<span style={{ marginLeft: 8 }}>
				{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
			</span>
			</div>
			<Table rowSelection={rowSelection} columns={this.columns} dataSource={data} />
			<Row type="flex"  justify='end'>
				<Dropdown overlay={this.menu} placement="topRight">
					<Button>批量权限管理</Button>
				</Dropdown>
			</Row >
		</div>
		);
	}
}