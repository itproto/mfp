const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');
const commonConfig = require('./webpack.common');

const prodConfig = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        publicPath: 'micro-front/latest/'
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'micro-front',
            filename: 'remoteEntry.js',
            exposes: {
                './micro-front-boot': './src/bootstrap'
            },
            shared: packageJson.dependencies,
        }),
    ],
};

module.exports = merge(commonConfig, prodConfig);