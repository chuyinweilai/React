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
            visible_1:false,
            visible2:false,
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

            alert_lvl:[],
            area_code:[],
        };

        this.alert_lvl = []
        this.area_code = [] 
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

    _jump(nextPage, mess) {
        this.Router(nextPage, mess, this.mess.nextPage)
    }

    //获取后台信息
    _getEvent(type,filter_val) {
        let TokenMess = this.TokenMess;
        let afteruri = 'comm_alerts/search';
        let body = {}
        if(type == 'search'){
            body = {
                "duration": "all",
                "perpage": 10,
                "filter": filter_val
            }
        } else {
            body = {
                "duration": "all",
                "perpage": 10,
                "filter": "(alert_type = '五违')"
            }
        }
        appData_local._dataPost(afteruri, body, (res) => {
            let data = res.data
            let pageSum = Math.ceil(res.total / res.per_page)
            let len = data.length;
            this.setState({
                total: res.total,
                dataSource: data,
                count: len,
                alert_lvl: this.alert_lvl,
                area_code: this.area_code,

            })
        },TokenMess)
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    showModal2 = () => {
        this.setState({
            visible2: true,
        });
    }

    loop = (text) => {
        if (text != null) {
            let image = ''
            if (text === '违法排污') {
                image = 'http://www.famesmart.com/test/imageScroll/image/illegal_water.png'
            } else if (text === '违法建筑') {
                image = 'http://www.famesmart.com/test/imageScroll/image/illegal_building.png'
            } else {
                image = 'http://www.famesmart.com/test/imageScroll/image/illegal_car.png'
            }
            return (
                <img style={{height: '200px', width: '240px'}} src={image} role="presentation"/>
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

    handleOk2 = () => {
        setTimeout(() => {
            this.setState({loading: false, visible2: false});
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

    handleCancel = () => {
        this.setState({visible: false});
    }

    handleClose = () => {
        this.setState({visible: false});
    }

    handleCancel2 = () => {
        this.setState({visible2: false});
    }

    handleClose2 = () => {
        this.setState({visible2: false});
    }

    //操作栏功能
    _action(type, mess) {
        if(type === "change" ){
            if (mess.alert_info == '群租可能') {
                this.setState({apt_code: mess.area_code})
                this.setState({ic_card: mess.source_id})
                this.setState({roomNum: mess.loc_description})
                this.setState({dev_id: mess.id})
                this.showModal2()
            } else {

                this.setState({apt_code: mess.area_code})
                this.setState({ic_card: mess.source_id})
                this.setState({roomNum: mess.loc_description})
                this.setState({dev_id: mess.id})
                this.showModal()
            }
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
            this.alert_lvl = key
        } else if(type == 'area_code'){
            this.area_code = key
        }
    }

    callback() {
            let alert_lvl = this.alert_lvl;
            let area_code = this.area_code;
            let f_lvl = ""
            if(alert_lvl.length){
                alert_lvl.forEach( (value,index)=> {
                    if(index == 0){
                        if(alert_lvl.length > 1){
                            f_lvl += " and((" + value + ")"
                        } else {
                            f_lvl += " and(" + value + ")"
                        }
                    } else {
                        f_lvl += " or (" + value + "))"
                    }
                });
            }
            if(area_code.length){
                area_code.forEach( (value,index)=> {
                    if(index == 0){
                        if(area_code.length > 1){
                            f_lvl += " and((" + value + ")"
                        } else {
                            f_lvl += " and(" + value + ")"
                        }
                    } else {
                        f_lvl += " or (" + value + "))"
                    }
                });
            }
            let filter = "(alert_type = '五违')" + f_lvl
            this._getEvent("search", filter)
    }

    render() {

        const {reportReason} = this.state;
        const {dataSource} = this.state;
        let columns = this.columns;
        const lableS = {
            color: '#00A0E9',
            fontSize: '15px',
        }

        const ColStyle = {
            background: '#00A0E9',
            height: '40px',
            width:'230px',
            lineHeight: '40px',
            fontSize: '15px',
            marginBottom: '15px',
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
            marginLeft: '130px'
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
                        <text style={{fontSize: 24, color: '#1e8fe6'}}>五违管理</text>
                    </Col>
                    <Col className="printHidden">
                        <Button style={{height: 32}} onClick={()=>window.print()}>打印</Button>
                    </Col>
                </Row>
                
                <Row style={{margin: 10}}>
                    <Collapse disabled>
                        <Panel header="精确筛选" key="1">
                            <Checkbox.Group defaultValue={this.state.alert_lvl} onChange={this.onCheckChange.bind(this,'alert_lvl')}>
                                <Row style={{borderBottom: '1px solid #aaa',padding: "12px 0"}}>
                                    <Col span={2} style={{fontWeight: 'bold', fontSize: 14}}>报警级别：</Col>
                                    <Col span={3}><Checkbox value="alert_lvl = '低'" style={{fontSize: 14}}>低级</Checkbox></Col>
                                    <Col span={3}><Checkbox value="alert_lvl = '中'" style={{fontSize: 14}}>中级</Checkbox></Col>
                                    <Col span={3}><Checkbox value="alert_lvl = '高'" style={{fontSize: 14}}>高级</Checkbox></Col>
                                </Row>
                            </Checkbox.Group>
                            <Checkbox.Group defaultValue={this.state.area_code} onChange={this.onCheckChange.bind(this,'area_code')}>
                                <Row style={{borderBottom: '1px solid #aaa',padding: "12px 0"}}>
                                    <Col span={2} style={{fontWeight: 'bold', fontSize: 14}}>所属区域：</Col>
                                    <Col span={3}><Checkbox value="area_code='A'" style={{fontSize: 14}}>A区</Checkbox></Col>
                                    <Col span={3}><Checkbox value="area_code='B'" style={{fontSize: 14}}>B区</Checkbox></Col>
                                    <Col span={3}><Checkbox value="area_code='C'" style={{fontSize: 14}}>C区</Checkbox></Col>
                                    <Col span={3}><Checkbox value="area_code='D'" style={{fontSize: 14}}>D区</Checkbox></Col>
                                    <Col span={3}><Checkbox value="area_code='E'" style={{fontSize: 14}}>E区</Checkbox></Col>
                                    <Col span={3}><Checkbox value="area_code='F'"style={{fontSize: 14}}>F区</Checkbox></Col>
                                </Row>
                            </Checkbox.Group>
                            <Row type="flex" justify="end">
                                <Button style={{marginTop: '10px'}} size="large" type="primary" onClick={()=>this.callback()}>搜索</Button>
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
                                <Button key="back" type="primary" size="large" onClick={this.handleClose}>取消</Button>
                            </Col>
                            <Col>
                                <Button key="submit" type="primary" size="large" onClick={this.handleOk}>
                                    保存
                                </Button>
                            </Col>

                        </Row>
                    ]} 
                >       
                    <Form>
                        <FormItem>
                            <div style={{height: '200px', width: '100%'}}>
                                <Row gutter={12}>
                                    <Col  span={6}>
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
                                            <Button onClick={()=> this.setState({visible_1: true})}>视频确认</Button>
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
               
                <Modal
                    visible={this.state.visible_1}
                    title="视频播放"
                    width= '760'
                    onCancel={()=> this.setState({visible_1: false})}
                    footer={[
                        <Row gutter={8} type="flex" justify="end">
                            <Col>
                                <Button key="back" type="primary" size="large" onClick={()=> this.setState({visible_1: false})}>取消</Button>
                            </Col>
                        </Row>
                    ]} 
                >   
                    <div style={{height: '540'}}>
                    <object  style={{height: '540',width:"720"}} type='application/x-vlc-plugin' id='vlc' events='True' width="720" height="540" pluginspage="http://www.videolan.org" codebase="http://downloads.videolan.org/pub/videolan/vlc-webplugins/2.0.6/npapi-vlc-2.0.6.tar.xz">  
                         {/* <param name='mrl' value={'rtsp://' + this.state.ic_card + '/vod/mp4://BigBuckBunny_175k.mov'} />    */}
                        <param name='mrl' value='rtsp://184.72.239.149/vod/mp4://BigBuckBunny_175k.mov' />  
                        <param name='volume' value='50' />  
                        <param name='autoplay' value='true' />  
                        <param name='loop' value='false' />  
                        <param name='fullscreen' value='false' />  
                    </object>   
                    </div>
                </Modal>

                <Modal
                    visible={this.state.visible2}
                    title="查看页面"
                    onOk={this.handleOk2}
                    onCancel={this.handleCancel2}
                    footer={[
                        <Row gutter={8} type="flex" justify="space-around">
                            <Col>
                                <Button key="back" type="primary" size="large" onClick={this.handleClose2}>取消</Button>
                            </Col>
                            <Col>
                                <Button key="submit" type="primary" size="large" onClick={this.handleOk2}>
                                    保存
                                </Button>
                            </Col>

                        </Row>
                    ]}
                >
                    <Form>
                        <FormItem>
                            <div style={{height: '200px', width: '100%'}}>
                                <Row gutter={12}>
                                    <Col  span={6}>
                                        <Row style={ColStyle} span={2} offset={1}>
                                            <div style={detail}> {`位置:` + this.state.roomNum}</div>
                                        </Row>

                                        <Row style={ColStyle} span={2} offset={1}>
                                            <div style={detail}>{`设备号:` + this.state.ic_card}</div>
                                        </Row>

                                        <Row style={ColStyle} span={2}>
                                            <div style={detail}>{`区域:` + this.state.apt_code}</div>
                                        </Row>
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