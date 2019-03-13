const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');


module.exports = {
    mode: 'development',
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './src/scripts/main.js'
    ],
    output: {
        path: path.resolve('./assets/bundles/'),
        filename: '[name].js',
        publicPath: 'http://localhost:3000/assets/bundles/', // Tell django to use this URL to load packages and not use STATIC_URL + bundle_name
    },
    resolve: {
        extensions: [".js", ".ts", ".css", ".scss"],
    },
    watch: true,
    devServer: {
        contentBase: './src/',
    },
    module: {
        rules: [
            {
                test: /\.(s*)css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }],
            },
            {test: /\.js$/, exclude: /node_modules/, loader: ["react-hot-loader/webpack", "babel-loader"]},
        ]
    },
    plugins: [
        new BundleTracker({filename: './webpack-stats.json'}),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(), // don't reload if there is an error
        new MiniCssExtractPlugin({filename: '[name].css'}),
    ]

};
