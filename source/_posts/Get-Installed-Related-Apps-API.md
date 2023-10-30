---
title: Get Installed Related Apps API
date: 2023-10-30 17:59:29
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
uniqueId: '2023-10-30 09:59:29/Get Installed Related Apps API.html'
mathJax: false
---

Get Installed Related Apps API 允许网页应用检测与之相关的应用是否已在本地设备下载

支持检测的应用包括通用 Window 应用 Android 应用或 PWA 应用

## 使用 API

调用 `Navigator` 接口上的 `getInstalledRelatedApps()` 方法以使用该 API

方法返回一个 Promise 的相关应用信息数组

`id` 项代表应用的 ID，具体格式受不同操作系统而有所不同

`url` 项代表与应用相关的 URL

`version` 项代表与应用相关的版本

`platform` 项代表应用的操作系统类型，可能是 `chrome_web_store` `play` `chromeos_play` `webapp` `windows` `f-droid` `amazon` 之一

方法抛出 `InvalidStateError` 错误，若未在顶层浏览器上下文中调用

```js
const apps = await navigator.getInstalledRelatedApps()

for (const app of apps) {
  console.log(app.id)
  console.log(app.url)
  console.log(app.version)
  console.log(app.platform)
}
```

方法必须在顶层文档上下文中调用，且要求必须处于严格上下文环境中

## 背景要求

当前网页应用需要在 manifest 文件中指定 related_applications 字段

本地应用需要与网页应用存在某种形式的联系，如：

Android 应用通过 `Digital Asset Links system` 实现

Window 应用通过 `URI Handlers` 实现

PWA 应用通过其 manifest 文件中定义的 `related_applications` 字段或 `/.well-known/assetlinks.json` 文件定义

## 类型

```ts
interface Navigator {
  getInstalledRelatedApps(): Promise<RelatedApplication[]>
}

interface RelatedApplication {
  platform: string
  url?: string
  id?: string
  version?: string
}
```

## 链接

* <https://wicg.github.io/get-installed-related-apps/spec/>
