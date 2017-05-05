const path = require('path')

module.exports = {
	entry: './source/server.js',
	output: {
		filename: 'server.js',
		path: path.resolve(__dirname, '../build/server'),
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
					presets: ['es2015', 'react']
				}
			}
		]
	},
	target: 'node'
}