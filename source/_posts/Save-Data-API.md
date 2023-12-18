---
title: Save Data API
date: 2023-12-18 11:11:13
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
uniqueId: '2023-12-18 03:11:13/Save Data API.html'
mathJax: false
---

Save Data API 向网站提供用户是否倾向于节省流量使用的功能

## 使用

`NetworkInformation` 接口的 `saveData` 属性表示当前的用户是否倾向于节省流量使用

或通过 `Save-Data` 请求头获取，值为 `on` 或 `off`，该请求头是一个 Client Hint 头

## 类型

```ts
interface NetworkInformation {
  readonly saveData: boolean
}
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API>
* <https://wicg.github.io/savedata/>
