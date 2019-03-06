const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');
const coreapi = require('coreapi');

module.exports = {
    mode: 'development',
    entry: {
        main: "./src/scripts/main.js",
    },
    output: {
        path: path.resolve('./assets/webpack_bundles/'),
        filename: "[name].js"
    },
    resolve: {
        extensions: [".js", ".ts", ".css", ".scss"],
    },
    watch: true,
    module: {
        rules: [
            {
                test: /\.(s*)css$/,
                use: [{loader: MiniCssExtractPlugin.loader}, {
                    loader: "css-loader",
                    options: {sourceMap: true, modules: false, localIdentName: "[local]___[hash:base64:5]"}
                }, "sass-loader"],
            },
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
        ]
    },
    plugins: [
        new BundleTracker({filename: './webpack-stats.json'}),
        new MiniCssExtractPlugin({filename: 'app.bundle.css'}),
    ]

};
