
import React, { PropTypes,Component } from 'react';
import {
    Table,
    Col,
	Row,
	Icon,
	Form,
	Input,
	Select,
	Button,
	Tooltip,
	Cascader,
	Checkbox,
    Pagination,
	DatePicker,
	InputNumber,
	AutoComplete
} from 'antd';
// import Selects from './aCell';
import appData from './../../../assert/Ajax';
import appData_local from './../../../assert/Ajax_local';
import moment from 'moment';

import '../../../App.css'

const FormItem = Form.Item;
const { Option, OptGroup } = Select
const AutoCompleteOption = AutoComplete.Option;
const { TextArea } = Input;

export default class pointTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name:'',
			mobile: 0,
			gender:[],
			type_name:'',
			type:'',
			vol_tag:'',
			comm_name: "",
			apt_info: "",
			floor: "",
			room: "",
			email: 0,
			occupation: '',
			ic_card: '',

			disable: true,
		};

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
                title: '门禁ID',
                dataIndex: 'id',
            },
            {
                colSpan: 1,
                title: '门禁位置',
                dataIndex: 'loc_description',
            },
            {
                colSpan: 1,
                title: '最近一次进入时间',
                dataIndex: 'attempted_at',
            },
            {
                colSpan:1,
                title: '卡号',
                dataIndex: 'access_number',
            },
            {
                colSpan: 1,
                title: '归属业主楼号',
                render:(text, record)=>{
                    var str_number = record.owner_code.split('-')[0]
                    return (
                        <text>{str_number}</text>
                    )
                }
            },
            {
                colSpan: 1,
                title: '归属业主楼号房间号',
                dataIndex:'owner_code',
                // render:(text, record)=>{
                //     var room_number = record.owner_code.split('-')[1] + '-' + record.owner_code.split('-')[2]
                //     return (
				// 		<Row type="flex" justify="center">
				// 			<text>{room_number}</text>
				// 		</Row>
                //     )
                // }
            },
            {
                colSpan: 1,
                title: '卡号类型（长期卡/临时卡）',
                dataIndex: 'type',
            }
        ];

        this.Router;
        this.mess = null;
        this.TokenMess = '';
	}

	componentWillMount(){
		this.Router = this.props.Router;
        appData_local._Storage('get',"Token",(res) =>{
            this.TokenMess = res
            this._getEvent()
        })

	}

    //获取后台信息
    _getEvent(){

        this.mess = this.props.message;
        let mess = this.props.message.message
        let TokenMess = this.TokenMess;
        let userMess = this.userMess;
        let afteruri = 'entrance_records/search';
        let searchstr = '"device_id":'+'"'+mess.id+'"'
        let body = {
            "owner_group":"居民",
            "per_page":20,
            "device_id":mess.id
        }
        appData_local._dataPost(afteruri,body,(res) => {
            let data = res.data
            let pageSum = Math.ceil(res.total/res.per_page)
            let len = data.length;
            this.setState({
                total:res.total,
                dataSource: data,
                count:len,
            })
        },TokenMess)
    }

    //分页器activity/list?page=num
    _pageChange(pageNumber){
        let userMess = this.userMess;
        let afteruri = 'users?page=' + pageNumber ;
        // let body = {
        // 	 "comm_code": userMess.comm_code
        // }
        appData._dataGet(afteruri,(res) => {
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

    _jump(nextPage,mess){
        if(nextPage == 'back'){
            this.props.Router(this.props.message.historyPage,mess,this.props.message.nextPage)
        }else {
            this.props.Router(nextPage,mess,this.props.message.nextPage)
        }
    }



    //操作栏功能
    _action(type,mess){
        if(type === "change"){
            //this._jump('IOcount_detial', mess)
        }else if(type === "cancel"){

        }
    }

	//返回上一页
	_add_back(){
        this._jump('back')
	}

	render() {

        const { dataSource } = this.state;
        let columns = this.columns;
        const lableS = {
            color: '#00A0E9',
            fontSize: '15px',
        }
        
        return (
            <div style={{ background: '#fff', padding: 24, margin: 0, minHeight: 80 }}>
                <Row type="flex" justify="space-between" gutter={1}>
                    <Col lg={8} md={12} sm={16} xs={24} style={{ marginBottom: 16 }}>

                        <Button size="large" type="primary" onClick={() => this._add_back()}>返回</Button>
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
            </div>
        );
	}
}
