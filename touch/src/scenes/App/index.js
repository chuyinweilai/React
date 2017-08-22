
import React, { Component } from 'react';
import{
	View,
    Image,
    Text,
    Modal,
	StyleSheet,
    TouchableOpacity,
} from 'react-native'
import $ from 'jquery'
import Wxs from './check';
import{
    Wait,
	Ruler,
    Activity_list,
} from './../advert'

export default class index extends Component {
	constructor(props){
		super(props);
		const ws = new WebSocket("ws://139.196.241.190:30300");

		this.state = {
			ws_ok : false,
            ws:ws,
            page: false,
            cardID:0,
            opacity: 0.4,
            times: 0,
        }
        this.sum = 0;
	}

	componentDidMount(){
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
            this._click()
			if ($.trim(evt.data)) {
                let str  = evt.data.split('->')
                this.setState({
                    cardID: str[1],
                    page: true,
                    times: 300,
                    opacity: 0,
                })
			}
		}

		ws.onclose = (evt) =>{
			console.log("WebSocketClosed!");
		};

		ws.onerror = (evt) =>{
			console.log("WebSocketError!");
		};
	}

    _blackBord(){
        return (
            <View style={{flex: 1, backgroundColor: 'black'}}></View>
        )
    }

    _backCtrl(){
        this.setState({
            page: false,
            cardID: 0,
            times: 0,
            opacity: 0.4,
        })
    }

    _click(){
        let sh = setInterval(()=>{
            let time = this.state.times;
            time -- ;
            this.setState({
                times: time
            })
            if(this.state.times == -1){
                clearInterval(sh)
                this._backCtrl();
            }
        },1000)
    }
    
    _wxPage(){
        return (
            <View style={styles.Phone} >
                <Wxs cardId={this.state.cardID} backCtrl={this._backCtrl.bind(this)}/>
            </View>
        )
    }

    render() {
        return (
            <View style={{flex: 1}}>
            <Image style={styles.App} resizeMode="stretch"  source={require("./../../assets/backpic.jpg")}>
                <View style={[styles.AppSide,{paddingLeft: '0.68rem'}]}>
                    <View style={styles.adv}>
                        <Activity_list/>
                    </View>
                </View>

                <Image style={styles.Phonebox}  resizeMode="stretch" source={require("./../../assets/elements.png")}>
                    <View style={styles.Phone}>
                        {/* <Wxs cardId={this.state.cardID} backCtrl={this._backCtrl.bind(this)}/> */}
                         {this.state.page? this._wxPage(): <Wait></Wait>}  
                    </View>
                    <View style={styles.bottom}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{fontSize: '0.3rem',}}>请记得退出登录，</Text>
                            <Text style={{fontSize: '0.3rem', color: 'red'}}>{this.state.times}</Text>
                            <Text style={{fontSize: '0.3rem',}}>秒后将退出</Text>
                        </View>
                        <TouchableOpacity style={{width: '1rem', height: '0.5rem',borderRadius:'0.1rem',justifyContent:'center', alignItems: 'center', marginLeft:'0.4rem', backgroundColor: '#ff2400'}} onPress={()=> this._backCtrl()}>
                            <Text style={{fontSize: '0.3rem', color: 'white'}}>退出</Text>
                        </TouchableOpacity>
                    </View>
                </Image>
                {/* </View> */}

                <View style={[styles.AppSide,{paddingLeft: '0.68rem'}]}>
                    <View style={styles.adv}>
                        <Ruler/>
                    </View>
                </View>
            </Image>
            </View>
        );
    }
}

const styles = StyleSheet.create({
	App: {
		flexDirection:'row',
        flex: 1,
         position:'relative',
    },
	AppSide:{
		// display: "inline-block",
		width: "4.56rem",
		paddingTop:'1.1rem',
	},
	adv:{
		width: '3.32rem',
		height: '9rem',
		backgroundColor:'rgba(0, 0, 0, 0.6)'
		
	},
	AppPhone:{
		display: 'inline-block',
		width: '10rem',
		paddingTop: '2.12rem',
	},
	Phonebox:{
		alignItems:'center',
		justifyContent:'center',
		width: '10rem',
		height:"7rem",
		paddingTop:'1.5rem',
		marginTop: '2.12rem',
	},
	Phone:{
		width: "8.16rem",
		height: "5.9rem",
		// overflow:'hidden',
		backgroundColor: 'white'
	},
    bottom:{
        height: '0.7rem',
		width: '10rem',
        marginTop: '0.6rem',
        alignItems:'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
        // background:'rgba(0,0,0,0)'
    },
});



