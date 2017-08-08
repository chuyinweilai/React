
const peruri = "http://testapi.famesmart.com/api/";

let appData_local  = {
	_dataGet(afteruri, callback){
		fetch(peruri+afteruri,{
			method: 'GET',
			headers: {
				'Accept': 'application/json', 'Content-Type': 'application/json', 'Cache-Control':'no-cache', 
			},
		})
		.then(res => {
			if(res.status === 200){
				return res.json();
			} else {
			}
		}) //判断res.state == 200 并进行json转换 
		.then(data => {
			callback(data)
		}).
		catch( error => {
			alert('get报错 :' + error)
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
			if(res.status === 200) {
				return res.json()
			}
		}) //判断res.state == 200 并进行json转换 
		.then(data => {
				callback(data)
		}).
		catch( error => {
			alert('post报错 :' + error)
		})
	},
	_Storage(type,id,data){
		if(type === 'set'){
			localStorage.setItem(id,JSON.stringify(data))
		}
		else if(type === 'get'){
			let mess = localStorage.getItem(id)
			// if(error){
			// 	alert(error);
			// }else {
				let json = JSON.parse(mess)
				data(json)
			// }
		}
		if(type === 'del'){
			localStorage.removeItem(id)
		}
	}
}
module.exports = appData_local;