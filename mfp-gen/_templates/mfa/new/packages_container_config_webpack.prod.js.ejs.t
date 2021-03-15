---
to: packages/<%= name.toLowerCase() %>/config/webpack.prod.js
---
const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/<%= name.toLowerCase() %>/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');
const { resolve } = require('path');
const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        publicPath: '/<%= name.toLowerCase() %>/latest/'
    },
    plugins: [
        new ModuleFederationPlugin({
            name: '<%= name.toLowerCase() %>',
            remotes: {
                // marketing: `marketing@${domain}/marketing/latest/remoteEntry.js`,
            },
            shared: packageJson.dependencies,
        }),
    ],
};

module.exports = merge(commonConfig, prodConfig);