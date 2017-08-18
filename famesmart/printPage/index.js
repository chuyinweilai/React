let str = window.location.search.substring(1);
let array = str.split("&");
let obj = {};
array.forEach((value,index)=> {
	let props = value.split("=");
	let aVal = decodeURI(props[1],"utf-8"); 
	obj[props[0]] = aVal;
});
let li_html = 
	"<li><text style='width: 70px'>所在社区</text><text>:" + obj.comm_name + "</text></li>"+
	"<li><text style='width: 70px'>手机号</text><text>:" + obj.mobile + "</text></li>"+
	"<li><text style='width: 70px'>积分时间</text><text>:" + obj.change_date + "</text></li>"+
	"<li><text style='width: 70px'>积分类型</text><text>:" + obj.type + "</text></li>"+
	"<li><text style='width: 70px'>积分分值</text><text>:" + obj.score + "</text></li>"+
	"<li><text style='width: 70px'>签名:</text></li>"
$("#ul_list")[0].innerHTML = li_html;