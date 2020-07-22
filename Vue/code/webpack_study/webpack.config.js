const path = require('path')
// 导入生成预览页面的插件，得到一个构造函数
const HtmlWebpackPlugin = require('html-webpack-plugin')
const htmlPlugin = new HtmlWebpackPlugin({ // 创建插件的实例对象
     template: './src/index.html', // 指定要用到的模板文件
     filename: 'index.html' // 指定生成的文件的名称，该文件存在于内存中，在目录中不显示
})
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
	//编译模式
    mode: 'development' ,// mode 用来指定构建模式
	entry: path.join(__dirname, './src/index.js'),
	output: {
		path: path.join(__dirname, './dist'),
		filename: 'bandle.js'
	},
	plugins: [ htmlPlugin, new VueLoaderPlugin() ], // plugins 数组是 webpack 打包期间会用到的一些插件列表
    module: {
		rules: [
			{ test: /\.css$/, use: ['style-loader', 'css-loader','postcss-loader'] },
			{ test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
			{ test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
			{test: /\.jpg|png|gif|bmp|ttf|eot|svg|woff|woff2$/,use: 'url-loader?limit=16950'},
			{ test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
			{ test: /\.vue$/, loader: 'vue-loader' }
		]
	}
}