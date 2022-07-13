//npm install mini-css-extract-plugin sass-loader sass webpack webpack-cli --save-dev

const path = require('path');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
		"nice-select2": './src/js/nice-select2.js',
		"style": "./src/scss/style.scss",
	},
    output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name].js',
		library: {
			name: 'NiceSelect',
			type: 'umd',
		},
	},
    optimization: {
		usedExports: true,
    },
	plugins: [
		new FileManagerPlugin({
			events: {
				onEnd: {
					copy: [
						{source: path.resolve(__dirname, 'dist'), destination: path.resolve(__dirname, 'docs/dist')},
					],
				},
			},
		}),
		new MiniCssExtractPlugin({
			filename: "css/[name].css",
		}),
	],
	module: {
		rules: [
		  {
			test: /\.(sa|sc|c)ss$/i,
			use: [
				MiniCssExtractPlugin.loader,
				"css-loader",
				"sass-loader",
			],
		  },
		],
	},
}

if (process.env.NODE_ENV !== 'production') {
	module.exports['devtool'] = 'source-map';
}