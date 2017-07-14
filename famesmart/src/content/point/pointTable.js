
import React, { PropTypes,Component } from 'react';
import { Table, Input, Icon, Button, Popconfirm } from 'antd'

import PointCell from './pointCell';

export default class pointTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [
			{
				name:'Miku',	
				id:1,
				email:'chuyin@Miku.com',
				mobile:13838327838,
			},
			{
				name:'Miku',	
				id:1,
				email:'chuyin@Miku.com',
				mobile:13838327838,
			},
			{
				name:'Miku',	
				id:1,
				email:'chuyin@Miku.com',
				mobile:13838327838,
			},
		],
			count: 10,
		};
		/**
		 * 
name:"系统管理员"
id:1
email:"hGqV6Y@hotmail.com"
mobile:"13900000000"
area_code: ""
auth_lvl:"0"
org:"凡米"
		 */
		this.columns = [
			{
				title: 'name',
				dataIndex: 'name',
				width: '30%',
				render: (text, record, index) =>(<PointCell
						value={text}
						onChange={this.onCellChange(index, 'name')}
					/>)
			}, 
			{
				title: 'id',
				dataIndex: 'id',
				render: (text, record, index) =>(<PointCell
						value={text}
						onChange={this.onCellChange(index, 'id')}
					/>)
			}, 
			{
				title: 'email',
				dataIndex: 'email',
				render: (text, record, index) =>(<PointCell
						value={text}
						onChange={this.onCellChange(index, 'email')}
					/>)
			}, 
			{
				title: 'mobile',
				dataIndex: 'mobile',
			},
			{
				title: 'operation',
				dataIndex: 'operation',
				render: (text, record, index) => {
					return (
					this.state.dataSource.length > 1 ?
					(
						<Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(index)}>
							<a href="#">Delete</a>
						</Popconfirm>
					) : null
					);
				},
			}
		];
	}

// get:GETpost数据，delete删除数据，put：插入新数据，patch更新数据。
	componentWillMount(){
		// aGet(this._ajax.bind(this))
	}

	_ajax(res){
		let arr = [...res]
		arr.forEach((element,index) => {
			element.key = index
		});
		this.setState({
			dataSource: arr,
			count: res.length,
		})
	}

	//内容发生变化，改变dataSource重新渲染
	onCellChange(index, key) {
		return (value) => {
			//进行深拷贝
			const dataSource = [...this.state.dataSource];
			dataSource[index][key] = value;
			this.setState({ dataSource });
		};
	}

	//删除
	// onDelete (index) {
	// 	const dataSource = [...this.state.dataSource];
	// 	dataSource.splice(index, 1);
	// 	this.setState({ dataSource });
	// }

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