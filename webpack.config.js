const path = require("path");

module.exports = {
	mode: "production",
	entry: "./src/index.ts",
	optimization: {
		minimize: false,
	},
	target: "node",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "index.js",
		clean: true,
		library: {
			type: "commonjs-module",
		},
		chunkFormat: "commonjs",
	},

	resolve: {
		extensions: [".ts", ".js"],
	},
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
