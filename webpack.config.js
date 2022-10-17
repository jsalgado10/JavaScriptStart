const path =require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const MiniCssExtractPlugin=require('mini-css-extract-plugin');

module.exports = {
    mode : 'development',
    entry : './src/index.js',
    output : {
        filename: 'bundle.js',
        path: path.resolve(__dirname,'dist'),
        clean: true
    },
    devtool: 'inline-source-map',
    devServer : {
        static: './dist',
        port: 3007
    },
    plugins:[
        new HtmlWebpackPlugin({
            title:'JavaScript Start',
            template: 'public/index.html'
        }),
        new MiniCssExtractPlugin()
    ],
    resolve:{
        extensions : [".js"],

    },
    module :{
        rules:[
            {
                test: /\.js?/,
                exclude : /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets:[
                            '@babel/preset-env'
                        ]
                    }
                }
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader,"css-loader"]
            }
        ]
    }
}