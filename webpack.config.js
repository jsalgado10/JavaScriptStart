const path =require('path')
const HtmlWebpackPlugin=require('html-webpack-plugin')

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
        })
    ],
    resolve:{
        extensions : [".js"],
        
    }
}