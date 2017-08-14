/**
 * React Native for Web Starter App
 * https://github.com/grabcode/react-native-web-starter
 * Follow me https://twitter.com/grabthecode
 */

import React, { Component } from 'react';
import {
	Text,
	View,
	Image,
  	Button,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	Dimensions
} from 'react-native';

const peruri = "http://cloudapi.famesmart.com";
const appData = require('./../../components/Ajax');
const pxToDp =require('../responsive/px');

export default class accumulate_ruler extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}

	render() {
		return (
			<View  style={styles.container}>
				<View style={{height:pxToDp(86), flexDirection:'row',backgroundColor:'#f2f2f2',  justifyContent:'space-between'}}>
					<TouchableOpacity style={{flexDirection:'row',width:pxToDp(120), alignItems: 'center', justifyContent: 'center'}} onPress={()=>this.props.backCtrl(false)}>
						<Image style={{height:pxToDp(48), width: pxToDp(48)}} source={require('./../../assets/arrow-left.png')} 	resizeMode="contain"/>
						<Text style={{fontSize:pxToDp(30)}}>返回</Text>
					</TouchableOpacity>
					<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
						<Text style={{fontSize: pxToDp(36)}}>积分规则</Text>
					</View>
					<View style={{width:pxToDp(120), alignItems: 'center', justifyContent: 'center'}}/>
				</View>
				<ScrollView style={{padding: pxToDp(20)}}>
					<Text style={{textAlign: 'center', fontSize: pxToDp(32), lineHeight:pxToDp(60)}}>品雅苑志愿者积分规则</Text>
					<Text style={styles.listText}>
						为倡导“奉献、友爱、互助、进步”的志愿者精神，规范和促进志愿服务活动，推动精神文明建设，有效使用志愿者资源，保证志愿者队伍素质，推动志愿者服务工作规范化、制度化，同时发挥党建引领下的新模式，发动在职党员双报到机制，在社区树立“好人好模”的价值观念，促进社区教育的发展和深化，以此提高社区志愿者与志愿服务的积极性和主动性，更好地服务社区居民。品雅苑筹备组制定了以下志愿者积分规则。
					</Text>
					<Text style={styles.listText}>
						首先，志愿服务队必须具备“六个有”，有一支相对稳定的志愿者队伍；有志愿者和服务对象的档案；有相对固定的服务项目；有一个相当稳定的服务基地；有完整的活动计划；有规范的规章管理制度。
					</Text>
					<Text style={styles.listText}>
						其次，为公正客观记录、评价居民群众志愿者参与活动的情况，居民区将派专职干部负责记录、并由主管领导管理，对居民群众参加各类活动情况的核实认定、积分奖励等相关工作。以更好地推动、促进积分管理工作广泛、深入和系统开展。
					</Text>
					<Text style={styles.listText}>
						最后，居民区可根据本规定要求，制定服务活动情况登记、核实、积分奖励等实施细则，加强管理监督，确保参与活动积分管理工作严格规范施行。先规则如下：
					</Text>
					<Text style={styles.textTitle}>一、积分对象</Text>
					<Text style={styles.textContent}>参加本社区志愿活动的志愿者（楼组长、志愿者等）。</Text>
					<Text style={styles.textTitle}>二、积分标准</Text>
					<Text style={styles.textContent}>参加志愿服务每次积5-50个爱心（按服务内容具体奖励相关积点数）。</Text>
					<Text style={styles.textTitle}>三、积分细则</Text>
					<Text style={styles.textContent}>1、参加一次培训、学习、讲座、座谈、仪式等记5个爱心；</Text>
					<Text style={styles.textContent}>2、参加一次体育活动计5个爱心；</Text>
					<Text style={styles.textContent}>3、参与一次义务劳动计5个爱心；</Text>
					<Text style={styles.textContent}>4、参加一次文化活动（包括文艺演出、社火表演等）计5个爱心；</Text>
					<Text style={styles.textContent}>5、提供合理化建议，被采纳一项计10个爱心；</Text>
					<Text style={styles.textContent}>6、为维护社会治安、及时发现安全隐患、民族团结方面，提供重要线索的，计10个爱心；</Text>
					<Text style={styles.textContent}>7、担任社区其他职务，并积极发挥作用者（监督员、巡逻员等），计20个爱心；</Text>
					<Text style={styles.textContent}>8、奉献社会、帮扶苦难家庭，计20个爱心；</Text>
					<Text style={styles.textContent}>9、协助解决一项调解任务计30个爱心；</Text>
					<Text style={styles.textContent}>10、经过党支部、居委同意，设计、策划、负责大型社区活动（活动参加人数到达30人以上，计20个爱心；50人及以上，计30个爱心；100人以上50个爱心），计20-50个爱心；</Text>
					<Text style={styles.textContent}>参与活动积分是对居民群众参加实践活动的量化考评指标。居民志愿参与活动积分奖励，参与各类活动1次等于活动积分1次，获得活动相对应的积分。志愿者可根据实际情况兑换相应物品，必须在年底前一次性兑换物品，兑换物品由居委志愿者服务经费支出，当年没有兑换的积分，不可累计到下一年兑换。
					</Text>
					<Text style={styles.textTitle}>四、积分奖励和表彰</Text>
					<Text style={styles.textContent}>根据居民志愿者获得积分情况，可兑换相应实物或社区服务，并在年底对积分较多的志愿进行表彰以资鼓励。</Text>
					<Text style={styles.textContent}>1、一整年内参与各类活动，积分达到50个爱心以上（含50个爱心）的居民，获得“三星志愿者”称号，并兑换相应奖品或服务。</Text>
					<Text style={styles.textContent}>2、一整年内参与各类活动，积分达到80个爱心以上（含80个爱心）的居民，获得“四星志愿者”称号，并兑换相应奖品或服务。</Text>
					<Text style={styles.textContent}>3、一整年内参加各类活动，积分达到100个爱心以上（含100个爱心）的居民，获得“五星志愿者”称号，并兑换相应奖品或服务。</Text>
					
					<Text style={styles.textTitle}>五、积分兑换明细</Text>
					<Text style={styles.textContent}>。。。。。。（相关人员再次商榷决定）</Text>
					<Text style={styles.textTitle}>六、积分考核</Text>
					<Text style={styles.textContent}>
						居民区建立积分记录台账，详细记录活动时间、地点及活动名称。
						每次活动，积分工作要由至少2名社区工作人员进行记录，以保证积分记录真实有效；
						居民区主管对积分记录情况进行不定期抽查；
						如出现其他情况，则由居民区负责解释、进行处理。
					</Text>
					<Text style={styles.textContent}>本规则自2017年7月起开始实施。</Text>
					<Text style={[styles.textContent,{textAlign:'right', padding: pxToDp(48)}]}>
						景城品雅苑筹备组<br/>
						2017年6月
					</Text>
				</ScrollView>
			</View>
		);
	}
	}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	list:{
		flex: 1, 
		flexDirection:'row', 
		alignItems:'center', 
		justifyContent:'center'
	},
	listText:{
		fontSize: pxToDp(24),
		textIndent: pxToDp(48),
		lineHeight:pxToDp(40)
	},
	textTitle:{
		fontSize: pxToDp(28),
		textIndent: pxToDp(56),
		lineHeight:pxToDp(50),
		fontWeight: '600'
	},
	textContent:{
		fontSize: pxToDp(24),
		textIndent: pxToDp(48),
		lineHeight:pxToDp(40),
	}
});

module.exports = accumulate_ruler;