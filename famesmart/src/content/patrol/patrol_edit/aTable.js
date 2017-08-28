import React, {PropTypes, Component} from 'react';
import {
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
    DatePicker,
    InputNumber,
    AutoComplete
} from 'antd';
// import Selects from './aCell';
import appData from './../../../assert/Ajax'
import appData_local from './../../../assert/Ajax_local';
import moment from 'moment';
import '../../../App.css'

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const {TextArea} = Input;
// const dateFormat = 'YYYY-MM-DD h:mm:ss';
// moment().format('MMMM Do YYYY, h:mm:ss a');


class pointTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            loc_description: '',
            audit_time: '',

            disable: true,
        };
        this.userMess;
        this.Router;
        this.mess = null;
        this.TokenMess = '';
    }

    componentWillMount() {
        this.Router = this.props.Router;
        this.mess = this.props.message;

        let mess = this.props.message.message

        if (mess !== undefined) {

            this.setState({
                id: mess.id,
                loc_description: mess.loc_description,
                audit_time: mess.audit_time,
            })
        }
        appData_local._Storage('get', "Token", (res) => {
            this.TokenMess = res
        })
    }

    _jump(nextPage, mess) {

        if (nextPage == 'back') {
            this.props.Router(this.props.message.historyPage, mess, this.props.message.nextPage)
        } else {
            this.props.Router(nextPage, mess, this.props.message.nextPage)
        }
    }

    //文本
    _input(name, e) {
        let value = e.target.value;
        if (name === 'id') {
            let value = e.target.value;
            this.setState({
                id: value
            })
        } else if (name === 'loc_description') {
            this.setState({
                loc_description: value
            })
        } else if (name === 'audit_time') {
                this.setState({
                    disable: false,
                    audit_time: value
                })

        }
    }


    //提交创建新活动
    _add_active() {
        let TokenMess = this.TokenMess;
        let afteruri = 'device/set_audit'
        let body = {

            "device_id": this.state.id,
            "audit_time": this.state.audit_time,

        }
        console.log('id:' + this.state.id + '|audit_time:' + this.state.audit_time)
        appData_local._dataPost(afteruri, body, (res) => {
            console.log(res)
            if (res.result >= 0) {
                console.log("11111111111111")
                this._jump('back')
            } else {

            }
        }, TokenMess)
    }

    render() {
        const {getFieldDecorator,} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 8},
            wrapperCol: {span: 7},
        };
        return (
            <div style={{background: '#fff', padding: 24, margin: 0, minHeight: 80}}>
                <Form style={{paddingTop: '50px'}}>

                    <FormItem
                        {...formItemLayout}
                        label="门禁ID">
                        {getFieldDecorator('id', {
                            initialValue: this.state.id
                        })(
                            <Input onChange={this._input.bind(this, "id")} disabled/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="巡更位置">
                        {getFieldDecorator('loc_description', {
                            initialValue: this.state.loc_description
                        })(
                            <Input onChange={this._input.bind(this, "loc_description")} disabled/>
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="计划时间">
                        {getFieldDecorator('audit_time', {
                            initialValue: this.state.audit_time
                        })(
                            <Input onChange={this._input.bind(this, "audit_time")}/>
                        )}
                    </FormItem>

                </Form>

                <Row type="flex" justify="end" gutter={1}>
                    <Col span={2}>
                        <Button onClick={() => this._add_active()} disabled={this.state.disable}>提交</Button>
                    </Col>
                    <Col span={2}>
                        <Button onClick={() => this._jump('back')}>取消</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

const WrappedpointTable = Form.create()(pointTable);
export default WrappedpointTable;