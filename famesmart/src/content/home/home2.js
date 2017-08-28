import {Row, Col, Card, Button, Table, Tag, Icon, Badge, Layout} from 'antd'
import React, {Component, PropTypes} from 'react';
import * as d3 from 'd3-shape'
import {color} from '../../utils'

import $ from'jquery'
import appData from './../../assert/Ajax';
import appData_local from './../../assert/Ajax_local';
import RecentSales from '../../components/mainchart/recentSales'
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
		const ws = new WebSocket("ws://testws.famesmart.com");
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

			ws:ws,
			ws_ok : false,
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
        this.ws_setting()

    }

    
	//进行ws先关设置
	ws_setting(){
		let ws = this.state.ws
		ws.onopen = ()=>{
			this.setState({
				ws_ok: true
			})
		};

		ws.onmessage =(evt)=>{
			if ($.trim(evt.data)) {
				let json = JSON.parse(evt.data);
				if (!json){
					return
				}
			}
		}

		ws.onclose = (evt) =>{
			console.log("WebSocketClosed!");
		};

		ws.onerror = (evt) =>{
			console.log("WebSocketError!");
		};
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
                const infratem = [];
                const civiltem = [];
                let n = 1;
                let m = 1;
                for (var i = 0; i < len; i++) {
                    if (countdata[i].alert_type === '五违' && countdata[i].status === '新建') {
                        n = n++;
                        let temcode = countdata[i].area_code
                        let temlvl = countdata[i].alert_lvl
                        let temtime = countdata[i].created_at
                        let temstatus = countdata[i].status
                        let temattach = countdata[i].attachment

                        let data = {key: n , area_code: temcode, lvl: temlvl, status: temstatus,time:temtime,attachment:temattach}
                        infratem.push(data)
                        this.setState({
                            infraNumber: this.state.infraNumber + 1
                        })

                    } else if (countdata[i].alert_type === '文明' && countdata[i].status === '新建') {
                        m = m++;
                        let temcode = countdata[i].area_code
                        let temlvl = countdata[i].alert_lvl
                        let temtime = countdata[i].created_at
                        let temstatus = countdata[i].status
                        let temattach = countdata[i].attachment

                        let data = {key: n , area_code: temcode, lvl: temlvl, status: temstatus,time:temtime,attachment:temattach}
                        civiltem.push(data)

                        this.setState({
                            civilNumber: this.state.civilNumber + 1
                        })
                    }
                }

                this.setState({
                    tableInfra: infratem,
                    tableCivil: civiltem,
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

    _analyzeData = () => {
        if (this.state.flag >= 7) {

            if (this.state.areaInfra.length >= this.state.areaCivil.length) {

                const mytem = [];

                for (var i = 0; i < this.state.areaInfra.length; i++) {
                    var count = this.state.areaInfra[i].count
                    var temarea = this.state.areaInfra[i].area_code
                    var civilcount = 0

                    if (this.state.areaCivil === undefined) {
                        if (this.state.areaCivil[i] === undefined) {
                            civilcount = 0;
                        } else {
                            for(var j = 0; j < this.state.areaCivil.length; j ++){
                                if(temarea == this.state.areaCivil[j].area_code){
                                    civilcount = this.state.areaCivil[j].count
                                }else{
                                    civilcount = 0
                                }
                            }
                        }
                    }
                    let data = {key: i+1 , area_code: temarea, count: count, civcount: civilcount}
                    mytem.push(data)
                }

                this.setState({
                    area: mytem
                })

            } else {
                const mytem = [];
                for (var i = 0; i < this.state.areaCivil.length; i++) {
                    var count = this.state.areaCivil[i].count
                    var temarea = this.state.areaCivil[i].area_code
                    var infracount = 0

                    if (this.state.areaInfra === undefined) {
                        if (this.state.areaInfra[i] === undefined) {
                            infracount = 0;
                        } else {
                            for(var j = 0; j < this.state.areaInfra.length; j ++){
                                if(temarea == this.state.areaInfra[j].area_code){
                                    infracount = this.state.areaInfra[j].count
                                }else{
                                    infracount = 0
                                }
                            }
                        }
                    }
                    let data = {key: i+1 , area_code: temarea, count: infracount, civcount: count}
                    mytem.push(data)
                }
                this.setState({
                    area: mytem
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

        // const data01 = [
        //     {alert_info: '违规停车', count: 24},
        //     {alert_info: '违规开门', count: 45},
        //     {alert_info: '违规涂画', count: 13},
        //     {alert_info: '其他', count: 8},
        // ]
        // const data02 = [
        //     {alert_info: '群组可能', count: 4},
        //     {alert_info: '违法排污', count: 2},
        //     {alert_info: '违法用地', count: 3},
        //     {alert_info: '违法建筑', count: 8},
        // ]
        //

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
        let part_one = '暂无';
        let part_two = '暂无';
        let img_one = 'http://www.famesmart.com/test/imageScroll/image/locImg.png'
        let img_two = 'http://www.famesmart.com/test/imageScroll/image/locImg.png'
        if(this.state.tableInfra.length > 0){
            part_one = this.state.tableInfra[0].area_code;
            if(this.state.tableInfra[0].attachment !== undefined && this.state.tableInfra[0].attachment !== null){
                img_one = this.state.tableInfra[0].attachment;
            }
        }
        if(this.state.tableCivil.length > 0){
            part_two = this.state.tableCivil[0].area_code;
            if(this.state.tableCivil[0].attachment !== undefined && this.state.tableCivil[0].attachment !== null){
                img_two = this.state.tableCivil[0].attachment;
            }
        }
        return (
            <Layout>
                <Content>
                    <div style={{background: '#fff', padding: 24, margin: 0,}}>
                        <Row gutter={24} type="flex">
                            <Col lg={16} md={12}>
                                 {/* <Row style={{height: '50%', background: '#39C5BB'}}  type="flex" justify="center" align="center">
                                    <Col span={8} style={{textAlign:'center'}}>
                                        <text style={{fontSize: '3rem', textAlign:'center', margin: 'auto'}}> 1</text>
                                    </Col>
                                    <Col span={8}>2</Col>
                                    <Col span={8}>3</Col>
                                </Row>  */}
                                 <div>
                                     <img alt="example"  width="100%" src="http://www.famesmart.com/test/imageScroll/image/locImg.png" /> 
                                </div> 
                                <Card bordered={false} {...bodyStyle} >
                                    <Browser data={this.state.area} />
                                </Card>
                            </Col>
                            <Col lg={8} md={24}>
                                <Row lg={4} md={24}>
                                    <Card bordered={true} {...tableStyle}>
                                        <div style={{ width: '100%',  textAlign: 'center' }} >
                                            <a>{part_one}区摄像头报警</a>
                                        </div>
                                        <div className="custom-image">
                                            <img alt="example"  width="80%"  src={img_one} />
                                        </div>
                                        <div style={{ width: '100%',  textAlign: 'right' }} >
                                            <a  onClick={() =>this._jump('five_list','')} >..更多</a>
                                        </div>
                                    </Card>
                                </Row>
                                <Row lg={4} md={24}>
                                    <Card bordered={true} {...tableStyle}>
                                        <div style={{ width: '100%',  textAlign: 'center' }} >
                                            <a>{part_two}区摄像头报警</a>
                                        </div>
                                        <div className="custom-image">
                                            <img alt="example"  width="80%" src={img_two} />
                                        </div>
                                        <div style={{ width: '100%',  textAlign: 'right' }} >
                                            <a  onClick={() =>this._jump('civilization_list','')} >..更多</a>
                                        </div>
                                    </Card>
                                </Row>
                            </Col>
                            <Col lg={12} md={24} style={{paddingTop: '10px'}}>
                                <Badge count={this.state.infraNumber}>
                                    <Card bordered bodyStyle={{background: color.blue}}
                                          style={{textAlign: 'center', width: '330%'}}>
                                        <h2>待处理五违报警</h2>
                                    </Card>
                                </Badge>
                            </Col>
                            <Col lg={12} md={24} style={{paddingTop: '10px'}}>
                                <Badge count={this.state.civilNumber}>
                                    <Card bordered bodyStyle={{background: color.yellow}}
                                          style={{textAlign: 'center', width: '330%'}}>
                                        <h2>待处理文明规范</h2>
                                    </Card>
                                </Badge>
                            </Col>
                            <Col lg={12} md={24} style={{paddingTop: '10px'}}>
                                <Card bordered={false} {...bodyStyle}>
                                    <RecentSales data={this.state.tableInfra}/>
                                </Card>
                            </Col>
                            <Col lg={12} md={24} style={{paddingTop: '10px'}}>
                                <Card bordered={false} {...bodyStyle}>
                                    <RecentSales data={this.state.tableCivil}/>
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



