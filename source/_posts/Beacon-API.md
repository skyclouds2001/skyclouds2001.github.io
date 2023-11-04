---
title: Beacon API
date: 2023-11-04 19:20:29
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
uniqueId: '2023-11-04 11:20:29/Beacon API.html'
mathJax: false
---

Beacon API 可用于向服务器发送 HTTP POST 网络请求

通常目的旨在向服务器发送用户数据，特别是在页面关闭时机（能够避免阻碍下一网页的加载）

## 使用

使用 `Navigator` 接口的 `sendBeacon()` 方法发送数据

方法需要传递一个 `string` 或 `URL`，代表请求的目标 URL

方法可以可选地携带一个 `ReadableStream` `Blob` `ArrayBuffer` `TypedArray` `DataView` `FormData` `URLSearchParams` `string`，代表请求需要携带的数据

方法返回一个 `boolean`，表示是否成功完成数据转换

避免使用 `beforeunload` `unload` 事件，而是 `visibilitychange` 事件（或在不兼容时使用 `pagehide` 事件），因为在移动端网页时卸载事件不能确定地触发

## 类型

```ts
interface Navigator {
  sendBeacon(url: string, data?: BodyInit): boolean
}
```

## 链接

* <https://w3c.github.io/beacon/>
