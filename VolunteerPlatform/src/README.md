
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
		|--	Layout		页面布局
	|-- content		页面内容
		|--	Router.js		路由配置页
		|--	cancel.js		注销页面
		|--	login		登录
		|--	home		主页
		|--	accumulate		积分管理
			|--	accumulate_list		积分列表
			|--	accumulate_add		积分编辑
			|--	accumulate_exchange		积分兑换
			|--	accumulate_history		兑换历史
		|--	activity		活动管理
			|--	activity_list		活动列表
			|--	activity_add		活动编辑
			|--	activity_sign		活动签到
		|--	volunteer		志愿者管理
			|--	volunteer_list		志愿者列表
			|--	volunteer_edit		志愿者编辑


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