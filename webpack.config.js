const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleTracker = require('webpack-bundle-tracker');


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
        extensions: [".js", ".ts", ".css", ".scss", ".tsx"],
    },
    watch: true,
    devServer: {
        contentBase: './src/',
    },
    module: {
        rules: [
            {test: /\.tsx?$/, loader: "awesome-typescript-loader"},
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
        new MiniCssExtractPlugin({filename: '[name].css'}),
    ]

};
