/* eslint-env node */
const webpack = require('webpack')
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, 'src/config.js'),
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
                            cwd: __dirname + '/elm'
                        }
                    }
                ]
            },
            {
                test: /\.js?$/,
                exclude: [path.resolve(__dirname, 'node_modules')],
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                exclude: [path.resolve(__dirname, 'node_modules'), /\.krem.css$/],
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[path][name]__[local]',
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins() {
                                return [
                                    require('autoprefixer')
                                ];
                            },
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                include: [path.resolve(__dirname, 'node_modules')],
                exclude: [/\.krem.css$/],
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.krem.css$/,
                exclude: [path.resolve(__dirname, 'node_modules')],
                use: [
                    {
                        loader: 'kremling-loader',
                        options: {
                            namespace: 'app-dashboard-ui',
                            postcss: {
                                plugins: {
                                    'autoprefixer': {}
                                }
                            }
                        },
                    },
                ]
            },
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
            { from: path.resolve(__dirname, 'src/config.js') }
        ]),
    ],
    devtool: 'source-map',
    externals: [
        /^@xura\/emporium$/,
        /^lodash$/,
        /^single-spa$/,
        /^react$/,
        /^react\/lib.*/,
        /^react-dom$/,
        /.*react-dom.*/,
        /^rxjs\/?.*$/,
    ],
};
