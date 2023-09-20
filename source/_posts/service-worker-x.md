---
title: service-worker-x
date: 2023-09-20 15:04:36
tags:
- Frontend
- Web API
categories:
- [Frontend, Web API]
thumbnail:
---

## Service Worker 使用 - 全局上下文

`ServiceWorkerGlobalScope` 接口代表 Service Worker 的全局上下文，通过 self 全局变量或者 globalThis 全局变量访问（该接口继承自 `WorkerGlobalScope`）。

### `ServiceWorkerGlobalScope`

*以下代表在 `ServiceWorkerGlobalScope` 接口本身的属性、方法和事件*：

* `ServiceWorkerGlobalScope` 接口的 `clients` 属性代表一个 `Clients` 实例，可用于获取 `Client` （可执行上下文）实例。

* `ServiceWorkerGlobalScope` 接口的 `registration` 属性代表一个 `ServiceWorkerRegistration` 实例，即当前 Service Worker 注册的引用。

* `ServiceWorkerGlobalScope` 接口的 `serviceWorker` 属性代表一个 `ServiceWorker` 实例，即当前 Service Worker 实例的引用。

```js
self.clients
self.registration
self.serviceWorker
```

* `ServiceWorkerGlobalScope` 接口的 `skipWaiting` 方法强制当前 Service Worker 从等待状态变成激活状态，返回一个该 Service Worker 激活后完成的 Promise。其在 install 事件的回调中调用才具有实际意义。

```js
self.skipWaiting()
```

* `ServiceWorkerGlobalScope` 接口的 `install` 事件在获取新的 Service Worker 下载时触发（示例见上）。

* `ServiceWorkerGlobalScope` 接口的 `activate` 事件在获取新的 Service Worker 激活时触发（示例见上）。

### `WorkerGlobalScope`

*以下代表继承自 `WorkerGlobalScope` 接口的属性、方法和事件*：

* `WorkerGlobalScope` 接口的 `location` 属性代表一个 `WorkerLocation` 实例，是 `Location` 的字集。

* `WorkerGlobalScope` 接口的 `navigator` 属性代表一个 `WorkerNavigator` 实例，是 `Navigator` 的字集。

* `WorkerGlobalScope` 接口的 `self` 属性代表 `WorkerGlobalScope` 接口本身。

```js
self.location
self.navigator
self.self
```

* `WorkerGlobalScope` 接口的 `importScripts` 方法同步导入一组脚本文件并执行，接受一组参数，代表脚本文件的 URL，其可以为绝对路径或相对路径（相对文档路径）。

```js
self.importScripts()
```

* `WorkerGlobalScope` 接口的 `error` 事件在 Service Worker 内发生脚本错误时触发。

```js
self.addEventListener('error', (e) => {
  // 返回一个 `Event` 实例
  console.log('worker | error', e)
})
```

* `WorkerGlobalScope` 接口的 `languagechange` 事件在用户的首选语言更改时触发。

```js
self.addEventListener('languagechange', (e) => {
  // 返回一个 `Event` 实例
  console.log('worker | languagechange', e)
})
```

* `WorkerGlobalScope` 接口的 `online` 事件在浏览器获得网络访问权限并且 `navigator.onLine` 值切换到 `true` 时触发。

```js
self.addEventListener('online', (e) => {
  // 返回一个 `Event` 实例
  console.log('worker | online', e)
})
```

* `WorkerGlobalScope` 接口的 `offline` 事件在浏览器获得网络访问权限并且 `navigator.onLine` 值切换到 `false` 时触发。

```js
self.addEventListener('offline', (e) => {
  // 返回一个 `Event` 实例
  console.log('worker | offline', e)
})
```

* `WorkerGlobalScope` 接口的 `rejectionhandled` 事件在 Service Worker 内处理的 Promise 拒绝事件时触发。

```js
self.addEventListener('rejectionhandled', (e) => {
  // 返回一个 `Event` 实例
  console.log('worker | rejectionhandled', e)
})
```

* `WorkerGlobalScope` 接口的 `unhandledrejection` 事件在 Service Worker 内未处理的 Promise 拒绝事件时触发。

```js
self.addEventListener('unhandledrejection', (e) => {
  // 返回一个 `Event` 实例
  console.log('worker | unhandledrejection', e)
})
```

*以下代表暴露在全局的属性、方法和事件*：

```js
self.fonts
self.caches
self.crossOriginIsolated
self.crypto
self.indexedDB
self.isSecureContext
self.origin
self.performance
```

```js
self.atob()
self.btoa()
self.clearInterval()
self.clearTimeout()
self.createImageBitmap()
self.fetch()
self.queueMicrotask()
self.reportError()
self.setInterval()
self.setTimeout()
self.structuredClone()
```

### 源码链接

* [https://github.com/skyclouds2001/Frontend-Learning/blob/main/next-learning/service-worker.html](https://github.com/skyclouds2001/Frontend-Learning/blob/main/next-learning/service-worker.html)
* [https://github.com/skyclouds2001/Frontend-Learning/blob/main/next-learning/service-worker.js](https://github.com/skyclouds2001/Frontend-Learning/blob/main/next-learning/service-worker.js)
