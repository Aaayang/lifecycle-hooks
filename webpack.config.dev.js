const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: "./src/app.js",
    output: {
        path: path.resolve(__dirname, "dist/"),
        filename: "assets/js/app.js",
        publicPath: '/'// 所有资源的基础路径
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "src/index.html"
        }),
        new CleanWebpackPlugin(['dist'])
    ],
    module: {
        rules: [{
            test: /\.js$/,
            use: [{
                loader: "babel-loader"
            }],
            exclude: [
                path.resolve(__dirname, 'node_modules')
            ]
        }, {
            test: /\.css$/,
            use: ["style-loader", {
                loader: "css-loader",
                options: {
                    module: true,// 开启模块化
                    localIdentName: "[name]-[local]-[hash:base64:6]"
                }
            }],
            exclude: [// 除了这两个文件夹都会开启模块化
                path.resolve(__dirname, "node_modules"),
                path.resolve(__dirname, "src/common"),
            ]
        }, {
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
            include: [
                path.resolve(__dirname, "node_modules"),
                path.resolve(__dirname, "src/common"),
            ]
        }, {
            test: /\.scss$/,
            use: ["style-loader", {
                loader: "css-loader",
                options: {
                    module: true,// 开启模块化
                    localIdentName: "[name]-[local]-[hash:base64:6]"
                }
            }, "sass-loader"],
            exclude: [// 除了这两个文件夹都会开启模块化
                path.resolve(__dirname, "node_modules"),
                path.resolve(__dirname, "src/common"),
            ]
        }, {
            test: /\.scss$/,
            use: ["style-loader", "css-loader", "sass-loader"],
            include: [
                path.resolve(__dirname, "node_modules"),
                path.resolve(__dirname, "src/common"),
            ]
        }, {// less
            test: /\.less$/,
            use: ["style-loader", {
                loader: "css-loader",
                options: {
                    module: true,// 开启模块化
                    localIdentName: "[name]-[local]-[hash:base64:6]"
                }
            }, "less-loader"],
            exclude: [// 除了这两个文件夹都会开启模块化
                path.resolve(__dirname, "node_modules"),
                path.resolve(__dirname, "src/common"),
            ]
        }, {
            test: /\.less$/,
            use: ["style-loader", "css-loader", "less-loader"],
            include: [
                path.resolve(__dirname, "node_modules"),
                path.resolve(__dirname, "src/common"),
            ]
        }, {
            test: /\.(jpg|png|gif|jpeg)$/,
            use: [{
                loader: "url-loader",
                options: {
                    limit: 10000,
                    name: 'assets/img/[name]_[hash:8].[ext]'
                }
            }]// 小于10kb图片会打包成Base64的
        }, {
            test: /\.(ttf|eot|svg|woff|woff2)$/,
            use: [{
                loader: "file-loader",
                options: {
                    name: 'assets/fonts/[name]_[hash:8].[ext]'
                }
            }]
        }]
    },
    devServer: {
        open: true,// 自动打开浏览器
        port: 9000,
        contentBase: './src/common',
        publicPath: '/'
    }
};