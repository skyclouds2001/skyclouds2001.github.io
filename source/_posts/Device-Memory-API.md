---
title: Device Memory API
date: 2023-11-25 23:35:19
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
uniqueId: '2023-11-25 15:35:19/Device Memory API.html'
mathJax: false
---

Device Memory API 允许获取运行内存容量的大小

## JS 使用

通过 `Navigator` 接口或 `WorkerNavigator` 接口的 `deviceMemory` 只读属性使用

返回的值是一个 number 值，`0.25` `0.5` `1` `2` `4` `8`

## HTTP 使用

服务器在 `Accept-CH` 响应头中指定 `Device-Memory` 值，或通过 HTML `<meta>` 标签的 `http-equiv` 属性指定

```http
Accept-CH: Device-Memory
```

之后用户代理会通过 `Device-Memory` 请求头携带对应的信息，具体值同 `deviceMemory` 属性，如：

```http
Device-Memory: 1
```

## 类型

```ts
interface NavigatorDeviceMemory {
  readonly deviceMemory: number
}

interface Navigator extends NavigatorDeviceMemory {}

interface WorkerNavigator extends NavigatorDeviceMemory {}
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/Device_Memory_API>
* <https://www.w3.org/TR/device-memory/>
