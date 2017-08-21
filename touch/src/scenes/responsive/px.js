import {Dimensions} from 'react-native';
console.log('test');

// 竖屏模式，所以可以只获取一次 width
// const deviceWidthDp = Dimensions.get('window').width;
// const deviceHeightDp = Dimensions.get('window').height;
const deviceWidthDp = document.documentElement.clientWidth;
const deviceHeightDp = document.documentElement.clientHeight;
// UI图大小
const uiWidthPx = 1920;
console.log()
//转换方式
function pxToDp(uiElementPx) {
			return uiElementPx*(720 / 1920)*2 ;
			// return uiElementPx *  (deviceWidthDp) / uiWidthPx;
}

module.exports = pxToDp;