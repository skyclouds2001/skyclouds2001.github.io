---
title: Web Periodic Background Synchronization API
date: 2023-09-14 23:42:48
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
uniqueId: '2023-09-14 23:42:48/Web Periodic Background Synchronization API.html'
mathJax: false
---

Web Periodic Background Synchronization API 提供了一种注册在网络状态允许下周期性执行任务的方法，这些任务被称为周期后台同步请求。

API 用途包括在设备连接到网络时获取最新内容，或允许对应用程序进行后台更新。

调用 API 时需设置最小时间间隔，但是用户代理通常还会考虑网络连接情况或者之前网站的用户参与程度来决定触发任务的周期。

该 API 通过 `PeriodicSyncManager` 接口提供，并基于 `ServiceWorkerRegistration` 接口的 `periodicSync` 属性向开发者暴露。

## 注册周期后台同步任务

`PeriodicSyncManager` 接口的 `register()` 方法用于注册周期后台同步任务。

方法接收一个字符串，作为周期后台同步任务的唯一标识符；可接收一组可选的配置项，其唯一属性为 `minInterval`，指定周期后台同步任务的执行周期。

返回一个 Promise。

```js
const TAG = 'tag'

window.navigator.serviceWorker.ready.then((registration) => {
  registration.periodicSync.register(TAG, {
    minInterval: 24 * 60 * 60 * 1000,
  })
})
```

## 查看周期后台同步任务

`PeriodicSyncManager` 接口的 `getTags()` 方法用于获取周期后台同步任务。

返回一个 Promise 的字符串数组，代表当前已注册的周期后台同步任务的标识符列表。

```js
const TAG = 'tag'

window.navigator.serviceWorker.ready.then((registration) => {
  registration.periodicSync.getTags().then((tags) => {
    if (tags.includes(TAG)) {
      // do something
    }
  })
})
```

## 卸载周期后台同步任务

`PeriodicSyncManager` 接口的 `unregister()` 方法用于卸载周期后台同步任务。

方法接收一个字符串，代表周期后台同步任务的唯一标识符。

返回一个 Promise。

```js
const TAG = 'tag'

window.navigator.serviceWorker.ready.then((registration) => {
  registration.periodicSync.unregister(TAG)
})
```

## 执行周期后台同步任务

`ServiceWorkerGlobalScope` 接口的 `periodicsync` 事件在触发周期后台同步任务时触发。返回一个 `PeriodicSyncEvent` 事件。

事件触发周期大于或等于在注册时设置的最小执行周期。

```js
const TAG = 'tag'

self.addEventListener('periodicsync', (e) => {
  if (e.tag === TAG) {
    // do something
  }
})
```

`PeriodicSyncEvent` 事件继承自 `ExtendableEvent` 事件。其 `tag` 属性返回事件对应的周期后台同步任务的唯一标识符。

## 权限 API

该 API 调用需要用户授予 `periodic-background-sync` 权限，可以调用 `Permission.query()` 方法检查用户是否已授予了该权限

## 示例

* [https://github.com/skyclouds2001/Frontend-Learning/blob/main/next-learning/periodic-sync.html](https://github.com/skyclouds2001/Frontend-Learning/blob/main/next-learning/periodic-sync.html)
* [https://github.com/skyclouds2001/Frontend-Learning/blob/main/next-learning/periodic-sync.js](https://github.com/skyclouds2001/Frontend-Learning/blob/main/next-learning/periodic-sync.js)

## 类型

```ts
interface PeriodicSyncEvent extends ExtendableEvent {
  readonly tag: string;
}

interface BackgroundSyncOptions {
  minInterval: number;
}

interface PeriodicSyncManager {
  getTags(): Promise<ReadonlyArray<string>>;
  register(tag: string, options?: BackgroundSyncOptions): Promise<void>;
  unregister(tag: string): Promise<void>;
}

interface ServiceWorkerGlobalScope extends WorkerGlobalScope {
  onperiodicsync: ((this: ServiceWorkerGlobalScope, ev: PeriodicSyncEvent) => any) | null;
}

interface ServiceWorkerRegistration extends EventTarget {
  readonly periodicSync: PeriodicSyncManager;
}
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/Web_Periodic_Background_Synchronization_API>
* <https://wicg.github.io/periodic-background-sync/>
