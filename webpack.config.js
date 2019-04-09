const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

module.exports = {
    entry: {
        index: './src/index.js',
        test: './src/index.js',
    },
    mode: "development",
    devtool: "source-map",
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: '[name].js'
    },
    devServer: {
        contentBase: ['./dist', './src'],
        port: 3000,
        host: '0.0.0.0'
    },
    module: {
        rules: [
            {
                loader: 'postcss-loader',
                options: {
                    plugins: [
                        autoprefixer({
                            browsers:['ie >= 8', 'last 4 version']
                        })
                    ],
                    sourceMap: true
                }
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to CSS
                }]
            },
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                options: {
                    pretty: true
                }
            },
            {
                test: /\.hbs/,
                loader: 'handlebars-loader',
                exclude: /node_modules/
            },
        ]
    },
    resolve: {
        extensions: ['*', '.js']
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            title: 'Webpack Example',
            template: './src/index.html',
            filename: 'index.html',
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            title: 'Webpack Example (copy)',
            template: './src/index.html',
            filename: 'test.html',
            chunks: ['test']
        }),
        new HtmlWebpackPlugin({
            template: PATHS.source + '/index.pug',
        }),
        // new webpack.ProvidePlugin({
        //     $: 'jquery',
        //     jQuery: 'jquery'
        // })
    ]
};
