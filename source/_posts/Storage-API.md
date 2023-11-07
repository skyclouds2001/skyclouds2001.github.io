---
title: Storage API
date: 2023-11-06 14:00:16
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
uniqueId: '2023-11-06 06:00:16/Storage API.html'
mathJax: false
---

Storage API 提供了多个存储 API 的共享的管理方法，允许获取存储的信息并控制存储的清除策略

通常管理的存储包括包括 IndexedDB 、 Cache Storage 、 ServiceWorker 脚本 、 Origin Private File System

该 API 通过 `StorageManager` 接口提供相关方法，并通过 `navigator.storage` 对开发者暴露

## 获取存储信息

`StorageManager` 接口的 `estimate()` 方法用于获取用户代理存储的信息

方法返回一个 Promise 的对象，其 usage 属性返回一个数字，代表当前网页使用的存储的大小；quota 属性返回一个数字，代表当前用户代理能为网页提供的存储的大小

```js
const storage = await navigator.storage.estimate()

console.log('usage', storage.usage)
console.log('quota', storage.quota)
```

## 设置存储清除策略

默认存储策略为 `"best-effort"`，即用户代理会尽可能地保存存储数据，但若需要清除时不会告知用户

而存储策略 `"persistent"`，即用户代理会尽可能地保存存储数据，优先清除存储策略设置为 `"best-effort"` 的存储，但若需要清除时会主动告知用户

`StorageManager` 接口的 `persisted()` 方法检测是否已将存储策略更改为 `"persistent"`，返回一个 Promise 的 `boolean`

`StorageManager` 接口的 `persist()` 方法用于将存储策略更改为 `"persistent"`，返回一个 Promise 的 `boolean`

```js
const result = await navigator.storage.persist()

if (result) {
  console.log('persisted')
} else {
  console.log('not persisted')
}
```

## 权限 API

该 API 调用需要用户 `persistent-storage` 授予权限，可以调用 `Permission.query()` 方法检查用户是否已授予了该权限

## 类型

```ts
interface NavigatorStorage {
  readonly storage: StorageManager
}

interface Navigator extends NavigatorStorage {}

interface WorkerNavigator extends NavigatorStorage {}

interface StorageManager {
  persisted(): Promise<boolean>
  persist(): Promise<boolean>

  estimate(): Promise<StorageEstimate>
}

interface StorageEstimate {
  usage: number
  quota: number
}
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/Storage_API>
* <https://storage.spec.whatwg.org/>
