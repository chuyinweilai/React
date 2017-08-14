import{
	AsyncStorage,
} from 'react-native'

const peruri = "http://cloudapi.famesmart.com";
/*
let appData  = {
	_dataGet(afteruri, callback){
		fetch(peruri+afteruri,{
			method: 'GET',
			headers: {
				'Accept': 'application/json', 'Content-Type': 'application/json', 'Cache-Control':'no-cache', 
			},
		})
		.then(res => {
			if(res.status == 200){
				return res.json();
			} else {
			}
		}) //判断res.state == 200 并进行json转换 
		.then(data => {
			callback(data)
		}).
		catch( error => {
			alert('errror :' + error)
		})
	},
	_dataPost(afteruri,data,callback){
		fetch(peruri+afteruri,{
				method: 'post',
				headers: {
					'Accept': 'application/json', 'Content-Type': 'application/json', 'Cache-Control':'no-cache', 
				},
				body: JSON.stringify(data)
		})
		.then(res =>{ 
			if(res.status == 200) {
				return res.json()
			}else if(res.status == 422){
				let ref={message: 'errror'}
				return ref;
			}
		}) //判断res.state == 200 并进行json转换 
		.then(data => {
			callback(data)
		}).
		catch( error => {
			alert('errror :' + error)
		})
	},
	_Storage(type,id,data){
		if(type == 'set'){
			AsyncStorage.setItem(id,JSON.stringify(data))
		}
		else if(type == 'get'){
			AsyncStorage.getItem(id,(error,mess)=>{
				if(error){
					alert(error);
				}else {
					data(mess)
				}
			})
		}
	}
}
module.exports = appData;
*/
//在其他页面引用： let appData = require('./../data')

let appData={
    _dataGet(afturi, fn) {
		$.ajax({
			url:peruri + afturi,
			type:"GET",
			dataType:"json",
			success:(res) =>{
				fn(res)
			},
			error:(res) =>{
				if(res.status == 422){
					fn(0)
				} else {
					fn() 
				}
			},
		}); 
    },
    _dataPost(afturi, abody, fn){
		$.ajax({
			url: peruri + afturi,
			type:"POST",
			data: abody,
			dataType:"json",
			success:(res) =>{
				fn(res)
			},
			error:(error) =>{
				fn()
			},
		}); 
    },
	_Storage(type,id,data){
		if(type == 'set'){
			AsyncStorage.setItem(id,JSON.stringify(data))
		}
		else if(type == 'get'){
			AsyncStorage.getItem(id,(error,mess)=>{
				if(error){
					alert(error);
				}else {
					data(mess)
				}
			})

		}
	}
}

module.exports = appData;