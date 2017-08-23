import {Row, Col, Card, Button, Table, Tag, Icon, Badge, Layout} from 'antd'
import React, {Component, PropTypes} from 'react';
import * as d3 from 'd3-shape'
import {color} from '../../utils'

import appData from './../../assert/Ajax';
import appData_local from './../../assert/Ajax_local';
import RecentSales from '../../components/mainchart/recentSales'
// import oneChart from '../../components/mainchart/oneChart'
// import twoChart from '../../components/mainchart/twoChart'
import Completed from '../../components/mainchart/completed'
import Browser from '../../components/browser/browser'

import styles from '../../components/browser/browser.less'
import {
    LineChart, AreaChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart,
    Pie,
    Cell,
    Sector,
    Legend,
} from 'recharts'

const {Content} = Layout

export default class home2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            comm_name: '',
            infraNumber: 0,
            civiNumber: 0,
            activeIndex: 0,
            activeIndex2: 0,
            infraction: [],
            area: [],
            areaInfra: [],
            areaCivil: [],
            infractionCreate: [],
            infractionClose: [],
            civilizationCreate: [],
            civilizationClose: [],
            flag: 0,
            tableInfra: [],
            tableCivil: [],

        }
        this.Router;
        this.mess = null;
        this.TokenMess = '';

    }


    componentWillMount() {
        this.Router = this.props.Router;
        this.mess = this.props.message;
        this.setState.flag = 0
        appData_local._Storage('get', "Token", (res) => {
            this.TokenMess = res
            this._getEvent('area_infra')
            this._getEvent('area_civil')
            this._getEvent('alert_info')
            this._getEvent('infraction_create')
            this._getEvent('infraction_close')
            this._getEvent('civilization_create')
            this._getEvent('civilization_close')
            this._getEvent('count')
        })

    }


    _jump(nextPage, mess) {
        this.Router(nextPage, mess, this.mess.nextPage)
    }

    //获取后台信息
    _getEvent(text) {

        let TokenMess = this.TokenMess;
        if (text === 'area_infra') {
            let afteruri = 'comm_alerts/statistics';
            let body = {
                "scope":{"alert_type":"五违"},"timestamp_column":"created_at","group":["area_code"]
            }
            appData_local._dataPost(afteruri, body, (res) => {
                this.setState({
                    areaInfra: res.statistics,
                    flag: this.state.flag + 1
                })
                this._analyzeData()
            }, TokenMess)
        }  else if (text === 'area_civil') {
            let afteruri = 'comm_alerts/statistics';
            let body = {
                "scope":{"alert_type":"文明"},"timestamp_column":"created_at","group":["area_code"]
            }
            appData_local._dataPost(afteruri, body, (res) => {
                this.setState({
                    areaCivil: res.statistics,
                    flag: this.state.flag + 1
                })
                this._analyzeData()
            }, TokenMess)
        } else if (text === 'alert_info') {
            let afteruri = 'comm_alerts/statistics';
            let body = {
                "group": ["alert_type", "alert_info"]
            }
            appData_local._dataPost(afteruri, body, (res) => {
                this.setState({
                    infraction: res.statistics,
                    flag: this.state.flag + 1
                })
                this._analyzeData()
            }, TokenMess)
        } else if (text === 'count') {
            let afteruri = 'comm_alerts/search';
            let body = {}
            appData_local._dataPost(afteruri, body, (res) => {
                const countdata = res.data
                let len = res.data.length
                for (var i = 0; i < len; i++) {
                    if (countdata[i].alert_type === '五违' && countdata[i].status === '新建') {
                        this.setState({
                            infraNumber: this.state.infraNumber + 1
                        })
                    } else if (countdata[i].alert_type === '文明' && countdata[i].status === '新建') {
                        this.setState({
                            civilNumber: this.state.civilNumber + 1
                        })
                    }
                }

                this.setState({
                    flag: this.state.flag + 1
                })
                this._analyzeData()
            }, TokenMess)
        } else if (text === 'infraction_create') {
            let afteruri = 'comm_alerts/statistics';
            let body = {
                "scope": {"alert_type": "五违"}, "timestamp_column": "created_at", "unit": "day"
            }
            appData_local._dataPost(afteruri, body, (res) => {
                this.setState({
                    infractionCreate: res.statistics,
                    flag: this.state.flag + 1
                })
                this._analyzeData()
            }, TokenMess)
        } else if (text === 'infraction_close') {
            let afteruri = 'comm_alerts/statistics';
            let body = {
                "scope": {"alert_type": "五违"}, "timestamp_column": "closed_at", "unit": "day"
            }
            appData_local._dataPost(afteruri, body, (res) => {
                this.setState({
                    infractionClose: res.statistics,
                    flag: this.state.flag + 1
                })
                this._analyzeData()
            }, TokenMess)
        } else if (text === 'civilization_create') {
            let afteruri = 'comm_alerts/statistics';
            let body = {
                "scope": {"alert_type": "文明"}, "timestamp_column": "created_at", "unit": "day"
            }
            appData_local._dataPost(afteruri, body, (res) => {
                this.setState({
                    civilizationCreate: res.statistics,
                    flag: this.state.flag + 1
                })
                this._analyzeData()
            }, TokenMess)
        } else if (text === 'civilization_close') {
            let afteruri = 'comm_alerts/statistics';
            let body = {
                "scope": {"alert_type": "文明"}, "timestamp_column": "closed_at", "unit": "day"
            }
            appData_local._dataPost(afteruri, body, (res) => {

                this.setState({
                    civilizationClose: res.statistics,
                    flag: this.state.flag + 1
                })
                this._analyzeData()
            }, TokenMess)
        }

    }

    onPieEnter = (data, index) => {
        this.setState({
            activeIndex: 0,
        })

    }
    onPieEnter2 = (data, index) => {
        this.setState({
            activeIndex2: 0,
        })
    }


    _analyzeData = () => {
        if (this.state.flag >= 7) {

            if (this.state.infractionCreate.length >= this.state.infractionClose.length) {
                const mytem = [];
                for (var i = 0; i < this.state.infractionCreate.length; i++) {
                    var time = this.state.infractionCreate[i]["date(`created_at`)"].substring(8, 10);
                    if (time.substring(0, 1) === '0') {
                        time = time.substring(1, 2)
                    }
                    var undeal = this.state.infractionCreate[i].count;
                    var deal = 0;
                    if (this.state.infractionClose === undefined) {
                        if (this.state.infractionClose[i] === undefined) {
                            deal = 0;
                        } else {
                            deal = this.state.infractionClose[i].count
                        }
                    }

                    let data = {name: time, 已处理: deal, 未处理: undeal}
                    mytem.push(data)

                }
                this.setState({
                    tableInfra: mytem
                })

            } else {

                const mytem = [];
                for (var i = 0; i < this.state.infractionClose.length; i++) {
                    var time = this.state.infractionClose[i]["date(`closed_at`)"].substring(8, 10);
                    if (time.substring(0, 1) === '0') {
                        time = time.substring(1, 2)
                    }
                    var undeal = this.state.infractionCreate[i].count;
                    var deal = 0;
                    if (this.state.infractionCreate === undefined) {
                        if (this.state.infractionClose[i] === undefined) {
                            deal = 0;
                        } else {
                            deal = this.state.infractionClose[i].count
                        }
                    }

                    let data = {name: time, 已处理: deal, 未处理: undeal}
                    mytem.push(data)
                }
                this.setState({
                    tableInfra: mytem
                })
            }

            if (this.state.civilizationCreate.length >= this.state.civilizationClose.length) {

                const mytem = [];
                for (var i = 0; i < this.state.civilizationCreate.length; i++) {
                    var time = this.state.civilizationCreate[i]["date(`created_at`)"].substring(8, 10);
                    if (time.substring(0, 1) === '0') {
                        time = time.substring(1, 2)
                    }
                    var undeal = this.state.civilizationCreate[i].count;
                    var deal = 0;
                    if (this.state.civilizationClose === undefined) {
                        if (this.state.civilizationClose[i] === undefined) {
                            deal = 0;
                        } else {
                            deal = this.state.civilizationClose[i].count
                        }
                    }

                    let data = {name: time, 已处理: deal, 未处理: undeal}
                    mytem.push(data)

                }
                this.setState({
                    tableCivil: mytem
                })

            } else {

                const mytem = [];
                for (var i = 0; i < this.state.civilizationClose.length; i++) {
                    var time = this.state.civilizationClose[i]["date(`closed_at`)"].substring(8, 10);
                    if (time.substring(0, 1) === '0') {
                        time = time.substring(1, 2)
                    }
                    var undeal = this.state.civilizationCreate[i].count;
                    var deal = 0;
                    if (this.state.civilizationCreate === undefined) {
                        if (this.state.civilizationClose[i] === undefined) {
                            deal = 0;
                        } else {
                            deal = this.state.civilizationClose[i].count
                        }
                    }

                    let data = {name: time, 已处理: deal, 未处理: undeal}
                    mytem.push(data)
                }
                this.setState({
                    tableCivil: mytem
                })
            }
        }


    }

    render() {

        const status = {
            1: {
                color: '#64ea91',
            },
            2: {
                color: '#f69899',
            },
            3: {
                color: '#8fc9fb',
            },
            4: {
                color: '#f8c82e',
            },
        }

        const cardinal = d3.curveCardinal.tension(0.2)

        const data01 = [
            {alert_info: '违规停车', count: 24},
            {alert_info: '违规开门', count: 45},
            {alert_info: '违规涂画', count: 13},
            {alert_info: '其他', count: 8},
        ]
        const data02 = [
            {alert_info: '群组可能', count: 4},
            {alert_info: '违法排污', count: 2},
            {alert_info: '违法用地', count: 3},
            {alert_info: '违法建筑', count: 8},
        ]

        const illePieChart = {
            pieData: data01,
        }
        const data = [{
            key: '1',
            area_code: 'A区',
            status: '4',
            count: '15',
            civcount:'11',
        }, {
            key: '2',
            area_code: 'B区',
            status: '2',
            count: '9',
            civcount:'5',
        }, {
            key: '3',
            area_code: 'C区',
            status: '1',
            count: '16',
            civcount:'4',
        }, {
            key: '4',
            area_code: 'D区',
            status: '1',
            count: '23',
            civcount:'16',
        }]

        const data03 = [{
            key: '1',
            area_code: 'A区',
            status: '中',
            count: '关闭',
            date: '2017-4-09',
        }, {
            key: '2',
            area_code: 'D区',
            status: '低',
            count: '关闭',
            date: '2017-4-23',
        }, {
            key: '3',
            area_code: 'C区',
            status: '高',
            count: '关闭',
            date: '2017-5-03',
        }, {
            key: '4',
            area_code: 'A区',
            status: '中',
            count: '处理中',
            date: '2017-5-15',
        }, {
            key: '4',
            area_code: 'D区',
            status: '低',
            count: '新建',
            date: '2017-5-16',
        }]

        const data05 = [
            {
                name: 2008,
                已处理: 342,
                未处理: 420,
            }, {
                name: 2009,
                已处理: 221,
                未处理: 123,
            }, {
                name: 2010,
                已处理: 601,
                未处理: 178,
            }, {
                name: 2011,
                已处理: 561,
                未处理: 391,
            }, {
                name: 2012,
                已处理: 329,
                未处理: 230,
            }, {
                name: 2013,
                已处理: 230,
                未处理: 380,
            }, {
                name: 2014,
                已处理: 340,
                未处理: 430,
            }, {
                name: 2015,
                已处理: 430,
                未处理: 120,
            }, {
                name: 2016,
                已处理: 398,
                未处理: 430,
            }, {
                name: 2017,
                已处理: 450,
                未处理: 90,
            }, {
                name: 2018,
                已处理: 570,
                未处理: 290,
            },
        ]

        const ColStyle = {
            textAlign: 'center',
            fontSize: '17px',
        }
        const ColStyleciv = {
            textAlign: 'center',
            fontSize: '17px',
        }
        const ColStyle1 = {
            padding: '20px',
            fontSize: '20px',
            textAlign: 'center',
        }
        const colProps = {
            lg: 12,
            md: 24,
        }
        const bodyStyle = {
            bodyStyle: {
                background: '#fff',
            },
        }
        const tableStyle = {
            bodyStyle: {

                background: '#fff',
                marginTop:3,
            },
        }
        const buttonStyle = {
            color: 'white',
            height: 45,
            width: 180,
            fontSize: 15,
            marginBottom: 10
        }


        const colors = ['#63B8FF', '#D2691E', '#CAE1FF', '#BCEE68', '#BDB76B', '#00CD00']

        return (
            <Layout>
                <Content>
                    <div style={{background: '#fff', padding: 24, margin: 0,}}>
                        <Row gutter={24}>
                            <Col lg={16} md={12}>
                                <div className="custom-image">
                                    <img alt="example"  width="100%" src="http://www.famesmart.com/test/imageScroll/image/locImg.png" />
                                </div>
                                <Card bordered={false} {...bodyStyle} >
                                    <Browser data={data} />
                                </Card>
                            </Col>
                            <Col lg={8} md={24}>
                                <Row lg={4} md={24}>
                                    <Card bordered={true} {...tableStyle}>
                                        <div style={{ width: '100%',  textAlign: 'center' }} >
                                            <a>B区1号摄像头</a>
                                        </div>
                                        <div className="custom-image">
                                            <img alt="example"  width="80%" src="http://www.famesmart.com/test/imageScroll/image/locImg.png" />
                                        </div>
                                        <div style={{ width: '100%',  textAlign: 'right' }} >
                                            <a>..更多</a>
                                        </div>
                                    </Card>
                                </Row>
                                <Row lg={4} md={24}>
                                    <Card bordered={true} {...tableStyle}>
                                        <div style={{ width: '100%',  textAlign: 'center' }} >
                                            <a>B区2号摄像头</a>
                                        </div>
                                        <div className="custom-image">
                                            <img alt="example"  width="80%" src="http://www.famesmart.com/test/imageScroll/image/locImg.png" />
                                        </div>
                                        <div style={{ width: '100%',  textAlign: 'right' }} >
                                            <a>..更多</a>
                                        </div>
                                    </Card>
                                </Row>
                            </Col>
                            <Col lg={12} md={24} style={{paddingTop: '10px'}}>
                                <Badge count={15}>
                                    <Card bordered bodyStyle={{background: color.blue}}
                                          style={{textAlign: 'center', width: '330%'}}>
                                        <h2>待处理五违报警</h2>
                                    </Card>
                                </Badge>
                            </Col>
                            <Col lg={12} md={24} style={{paddingTop: '10px'}}>
                                <Badge count={26}>
                                    <Card bordered bodyStyle={{background: color.yellow}}
                                          style={{textAlign: 'center', width: '330%'}}>
                                        <h2>待处理文明规范</h2>
                                    </Card>
                                </Badge>
                            </Col>
                            <Col lg={12} md={24} style={{paddingTop: '10px'}}>
                                <Card bordered={false} {...bodyStyle}>
                                    <RecentSales data={data03}/>
                                </Card>
                            </Col>
                            <Col lg={12} md={24} style={{paddingTop: '10px'}}>
                                <Card bordered={false} {...bodyStyle}>
                                    <RecentSales data={data03}/>
                                </Card>
                            </Col>
                            <Col lg={24} md={24} style={{paddingTop: '10px'}}>
                                <Card bordered={false} bodyStyle={{
                                    padding: '24px 36px 24px 0',
                                }}>
                                    <Completed data={data05}/>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                </Content>
            </Layout>
        )
    }


}



