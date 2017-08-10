import React,{Component} from 'react'
import{
	Row,
	Col,
	Layout,
	Input,
	Button,
} from 'antd'
import $ from 'jquery';
import './index.css'
const { Content } = Layout;
const awidth =  $("#coordinate-box").width()
const aheight =  $("#coordinate-box").height()

export default class coordinate extends Component{
	constructor(props){
		super(props);
		const ws = new WebSocket("ws://testws.famesmart.com");

		this.state = {
			G_x: 0,
			G_y: 0,
			W_x: 0,
			W_y: 0,
			G_intval: 2000,
			ws_ok : false,
			ws:ws,

			left:0,
			bottom:0,

			W_w:0,
			W_h:0,
			W_r: 50,
			W_x_s: 300,
			W_y_s: 300,
			W_r_s:50,
			W_text:'',
			G_intval_s: '',
		}
		this.G_alarm = 0;
	}

	componentDidMount(){
		let bwidth =  $("#coordinate-box").width()
		let bheight =  $("#coordinate-box").height()
		let W_x_s = bwidth*(this.state.W_x_s/500);
		let W_y_s = bheight*(this.state.W_y_s/500);

		this.setState({
			W_x: W_x_s,
			W_y: W_y_s,
			W_w: bwidth*(this.state.W_r/500),
			W_h: bwidth*(this.state.W_r/500),
		})

		this.ws_setting()
		this.display()
	}

	//进行ws先关设置
	ws_setting(){
		let ws = this.state.ws
		ws.onopen = ()=>{
			this.setState({
				ws_ok: true
			})
			this.login();
		};

		ws.onmessage =(evt)=>{
			if ($.trim(evt.data)) {
				let json = JSON.parse(evt.data);
				if (!json){
					return
				}
				switch (json.type){
					case "notice":
						break;
					case "xymsg":
						this.display()
						this.alarm()
						if (this.G_alarm > 0) this.G_alarm++;
						if (this.G_alarm > 10) this.G_alarm = 0;
						this.setState({
							G_x: json.con_x,
							G_y: json.con_y,
						})
					break;
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

	sendmessage(str){
		let ws_ok = this.state.ws_ok
		if(ws_ok){
			this.state.ws.send(str);
		}
	}

	display(){
		let awidth =  $("#coordinate-img").width()
		let aheight =  $("#coordinate-img").height()
		let bwidth =  $("#coordinate-box").width()
		let bheight =  $("#coordinate-box").height()
		let G_x = (this.state.G_x/500)* bwidth
		let G_y = (this.state.G_y/500)*bheight
		this.setState({
			left: G_x - awidth/2,
			bottom: G_y - aheight/2
		})
	}


    alarm() {
		let G_x = this.state.G_x;
		let G_y = this.state.G_y;
		let W_x = this.state.W_x;
		let W_y = this.state.W_y;
		let result = ((G_x - W_x)*(G_x - W_x))+((G_y - W_y)*(G_y - W_y))
        if ((Math.sqrt(result) < 50)) {
            if (this.G_alarm == 0) {
                let NowTime = new Date().toLocaleTimeString();
				let msg = NowTime + "  报警！"
				this.setState({
					W_text: msg
				})
				
                console.log("发送报警");
                this.send_alarm();
                this.G_alarm = 1;
            };
        };
    }

    send_alarm() {
        $.post('http://www.famesmart.com/famecloud/dev_intf.php', '{"cmd": 1003, "alarm_info": "3区报警-违规","alarm_time":"2016-11-09 00:00:00","device_mac":"63-D0-2F-04-00-4B-12-00","sensor_ieee":"63-D0-2F-04-00-4B-12-00","device_ip":"0.0.0.0","software_ver":"1.3.4"}', function(data, textStatus, xhr) {
				/*optional stuff to do after success */
        });
    }

	login(){
		this.sendmessage("{\"type\":\"login\",\"did\":102}");
		// setInterval(this.display.bind(this),this.state.G_intval)
	}

	_setting(type,e){
		let val = e.target.value
		console.log(val)
		if(type == 'spacing'){
			this.setState({
				W_r_s: val,
			})
		} else if(type == 'x'){
			this.setState({
				W_x_s: val,
			})
		} else if(type == 'y'){
			this.setState({
				W_y_s: val,
			})
		}
	}

	_upData(){
		let bwidth =  $("#coordinate-box").width()
		let bheight =  $("#coordinate-box").height()
		let W_x_s = bwidth*((this.state.W_x_s - this.state.W_r/2)/500);
		let W_y_s = bheight*((this.state.W_y_s - this.state.W_r/2)/500);
		this.setState({
			W_x: W_x_s,
			W_y: W_y_s,
		})
	}

	render(){
		let bwidth =  $("#coordinate-box").width()
		let bheight =  $("#coordinate-box").height()
		return (
			<Layout>
				<div>
					<div id="coordinate-box">
						<span id="coordinate-img" style={{left: this.state.left, top: this.state.bottom}}></span>
						<span id="coordinate-warning" style={{width: this.state.W_w, height: this.state.W_h, left: this.state.W_x, top: this.state.W_y, }}></span>
					</div>
					<Row type="flex" style={{padding: 10}}>
						<Col  span={12}>
							<text style={{fontSize: 24}}>
								报警位置：{this.state.W_x_s},{this.state.W_y_s}
							</text>
						</Col>
						<Col span={12}>
							<text style={{fontSize: 24}}>
								报警信息：{this.state.W_text}
							</text>
						</Col>
					</Row>
					<Row type="flex" justify="center" align="center" style={{paddingTop:20,paddingBottom:20,backgroundColor: 'white'}}>
						<Col span={7}>
							<Input type="number" defaultValue={this.state.W_x_s} min={0} max={500} addonBefore="报警X坐标" onChange={this._setting.bind(this,"x")}/>
						</Col>
						<Col span={7}>
						<Input type="number" defaultValue={this.state.W_y_s} min={0} max={500} addonBefore="报警Y坐标" onChange={this._setting.bind(this,"y")}/>
						</Col>
						<Col span={2}>
							<Button onClick={()=> this._upData()}>确认</Button>
						</Col>
					</Row>
				</div>
			</Layout>
		)
	}
}