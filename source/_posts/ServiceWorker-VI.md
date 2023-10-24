---
title: ServiceWorker VI
date: 2023-09-28 10:20:34
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
uniqueId: '2023-09-28 02:20:34/ServiceWorker VI.html'
mathJax: false
---

## ServiceWorker 导航预加载

导航预加载通过 `NavigationPreloadManager` 接口提供，并通过 `ServiceWorkerRegistration.navigationPreload` 属性暴露

对于使用 ServiceWorker 的页面，网页的网络请求会向 ServiceWorker 发送 fetch 事件直至返回响应，若此时 ServiceWorker 未启动，网页的网络请求会等待 ServiceWorker 激活后再进行处理；导航预加载允许网页的获取资源请求在 ServiceWorker 激活前提前开始下载，以避免阻碍页面的显示

### 启用导航预加载

`NavigationPreloadManager` 接口的 `enable()` 方法用于启用资源预加载管理

### 停用导航预加载

`NavigationPreloadManager` 接口的 `disable()` 方法用于停用资源预加载管理

### 管理导航预加载

`NavigationPreloadManager` 接口的 `setHeaderValue()` 方法用于设置导航预加载中发送的请求的请求头 `Service-Worker-Navigation-Preload` 的值

`NavigationPreloadManager` 接口的 `getState()` 方法用于获取导航预加载的状态

### 基本使用

启用导航预加载

```js
self.addEventListener('activate', (e) => {
  e.waitUntil(
    self.registration.navigationPreload.enable()
  )
})
```

```js
self.addEventListener('fetch', (e) => {
  e.responseWith(
    (async () => {
      const cache = await self.caches.match(e.request)

      if (cache != null) {
        return cache
      }

      const preload = await e.preloadResponse

      if (preload != null) {
        return preload
      }

      return fetch(e.request)
    })
  )
})
```
