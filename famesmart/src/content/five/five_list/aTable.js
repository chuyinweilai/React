
import React, { PropTypes,Component } from 'react';
import { 
	Table, 
	Input, 
	Icon, 
	Button, 
	Row,
	Col,
    Radio,
    Form,
	Select,
	Popconfirm, 
	Pagination,
    Tag,
	Menu, 
	Dropdown,
    Modal
} from 'antd'
import appData from './../../../assert/Ajax';
import appData_local from './../../../assert/Ajax_local';
import ACell from './aCell';
import  '../../../App.css'
const { Option, OptGroup } = Select
const RadioGroup = Radio.Group
const FormItem = Form.Item
require('./index.css');
export default class pointTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [],
			count: 1,
			total:0,
            loading: false,
            visible: false,
			listMess:{},
			pageSum:1,
			pageNum:1,
			comm_name:'',
            reportReason:'',
            value: 1,
            apt_code:'',
            roomNum:0,
            ic_card:0,
            dev_id:0,
		};

        const handleMenuClick = (record, e) => {
            let mess = ''
            if (e.key === '1') {
                mess = '干预解决'
            } else if (e.key === '2') {
                mess = '自行解决'
            } else {
                mess = '误报'
            }

            const id = record.id
            console.log('id:'+id)

            let TokenMess = this.TokenMess;
            let afteruri = 'comm_alerts/'+id+'/close';
            let bodyString = 'comments='+mess+'&closure_code='+e.key
            let body = {
                bodyString
            }
            appData_local._dataPost(afteruri,body,(res) => {
                this._getEvent()
            },TokenMess)

        }
        const status = {
            新建: {
                color:'#64ea91',
            },
            分发: {
                color: '#8fc9fb',
            },
            处理中: {
                color: '#f69899',
            },
            关闭: {
                color: '#f8c82e',
            },
        }
		this.columns = [
			{
				colSpan:1,
				title: 'ID',
				render:(text,record,index) => {
					return(
						<text>{index+1}</text>
					)
				}
			},
			{
				colSpan:1,
				title: '发生时间',
				dataIndex: 'created_at',
			},
			{
  				colSpan: 1,
				title: '报警类型',
				dataIndex: 'alert_type',
			}, 
			{
  				colSpan: 1,
				title: '报警内容',
				dataIndex: 'alert_info',
			}, 
			{
  				colSpan: 1,
				title: '报警级别',
				dataIndex: 'alert_lvl',
			}, 
			{
  				colSpan: 1,
				title: '状态',
				dataIndex: 'status',
                render: (text, it) => <Tag color={status[it.status].color}>{text}</Tag>,
				// render:(text,record) => {
				// 	let test = ''
				// 	if(text === 'Y' ){
				// 		test = '业主'
				// 	}  else if(text === 'Z'){
				// 		test = '租户'
				// 	}
				// 	return <div>{test}</div>
				// }
			}, 
			{
  				colSpan: 1,
				title: '所属楼宇',
				dataIndex: 'loc_description',
			}, 
			{
  				colSpan: 1,
				title: '所属区域',
				dataIndex: 'area_code',
			}, 
			{
  				colSpan: 1,
				title: '处理人',
				dataIndex: 'agent_name',
			},
			{
				title:"操作",
				key:"action",
  				colSpan: 3,
				render:(text, record)=>{
					return (
						<Row type="flex" justify="space-between">
							<Button type="primary" onClick={() =>this._action('change',record)}>查看</Button>

							<Dropdown overlay={
								<Menu onClick={e => handleMenuClick(record, e)}>
									<Menu.Item key="1">干预解决</Menu.Item>
									<Menu.Item key="2">自行解决</Menu.Item>
									<Menu.Item key="3">误报</Menu.Item>
								</Menu>}>
								<a >快速处理</a>
							</Dropdown>
						</Row>
					)
				}
			}
		];
		
		this.Router;
		this.mess = null;
		this.TokenMess = '';
	}

	componentWillMount(){
		this.Router = this.props.Router;
		this.mess = this.props.message;
        appData_local._Storage('get',"Token",(res) =>{
            this.TokenMess = res
            this._getEvent()
        })

	}



	_jump(nextPage,mess){
		this.Router(nextPage,mess,this.mess.nextPage)
	}

	//获取后台信息
	_getEvent(){
        let TokenMess = this.TokenMess;
		let afteruri = 'comm_alerts/search';
		let body = {
            "filter":"( alert_type = '五违')"
		}
        appData_local._dataPost(afteruri,body,(res) => {
			let data = res.data
			console.log(data)
			let pageSum = Math.ceil(res.total/res.per_page)
			let len = data.length;
			this.setState({
				total:res.total,
				dataSource: data,
				count:len,
			})
		},TokenMess)
	}

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 500);
        let TokenMess = this.TokenMess;
        let devid = this.state.dev_id;
        let afteruri = 'comm_alerts/'+devid+'/dispatch';
        let bodyString = 'id='+ devid
        let body = {
            bodyString
        }
        appData_local._dataPost(afteruri,body,(res) => {
            this._getEvent()

        },TokenMess)

    }
    handleCancel = () =>{
        this.setState({ visible: false });
    }
    handleClose = () => {

        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 500);
        let key_value = this.state.value
        let mess = ''
        if (key_value === '1') {
            mess = '干预解决'
        } else if (key_value === '2') {
            mess = '自行解决'
        }  else if (key_value === '3') {
            mess = '误报'
        }else {
            mess = '其他'
        }
        let id = this.state.dev_id;
        console.log('close_id:'+id)
        let TokenMess = this.TokenMess;

        let afteruri = 'comm_alerts/'+id+'/close';
        let bodyString = 'comments='+mess+'&closure_code='+key_value
        // data: `comments=${params.comments}&closure_code=${params.closure_code}`,
        let body = {
            bodyString
        }
        appData_local._dataPost(afteruri,body,(res) => {
            this._getEvent()
        },TokenMess)
    }

	//操作栏功能
	_action(type,mess){
		if(type === "change"){
            this.setState({apt_code:mess.area_code})
            this.setState({ic_card:mess.source_id})
            this.setState({roomNum:mess.loc_description})
            this.setState({dev_id:mess.id})

            this.showModal()

		}else if(type === "cancel"){
			let afteruri = 'vcity/canceluser';
			let body = {
				"mobile": mess.mobile,
				"comm_code": mess.comm_code
			}
			appData._dataPost(afteruri,body,(res) => {
				console.log(res)
				if(res){
					this._getEvent()
				} else {
					alert('操作失败')
				}
			})
		}
	}

	//分页器activity/list?page=num
	_pageChange(pageNumber){
		let userMess = this.userMess;
		let afteruri = 'vcity/listuser?page=' + pageNumber ;
		let body = {
			 "comm_code": userMess.comm_code
		}
		appData._dataPost(afteruri,body,(res) => {
			let pageSum = Math.ceil(res.total/res.per_page)
			let data = res.data;
			let len = data.length;
			this.setState({
				total:res.total,
				dataSource: data,
				count:len,
				pageNum:pageNumber
			})
		})
	}

    onChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    }

    onChangeReportReason = (e) => {
        this.setState({ reportReason: e.target.value });
    }

	render() {

        const { reportReason } = this.state;
		const { dataSource } = this.state;
		let columns = this.columns;
        const lableS = {
            color: '#00A0E9',
            fontSize: '15px',
        }
        function handleSearch(){
            console.log()
        }
        const ColStyle = {
            background: '#00A0E9',
            height: '30px',
            lineHeight: '30px',
            fontSize: '13px',
            textAlign: 'center',
        }
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        }
        const ColStyleTopRight = {
            borderRight:'solid 1px',
            borderTop:'solid 1px',
            borderColor: '#E9E9E9',
        }
        const ColStyleTop = {
            borderTop:'solid 1px',
            borderColor: '#E9E9E9',
        }

		return (
		<div style={{ background: '#fff', padding: 24, margin: 0, minHeight: 80 }}>
			<Row type="flex" justify="space-between" gutter={1}>
				<Col lg={8} md={12} sm={16} xs={24} style={{ marginBottom: 16 }}>
					<Select
						mode="multiple"
						size="large"
						style={{ width: '80%' }}
						placeholder="Please select"
					>
						<OptGroup label="状态" style={lableS}>
							<Option style={{ marginLeft: 16 }} value="(status='新建')">新建</Option>
							<Option style={{ marginLeft: 16 }} value="(status='分发')">分发</Option>
							<Option style={{ marginLeft: 16 }} value="(status='关闭')">关闭</Option>
						</OptGroup>
						<OptGroup label="等级" style={lableS} >
							<Option style={{ marginLeft: 16 }} value="(alert_lvl='高')">高</Option>
							<Option style={{ marginLeft: 16 }} value="(alert_lvl='中')">中</Option>
							<Option style={{ marginLeft: 16 }} value="(alert_lvl='低')">低</Option>
						</OptGroup>
						<OptGroup label="时间" style={lableS} >
							<Option style={{ marginLeft: 16 }} value="month">最近一个月</Option>
						</OptGroup>
					</Select>
					<Button size="large" type="primary" onClick={handleSearch}>搜索</Button>
				</Col>
				<Col span={2} className="printHidden">
					<Button type="primary" onClick={() => this._print()}>打印</Button>
				</Col>

			</Row>
			<Row>
				<Col span={8} style={{margin:'10px'}}> </Col>
			</Row>
			<Table bordered dataSource={this.state.dataSource} columns={columns} rowKey='key' pagination={false} style={{marginBottom: 20}}/> 
			<Row type="flex" justify="end">
			<Pagination showQuickJumper defaultCurrent={1} current={this.state.pageNum} total={this.state.total} onChange={this._pageChange.bind(this)} />
			</Row>
			<Modal
				visible={this.state.visible}
				title="查看页面"
				onOk={this.handleOk}
				onCancel={this.handleCancel}
                footer={[
                    <Row gutter={8} type="flex" justify="space-around">
                        <Col>
                            <Button  key="back" type="primary" size="large"  onClick={this.handleClose}>事件关闭</Button>
                        </Col>
                        <Col>
                            <Button  key="submit" type="primary" size="large"  onClick={this.handleOk}>
                                事件分发
                            </Button>
                        </Col>

                    </Row>
                ]}
			>
				<Form>
					<FormItem >
						<div>
							<Row gutter={8}>
								<Col style={ColStyle} span={4}>
									<div>{`区域:`+this.state.apt_code}</div>
								</Col>
								<Col style={ColStyle} span={6} offset={1}>
									<div> {`位置:`+this.state.roomNum}</div>
								</Col>
								<Col style={ColStyle} span={6} offset={1}>
									<div>{`设备号:`+this.state.ic_card}</div>
								</Col>
								<Col span={4} offset={2}>
									<a style={{ marginLeft: '25%' }} target="_blank" rel="noopener noreferrer" href="http://192.168.1.158/">视频确认</a>
								</Col>
							</Row>
						</div>
					</FormItem>
					<FormItem>
						<div style={{ height: '100px', width: '80%' }}>

						</div>
					</FormItem>
					<FormItem>
						<Row gutter={8}>
							<Col style={ColStyleTopRight}  span={12}>

									<RadioGroup onChange={this.onChange} value={this.state.value}>
										<Radio style={radioStyle} value={1}>干预解决</Radio>
										<Radio style={radioStyle} value={2}>自行解决</Radio>
										<Radio style={radioStyle} value={3}>误报</Radio>
										<Radio style={radioStyle} value={4}>其他
                                            {this.state.value === 4 ? <Input style={{ width: 100, marginLeft: 10 }} /> : null}
										</Radio>
									</RadioGroup>
							</Col>
							<Col style={ColStyleTop} span={12}>

									<Input style={{ fontSize: 13, width: 200, marginLeft: 30,marginTop:'5px', }} type="textarea" autosize={{ minRows: 5, maxRows: 5 } }
										   placeholder="请输入上报的理由" value={reportReason}
                                           onChange={this.onChangeReportReason}
									/>

							</Col>
						</Row>
					</FormItem>
				</Form>
			</Modal>

		</div>
		);
	}


}