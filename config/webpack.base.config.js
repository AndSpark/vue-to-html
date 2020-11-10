const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// 提取CSS文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const vuePath = 'E:/gls/vue-template/huae/src'
module.exports = {
	mode: 'development',
	optimization: {
		minimizer: [new OptimizeCSSAssetsPlugin({})],
	},

	resolve: {
		extensions: ['.js', '.vue'],
		alias: {
			'@': vuePath,
		},
	},

	output: {
		path: path.resolve(__dirname, '../dist'),
		publicPath: '/',
		filename: '[name].bundle.js',
	},

	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
			},
			{
				test: /\.pug$/,
				loader: 'pug-plain-loader',
			},
			{
				test: /\.js$/,
				use: 'babel-loader',
			},
			{
				test: /\.css$/,
				use: [
					'vue-style-loader',
					MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
				],
			},
			{
				test: /\.scss$/,
				use: [
					'vue-style-loader',
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader',
					{
						loader: 'sass-resources-loader',
						options: {
							resources: [
								path.join(vuePath, 'assets/style/mixin.scss'),
								path.join(vuePath, 'assets/style/normalize.css'),
								path.join(vuePath, 'assets/style/common.scss'),
							],
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [require('autoprefixer')],
							},
						},
					},
				],
			},
			{
				test: /\.(jpg|jpeg|png|gif|svg)$/,
				use: {
					loader: 'url-loader',
					options: {
						limit: 10000, // 10Kb
						esModule: false,
						name: '[name].[ext]',
						outputPath: 'images/',
					},
				},
			},
		],
	},

	plugins: [
		new VueLoaderPlugin(),
		new MiniCssExtractPlugin({ filename: 'common.css' }),
	],
}
