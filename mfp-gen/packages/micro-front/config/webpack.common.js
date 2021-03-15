module.exports = {
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react',/*jsx */ '@babel/preset-env'/**es6=>es5 */],
                        plugins: ['@babel/plugin-transform-runtime'/*async etc */]
                    }
                }
            }
        ]
    }
}