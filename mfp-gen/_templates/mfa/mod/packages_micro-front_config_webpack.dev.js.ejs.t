---
to: packages/<%= name.toLowerCase() %>/config/webpack.dev.js
---
const { merge } = require('webpack-merge');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MFP = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common');

const devConfig = {
    mode: 'development',
    devServer: {
        port: 8081,
        historyApiFallback: {
            index: 'index.html'
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new MFP({
            name: <%= h.inflection.camelize(name) %>, // !!
            filename: 'remoteEntry.js',
            exposes: {
                './<%= name.toLowerCase() %>-boot': './src/bootstrap',

            },
            shared: require('../package.json').dependencies
        })
    ]
}

module.exports = merge(commonConfig, devConfig);