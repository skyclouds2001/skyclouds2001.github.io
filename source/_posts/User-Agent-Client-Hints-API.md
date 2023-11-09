---
title: User-Agent Client Hints API
date: 2023-11-09 13:55:01
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
uniqueId: '2023-11-09 05:55:01/User-Agent Client Hints API.html'
mathJax: false
---

User-Agent Client Hints API 扩展了 HTTP Client Hints 以提供允许 JavaScript API 读取浏览器和操作系统信息的方式

该 API 通过 `NavigatorUAData` 接口提供相关功能，并通过 `navigator.userAgentData` 暴露

## 读取基本信息

`NavigatorUAData` 接口的 `brands` 属性返回一个 object array，代表浏览器信息，各项包含 `brand` 属性和 `version` 属性，均为字符串，分别代表浏览器的名称和版本

`NavigatorUAData` 接口的 `mobile` 属性返回一个 boolean，代表当前设备是否为移动端设备

`NavigatorUAData` 接口的 `platform` 属性返回一个 string，代表当前设备的操作系统名称

`NavigatorUAData` 接口的 `toJSON()` 方法返回一个 JSON 对象，表示可序列化的浏览器的信息

## 读取细节信息

`NavigatorUAData` 接口的 `getHighEntropyValues()` 方法获取浏览器的详细信息

方法传入一个 string array 参数，值允许为 `architecture` `bitness` `formFactor` `fullVersionList` `model` `platformVersion` `uaFullVersion` `wow64` 之一

方法返回一个 Promise 的 object，根据参数不同，值可能包含 `architecture` `bitness` `brands` `formFactor` `fullVersionList` `mobile` `model` `platform` `platformVersion` `uaFullVersion` `wow64` 等项

方法可能抛出 `NotAllowedError`，若用户代理认为任一参数不应当被返回

## 类型

```ts
interface NavigatorUABrandVersion {
  brand: string
  version: string
}

interface UADataValues {
  architecture: string
  bitness: string
  brands: NavigatorUABrandVersion[]
  formFactor: string[]
  fullVersionList: NavigatorUABrandVersion[]
  model: string
  mobile: boolean
  platform: string
  platformVersion: string
  /** @deprecated */ uaFullVersion: string
  wow64: boolean
}

interface UALowEntropyJSON {
  brands: NavigatorUABrandVersion[]
  mobile: boolean
  platform: string
}

interface NavigatorUAData {
  readonly brands: ReadonlyArray<>
  readonly mobile: boolean
  readonly platform: string
  getHighEntropyValues(hints: string[]): Promise<UADataValues>
  toJSON(): UALowEntropyJSON
}

interface NavigatorUA {
  readonly userAgentData: NavigatorUAData
}

interface Navigator extends NavigatorUA {}
interface WorkerNavigator extends NavigatorUA {}
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/User-Agent_Client_Hints_API>
* <https://wicg.github.io/ua-client-hints/>
