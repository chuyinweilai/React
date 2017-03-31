var webpack = require('webpack'); 
var path = require('path');                 //引入node的path库
var HtmlWebpackPlugin = require('html-webpack-plugin')

//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');


var config = {
	//项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
	entry: ['./app/index.js'],
  //输出的文件名 合并以后的js会命名为bundle.js
	output: {
		path: path.resolve(__dirname, 'dist'),  // 指定编译后的代码位置为 dist/bundle.js
		filename: 'bundle.js'
	},
	//enable dev source map
  devtool: 'eval-source-map',
	module: {
		// 为webpack指定loaders
		loaders: [
			{
				test: /\.less$/,
				loaders: ['style-loader', 'css-loader', 'scss-loader'],
				include: path.resolve(__dirname, 'app')
			},{
        test: /\.(png|jpg)$/,
        loader: 'url?limit=40000'
      },{
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: APP_PATH,
        query: {
          presets: ['es2015', 'react']
        }
			},
		]
	},
	resolve:{
				extensions:[".js", ".jsx"]
	},
  //添加我们的插件 会自动生成一个html文件
	plugins: [
			new HtmlWebpackPlugin({
				title: 'My first react app'	
		})
	]
}
module.exports = config;