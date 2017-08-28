import React, {PropTypes, Component} from 'react';
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
    message,
    Checkbox,
    Dropdown,
    Collapse,
    Modal
} from 'antd'
import appData from './../../../assert/Ajax';
import appData_local from './../../../assert/Ajax_local';
import ACell from './aCell';
import  '../../../App.css'
const {Option, OptGroup} = Select
const RadioGroup = Radio.Group
const FormItem = Form.Item
const Panel = Collapse.panel;
const Search = Input.Search;

require('./index.css');

export default class pointTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            count: 1,
            total: 0,
            loading: false,
            visible: false,
            listMess: {},
            pageSum: 1,
            pageNum: 1,
            comm_name: '',
            reportReason: '',
            value: 1,
            apt_code: '',
            roomNum: 0,
            ic_card: 0,
            dev_id: 0,
            comments:'',

            filter_lvl: [],
            filter_area: [],            
			SearchType: 'status',
			SearchText: '输入状态查询。'
        };

        const handleMenuClick = (record, e) => {
            let closure_code = e.key

            const id = record.id

            let TokenMess = this.TokenMess;
            let afteruri = 'comm_alerts/close';
            let body = {
                "id": id,
                "closure_code": closure_code,
            }
            appData_local._dataPost(afteruri, body, (res) => {
                if (res.result == 1) {
                    this.success('提交数据成功！！！')
                    this._getEvent()
                } else {
                    this.error('提交数据失败！！！')
                }

            }, TokenMess)

        }
        const status = {
            新建: {
                color: '#64ea91',
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
                colSpan: 1,
                title: 'ID',
                render: (text, record, index) => {
                    return (
                        <text>{index + 1}</text>
                    )
                }
            },
            {
                colSpan: 1,
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
                title: "操作",
                key: "action",
                colSpan: 3,
                render: (text, record) => {
                    return (
                        <Row type="flex" justify="space-between">
                            <Button type="primary" onClick={() => this._action('change', record)}>查看</Button>

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

    componentWillMount() {
        this.Router = this.props.Router;
        this.mess = this.props.message;
        appData_local._Storage('get', "Token", (res) => {
            this.TokenMess = res
            this._getEvent()
        })

    }

    callback(key) {
    }

    _jump(nextPage, mess) {
        this.Router(nextPage, mess, this.mess.nextPage)
    }

    //获取后台信息
    _getEvent() {
        let TokenMess = this.TokenMess;
        let afteruri = 'comm_alerts/search';
        let body = {
            "duration": "all",
            "perpage": 10,
            "filter": "(alert_type = '五违')"
        }
        appData_local._dataPost(afteruri, body, (res) => {
            let data = res.data
            let pageSum = Math.ceil(res.total / res.per_page)
            let len = data.length;
            this.setState({
                total: res.total,
                dataSource: data,
                count: len,
            })
        }, TokenMess)
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    loop = (text) => {
        if (text != null) {
            // const array = item.created_at.split(' ')
            // const arrMin = array[1].split(':')
            // const image1 = `http://test.famesmart.com/alart_cam/2A0387EPAA00036/${array[0]}/001/jpg/${arrMin[0]}/${arrMin[1]}/${arrMin[2]}[M][0@0][0].jpg`
            let image = ''
            if (text === '违法排污') {
                image = 'http://www.famesmart.com/test/imageScroll/image/illegal_water.png'
            } else if (text === '违法建筑') {
                image = 'http://www.famesmart.com/test/imageScroll/image/illegal_building.png'
            } else {
                image = 'http://www.famesmart.com/test/imageScroll/image/illegal_car.png'
            }
            return (
                <img style={{height: '100px', width: '178px'}} src={image} role="presentation"/>
            )
        }
        return null
    }

    error = (text) => {
        message.error(text);
    };
    
    success = (text) => {
        message.success(text);
    };

    handleOk = () => {
        this.setState({loading: true});
        setTimeout(() => {
            this.setState({loading: false, visible: false});
        }, 500);
        let TokenMess = this.TokenMess;
        let devid = this.state.dev_id;
        let afteruri = 'comm_alerts/' + devid + '/dispatch';
        let bodyString = 'id=' + devid
        let body = {
            bodyString
        }
        appData_local._dataPost(afteruri, body, (res) => {
            this._getEvent()

        }, TokenMess)

    }

    handleCancel = () => {
        this.setState({visible: false});
    }

    handleClose = () => {

        setTimeout(() => {
            this.setState({loading: false, visible: false});
        }, 500);
        let key_value = this.state.value

        let closure_code = key_value;
        let id = this.state.dev_id;

        let TokenMess = this.TokenMess;
        let afteruri = 'comm_alerts/close';
        let body = {
            "id": id,
            "closure_code": closure_code,
        }
        appData_local._dataPost(afteruri, body, (res) => {
            if (res.result == 1) {
                this.success('提交数据成功！！！')
                this._getEvent()
            } else {
                this.error('提交数据失败！！！')
            }

        }, TokenMess)
    }

    //操作栏功能
    _action(type, mess) {
        if (type === "change") {
            this.setState({apt_code: mess.area_code})
            this.setState({ic_card: mess.source_id})
            this.setState({roomNum: mess.loc_description})
            this.setState({dev_id: mess.id})

            this.showModal()

        } else if (type === "cancel") {
            let afteruri = 'vcity/canceluser';
            let body = {
                "mobile": mess.mobile,
                "comm_code": mess.comm_code
            }
            appData._dataPost(afteruri, body, (res) => {
                if (res) {
                    this._getEvent()
                } else {
                    alert('操作失败')
                }
            })
        }
    }

    //分页器activity/list?page=num
    _pageChange(pageNumber) {
        let userMess = this.userMess;
        let afteruri = 'vcity/listuser?page=' + pageNumber;
        let body = {
            "comm_code": userMess.comm_code
        }
        appData._dataPost(afteruri, body, (res) => {
            let pageSum = Math.ceil(res.total / res.per_page)
            let data = res.data;
            let len = data.length;
            this.setState({
                total: res.total,
                dataSource: data,
                count: len,
                pageNum: pageNumber
            })
        })
    }

    onChange = (e) => {
        this.setState({
            value: e.target.value,
        });
    }

    onChangeReportReason = (e) => {
        this.setState({reportReason: e.target.value});
    }

    onCheckChange(type,key) {
        if(type == 'alert_lvl'){
            let filter_lvl = this.state.filter_lvl;
        } else if(type == 'area_code '){
            let filter_area = this.state.filter_area;
        }
    }

    render() {
        const {reportReason} = this.state;
        const {dataSource} = this.state;
        let columns = this.columns;
        const lableS = {
            color: '#00A0E9',
            fontSize: '15px',
        }

        function handleSearch() {
        }

        const ColStyle = {
            background: '#00A0E9',
            height: '30px',
            width:'180px',
            lineHeight: '30px',
            fontSize: '13px',
            margin: '2px',
            borderColor: '#E9E9E9',
            fontColor: '#FFF',
            borderRadius: '4px',
            textAlign: 'center',
        }
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        }
        const ColStyleTopRight = {
            borderRight: 'solid 1px',
            borderTop: 'solid 1px',
            borderColor: '#E9E9E9',
        }
        const ColStyleTop = {
            borderTop: 'solid 1px',
            borderColor: '#E9E9E9',
        }

        const test = {
            marginLeft: '160px'
        }
        const detail = {
            width: '100%',
            textAlign: 'left',
            color: '#fff',
            fontWeight:'bold',
            marginLeft:'2px',
            marginRight:'2px'
        }

        const Panel = Collapse.Panel;
        return (
            <div>
                <Row type="flex" justify="space-between" gutter={1}>
                    <Col  className="printHidden">
                        <text style={{fontSize: 24, color: '#aaa'}}>巡更管理/</text>
                        <text style={{fontSize: 24, color: '#1e8fe6'}}>巡更记录</text>
                    </Col>
                    <Col className="printHidden">
                        <Button style={{height: 32}} onClick={()=>window.print()}>打印</Button>
                    </Col>
                </Row>
                
                <Row style={{margin: 10}}>
                    <Collapse onChange={this.callback}>
                        <Panel header="精确筛选" key="1">
                            <Checkbox.Group onChange={this.onCheckChange.bind(this,'alert_lvl')}>
                                <Row style={{borderBottom: '1px solid #aaa',padding: "12px 0"}}>
                                    <Col span={2} style={{fontWeight: 'bold', fontSize: 14}}>报警级别：</Col>
                                    
                                    <Col span={3}><Checkbox value={{alert_lvl:'低级'}} style={{fontSize: 14}}>低级</Checkbox></Col>
                                    <Col span={3}><Checkbox value={{alert_lvl:'中级'}} style={{fontSize: 14}}>中级</Checkbox></Col>
                                    <Col span={3}><Checkbox value={{alert_lvl:'高级'}} style={{fontSize: 14}}>高级</Checkbox></Col>
                                </Row>
                            </Checkbox.Group>
                            <Checkbox.Group onChange={this.onCheckChange.bind(this,'area_code')}>
                                <Row style={{borderBottom: '1px solid #aaa',padding: "12px 0"}}>
                                    <Col span={2} style={{fontWeight: 'bold', fontSize: 14}}>所属区域：</Col>
                                    <Col span={3}><Checkbox value={{area_code:'A'}} style={{fontSize: 14}}>A区</Checkbox></Col>
                                    <Col span={3}><Checkbox value={{area_code:'B'}} style={{fontSize: 14}}>B区</Checkbox></Col>
                                    <Col span={3}><Checkbox value={{area_code:'C'}} style={{fontSize: 14}}>C区</Checkbox></Col>
                                    <Col span={3}><Checkbox value={{area_code:'D'}} style={{fontSize: 14}}>D区</Checkbox></Col>
                                    <Col span={3}><Checkbox value={{area_code:'E'}} style={{fontSize: 14}}>E区</Checkbox></Col>
                                    <Col span={3}><Checkbox value={{area_code:'F'}} style={{fontSize: 14}}>F区</Checkbox></Col>
                                </Row>
                            </Checkbox.Group>
                            <Row type="flex" justify="end">
                                <Button style={{marginTop: '10px'}} size="large" type="primary" onClick={handleSearch}>搜索</Button>
                            </Row>
                        </Panel>
                    </Collapse>
                </Row>

                <Table bordered dataSource={this.state.dataSource} columns={columns} rowKey='key' pagination={false}
                       style={{marginBottom: 20}}/>
                <Row type="flex" justify="end">
                    <Pagination showQuickJumper defaultCurrent={1} current={this.state.pageNum} total={this.state.total}
                                onChange={this._pageChange.bind(this)}/>
                </Row>
                <Modal
                    visible={this.state.visible}
                    title="查看页面"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Row gutter={8} type="flex" justify="space-around">
                            <Col>
                                <Button key="back" type="primary" size="large" onClick={this.handleClose}>事件关闭</Button>
                            </Col>
                            <Col>
                                <Button key="submit" type="primary" size="large" onClick={this.handleOk}>
                                    事件分发
                                </Button>
                            </Col>

                        </Row>
                    ]}
                >
                    <Form>
                        <FormItem>
                            <div style={{height: '100px', width: '100%'}}>
                                <Row gutter={12}>
                                    <Col span={6}>
                                        {this.loop('')}
                                    </Col>
                                    <Col style={test} span={6}>

                                        <Row style={ColStyle} span={2} offset={1}>
                                            <div style={detail}> {`位置:` + this.state.roomNum}</div>
                                        </Row>

                                        <Row style={ColStyle} span={2} offset={1}>
                                            <div style={detail}>{`设备号:` + this.state.ic_card}</div>
                                        </Row>

                                        <Row style={ColStyle} span={2}>
                                            <div style={detail}>{`区域:` + this.state.apt_code}</div>
                                        </Row>
                                        <Row span={2} offset={2}>
                                            <a style={{marginLeft: '25%',
                                                textAlign: 'left',
                                                fontWeight:'bold', }} target="_blank" rel="noopener noreferrer"
                                               href="http://192.168.1.158/">视频确认</a>
                                        </Row>

                                    </Col>
                                </Row>
                            </div>
                        </FormItem>
                        <FormItem>
                            <Row gutter={8}>
                                <Col style={ColStyleTopRight} span={12}>

                                    <RadioGroup onChange={this.onChange} value={this.state.value}>
                                        <Radio style={radioStyle} value={1}>干预解决</Radio>
                                        <Radio style={radioStyle} value={2}>自行解决</Radio>
                                        <Radio style={radioStyle} value={3}>误报</Radio>
                                        <Radio style={radioStyle} value={4}>其他
                                            {this.state.value === 4 ?
                                                <Input style={{width: 100, marginLeft: 10}}/> : null}
                                        </Radio>
                                    </RadioGroup>
                                </Col>
                                <Col style={ColStyleTop} span={12}>

                                    <Input style={{fontSize: 13, width: 200, marginLeft: 30, marginTop: '5px',}}
                                           type="textarea" autosize={{minRows: 5, maxRows: 5} }
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