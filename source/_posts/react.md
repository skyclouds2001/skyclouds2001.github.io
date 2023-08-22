---
title: react
date: 2022-12-14 21:47:54
tags:
- Frontend
- JavaScript
- FrameWork
categories:
- [Frontend, FrameWork]
thumbnail: https://tse4-mm.cn.bing.net/th/id/OIP-C.33CwBYkmnMfpA9Djup22JwHaHa
---

# React

## React 概述

### React 概念

React 用于构建用户界面的 JavaScript 库

MVC 中的 V {视图层}

### React 特点

声明式
基于组件
应用范围广

## react 基本使用

### react 安装

`npm i react react-dom`

### react 使用

```html
<script type="text/javascript" src="./node_modules/react/umd/react.development.js"></script>
<script type="text/javascript" src="./node_modules/react-dom/umd/react-dom.development.js"></script>
```

```js
const title = React.createElement('h1', null, 'Hello React');
ReactDOM.render(title, document.getElementById('root'));
```

React.createElement
返回 React 元素
第一个参数为元素名
第二个参数为元素属性
第三个及之后的参数为元素的子节点

ReactDOM.render
第一个参数为要渲染的 react 元素
第二个参数为将挂载的 DOM 对象

## React 脚手架使用

`npx create-react-app <my-app>`

npx 在不安装脚手架包情况下使用脚手架包提供的命令

`npm init react-app <my-app>`
`yarn create react-app <my-app>`

导入 React

创建 React 元素

渲染 React 元素

## JSX 概述

### JSX 基本使用

比 createElement 简洁

在 JS 中书写 HTML 格式代码

```js
const title = <h1>Hello JSX</h1>;
const root = document.getElementById(root);
ReactDOM.render(title, root);
```

### JSX 注意点

React 元素属性名使用驼峰命名法

class 属性需替换为 className 属性
for 属性需替换为 htmlFor 属性

无子节点的元素可以以单标签形式写

建议使用小括号包裹 JSX

### JSX 嵌入 JS 表达式

单大括号

```js
const title = <h1>Hello JSX</h1>;
const root = document.getElementById(root);
ReactDOM.render(title, root);
```

允许使用任意的 JS 表达式
但使用对象可能会出现 bug
不能使用任意的 JS 语句

### 条件渲染

函数 - ifelse
函数 - 三元表达式
函数 - 逻辑与运算符

### 列表渲染

使用数组 map 方法实现

```js
const array = [1, 2, 3, 4, 5]
const list = (
  <ul>
    {array.map(v => <li key={v}>{v}</li>)}
  </ul>
)
```

### 样式处理

行内样式

`<h1 style={{ color: red; }}></h1>`

类名 className

## React 组件介绍

使用 React 组件介绍
从而实现完整的页面功能

### 函数组件

使用函数创建组件

* 函数名称必须以大写字母开头
* 函数组件必须有返回值，表示组件内容 | 返回值为 null，为无内容

渲染组件，直接使用函数名为组件标签名

### 类组件

使用 class 类创建组件

* 类名称必须以大写字母开头
* 类组件需继承 React.component 父类，以使用父类提供的方法
* 类组件需提供 render 方法，且应有返回值，表示组件将渲染的内容

### 独立文件

单独组件放在单个JS文件内

### 事件绑定

示例如 `onClick={ () => {} }`
采用驼峰命名法

### 事件对象

合成事件（包含原生事件）
兼容性好

### 组件分类

函数组件 - 无状态组件
类组件 - 有状态组件

状态 - 数据

组件状态是私有的

受控组件 - value 绑定 state 变量，监听 change 事件实时改变 state 变量

非受控组件 - |

## 组件高级

### 组件通讯

组件 props | 父组件=>子组件

可以传递各种数据，包括对象、函数乃至JSX等
props 只读

* 父->子 props属性传数据
* 子->父 props属性传回调方法
* 兄弟<->兄弟 状态共享至公共父组件，由公共父组件负责管理

跨多个组件的通讯 context
Provider 传送数据
Customer 接纳数据

props.children 组件标签的子节点

props 校验

使用 prop-types

设置propTypes
支持 array bool func number object string bigint symbol
element node elementType
instanceOf
oneOf oneOfType
arrayOf objectOf
required
shape
设置defaultProps

### 组件生命周期

仅类组件有生命周期

* 创建时
    * constructor 初始化state 绑定this
    * render 渲染UI
    * componentDidMount 发送网络请求 DOM操作
* 更新时
    * render
    * componentDidUpdate
* 卸载时
    * componentWillUnmount

### 组件复用

* render props 模式

  将单独的state及state方法封装为单独的组件
  利用 prop 传递参数
  传递函数以函数返回值作为将渲染的 UI 内容（或使用 children）

* 高阶组件 HOC

  函数
  接受需包装的组件，返回增强的组件
  （名称约定以 with 开头）
  组件配置 displayName 作为组件名称

### 路由

SPA 单页面应用，单HTML页面的web应用程序

路由 - 配对路径何组件

1. 安装 react-router-dom
2. 导入组件 `import { BrowserRouter as Router, Route, Link } from 'react-router-dom'`
3. Router 组件包裹整个应用
4. Link 作为路由入口
5. Route 配置路由规则和需要展示的组件|路由出口

Router 组件包裹整个应用，仅使用一次
包括 BrowserRouter 和 HashRouter

Link 组件作为导航链接
Route 组件指定路由展示组件相关信息

编程式导航
this.props.history.push
this.props.history.go

默认路由
path为 / 的路由

默认 route 遵从模糊匹配
设置 extra 遵从精确匹配

