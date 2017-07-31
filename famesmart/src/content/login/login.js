

import React,{Component} from 'react';
import styles from "./login.css";
import appData from "../../assert/Ajax";
import {
    Row,
    Form,
    Icon, 
    Input, 
    Alert,
    Button,
    Checkbox
} from 'antd';
import '../../App.css'

const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            error:false,
        }
    }
    componentDidMount() {
        console.log(this.props)
    }
    handleSubmit (e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let afteruri = 'vcity/login'
                //root  234
                let body = {
                    "user_id":values.userName,
                    "password":values.password
                }
                appData._dataPost(afteruri, body, (res) => {
                    if(res === undefined || !res.length){
                        this.setState({
                            error: true
                        })
                    } else {
                        appData._Storage('set',"userMess",res[0])
                        this.props.Router('home')

                    }
                })
            }
        });
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

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Row type="flex" justify='center' align="center" className="login-box">
                <Form onSubmit={this.handleSubmit.bind(this)} className="login-form"  >
                    <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: '请输入用户名！' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />}className="login-form-input" placeholder="用户名" />
                    )}
                    </FormItem>
                    
                    <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码！' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} className="login-form-input" type="password" placeholder="密码" />
                    )}
                    </FormItem>

                    <FormItem>
                    {/* {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )} */}
                    {/* <a className="login-form-forgot" href="">Forgot password</a> */}
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                    </Button>
                    {/* Or <a href="">register now!</a> */}
                    </FormItem>
                    {this._errorInfo()}
                </Form>
        </Row>
        );
    }
}

const WrappedLogin = Form.create()(Login);
export default WrappedLogin;
