---
title: ServiceWorker I
date: 2023-08-26 15:13:32
tags:
  - Frontend
  - Web API
categories:
  - Frontend
  - Web API
thumbnail:
toc: true
recommend: 1
keywords:
uniqueId: '2023-08-26 15:13:32/ServiceWorker I.html'
mathJax: false
---

## ServiceWorker 概念

ServiceWorker 本质上充当位于 Web 应用程序、浏览器和网络（如果可用）之间的代理服务器，可以用于创建有效的离线体验、拦截网络请求并根据网络是否可用采取适当的操作，以及更新服务器上的资产，此外还可以用于实现推送通知和后台同步等功能。

ServiceWorker 是针对源和路径注册的事件驱动 Worker。它采用 JavaScript 文件的形式，可以控制与之关联的网页/站点，拦截和修改导航和资源请求，并以非常精细的方式缓存资源，从而可以以完全控制应用程序的行为（最明显的一种是网络不可用时的回退方案）。

ServiceWorker 在 Worker 上下文中运行：因此它没有 DOM 访问权限，并且在与为应用程序提供支持的主 JavaScript 不同的线程上运行，因此它是**非阻塞**的。并且，它被设计为**完全异步**；因此，同步 `XMLHttpRequest` 和 `Web Storage` 等 API 无法在 ServiceWorker 内部使用。

ServiceWorker **无法动态导入** JavaScript 模块，如果在 ServiceWorker 全局范围内调用 `import()` 进行动态导入，则会抛出异常，仅允许使用 `import` 语句进行静态导入。同时创建时需指定 ServiceWorker 为模块 Worker。

出于安全原因，ServiceWorker 只能在**安全上下文**中运行（可以通过全局变量 `isSecureContext` 来判断是否处于安全上下文）。

## ServiceWorker 生命周期

ServiceWorker 生命周期依次是*安装*、*激活*和*运行*：

成功注册后，ServiceWorker 将会在空闲时终止，以节省内存和处理器电量。活动的 ServiceWorker 会自动重新启动以响应事件。

* **安装**阶段，在 ServiceWorker 脚本下载成功之后，浏览器开始安装 ServiceWorker（在 `ServiceWorkerGlobalScope` 上触发 `install` 事件，返回一个 `ExtendableEvent` 事件）
* **激活**阶段，在安装完成之后，浏览器开始激活 ServiceWorker 的阶段（在 `ServiceWorkerGlobalScope` 上触发 `activate` 事件，返回一个 `ExtendableEvent` 事件）
* **运行**阶段，在激活完成之后，ServiceWorker开始运行的阶段

> `ExtendableEvent` 事件的 `waitUntil` 方法，可以用于表示事件调度程序工作正在进行中并延迟生命周期的完成直至传递的 Promise 被解决。
>
> 在 `install` 事件中，waitUntil 方法用于初始化 ServiceWorker，用于将 ServiceWorker 保持在安装阶段，直到任务完成；若 Promise 被拒绝，则安装被视为失败，并且正在安装的 ServiceWorker 将被丢弃。
>
> 在 `activate` 事件中，waitUntil 方法用来缓冲功能事件，从而可以更新数据库架构并删除过时的缓存，保证正式运行时使用的是最新的架构。

## ServiceWorker 基本使用

浏览器端 通过访问`window.navigator.serviceWorker` 属性获取 `ServiceWorkerContainer` 接口实例，包含各种管理 ServiceWorker 的方法，如注册、取消注册、更新以及读取状态。

### 注册

ServiceWorker 的注册通过调用 `ServiceWorkerContainer` 接口的 `register()` 方法实现。

方法接收一个参数，代表 ServiceWorker 脚本的 URL。

方法亦可接收一个配置项参数：

可选的 scope 参数定义 ServiceWorker 的注册范围，值默认设置为 ServiceWorker 脚本所在的目录。

可选的 type 参数指定要创建的 ServiceWorker 的类型，值可以是 `'classic'` 或 `'module'`。`'classic'` 代表 Worker 内部使用标准脚本模式；`'module'` 代表 Worker 内部使用模块脚本模式。

可选的 updateViaCache 参数指示在更新期间如何将 HTTP 缓存用于 ServiceWorker 脚本资源，值可以是 `'all'` 或 `'imports'` 或 `'none'`。`'all'` 代表 ServiceWorker 脚本资源和其导入的脚本资源均使用 HTTP 缓存，`'imports'` 代表仅 ServiceWorker 脚本资源不使用 HTTP 缓存，其导入的脚本资源使用 HTTP 缓存，`'none'` 代表 ServiceWorker 脚本资源和其导入的脚本资源均不使用 HTTP 缓存。

返回一个 `ServiceWorkerRegistration` 接口实例，代表注册的 ServiceWorker 对象。

```js
window.navigator.serviceWorker.register(
  './service-worker.js',
  {
    scope: '/',
    type: 'module',
    updateViaCache: 'all',
  }
)
```

> 关于 scope 参数的举例
>
> * 页面 `/` 与 ServiceWorker 脚本路径 `/sw.js` 允许控制 `/` 以下的页面
>
> * 页面 `/product` 与 ServiceWorker 脚本路径 `/product/sw.js` 与 scope `./` 允许控制 `/product` 以下的页面
>
> * 页面 `/` 与 ServiceWorker 脚本路径 `/sw.js` 与 scope `/product/`允许控制 `/product` 以下的页面

### 更新

ServiceWorker 的更新通过调用与 ServiceWorker 对应的 `ServiceWorkerRegistration` 接口的 `update()` 方法实现。

返回一个 Promise 的 `ServiceWorkerRegistration`。

```js
navigator.serviceWorker.ready.then((registration) => {
  registration.addEventListener('updatefound', () => {
    registration.update()
  })
})
```

### 卸载

ServiceWorker 的卸载通过调用对应的 `ServiceWorkerRegistration` 接口实例的 `unregister()` 方法实现。

返回一个 Promise 的布尔值，表示是否卸载成功。

```js
navigator.serviceWorker.ready.then((registration) => {
  window.addEventListener('beforeunload', () => {
    registration.unregister()
  })
})
```

## ServiceWorker 补充

当用户首次访问 ServiceWorker 控制的站点/页面时，ServiceWorker 会立即下载。

之后，它会在导航到范围内的页面或在 ServiceWorker 上触发了一个事件且未在过去 24 小时内下载的情况下更新。

当发现下载的文件是新的时，就会尝试安装 - 要么与现有的 ServiceWorker 不同（按字节比较），要么与此页面/站点遇到的第一个 ServiceWorker 不同。

如果这是首次使 ServiceWorker 可用，则会尝试安装，然后在成功安装后将其激活。

但如果存在可用的现有 ServiceWorker，则新版本会在后台安装，但尚未激活 - 此时它称为等待中的 Worker。仅当不再加载任何仍在使用旧 ServiceWorker 的页面时，它才会被激活。一旦没有更多页面需要加载，新的 ServiceWorker 就会激活（成为活动 ServiceWorker）。不过可以手动提前终止当前 ServiceWorker 并启用新的 ServiceWorker。

## 源码链接

* [https://github.com/skyclouds2001/Frontend-Learning/blob/main/next-learning/service-worker.html](https://github.com/skyclouds2001/Frontend-Learning/blob/main/next-learning/service-worker.html)
* [https://github.com/skyclouds2001/Frontend-Learning/blob/main/next-learning/service-worker.js](https://github.com/skyclouds2001/Frontend-Learning/blob/main/next-learning/service-worker.js)
