var webpack = require('webpack'); 
var path = require('path');                 //引入node的path库
var HtmlWebpackPlugin = require('html-webpack-plugin')
var config = {
  	entry: [
		// 'webpack/hot/dev-server',
		// 'webpack-dev-server/client?http://localhost:3000',
		'./app/index.js'      //入口文件
	],
	output: {
		path: path.resolve(__dirname, 'dist'),  // 指定编译后的代码位置为 dist/bundle.js
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.less$/,
				loaders: ['style-loader', 'css-loader', 'less-loader'],
				include: path.resolve(__dirname, 'app')
			}
			// 为webpack指定loaders
			//{ test: /\.js$/, loaders: ['babel'], exclude: /node_modules/ }   
		]
	},
	plugins: [
        new HtmlWebpackPlugin({
			title: 'React Biolerplate by Linghucong'
		})
    ]
}
module.exports = config;