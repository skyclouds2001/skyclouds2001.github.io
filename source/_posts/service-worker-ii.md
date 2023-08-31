---
title: ServiceWorker II
date: 2023-08-31 23:46:02
tags:
- Frontend
- JavaScript
- Browser
categories:
- [Frontend, Other]
thumbnail:
---

## Service Worker 使用

### 消息传递

#### Client 至 Worker

从 Client 向 Worker 发送消息：

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

从 Client 向 Worker 发送消息：

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

> * `ServiceWorkerGlobalScope` 接口与 `ServiceWorkerContainer` 接口的 `message` 事件返回一个 `ExtendableMessageEvent` 实例（继承自 `ExtendableEvent`），在接收到传入消息时触发。
> * `ServiceWorkerGlobalScope` 接口与 `ServiceWorkerContainer` 接口的 `messageerror` 事件返回一个 `MessageEvent` 实例（继承自 `Event`），在接收到传入消息解析失败时触发。
> * `ExtendableMessageEvent` 接口同时实现了 `MessageEvent` 接口与 `ExtendableEvent` 接口。

### 请求代理

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
  // 返回一个 FetchEvent
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
