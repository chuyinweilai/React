

import React,{Component} from 'react';
import styles from "./login.css";
import {
    Row,
    Col,
    Form,
    Icon, 
    Input, 
    Alert,
    Button,
    Select,
    Checkbox
} from 'antd';
import '../../App.css'
import appData from "../../assert/Ajax";
import appData_local from '../../assert/Ajax_local';
const Option = Select.Option
const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            loginType: 'server',
            error:false,
        }
    }
    
    handleSubmit (e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if((/^1(3|4|5|7|8)\d{9}$/.test(values.userName))){ 
                if (!err) {
                    let afteruri = 'auth/login'
                    let body = {
                        "mobile":values.userName,
                        "password":values.password
                    }
                    appData_local._dataPost(afteruri, body, (res) => {
                        if(res === undefined || !res.token.length  || res.user.token >= 7){
                            this.setState({
                                error: true
                            })
                        } else {
                            appData._Storage('set',"Token",res.token)
                            appData._Storage('set',"userMess",res.user)
                            appData._Storage('set',"LoginType",'server')
                            this.props.Router('IC_cards_resident_list')
                        }
                    })
                }
            } else {
                if (!err) {
                    let afteruri = 'vcity/login'
                    let body = {
                        "user_id":values.userName,
                        "password":values.password
                    }
                    appData._dataPost(afteruri, body, (res) => {
                        if(res === undefined || !res.length  || res[0].auth_lvl >= 7){
                            this.setState({
                                error: true
                            })
                        } else {
                            appData._Storage('set',"userMess",res[0])
                            appData._Storage('set',"Token",'')
                            appData._Storage('set',"LoginType",'cloude')
                            this.props.Router('home')
                        }
                    })
                }
            }
        })
    }

    //账号不存在返回提示
    _errorInfo(){
        if(this.state.error){
            return (
                <Alert description="账号或密码错误" type="error" closable onClose={()=>{this.setState({error: false})}}/>
            )
        } else {
            return null
        }
    }

    _handleChange(key){
        this.setState({
            loginType: key
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login-box">
                <h1 style={{textAlign: 'center', fontSize: 34, color: 'white'}}>智慧社区管理平台</h1>
                <Row type="flex" justify='center' align="center">
                    <Form onSubmit={this.handleSubmit.bind(this)} className="login-form"  >
                        <FormItem>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: '请输入用户名！' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ fontSize: 18 }} />}className="login-form-input" placeholder="用户名" />
                        )}
                        </FormItem>
                        
                        <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码！' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ fontSize: 18 }} />} className="login-form-input" type="password" placeholder="密码" />
                        )}
                        </FormItem>

                        <FormItem>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </FormItem>
                        {this._errorInfo()}
                    </Form>
                </Row>
                {/* <Row type="flex" justify='center' align="center">
                    <text style={{height: '26px', lineHeight: '26px', margin: '0 10px', color: 'white', fontSize: 12}}>  
                        请选择登录平台
                    </text>
                    <Select
                        style={{width: 100, height: '26px'}}
                        defaultValue = "server"
                        onChange={this._handleChange.bind(this)}
                        >
                        <Option key="cloude">服务器</Option>
                        <Option key="server">局域网</Option>
                    </Select>
                </Row> */}
            </div>
        );
    }
}

const WrappedLogin = Form.create()(Login);
export default WrappedLogin;
