---
title: Screen API
date: 2023-12-04 12:38:41
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
uniqueId: '2023-12-04 04:38:41/Screen API.html'
mathJax: false
---

Screen API 主要支持获取当前设备屏幕的一些信息

该 API 通过 `Window` 接口的 `screen` 属性暴露的 `Screen` 实例使用

## 屏幕信息

`Screen` 接口的 `height` 属性返回一个 number，代表屏幕的高度

`Screen` 接口的 `width` 属性返回一个 number，代表屏幕的宽度

`Screen` 接口的 `availHeight` 属性返回一个 number，代表屏幕可用区域的高度

`Screen` 接口的 `availWidth` 属性返回一个 number，代表屏幕可用区域的宽度

`Screen` 接口的 `colorDepth` 属性返回一个 number，代表屏幕的颜色位深度

`Screen` 接口的 `pixelDepth` 属性返回一个 number，代表屏幕的像素位深度

## 类型

```ts
interface Screen {
  readonly availHeight: number
  readonly availWidth: number
  readonly colorDepth: number
  readonly height: number
  readonly pixelDepth: number
  readonly width: number
}

declare var Screen: {
  prototype: Screen
}
```

## 链接

* <https://drafts.csswg.org/cssom-view/#the-screen-interface>
