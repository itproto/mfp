---
to: sample/packages/<%= name.toLowerCase() %>/config/webpack.dev.js
---
const { merge } = require('webpack-merge');

const MFP = require('webpack/lib/<%= name.toLowerCase() %>/ModuleFederationPlugin')
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
        new MFP({
            name: '<%= name.toLowerCase() %>',
            remotes: {
                // marketing: 'marketing@http://localhost:8081/remoteEntry.js'
            },
            shared: require('../package.json').dependencies
        }),
    ]
}

module.exports = merge(commonConfig, devConfig);