---
title: webpack
date: 2022-12-14 22:06:02
tags:
- Frontend
- Tool
categories:
- [Frontend, Tool]
thumbnail: http://webmobtuts.com/wp-content/uploads/2018/04/tutorial-webpack-4-featured.png
---

# 前端工程化

* 模块化
    * js模块化
    * css模块化
    * 资源模块化
* 组件化
    * 复用UI结构、样式、行为
* 规范化
    * 目录结构划分
    * 编码规范化
    * 接口规范化
    * 文档规范化
    * git分支管理
* 自动化
    * 自动化构建
    * 自动部署
    * 自动化测试

标准化企业级项目开发过程：工具、技术、流程、经验

grunt gulp => webpack(主) parcel => vite

# webpack

前端项目工程化

* 代码压缩混淆
* 处理JavaScript兼容性
* 性能优化

## 安装webpack

`npm i webpack webpack-cli -D`

## 配置webpack

在webpack.config.js文件内
保存webpack的打包设定

```js
// 导入 path 包
const path = require('path');

module.exports = {
    /**
     * mode     标记构建模式
     *  development 开发模式  不会代码压缩或性能优化  打包速度快
     *  production  发布模式  会代码压缩与性能优化  打包速度慢
     *  none 无模式
    */
    mode: 'development',
    /**
     * entry    输入文件路径，开始打包的文件路径
     *
     * __dirname：当前文件绝对路径
    */
    entry: path.join(__dirname, './src/index.js'),
    /**
     * output   输出设定
     */
    output: {
        /**
         * path     输出文件路径
         */
        path: path.join(__dirname, './dist'),
        /**
         * filename     输出文件名称
         */
        filename: 'main.js',
    },
}
```

在package.json文件内

```json
"scripts": {
    "dev": "webpack"
}
```

## 使用webpack

`npm run dev`

---

## webpack-dev-server

实时更新修改文件，从而能够随时观察编辑效果
实际搭建一个本地服务器，把实时改变的文件放在内存内，以加快访问速度

1. 安装 `npm i webpack-dev-server -D`
2. 修改 package.json 文件如下：

    ```json
    "scripts": {
        "dev": "webpack serve"
    }
    ```

3. 可通过 `npm run dev` 编译
4. 访问 <https://localhost:8080>

配置 webpack.config.js

```js
    {
        devServer: {
            /**
             * 初次打包完成后自动打开浏览器
            */
            open: true,
            /**
             * 指定host名
            */
            // host: '127.0.0.1',
            /**
             * 指定端口
            */
            // port: 8080,
        },
    }
```

---

## html-webpack-plugin

编译时实时移动 html 文件至项目根目录
自动注入项目打包后的 js 文件和其他文件

1. 安装 `npm i html-webpack-plugin -D`
2. 配置 webpack.config.js

```js
    // 导入 HtmlPlugin 包
    const HtmlPlugin = require('html-webpack-plugin');

    // 添加 plugins 设置
    {
        plugins: [
            new HtmlPlugin({
                template: './src/index.html',
                filename: './index.html',
            }),
        ],
    }
```

---

## loader

由于 webpack 仅可处理 js 及 json 文件
加载器：协助 webpack 处理特定的文件模块

* css-loader 处理 css 文件
* less-loader 处理 less 文件
* babel-loader 处理高级 js 语法

### CSS-loader

协助处理 css 文件

1. 安装 `npm i style-loader css-loader -D`
2. 配置 webpack.config.js 内的 module 选项

    ```js
        {
            // 第三方模块的匹配规则
            module: {
                // 规则数组
                rules: [
                    {
                        // 正则表达式匹配的文件类型
                        test: /\.css$/,
                        // 使用的 loader
                        // 特别的： loader 中的顺序不可交换，会按从后往前的顺序调用
                        use: [
                            'style-loader',
                            'css-loader',
                        ],
                    }
                ],
            },
        }
    ```

3. 在 index.js 中导入 css 文件
   `import './css/index.css';`

### less-loader

协助处理 less 文件

1. 安装 `npm i less less-loader -D`
2. 配置 webpack.config.js 内的 module 选项

    ```js
        {
            module: {
                rules: [
                    {
                        test: /\.less$/,
                        use: [
                            'style-loader',
                            'css-loader',
                            'less-loader',
                        ],
                    },
                ],
            },
        }
    ```

3. 在 index.js 中导入 less 文件
   `import './css/index.less';`

### url-loader&file-loader

协助处理图片
会把给定限制大小下的图片转为base64编码，否则仍使用url导入的方式

1. 安装 `npm i url-loader file-loader -D`
2. 配置 webpack.config.js 内的 module 选项

    ```js
        {
            module: {
                rules: [
                    {
                        test: /\.jpg|png|gif$/,
                        // limit 指定转换图片的阈值
                        use: 'url-loader?limit=8192',
                    },
                ],
            },
        }
    ```

3. 在 index.js 中导入图片
   `import logo from './images/icon.png';`
4. 给img标签赋值
   `$('#img').attr('src', logo);`

### babel-loader

1. 安装 `npm i babel-loader @babel/core @babel/plugin-proposal-decorators -D`
2. 配置 webpack.config.js 内的 module 选项

    ```js
        {
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        use: 'babel-loader',
                        exclude: /node_modules/,
                    },
                ],
            },
        }
    ```

3. 配置 babel.config.js

   ```js
    module.exports = {
        plugins: [
            [
                '@babel/plugin-proposal-decorators',
                {
                    legacy: true,
                },
            ],
        ],
    }
   ```

---

## 打包发布

package.json 配置

```json
    "scripts": {
        // --mode production 指定发布时模式为 production
        "build": "webpack --mode production"
    }
```

优化js路径

```js
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'js/main.js',
    }
```

优化img路径

```js
    {
        test: /\.jpg|png|gif$/,
        use: {
            loader: 'url-loader',
            options: {
                limit: 10240,
                outputPath: 'images',
            },
        },
    },
```

配置清理 dist 目录 clean-webpack-plugin

1. 安装 `npm i clean-webpack-plugin -D`
2. 导入与配置 webpack.config.js

   `const {CleanWebpackPlugin} = require('clean-webpack-plugin');`

    ```js
        plugins: [
            new HtmlPlugin({
                template: './src/index.html',
                filename: './index.html',
            }),
            new CleanWebpackPlugin(),
        ],
    ```

## Source Map

信息文件，保存打包前代码的详细位置信息

webpack.config.js 添加 `devTools: 'eval-source-map'` 选项

建议发布时去除 source map 选项

只定位行号，不暴露源码：`nosources-source-map` 设定
定位行号且暴露源码：`source-map` 会生成一个独立文件

## 使用@导入文件

* 配置

```js
    resolve: {
        alias: {
            '@': path.join(__dirname, './src/'),
        },
    },
```

* 使用
  `import msg from '@/msg.js';`

