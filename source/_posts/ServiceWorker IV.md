---
title: ServiceWorker IV
date: 2023-08-31 23:46:02
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
uniqueId: '2023-08-31 23:46:02/ServiceWorker IV.html'
mathJax: false
---

## Service Worker 消息传递

### Client 向 Worker 发送消息

* Client 端发送消息

通过调用 ServiceWorker 实例上的 `postMessage()` 方法实现从 Client 端向对应的 ServiceWorker 发送消息。

```js
window.navigator.serviceWorker.controller?.postMessage('message from client')

window.navigator.serviceWorker.ready.then((registration) => {
  registration.active?.postMessage('message from client')
})

window.navigator.serviceWorker.getRegistration().then((registration) => {
  registration?.active?.postMessage('message from client')
})

window.navigator.serviceWorker.getRegistrations().then((registrations) => {
  registrations.forEach((registration) => {
    registration?.active?.postMessage('message from client')
  })
})
```

* Worker 端接收消息

通过监听 ServiceWorkerGlobalScope 环境的 `message` 事件接收消息。

```js
self.addEventListener('message', (e) => {
  console.log('message', e)
})

self.addEventListener('messageerror', (e) => {
  console.log('messageerror', e)
})
```

### Worker 向 Client 发送消息

* Worker 端发送消息

通过调用 Client 实例上的 `postMessage()` 方法实现从 ServiceWorker 向对应的 Client 发送消息。

```js
self.clients.get('<id>').then((client) => {
  client.postMessage('message from client')
})

self.clients.matchAll().then((clients) => {
  clients.forEach((client) => {
    client.postMessage('message from client')
  })
})
```

* Client 端接收消息

通过监听 ServiceWorkerContainer 的 `message` 事件接收消息。

```js
window.navigator.serviceWorker.addEventListener('message', (e) => {
  console.log('message', e)
})

window.navigator.serviceWorker.addEventListener('messageerror', (e) => {
  console.log('messageerror', e)
})
```

## Service Worker 请求代理

当主应用程序线程发出网络请求时，会在 Service Worker 的全局范围内触发 `fetch` 事件。

* `ServiceWorkerGlobalScope` 接口的 `fetch` 事件返回一个 `FetchEvent` 事件（继承自 `ExtendableEvent`），在主应用程序线程发生网络请求时触发。

请求类型包括来自主线程的显式调用，还包括浏览器在页面导航后发出的加载页面和子资源（例如 JavaScript、CSS 和图像等）的隐式网络请求，甚至包括来自浏览器安装的插件产生的网络请求。可以通过 `request` 属性获取到请求的信息，调用 `respondWith()` 方法返回自定义的响应数据。

```js
self.addEventListener('fetch', (e) => {
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
```

> * `FetchEvent` 事件的 `request` 属性返回一个 `Request` 实例，代表触发事件处理程序的请求对象。
>
> * `FetchEvent` 事件的 `respondWith()` 方法阻止浏览器的默认请求处理机制，并允许使用自定义的响应替代，其接收一个 `Response` 实例或者 Promise 的 `Response` 实例。

`respondWith()` 方法对于给定的请求只能调用该方法一次。如果 `fetch` 添加了多个事件监听器，它们将按照注册的顺序被调用，直到其中一个事件监听器调用该方法。

`respondWith()` 方法必须同步调用，不能在异步方法中调用该方法。

若 `respondWith()` 未在处理程序中调用，则用户代理会自动发出原始网络请求。

> * `FetchEvent` 事件的 `clientId` 属性返回触发 fetch 事件的 Client 的 id，可以使用 `Clients.get()` 方法获取到对应的 Client 实例。
>
> * `FetchEvent` 事件的 `replacesClientId` 属性返回若因页面导航而触发 fetch 事件的前一个 Client 的 id，否则返回一个空字符串。
>
> * `FetchEvent` 事件的 `resultingClientId` 属性返回若因页面导航而触发 fetch 事件的后一个 Client 的 id，否则返回一个空字符串。
>
> * `FetchEvent` 事件的 `handled` 属性返回 Promise 实例，表明 fetch 事件已被处理，并在消费请求后完成。
>
> * `FetchEvent` 事件的 `preloadResponse` 属性返回若导航预加载情况下的 Promise 的 Response，否则返回 Promise 的 undefined。

## 源码链接

* [https://github.com/skyclouds2001/Frontend-Learning/blob/main/next-learning/message.html](https://github.com/skyclouds2001/Frontend-Learning/blob/main/next-learning/message.html)
* [https://github.com/skyclouds2001/Frontend-Learning/blob/main/next-learning/message.js](https://github.com/skyclouds2001/Frontend-Learning/blob/main/next-learning/message.js)
