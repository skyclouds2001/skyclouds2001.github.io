---
title: Web Background Synchronization API
date: 2023-09-12 08:45:37
tags:
- Frontend
- Web API
categories:
- Frontend
- Web API
thumbnail: 
cover: 
toc: true
recommend: 1
keywords: 
uniqueId: '2023-09-12 08:45:37/Web Background Synchronization API.html'
mathJax: false
---

消息同步 API 用于同步创建任务，直至用户获取到稳定的网络连接时才开始按序执行。

消息同步 API 可以有很多应用场景：

* 离线数据同步
* 数据备份
* 数据恢复
* 数据同步

消息同步服务通过 `SyncManager` 接口提供，并基于 `ServiceWorkerRegistration` 接口的 `sync` 属性向开发者暴露。

## 注册消息同步

`SyncManager` 接口的 `register()` 方法用于注册一个消息同步事件，网络连接变为正常状态后在对应的 ServiceWorker 中触发 `sync` 事件。

方法接受一个字符串，代表消息同步事件的标识符，该标识符将会传递给 `SyncEvent` 的 `tag` 属性。

方法返回一个 Promise 的 `undefined`。

在网页中：

```js
const TAG = 'sync'

window.navigator.serviceWorker.ready.then((registration) => {
  return registration.sync.getTags().then((tags) => {
    if (!tags.includes(TAG)) {
      return registration.sync.register(TAG)
    }
  })
})
```

在 ServiceWorker 中：

```js
const TAG = 'sync'

self.registration.sync.register(TAG)
```

## 监听消息同步

`ServiceWorkerGlobalScope` 接口上的 `sync` 事件在 Page 或 Worker 调用 `SyncManager` 接口上的方法注册一个同步事件并且自注册后起网络连接处于正常状态时触发。返回一个 `SyncEvent` 事件。

> 若当前网络连接处于非正常状态，注册同步事件后，`sync` 事件不会马上触发，直至网络连接变为正常状态，才会触发 `sync` 事件。
>
> 换言之，触发 `sync` 事件时，网络连接一定处于正常状态。

```js
const TAG = 'sync'

self.addEventListener('sync', (e) => {
  if (e.lastChance && e.tag === TAG) {
    e.waitUntil(sync())
  }
})

function sync() {
  // sync data in the background

  // for example - fetch new data and re-cache new data
  self.fetch('/sync').then(data => {
    self.caches.open('v1').then(cache => {
      cache.add('/sync', data)
    })
  })
}
```

## 其他

`SyncManager` 接口的 `getTags()` 方法用于获取用户定义的同步事件标识符，返回一个 Promise 的字符串数组。

可以利用该方法判断是否已注册相关的同步事件。

`SyncEvent` 事件继承自 `ExtendableEvent` 事件，其 `tag` 属性给出定义的同步事件标识符，其 `lastChance` 属性标识当前同步事件后是否有新的同步事件。

## 相关接口

```ts
interface SyncEvent extends ExtendableEvent {
  readonly tag: string;
  readonly lastChance: boolean;
}

interface SyncManager {
  getTags(): Promise<ReadonlyArray<string>>;
  register(tag: string): Promise<void>;
}

interface ServiceWorkerGlobalScope extends WorkerGlobalScope {
  onsync: ((this: ServiceWorkerGlobalScope, ev: SyncEvent) => any) | null;
}

interface ServiceWorkerRegistration extends EventTarget {
  readonly sync: SyncManager;
}
```

## 源码链接

* [https://github.com/skyclouds2001/Frontend-Learning/blob/main/next-learning/sync.html](https://github.com/skyclouds2001/Frontend-Learning/blob/main/next-learning/sync.html)
* [https://github.com/skyclouds2001/Frontend-Learning/blob/main/next-learning/sync.js](https://github.com/skyclouds2001/Frontend-Learning/blob/main/next-learning/sync.js)
