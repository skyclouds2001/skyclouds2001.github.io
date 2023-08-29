---
title: Service Worker
date: 2023-08-26 15:13:32
tags:
- Frontend
- JavaScript
- Browser
categories:
- [Frontend, Other]
thumbnail:
---

## Service Worker 概念

Service Worker 本质上充当位于 Web 应用程序、浏览器和网络（如果可用）之间的代理服务器，可以用于创建有效的离线体验、拦截网络请求并根据网络是否可用采取适当的操作，以及更新服务器上的资产，此外还可以用于实现推送通知和后台同步等功能。

Service Worker 是针对源和路径注册的事件驱动 Worker。它采用 JavaScript 文件的形式，可以控制与之关联的网页/站点，拦截和修改导航和资源请求，并以非常精细的方式缓存资源，从而可以以完全控制应用程序的行为（最明显的一种是网络不可用时的回退方案）。

Service Worker 在 Worker 上下文中运行：因此它没有 DOM 访问权限，并且在与为应用程序提供支持的主 JavaScript 不同的线程上运行，因此它是**非阻塞**的。并且，它被设计为**完全异步**；因此，同步 `XMLHttpRequest` 和 `Web Storage` 等 API 无法在 Service Worker 内部使用。

Service Worker **无法动态导入** JavaScript 模块，如果在 Service Worker 全局范围内调用 `import()`，则会抛出异常，仅允许使用 `import` 语句进行静态导入。

出于安全原因，Service Worker 只能在**安全上下文**中运行（可以通过全局变量 isSecureContext 来判断）。

## Service Worker 使用

### 注册

Service Worker 的注册通过调用 `window.navigator.serviceWorker.register` 方法实现。

```js
/* in client */
window.navigator.serviceWorker.register(
  './service-worker.js', // Service Worker 脚本的 URL | 相对当前页面的范围
  {
    scope: '/', // 定义 Service Worker 注册范围的 URL 的字符串（需收窄于当前页面的范围）
    type: 'module', // 指定要创建的 Service Worker 类型 - 'classic' 或 'module'
    updateViaCache: 'all', // 指示在更新期间如何将 HTTP 缓存用于 Service Worker 脚本资源 - 'all' 或 'imports' 或 'none'
  }
).then((registration) => {
  // 返回一个 ServiceWorkerRegistration 实例
  console.log('client | registration success', registration);
}).catch((error) => {
  console.log('client | registration fail', error);
})
```

> `window.navigator.serviceWorker` 属性暴露一个 `ServiceWorkerContainer` 实例。
>
> `ServiceWorkerContainer` 接口提供了管理 Service Worker 的方法，包括注册、取消注册和更新以及访问状态。
>
> `ServiceWorkerRegistration` 接口代表注册的 Service Worker。

### 生命周期

Service Worker 生命周期依次是安装、激活和运行

成功注册后，Service Worker 将会在空闲时终止，以节省内存和处理器电量。活动的 Service Worker 会自动重新启动以响应事件。

* 安装阶段，在 Service Worker 注册成功之后，浏览器开始下载 Service Worker 脚本（在 `ServiceWorkerGlobalScope` 上触发 `install` 事件）
* 激活阶段，在安装完成之后，浏览器开始激活 Service Worker 的阶段（在 `ServiceWorkerGlobalScope` 上触发 `activate` 事件）
* 运行阶段，在激活完成之后，ServiceWorker开始运行的阶段

```js
/* in worker */
self.addEventListener('install', (e) => {
  // 返回一个 `ExtendableEvent` 实例
  console.log('worker | install', e)
})

self.addEventListener('activate', (e) => {
  // 返回一个 `ExtendableEvent` 实例
  console.log('worker | activate', e)
})
```

> `ServiceWorkerGlobalScope` 接口代表 Service Worker 的全局上下文，通过 self 或者 globalThis 全局变量访问（继承自 `WorkerGlobalScope`）。
> `ServiceWorkerGlobalScope` 接口的 `install` 事件在获取新的 Service Worker 时触发。
> `ServiceWorkerGlobalScope` 接口的 `activate` 事件在获取新的 Service Worker 时触发。
>
> `ExtendableEvent` 接口延长了 `ServiceWorkerGlobalScope` 接口的 `install` 事件和 `activate` 事件的生命周期（继承自 `Event`）。
>
> * 该接口的 `waitUntil` 方法，可以用于表示事件调度程序工作正在进行中并延迟生命周期的完成直至传递的 Promise 被解决。
>   * 在 `install` 事件中，waitUntil 方法将 Service Worker 保持在安装阶段，直到任务完成；若 Promise 被拒绝，则安装被视为失败，并且正在安装的 Service Worker 将被丢弃。
>   * 在 `activate` 事件中，waitUntil 方法用来缓冲功能事件，从而可以更新数据库架构并删除过时的缓存，保证正式运行时使用的是最新的架构。

### 全局属性方法和事件

ServiceWorkerGlobalScope 接口从 WorkerGlobalScope 接口继承了一些属性、方法和事件。

* `ServiceWorkerGlobalScope` 接口的 `error` 事件在 Service Worker 内发生脚本错误时触发。

```js
/* in worker */
self.addEventListener('error', (e) => {
  // 返回一个 `Event` 实例
  console.log('worker | error', e)
})
```

* `ServiceWorkerGlobalScope` 接口的 `languagechange` 事件在用户的首选语言更改时触发。

```js
/* in worker */
self.addEventListener('languagechange', (e) => {
  // 返回一个 `Event` 实例
  console.log('worker | languagechange', e)
})
```

* `ServiceWorkerGlobalScope` 接口的 `online` 事件在浏览器获得网络访问权限并且 `navigator.onLine` 值切换到 `true` 时触发。

```js
/* in worker */
self.addEventListener('online', (e) => {
  // 返回一个 `Event` 实例
  console.log('worker | online', e)
})
```

* `ServiceWorkerGlobalScope` 接口的 `offline` 事件在浏览器获得网络访问权限并且 `navigator.onLine` 值切换到 `false` 时触发。

```js
/* in worker */
self.addEventListener('offline', (e) => {
  // 返回一个 `Event` 实例
  console.log('worker | offline', e)
})
```

* `ServiceWorkerGlobalScope` 接口的 `rejectionhandled` 事件在 Service Worker 内处理的 Promise 拒绝事件时触发。

```js
/* in worker */
self.addEventListener('rejectionhandled', (e) => {
  // 返回一个 `Event` 实例
  console.log('worker | rejectionhandled', e)
})
```

* `ServiceWorkerGlobalScope` 接口的 `unhandledrejection` 事件在Service Worker 内未处理的 Promise 拒绝事件时触发。

```js
/* in worker */
self.addEventListener('unhandledrejection', (e) => {
  // 返回一个 `Event` 实例
  console.log('worker | unhandledrejection', e)
})
```

### 消息传递

#### Client 至 Worker

```js
/* in client */
window.navigator.serviceWorker.ready.then((registration) => {
  registration.active.postMessage('message from client')
})

/* in worker */
self.addEventListener('message', (e) => {
  console.log('worker | message', e)
})

self.addEventListener('messageerror', (e) => {
  console.log('worker | messageerror', e)
})
```

#### Worker 至 Client

```js
/* in worker */
global.clients.matchAll().then((clients) => {
  clients.forEach((client) => {
    client.postMessage('message from client')
  })
})

/* in client */
window.navigator.serviceWorker.addEventListener('message', (e) => {
  console.log('client | message', e)
})

window.navigator.serviceWorker.addEventListener('messageerror', (e) => {
  console.log('client | messageerror', e)
})
```

> `ServiceWorkerGlobalScope` 接口与 `ServiceWorkerContainer` 接口的 `message` 事件返回一个 `ExtendableMessageEvent` 实例（继承自 `ExtendableEvent`），在接收到传入消息时触发。
> `ServiceWorkerGlobalScope` 接口与 `ServiceWorkerContainer` 接口的 `messageerror` 事件返回一个 `MessageEvent` 实例（继承自 `Event`），在接收到传入消息解析失败时触发。
> `ExtendableMessageEvent` 接口同时实现了 `MessageEvent` 接口与 `ExtendableEvent` 接口。

### 请求拦截

当主应用程序线程发出网络请求时，会在 Service Worker 的全局范围内触发 `fetch` 事件。

* `ServiceWorkerGlobalScope` 接口的 `fetch` 事件返回一个 `FetchEvent` 实例（继承自 `ExtendableEvent`），在主应用程序线程发生网络请求时触发。

请求类型包括来自主线程的显式调用，还包括浏览器在页面导航后发出的加载页面和子资源（例如 JavaScript、CSS 和图像等）的隐式网络请求，甚至包括来自浏览器安装的插件产生的网络请求。

> * `FetchEvent` 接口的 `request` 属性返回一个 `Request` 实例，代表将触发事件处理程序的对象。

通常使用 `request` 属性获取到请求的相关信息，如其 `url` 参数获取到请求的目标 URL。

> * `FetchEvent` 接口的 `respondWith()` 方法阻止浏览器的默认请求处理，并允许使用自定义的 `Response` 替代，其接收一个 `Response` 实例或者 `Promise<Response>` 实例的实例。

`respondWith()` 方法对于给定的请求只能调用该方法一次。如果 `fetch` 添加了多个事件监听器，它们将按照注册的顺序被调用，直到其中一个事件监听器调用该方法。

`respondWith()` 方法必须同步调用：也就是说，不能在 then 处理方法回调中调用该方法。

如果 `respondWith()` 未在处理程序中调用，则用户代理会自动发出原始网络请求。

```js
/* in worker */
self.addEventListener('fetch', (e) => {
  console.log('client | fetch', e)

  if (e.request.url.includes('/success')) {
    e.respondWith(Response.json({
      data: 'data',
    }))
  }
  if (e.request.url.includes('/error')) {
    e.respondWith(Response.error())
  }
  if (e.request.url.includes('/redirect')) {
    e.respondWith(Response.redirect('/override/success'))
  }
})

/* in client */
fetch('/override/success').then(console.log).catch(console.warn)
fetch('/override/error').then(console.log).catch(console.warn)
fetch('/override/redirect').then(console.log).catch(console.warn)
```
