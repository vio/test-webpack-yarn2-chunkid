const path = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleStatsWebpackPlugin } = require('bundle-stats-webpack-plugin');
const { StatsWriterPlugin } = require('webpack-stats-plugin');

const SRC_DIR = path.resolve(__dirname, 'src');
const OUT_DIR = path.resolve(__dirname, 'dist');

module.exports = {
  context: SRC_DIR,
  entry: './index.jsx',
  output: {
    path: OUT_DIR,
    filename: '[name].bundle.[contenthash].js',
    chunkFilename: '[name].chunk.[contenthash].js',
    assetModuleFilename: '[path][name].[contenthash][ext][query]',
    hashDigestLength: 8,
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        include: [SRC_DIR],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlPlugin({
      title: 'Example webpack code splitting',
      template: './index.html',
      publicPath: '/',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].bundle.[contenthash].css',
      chunkFilename: '[name].chunk.[contenthash].css',
    }),
    // Ignore moment locale require error
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
    new BundleStatsWebpackPlugin({
      outDir: '../artifacts'
    }),
     new StatsWriterPlugin({
      filename: '../artifacts/webpack-stats.json',
      stats: {
        assets: true,
        entrypoints: true,
        chunks: true,
        modules: true
      }
    })
  ],
  devServer: {
    historyApiFallback: true,
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all'
    },
  },
};
