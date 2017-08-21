
import React,{Component} from 'react';
import {
	View,
	Text,
	Image,
	Animated,
	Easing,
} from 'react-native'

export default class Wait extends Component {
	constructor(props){
		super(props);
		this.state={
			pan: new Animated.ValueXY({x: 0,y: 250}), // inits to zero
		}
	}

	componentDidMount(){
			this.animated()
	}

	animated(){
		this.state.pan.setValue({x: 0,y: 250})
		Animated.timing(                            // 随时间变化而执行的动画类型
			this.state.pan,         // Auto-multiplexed
			{
				toValue: {x: 150,y: -200},                             // 透明度最终变为1，即完全不透明
				duration: 1000,
				delay: 1000,
        		// easing: Easing.sin
			}
		).start(()=>this._setTime());                        // 开始执行动画
	}

	_setTime(){
		setTimeout(()=>{
			this.animated()
		},1000)
	}

	render(){
		return (
            <View style={{flex: 1, backgroundColor: '#555', paddingTop: '0.6rem', overflow:'hidden'}}>
				<View style={{alignItems: 'center'}}>
					<Text style={{fontSize: '0.4rem', color: 'white'}}>请将卡片放在感应区</Text>
					<Image style={{width: "3.7rem", height: "2rem", marginTop: '0.3rem'}} resizeMode="stretch" source={require('./../../../assets/感应区@3x.png')}/>
				</View>
				<Animated.View
					style={this.state.pan.getLayout()}>
						<Image style={{width: "3rem", height: "3rem", marginTop: '0.3rem'}} resizeMode="stretch" source={require('./../../../assets/手@3x.png')}/>
				</Animated.View>
			</View>
		)
	}
}