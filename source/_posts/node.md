---
title: node
date: 2022-12-14 22:45:38
tags:
- Frontend
- Tool
categories:
- [Frontend, Tool]
thumbnail: https://cdn-media-1.freecodecamp.org/images/1*DF0g7bNW5e2z9XS9N2lAiw.jpeg
---

# Node

## Node 简介

基于 Chrome V8 引擎的 JavaScript 运行环境

* Node 与 浏览器均存在互不拥有的 API
* Node.js 中你可以控制环境即控制运行时的 JS 版本
* Node.js 使用 CommonJS 模块系统，浏览器使用 ES Modules 标准

## Node 内置 API

process 核心进程
fs
path
http

## Node 第三方框架

express 构建 Web 应用
electron 构建桌面应用
restify 构建 API 接口项目
读写数据库
实用命令行工具

### Node 简单命令

`node -v` 查看 Node 版本号

`node -h` 查看 Node 的命令帮助

`node <filename|filepath>` 执行给定文件名或路径的 js 文件

`node` 进入 node 交互运行模式

终端快捷键
↑  自动定位至上一条命令
TAB  自动补全路径
ESC  快速清空当前输入命令
cls  清空终端

### process 模块

node 内置模块
隐式导入

`process.exit(<exitCode>)` 关闭正在执行的 node 进程

`process.exitCode` 规定 node 进程的退出码

`process.env` 读取 node 进程启动时设置的所有环境变量

### fs 模块

node 内置模块

`fs.open(<filepath>, <open-mode>, (<err>, <fd>) => {})` 获取文件描述符（？）

`fs.readFile(<filepath>, (<err>, <stats>) => {})` 读取文件属性

`stats.isFile()` 和 `stats.isDirectory()` 判断文件是否目录或文件
`stats.size` 获取文件的大小

`fs.readFile(<filepath>, [options], (<err>, <data>) => {})` 读取文件内容

会将文件的全部内容读取至内存中，对于大文件使用流更好

`fs.writeFile(<filepath>, data,[options], (<err>) => {})` 写文件内容

仅在将全部内容写入文件才会结束执行，对于数据量较大的使用流更好

以上函数均有`sync`后缀的同步版本函数

在读取文件时，存在相对路径 `./` `../`，运行时可能会存在问题，一般推荐使用 path 模块动态拼接文件完整路径（如 `__dirname + '/<filename>'`）或使用绝对路径

`__dirname` 脚本文件当前的目录路径
D:\程序\前端学习new\Node-eg
`__filename` 脚本文件当前的绝对路径
D:\程序\前端学习new\Node-eg\index.js

### path 模块

node 内置模块

`path.join([...paths])` 将多个路径片段拼接为完整的路径字符串

`path.basename(<filepath>)` 获取文件名部分
`path.basename(<filepath>, path.extname(<filepath>))` 获取文件名不含扩展名部分

`path.dirname(<filepath>)` 获取文件的父文件夹部分

`path.extname(<filepath>)` 获取文件扩展名部分

`path.resolve()` 获得相对路径的绝对路径计算
可以在第一个参数的基础上指定路径，以使第二个参数附加第一个参数

需要注意的是，path模块方法仅做单纯的计算而不会主动判断路径的存在与否

### http 模块

node 内置模块

基于js语言创建本地服务器

* IP 地址
  ip 地址是互联网上各计算机的唯一地址
  如 `192.169.1.1`
  有 ipv4 与 ipv6
* 域名
  使用字符串对域名进行唯一的标识
* 域名服务器
  负责解析域名并转换为IP地址
* 端口
  区分服务器上不同的服务
  *一个服务器只能对应单个服务*
  默认端口是80端口

`http.createServer()` 创建 http 服务器对象

`Serve.prototype.on()` 规定监听http请求的回调函数

`Serve.prototype.listen()` 启动 HTTP 服务器并监听http请求

实现基于url的响应
1 获取url地址
2 设置默认返回内容
3 处理数据并返回

### express 库

基于 node 的 web 开发框架

快速创建 API 接口服务器与 Web 网站服务器

```js
// 导入
const express = require('express');

// 创建服务器
const app = express();

// 启动服务器
app.listen(8000, () => {
  console.log('express server running at http://127.0.0.1:8000');
});

// 监听请求
//    req 请求对象
//    res 响应对象
app.get('/:id/user', (req, res) => {

  // 获取查询参数 `req.query`

  // 获取动态参数{如 /:id/} `req.params`

  // 发送请求内容 `res.send()`
  res.send('get!!!');

});

// 托管静态资源|注册全局中间件
//   外部 http://localhost:8000/0.css
//   内部 /public/0.css
// 托管多个静态资源目录，只需多次调用 express.static() 方法
app.use(express.static('public'));
// 挂载路径前缀
//   外部 http://localhost:8000/static/0.css
//   内部 /public/0.css
app.use('/static/', express.static('public'));
```

### nodemon

监听本地项目文件变动并自动重启项目（类似前端 live server 的作用）

直接使用 nodemon file 指令执行项目

### express 路由

一种映射关系，express中指的是客户端的请求与服务器处理函数之间的映射关系
app.METHOD(PATH, HANDLER)

路由模块化

```js
// router.js
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {});
router.post('/', (req, res) => {});

module.exports = router;

// main.js
...
const router = require('./router.js');
app.use(router);
```

### express 中间件

请求过程中可以调用中间件对请求进行多次预处理

实质是一个 function

next 函数实现多个中间件连续调用，表示启用下一个中间件

```js
// 全局注册中间件
app.use((req, res, next) => {
  console.log('mid');
  next();
});
// 同时注册多个中间件只需多次调用app.use即可

// 局部注册中间件
app.post('/', (req, res, next) => {}, (req, res) => {});
```

需在路由之前注册中间件
可以对请求调用多个中间件进行处理
注意执行完中间件代码，需调用next方法
调用next方法后不应执行其他的任何的代码
连续多个中间件之间共享req与res对象

### CORS

使用 cors 包

```js
const cors = require('cors');

app.use(cors());
```

只需服务器做配置，客户端无需做额外的配置

响应头部带 Access-Control-Allow-Origin 字段，表示允许来源的域的名称
Access-Control-Allow-Headers 声明允许的请求头字段，Accept Accept-Language Content-Language DPR Downlink Save-Data Viewport-Width Width Content-Type
Access-Control-Allow-Methods 声明允许的请求方法，默认GET POST HEAD可，其他均需声明

* 简单请求
  请求方式与请求头部字段有限

* 预检请求（预先发送OPTION请求确定是否可请求，仅成功后才会发送实际请求）
  其他

### mysql.js

在 node 中访问 MySQL 数据库的 js 库

### Web 开发模式

1. 基于服务端渲染的传统 Web 开发模式
   页面由服务器动态生成
   前端耗时少
   利于SEO
   占用服务器端资源
   不利于前后端分离开发效率低
2. 基于前后端分离的新型 Web 开发模式
   依赖于 Ajax 技术，即前端使用接口，后端提供接口
   开发体验好
   用户体验好
   减轻服务器端渲染压力
   不利于SEO

### 身份认证

出于安全性考虑，需要对用户身份进行认证

（服务器渲染）Session 认证机制
（前后端分离）JWT 认证机制

### Session 认证机制

* HTTP 协议的无状态性

HTTP 请求独立，服务器无法主动保留每次 HTTP 请求的状态

* 突破无状态性

使用 Cookie

* Cookie

一段存储在用户浏览器中的字符串
可以存储一些特有信息
由名称、值及一些可选属性（有效期、安全性、使用范围等）构成
不同域名下Cookie相互独立
每次客户端请求均会自动发送当前域名下所有未过期的Cookie

```http
<!-- 设置cookie -->
Set-Cookie: token=1dw21qde43s;
<!-- 发送cookie -->
Cookie: token=1dw21qde43s;
```

客户端登录，服务器生成对应的cookie发回客户端保存；之后客户端每次请求均将带cookie，服务器需验证通过后再进行操作返回响应内容

