const path = require('path')

module.exports = {
	entry: './source/client.js',
	output: {
		filename: 'app.js',
		path: path.resolve(__dirname, '../build/statics'),
	},
	module:{
		rules:[
			{
				test:/\.json$/,
				loader: 'json-loader'
			},
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				exclude: [
					path.resolve(__dirname, '../node_modules')
				],
				options: {
					presets: ['es2016', 'es2017', 'react'],
					plugins: ['transform-es2015-modules-commonjs']
				}
			}
		]
	},
	target: 'web'
}