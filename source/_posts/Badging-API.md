---
title: Badging API
date: 2023-10-02 22:14:54
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
uniqueId: '2023-10-02 14:14:54/Badging API.html'
mathJax: false
---

Badging API 用于设置 PWA 应用的图标上的徽章信息

该 API 需要在 Secure Context 下使用

某些情况下该 API 需要请求用户授予 `notifications` 权限，并可以调用 `Notification.requestPermission()` 方法来请求获取相关权限

## 设置 Badge

使用 Navigator 接口上的 `setAppBadge()` 方法给图标设置徽章

方法支持传递一个可选的数字参数，徽章将显示为对应的数字；若未传递，徽章将显示为对应的点

方法返回一个 Promise 的 `undefined`

方法不支持时会抛出 `NotSupportedError` 异常

```js
navigator.setAppBadge()
navigator.setAppBadge(10)
```

## 清除 Badge

使用 Navigator 接口的 `clearAppBadge()` 方法清除图标上设置的徽章

方法返回一个 Promise 的 `undefined`

方法不支持时会抛出 `NotSupportedError` 异常

```js
navigator.setAppBadge(0)
navigator.clearAppBadge()
```

使用 Navigator 接口的 `setAppBadge()` 方法并传递参数 `0` 同样具有类似的效果

## 相关接口

```ts
interface Navigator {
  clearAppBadge(): Promise<void>
  setAppBadge(contents?: number): Promise<void>
}
```

## 源码链接

* [https://github.com/skyclouds2001/Frontend-Learning/blob/main/next-learning/PWA-eg](https://github.com/skyclouds2001/Frontend-Learning/blob/main/next-learning/PWA-eg)
