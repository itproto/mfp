---
to: packages/<%= name.toLowerCase() %>/config/webpack.prod.js
---
const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');
const commonConfig = require('./webpack.common');

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        publicPath: '<%= name.toLowerCase() %>/latest/'
    },
    plugins: [
        new ModuleFederationPlugin({
            name: '<%= name.toLowerCase() %>',
            filename: 'remoteEntry.js',
            exposes: {
                './<%= name.toLowerCase() %>-boot': './src/bootstrap'
            },
            shared: packageJson.dependencies,
        }),
    ],
};

module.exports = merge(commonConfig, prodConfig);