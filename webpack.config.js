const webpack = require("webpack");
const path = require("path");

/** @type {import('webpack').Configuration} */
module.exports = {
    entry: "./src/app.js",
    output: {
        filename: "app.bundle.js",
        path: path.resolve(__dirname, "assets/js"),
        publicPath: "/assets/js/", // Ensure Webpack knows where to serve bundles from
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "/"),
        },
        compress: true,
        port: 3000,
        hot: true, // Enable Hot Module Replacement (HMR)
        liveReload: true, // Enable live reloading on save
        watchFiles: ["src/**/*", "index.html"], // Watch your source files and HTML
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
        }),
    ],
};