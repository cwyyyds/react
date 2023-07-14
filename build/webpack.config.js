const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //首先引入我们新安装的依赖插件
const HtmlWebpackPlugin = require("html-webpack-plugin"); //引入html模板插件
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //引入clean-webpack-plugin插件

module.exports = {
  mode: "development", //此行表示我们webpack打包环境是开发环境
  optimization: {
    //添加抽离公共代码插件的配置
    splitChunks: {
      cacheGroups: {
        //打包公共模块
        commons: {
          chunks: "initial", //initial表示提取入口文件的公共部分
          minChunks: 2, //表示提取公共部分最少的文件数
          minSize: 0, //表示提取公共部分最小的大小
          name: "commons", //提取出来的文件命名
        },
      },
    },
  },

  entry: "./src/index.js", //项目的入口文件，是我们新建的index.js文件，它的路径是相对于项目根路径的，所以此处我们写的是“./src”，而不是“../src”
  output: {
    //配置输出信息
    filename: "bundle.js", //打包输出的文件名称，这里是一个写死的名称，后期可以改成按一定规则动态生成
    path: path.resolve(__dirname, "../dist"), //输出的路径，这里的路径针对的是当前目录，所以我们写成了"../dist"，而不是"./dist"
  },

  plugins: [
    new CleanWebpackPlugin(), //实例化clean-webpack-plugin插件
    //然后新建一个plugins属性来实例化这个依赖插件
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css",
    }),

    new HtmlWebpackPlugin({
      //实例化Html模板模块
      template: path.resolve(__dirname, "../index.html"),
    }),
  ],

  module: {
    //通过module属性配置babel-loader
    rules: [
      {
        test: /\.js/,
        use: ["babel-loader?cacheDirectory=true"],
        include: path.join(__dirname, "../src"),
      },
      {
        //最后添加这个依赖插件的配置信息
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../",
            },
          },
          "css-loader",
        ],
      },

      {
        //此处再添加一条rules，用于配置css预处理器信息
        test: /\.less$/,
        use: [
          {
            loader: "style-loader",
          },

          {
            loader: "css-loader",
          },

          {
            loader: "less-loader",
          },

          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "autoprefixer",
                    {
                      // 其他选项
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
      {
        //配置图片静态资源的打包信息
        test: /\.(jpg|png|jpeg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1024,
              fallback: {
                loader: "file-loader",
                options: {
                  name: "img/[name].[hash:8].[ext]",
                },
              },
            },
          },
        ],
      },
      {
        //配置多媒体资源的打包信息
        test: /\.(mp4|webm|ogg|mp3|wav)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1024,
              fallback: {
                loader: "file-loader",
                options: {
                  name: "media/[name].[hash:8].[ext]",
                },
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    //resolve核心配置
    extensions: [".js", ".jsx", ".json"],
    alias: {
      pages: path.join(__dirname, "../src/pages"),
      components: path.join(__dirname, "../src/components"),
      actions: path.join(__dirname, "../src/redux/actions"),
      reducers: path.join(__dirname, "../src/redux/reducers"),
      images: path.join(__dirname, "../src/images"),
    },
  },
  devServer: {
    //配置热更新模块
    hot: true, //热更新
    //host:'0.0.0.0', //允许ip访问
    open: true,
    port: 8888,
    // contentBase: __dirname,
    static: {
      directory: path.join(__dirname, "dist"),
    },
    contentBase: path.join(__dirname, "../dist"),
    compress: true, // gzip压缩
    historyApiFallback: true, // 解决启动后刷新404
    proxy: {
      // 置服务解代 http://Localhost:3000/api/user
      "/aoi": {
        target: "http://localhost:3000",

        pathRewrite: {
          "^/api": "/api",
        },
        changeOrigin: true, // iftarget参数是域名
        // secure: false 资置支https协议代理
      },
    },
  },
};
