const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
	mode: "production",
	entry: "./src/index.ts",
	optimization: {
		minimize: false,
	},
	experiments: {
		outputModule: true,
	},
	target: "node",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "index.js",
		clean: true,
		library: {
			type: "umd2",
		},
		chunkFormat: "module",
	},

	resolve: {
		extensions: [".ts", ".js"],
	},
	externals: [nodeExternals()],
	module: {
		rules: [
			{
				test: /\.ts?$/,
				use: ["ts-loader"],
				exclude: /node_modules/,
			},
		],
	},
	stats: {
		errorDetails: true,
	},
};
