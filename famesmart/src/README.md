
##项目结构

|--	build		打包输出文件
|--	node_modules		项目依赖
|--	public		打包输出文件
	|-- favicon.ico		浏览器标签栏小图标
	|-- index.html		
	|-- mainfest.json		应用基本信息配置
|--	src		项目主体部分
	|--	index.js		项目入口
	|--	app.js		主页面
	|-- assert		全局变量
	|--	components		组件
		|--	filter		多级筛选组件
		|--	Layout		页面布局相关组件
	|-- content		页面内容
		|--	Router.js		路由配置页
		|--	cancel.js		注销页面
		|--	login		登录
		|--	home		主页
		|--	operation		米社运维
			|--	accumulate		积分管理
			|--	activity		活动管理
			|--	volunteer		志愿者管理
		|--	card_management		卡片管理
			|--	IC_cards_resident		居民IC卡
			|--	IC_cards_patrol		巡更IC卡
			|--	QRCode		电子钥匙
			|--	QRcode_record		电子钥匙分享记录


##项目运行

- [$ yarn install](安装依赖)
	若无yarn支持：
		$ npm install yarn -g
- [$ yarn start](启动项目)

- [$ yarn build](打包项目)
	打包完成后，需修改	**index.html**	文件中的路径，确保指向正确的位置
	
	```
	    <link rel="manifest" href="/manifest.json">
	```
	    <link href="/static/css/main.03258832.css" rel="stylesheet">
	```
	    <script type="text/javascript" src="/static/js/main.5e3be047.js"></script>
	```