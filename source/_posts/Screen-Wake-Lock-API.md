---
title: Screen Wake Lock API
date: 2023-10-24 00:18:48
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
uniqueId: '2023-10-23 16:18:48/Screen Wake Lock API.html'
mathJax: false
---

Screen Wake Lock API 允许控制设备的屏幕变暗、休眠或锁定的策略

通过 `navigator.wakeLock` 暴露的 `WakeLock` 接口实例使用

## 启用屏幕管理策略

通过 `WakeLock` 接口的 `request()` 方法来请求启用屏幕管理策略

方法传入一个可选的 `type` 字符串参数，唯一允许值为 `'screen'`

方法返回一个 Promise 的 `WakeLockSentinel` 实例

```js
const sentinel = await navigator.wakeLock.request()
```

## 释放屏幕管理策略

通过 `WakeLockSentinel` 接口的 `release()` 方法来手动关闭屏幕管理策略

方法返回一个 Promise

```js
sentinel.release()
```

同时，操作系统可能会在网页失去焦点或隐藏时自动关闭屏幕管理策略

## 屏幕管理策略信息

`WakeLockSentinel` 接口的 `released` 属性返回一个 boolean，表示当前 `WakeLockSentinel` 是否已被释放

`WakeLockSentinel` 接口的 `type` 属性返回一个 string，表示当前 `WakeLockSentinel` 的类型

`WakeLockSentinel` 接口的 `release` 事件，在 `WakeLockSentinel` 被释放时触发，返回一个 `Event` 事件

## 相关接口

```ts
interface WakeLock {
  request(type?: WakeLockType): Promise<WakeLockSentinel>
}

interface WakeLockSentinel extends EventTarget {
  onrelease: ((this: WakeLockSentinel, ev: Event) => any) | null
  readonly released: boolean
  readonly type: WakeLockType
  release(): Promise<void>
}

type WakeLockType = 'screen'
```
