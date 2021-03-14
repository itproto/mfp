const { merge } = require('webpack-merge');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MFP = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common');

const devConfig = {
    mode: 'development',
    devServer: {
        port: 8080,
        historyApiFallback: {
            index: 'index.html'
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new MFP({
            name: 'container',
            remotes: {
                marketing: 'marketing@http://localhost:8081/remoteEntry.js'
            },
            shared: require('../package.json').dependencies
        }),
    ]
}

module.exports = merge(commonConfig, devConfig);