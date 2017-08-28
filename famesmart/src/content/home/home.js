import {Row, Col, Card, Button, Table, Tag, Icon,Layout} from 'antd'
import React, {Component, PropTypes} from 'react';
import * as d3 from 'd3-shape'

import appData from './../../assert/Ajax';
import appData_local from './../../assert/Ajax_local';
import FivePieChart from '../../components/mainchart/fiveChart'
// import oneChart from '../../components/mainchart/oneChart'
// import twoChart from '../../components/mainchart/twoChart'
// import browser from '../../components/browser/browser'

import styles from '../../components/browser/browser.less'
import {
    LineChart, AreaChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart,
    Pie,
    Cell,
    Sector,
    Legend,
} from 'recharts'

const {Content} =   Layout
const CustomizedDot = React.createClass({
    render () {
        const {cx, cy, stroke, payload, value} = this.props;

        if (value >= 0) {
            return (
                <svg x={cx - 5} y={cy - 5} width={10} height={10} fill="green" viewBox="0 0 1024 1024">
                    <path
                        d="M512 1009.984c-274.912 0-497.76-222.848-497.76-497.76s222.848-497.76 497.76-497.76c274.912 0 497.76 222.848 497.76 497.76s-222.848 497.76-497.76 497.76zM340.768 295.936c-39.488 0-71.52 32.8-71.52 73.248s32.032 73.248 71.52 73.248c39.488 0 71.52-32.8 71.52-73.248s-32.032-73.248-71.52-73.248zM686.176 296.704c-39.488 0-71.52 32.8-71.52 73.248s32.032 73.248 71.52 73.248c39.488 0 71.52-32.8 71.52-73.248s-32.032-73.248-71.52-73.248zM772.928 555.392c-18.752-8.864-40.928-0.576-49.632 18.528-40.224 88.576-120.256 143.552-208.832 143.552-85.952 0-164.864-52.64-205.952-137.376-9.184-18.912-31.648-26.592-50.08-17.28-18.464 9.408-21.216 21.472-15.936 32.64 52.8 111.424 155.232 186.784 269.76 186.784 117.984 0 217.12-70.944 269.76-186.784 8.672-19.136 9.568-31.2-9.12-40.096z"/>
                </svg>
            );
        }

        return (
            <svg x={cx - 10} y={cy - 10} width={20} height={20} fill="green" viewBox="0 0 1024 1024">
                <path
                    d="M517.12 53.248q95.232 0 179.2 36.352t145.92 98.304 98.304 145.92 36.352 179.2-36.352 179.2-98.304 145.92-145.92 98.304-179.2 36.352-179.2-36.352-145.92-98.304-98.304-145.92-36.352-179.2 36.352-179.2 98.304-145.92 145.92-98.304 179.2-36.352zM663.552 261.12q-15.36 0-28.16 6.656t-23.04 18.432-15.872 27.648-5.632 33.28q0 35.84 21.504 61.44t51.2 25.6 51.2-25.6 21.504-61.44q0-17.408-5.632-33.28t-15.872-27.648-23.04-18.432-28.16-6.656zM373.76 261.12q-29.696 0-50.688 25.088t-20.992 60.928 20.992 61.44 50.688 25.6 50.176-25.6 20.48-61.44-20.48-60.928-50.176-25.088zM520.192 602.112q-51.2 0-97.28 9.728t-82.944 27.648-62.464 41.472-35.84 51.2q-1.024 1.024-1.024 2.048-1.024 3.072-1.024 8.704t2.56 11.776 7.168 11.264 12.8 6.144q25.6-27.648 62.464-50.176 31.744-19.456 79.36-35.328t114.176-15.872q67.584 0 116.736 15.872t81.92 35.328q37.888 22.528 63.488 50.176 17.408-5.12 19.968-18.944t0.512-18.944-3.072-7.168-1.024-3.072q-26.624-55.296-100.352-88.576t-176.128-33.28z"/>
            </svg>
        );
    }
});




export default class home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            comm_name: '',
            infraNumber: 0,
            civiNumber: 0,
            activeIndex: 0,
            activeIndex2: 0,
            infraction:[],
            area:[],
            infractionCreate:[],
            infractionClose:[],
            civilizationCreate:[],
            civilizationClose:[],
            flag:0,
            tableInfra:[],
            tableCivil:[],

        }
        this.Router;
        this.mess = null;
        this.TokenMess = '';

    }


    componentWillMount() {
        this.Router = this.props.Router;
        this.mess = this.props.message;
        this.setState.flag =0
        appData_local._Storage('get',"Token",(res) =>{
            this.TokenMess = res
            this._getEvent('area')
            this._getEvent('alert_info')
            this._getEvent('infraction_create')
            this._getEvent('infraction_close')
            this._getEvent('civilization_create')
            this._getEvent('civilization_close')
            this._getEvent('count')
        })

    }


    _jump(nextPage,mess){
        this.Router(nextPage,mess,this.mess.nextPage)
    }

    //获取后台信息
    _getEvent(text){

        let TokenMess = this.TokenMess;
        if (text === 'area'){
            let afteruri = 'comm_alerts/statistics';
            let body = {
                "status_column":"open", "group":["area_code"]
            }
            appData_local._dataPost(afteruri,body,(res) => {
                this.setState({
                    area:res.statistics,
                    flag:this.state.flag+1
                })
                this._analyzeData()
            },TokenMess)
        }else if(text === 'alert_info'){
            let afteruri = 'comm_alerts/statistics';
            let body = {
                "group":["alert_type","alert_info"]
            }
            appData_local._dataPost(afteruri,body,(res) => {
                this.setState({
                    infraction:res.statistics,
                    flag:this.state.flag+1
                })
                this._analyzeData()
            },TokenMess)
        }else if(text === 'count'){
            let afteruri = 'comm_alerts/search';
            let body = {

            }
            appData_local._dataPost(afteruri,body,(res) => {
                const countdata = res.data
                let len = res.data.length
                for (var i = 0 ; i < len; i++){
                    if(countdata[i].alert_type ==='五违' && countdata[i].status === '新建'){
                        this.setState({
                            infraNumber:this.state.infraNumber+1
                        })
                    }else if(countdata[i].alert_type ==='文明' && countdata[i].status === '新建'){
                        this.setState({
                            civilNumber:this.state.civilNumber+1
                        })
                    }
                }

                this.setState({
                    flag:this.state.flag+1
                })
                this._analyzeData()
            },TokenMess)
        }else if(text === 'infraction_create'){
            let afteruri = 'comm_alerts/statistics';
            let body = {
                "scope":{"alert_type":"五违"},   "timestamp_column":"created_at",   "unit":"day"
            }
            appData_local._dataPost(afteruri,body,(res) => {
                this.setState({
                    infractionCreate:res.statistics,
                    flag:this.state.flag+1
                })
                this._analyzeData()
            },TokenMess)
        }else if(text === 'infraction_close'){
            let afteruri = 'comm_alerts/statistics';
            let body = {
                "scope":{"alert_type":"五违"},   "timestamp_column":"closed_at",   "unit":"day"
            }
            appData_local._dataPost(afteruri,body,(res) => {
                this.setState({
                    infractionClose:res.statistics,
                    flag:this.state.flag+1
                })
                this._analyzeData()
            },TokenMess)
        }else if(text === 'civilization_create'){
            let afteruri = 'comm_alerts/statistics';
            let body = {
                "scope":{"alert_type":"文明"},   "timestamp_column":"created_at",   "unit":"day"
            }
            appData_local._dataPost(afteruri,body,(res) => {
                this.setState({
                    civilizationCreate:res.statistics,
                    flag:this.state.flag+1
                })
                this._analyzeData()
            },TokenMess)
        }else if(text === 'civilization_close'){
            let afteruri = 'comm_alerts/statistics';
            let body = {
                "scope":{"alert_type":"文明"},   "timestamp_column":"closed_at",   "unit":"day"
            }
            appData_local._dataPost(afteruri,body,(res) => {

                this.setState({
                    civilizationClose:res.statistics,
                    flag:this.state.flag+1
                })
                this._analyzeData()
            },TokenMess)
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
        if (this.state.flag >= 7){

            if (this.state.infractionCreate.length >= this.state.infractionClose.length){

                const mytem = [];
                for(var i = 0 ; i < this.state.infractionCreate.length ; i++){
                    var time = this.state.infractionCreate[i]["date(`created_at`)"].substring(8,10);
                    if(time.substring(0,1)  === '0'){
                        time = time.substring(1,2)
                    }
                    var undeal = this.state.infractionCreate[i].count;
                    var deal = 0;
                    if(this.state.infractionClose === undefined){
                        if (this.state.infractionClose[i]  === undefined){
                            deal = 0;
                        }else{
                            deal = this.state.infractionClose[i].count
                        }
                    }

                    let data = {name:time,已处理:deal,未处理:undeal}
                    mytem.push(data)

                }
                this.setState({
                    tableInfra:mytem
                })

            }else{

                const mytem = [];
                for(var i = 0 ; i < this.state.infractionClose.length ; i++){
                    var time = this.state.infractionClose[i]["date(`closed_at`)"].substring(8,10);
                    if(time.substring(0,1)  === '0'){
                        time = time.substring(1,2)
                    }
                    var undeal = this.state.infractionCreate[i].count;
                    var deal = 0;
                    if(this.state.infractionCreate === undefined){
                        if (this.state.infractionClose[i]  === undefined){
                            deal = 0;
                        }else{
                            deal = this.state.infractionClose[i].count
                        }
                    }

                    let data = {name:time,已处理:deal,未处理:undeal}
                    mytem.push(data)
                }
                this.setState({
                    tableInfra:mytem
                })
            }

            if (this.state.civilizationCreate.length >= this.state.civilizationClose.length){

                const mytem = [];
                for(var i = 0 ; i < this.state.civilizationCreate.length ; i++){
                    var time = this.state.civilizationCreate[i]["date(`created_at`)"].substring(8,10);
                    if(time.substring(0,1)  === '0'){
                        time = time.substring(1,2)
                    }
                    var undeal = this.state.civilizationCreate[i].count;
                    var deal = 0;
                    if(this.state.civilizationClose === undefined){
                        if (this.state.civilizationClose[i]  === undefined){
                            deal = 0;
                        }else{
                            deal = this.state.civilizationClose[i].count
                        }
                    }

                    let data = {name:time,已处理:deal,未处理:undeal}
                    mytem.push(data)

                }
                this.setState({
                    tableCivil:mytem
                })
            }else{

                const mytem = [];
                for(var i = 0 ; i < this.state.civilizationClose.length ; i++){
                    var time = this.state.civilizationClose[i]["date(`closed_at`)"].substring(8,10);
                    if(time.substring(0,1)  === '0'){
                        time = time.substring(1,2)
                    }
                    var undeal = this.state.civilizationCreate[i].count;
                    var deal = 0;
                    if(this.state.civilizationCreate === undefined){
                        if (this.state.civilizationClose[i]  === undefined){
                            deal = 0;
                        }else{
                            deal = this.state.civilizationClose[i].count
                        }
                    }

                    let data = {name:time,已处理:deal,未处理:undeal}
                    mytem.push(data)
                }
                this.setState({
                    tableCivil:mytem
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
        const data = [
            {
                name: '01',
                已处理: 60,
                未处理: 8,
            }, {
                name: '02',
                已处理: 44,
                未处理: 3,

            }, {
                name: '03',
                已处理: 45,
                未处理: 34,
            }, {
                name: '4',
                已处理: 27,
                未处理: 39,
            }, {
                name: '5',
                已处理: 18,
                未处理: 48,
                amt: 21,
            }, {
                name: '6',
                已处理: 23,
                未处理: 38,
            }, {
                name: '7',
                已处理: 33,
                未处理: 12,
            }, {
                name: '8',
                已处理: 68,
                未处理: 33,
            },
            {
                name: '9',
                已处理: 31,
                未处理: 13,
            },
            {
                name: '10',
                已处理: 67,
                未处理: 13,
            },
            {
                name: '11',
                已处理: 21,
                未处理: 1,
            },
            {
                name: '12',
                已处理: 14,
                未处理: 3,
            },
            {
                name: '13',
                已处理: 34,
                未处理: 43,
            },
            {
                name: '14',
                已处理: 38,
                未处理: 7,
            },
            {
                name: '15',
                已处理: 59,
                未处理: 13,
            },
            {
                name: '16',
                已处理: 17,
                未处理: 13,
            },
            {
                name: '17',
                已处理: 68,
                未处理: 10,
            },
            {
                name: '18',
                已处理: 34,
                未处理: 43,
            },
            {
                name: '19',
                已处理: 34,
                未处理: 43,
            },
            {
                name: '20',
                已处理: 34,
                未处理: 43,
            },
            {
                name: '21',
                已处理: 34,
                未处理: 43,
            },
            {
                name: '22',
                已处理: 34,
                未处理: 43,
            },
            {
                name: '23',
                已处理: 34,
                未处理: 43,
            },
            {
                name: '24',
                已处理: 34,
                未处理: 43,
            },
            {
                name: '25',
                已处理: 34,
                未处理: 43,
            },
            {
                name: '26',
                已处理: 34,
                未处理: 43,
            },
            {
                name: '27',
                已处理: 34,
                未处理: 43,
            }

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
                height:150,
                background: '#fff',
            },
        }
        const buttonStyle = {
            color: 'white',
            height:45,
            width:180,
            fontSize:15,
            marginBottom:10
        }

        const columns = [
            {
                title: 'area_code',
                dataIndex: 'area_code',
                className: styles.name,
                render: (text) =>
                    <p className={styles.content}>{text}区未处理事件</p>,
            }, {
                title: 'count',
                dataIndex: 'count',
                className: styles.percent,
                render: (text, it) => <Tag color={status[2].color}>{text}</Tag>,
            },
        ];

        const renderActiveShape = (propsR) => {
            const RADIAN = Math.PI / 180
            const {
                cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
                fill, percent, value, name
            } = propsR
            const sin = Math.sin(-RADIAN * midAngle)
            const cos = Math.cos(-RADIAN * midAngle)
            const sx = cx + (outerRadius + 10) * cos
            const sy = cy + (outerRadius + 10) * sin
            const mx = cx + (outerRadius + 30) * cos
            const my = cy + (outerRadius + 30) * sin
            const ex = mx + (cos >= 0 ? 1 : -1) * 22
            const ey = my
            const textAnchor = cos >= 0 ? 'start' : 'end'

            const radius = innerRadius + (outerRadius - innerRadius) * 0.5
            const x = cx + radius * Math.cos(-midAngle * RADIAN)
            const y = cy + radius * Math.sin(-midAngle * RADIAN)

            return (
                <g>
                    <Sector
                        cx={cx}
                        cy={cy}
                        innerRadius={innerRadius}
                        outerRadius={outerRadius}
                        startAngle={startAngle}
                        endAngle={endAngle}
                        fill={fill}
                    />
                    <Sector
                        cx={cx}
                        cy={cy}
                        startAngle={startAngle}
                        endAngle={endAngle}
                        innerRadius={outerRadius + 6}
                        outerRadius={outerRadius + 10}
                        fill={fill}
                    />
                    <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
                    <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
                    <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor}
                          fill="#333">{`${name}：${value}起`}</text>
                    <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                        {`(占比：${(percent * 100).toFixed(0)}%)`}
                    </text>
                    <text x={x} y={y} fill="white" textAnchor={textAnchor} dominantBaseline="central">
                        {`${(percent * 100).toFixed(0)}%`}
                    </text>
                </g>
            )
        }
        const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
            const RADIAN = Math.PI / 180;
            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
            const x  = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy  + radius * Math.sin(-midAngle * RADIAN);

            return (
                <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
                    {`${(percent * 100).toFixed(0)}%`}
                </text>
            );
        };

        const colors = ['#63B8FF', '#D2691E', '#CAE1FF', '#BCEE68', '#BDB76B', '#00CD00']

        return (
        <Layout>
            <Content>
            <div style={{background: '#fff', padding: 24, margin: 0,}}>
                <Row gutter={32}>
                    <Row gutter={16}>
                        <Col span={8} style={ColStyle}>
                            <Button type="primary" onClick={() =>this._jump('five_list','')} style={buttonStyle}>{this.state.infraNumber}个待处理的五违上报</Button>
                        </Col>
                        <Col span={8} style={ColStyle}>
                            <Button type="primary"  onClick={() =>this._jump('report_list','')} style={buttonStyle}>小区情况汇总</Button>
                        </Col>
                        <Col span={7} offset={1} style={ColStyleciv}>
                            <Button type="primary"  onClick={() =>this._jump('civilization_list','')} style={buttonStyle}>{this.state.civiNumber}个待处理文明规范</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} style={ColStyle}>
                            <div></div>
                        </Col>
                    </Row>
                    <Col {...colProps}>
                        <Card title={<span><Icon type="area-chart"/><span>上月本小区未处理和已处理的五违事件</span></span>}>
                            <LineChart width={600} height={300} data={this.state.tableInfra}
                                       margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <Tooltip/>
                                <Legend />
                                <Line type="monotone" dataKey="已处理" stroke="#8884d8" dot={<CustomizedDot />}/>
                                <Line type="monotone" dataKey="未处理" stroke="#82ca9d"/>
                            </LineChart>
                        </Card>
                    </Col>
                    <Col {...colProps}>
                        <Card title={<span><Icon type="area-chart"/><span>上个月本小区未处理和已处理的文明事件</span></span>}>
                            <AreaChart data={this.state.tableCivil} width={600} height={300} margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}>
                                <XAxis dataKey="name"/>
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3"/>
                                <Tooltip />
                                <Legend verticalAlign="top" align="right" height={30}/>
                                <Area type="monotone" dataKey="已处理" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3}/>
                                <Area type={cardinal} dataKey="未处理" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3}/>
                            </AreaChart>
                        </Card>
                    </Col>
                    <Col {...colProps}>
                        <Card title={<span><Icon type="pie-chart"/><span>上个月本小区五违占的比例</span></span>}>
                            {this.state.infraction.length > 0 ?
                                <PieChart width={500} height={250} onMouseEnter={this.onPieEnter}>
                                    <Legend verticalAlign="top" align="right" height={30}/>
                                    <Pie
                                        activeIndex={this.state.activeIndex}
                                        activeShape={renderActiveShape}
                                        data={this.state.infraction}
                                        cx={230}
                                        cy={120}
                                        outerRadius={80}
                                        fill="#8884d8"
                                    >
                                        {
                                            this.state.infraction.map((entry, index) => (
                                                <Cell key={index} name={entry.alert_info} value={entry.count}
                                                      fill={colors[index % colors.length]}/>
                                            ))
                                        }
                                    </Pie>
                                </PieChart>
                                :
                                <div>

                                </div>
                            }
                        </Card>
                    </Col>
                    <Col {...colProps}>
                        <Card title={<span><Icon type="pie-chart"/><span>上个月本小区其他违规比例</span></span>}>
                            <PieChart width={500} height={250} onMouseEnter={this.onPieEnter2}>
                                <Legend verticalAlign="top" align="right" height={30}/>
                                <Pie
                                    activeIndex={this.state.activeIndex2}
                                    activeShape={renderActiveShape}
                                    data={data01}
                                    cx={230}
                                    cy={120}
                                    outerRadius={80}
                                    fill="#8884d8"
                                >
                                    {
                                        data01.map((entry, index) => (
                                            <Cell key={index} name={entry.alert_info} value={entry.count}
                                                  fill={colors[index % colors.length]}/>
                                        ))
                                    }
                                </Pie>
                            </PieChart>
                        </Card>
                    </Col>
                    {/*<Col {...colProps}>*/}
                        {/*<Card title="上个月本小区其他违规比例">*/}
                            {/*<FivePieChart {...illePieChart} />*/}
                        {/*</Card>*/}
                    {/*</Col>*/}
                    <Col lg={8} md={24} style={{paddingTop: '10px'}}>
                        <Card bordered={false} {...bodyStyle}>
                            <Table pagination={false} showHeader={false} columns={columns} rowKey={(record, key) => key}
                                   dataSource={this.state.area}/>
                        </Card>
                    </Col>
                </Row>
            </div>
            </Content>
            </Layout>
        )
    }


}



