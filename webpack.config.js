const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");

const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

var MODE =
    process.env.npm_lifecycle_event === "prod" ? "production" : "development";
var withDebug = !process.env["npm_config_nodebug"] && MODE == "development";
// this may help for Yarn users
// var withDebug = !npmParams.includes("--nodebug");
console.log('\x1b[36m%s\x1b[0m', `** elm-webpack-starter: mode "${MODE}", withDebug: ${withDebug}\n`);

var common = {
    mode: MODE,
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "dist"),
        publicPath: "/",
        // FIXME webpack -p automatically adds hash when building for production
        filename: MODE == "production" ? "[name]-[hash].js" : "index.js"
    },
    plugins: [
        new HTMLWebpackPlugin({
            // Use this template to get basic responsive meta tags
            template: "src/index.html",
            // inject details of output file at end of body
            inject: "body"
        })
    ],
    resolve: {
        modules: [path.join(__dirname, "src"), "node_modules"],
        extensions: [".js", ".elm", ".scss", ".png"]
    }
};

if (MODE === "development") {
    module.exports = merge(common, {
        module: {
            rules: [
                {
                    test: /\.elm$/,
                    exclude: [/elm-stuff/, /node_modules/],
                    use: [
                        { loader: "elm-hot-webpack-loader" },
                        {
                            loader: "elm-webpack-loader",
                            options: {
                                // add Elm's debug overlay to output
                                debug: withDebug,
                                //
                                forceWatch: true,
                                cwd: __dirname + '/elm'
                            }
                        }
                    ]
                }
            ]
        },
        devServer: {
            inline: true,
            stats: "errors-only",
            historyApiFallback: true,
        }
    });
}
if (MODE === "production") {
    module.exports = merge(common, {
        optimization: {
            minimizer: [
                new ClosurePlugin({mode: 'STANDARD'}, {
                    // compiler flags here
                    //
                    // for debugging help, try these:
                    //
                    // formatting: 'PRETTY_PRINT',
                    // debug: true
                    // renaming: false
                })
            ]
        }, plugins: [
            // Delete everything from output-path (/dist) and report to user
            new CleanWebpackPlugin({
                root: __dirname,
                exclude: [],
                verbose: true,
                dry: false
            })
        ],
        module: {
            rules: [
                {
                    test: /\.elm$/,
                    exclude: [/elm-stuff/, /node_modules/],
                    use: {
                        loader: "elm-webpack-loader",
                        options: {
                            optimize: true
                        }
                    }
                }
            ]
        }
    });
}