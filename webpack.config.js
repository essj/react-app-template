const path = require('path');
const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const production = process.env.NODE_ENV === 'production';

module.exports = {
	context: path.resolve(__dirname, 'src'),
	entry: [
		'./index.tsx',
	],
	mode: production ? 'production' : 'development',
	output: {
		filename: production ? '[name].[chunkhash].js' : 'bundle.js',
		publicPath: "",
		path: path.resolve(__dirname, "dist"),
	},
	plugins: plugins(),
	module: {
		rules: [
			{
				test: /\.(ts|tsx)$/,
				exclude: /node_modules/,
				loader: production ? 'ts-loader' : ['babel-loader', 'ts-loader'],
			},
			{
				test: /\.scss|.css$/,
				sideEffects: true,
				use: [
					production ? MiniCssExtractPlugin.loader : 'style-loader',
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
						},
					}, {
						loader: 'sass-loader',
						options: {
							sourceMap: true,
							outputStyle: production ? 'compressed' : 'expanded',
						},
					},
				],
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.json', '.jsx'],
	},
};

function plugins() {
	const plugins = [
		new webpack.DefinePlugin({
			'process.env.API_BASE_URL': JSON.stringify(production ? '#{apiurl}#' : 'http://localhost:5000')
		}),
		new HtmlWebpackPlugin({
			inject: true,
			template: 'index.template.html',
		}),
	];

	if (production) {
		plugins.push(
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify('production')
			}),
			new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
			new webpack.optimize.ModuleConcatenationPlugin(),
			new MiniCssExtractPlugin({
				filename: "[name]-[contenthash].css",
				chunkFilename: "[name]-[contenthash].css"
			}),
			new CopyWebpackPlugin([
				'../web.config',
			]),
		);
	} else {
	}

	return plugins;
}
