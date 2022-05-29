const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        "/app": "./src/app.js"
    },
    output: { 
        path: path.join(__dirname, "/dist"),
        filename: "[name].bundle.js" 
    },
    plugins: [ 
        new HTMLWebpackPlugin({ 
            template: "./src/index.html",
            filename: "index.html",
            chunks: ['/app']
        })
    ],
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        rules: [{ 
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env", "@babel/preset-react"]
                }
            }
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }]
    },
    devServer: {
        historyApiFallback: {
            rewrites: [
                { from: /^\//, to: '/index.html' }
            ]
        }
    }
}