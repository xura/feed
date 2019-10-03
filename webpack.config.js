/* eslint-env node */
const webpack = require('webpack')
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: 'config.js',
    output: {
        filename: 'feed.js',
        library: 'feed',
        libraryTarget: 'amd',
        path: path.resolve(__dirname, 'build/feed'),
    },
    devServer: {
        headers: {
            "Access-Control-Allow-Origin": "*",
        }
    },
    mode: 'development',
    module: {
        rules: [
            { parser: { System: false } },
            {
                test: /\.elm$/,
                exclude: [/elm-stuff/, /node_modules/],
                use: [
                    { loader: "elm-hot-webpack-loader" },
                    {
                        loader: "elm-webpack-loader",
                        options: {
                            forceWatch: true,
                            cwd: __dirname + '/src/elm'
                        }
                    }
                ]
            }
        ],
    },
    resolve: {
        modules: [
            __dirname,
            'node_modules',
        ],
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['build/feed']
        }),
        new CopyWebpackPlugin([
            { from: path.resolve(__dirname, 'config.js') }
        ]),
    ],
    devtool: 'source-map',
    externals: [
        /^@xura\/emporium$/,
        /^single-spa$/
    ],
};
