---
title: Document Picture-in-Picture API
date: 2023-10-31 22:09:38
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
uniqueId: '2023-10-31 14:09:38/Document Picture-in-Picture API.html'
mathJax: false
---

Document Picture-in-Picture API 是对原有 Picture-in-Picture API 的扩展，允许任意 DOM 元素进入画中画模式

任意时刻，每个顶层浏览上下文只能存在一个画中画窗口（多次调用会复用之前的画中画窗口）

该 API 必须在严格上下文模式下调用

`Window` 接口暴露的 `documentPictureInPicture` 只读属性提供的 `DocumentPictureInPicture` 接口实例来使用该 API

## 打开画中画窗口

`DocumentPictureInPicture` 接口的 `requestWindow()` 方法用于打开一个画中画窗口

方法传入一个可选的配置项，其 `width` 选项和 `height` 选项代表画中画窗口的宽度和高度

方法返回一个 Promise 的 `Window`，代表当前文档对应的画中画窗口

方法可能抛出 `NotSupportedError`，若该 API 不被支持（如因为用户的设置）

方法可能抛出 `NotAllowedError`，若未因为用户交互调用，或未在顶层浏览上下文在调用，或在画中画窗口中调用

方法可能抛出 `RangeError`，若参数 `width` 和 `height` 仅指定其一或另一为 0

```js
const pipwindow = await window.documentPictureInPicture.requestWindow({
  width: 800,
  height: 600,
})
```

`DocumentPictureInPicture` 接口的 `enter` 事件在打开画中画窗口时触发，返回一个 `DocumentPictureInPictureEvent` 事件

## 画中画窗口

`DocumentPictureInPicture` 接口的 `window` 只读属性返回 `Window` 或 `null`，反映当前文档对应的画中画窗口，若不存在返回 `null`

`DocumentPictureInPicture` 接口的 `requestWindow()` 方法打开的画中画窗口与 `Window` 接口的 `open()` 方法打开的同源的窗口类似

但存在以下一些区别：

* 画中画窗口始终浮动在其他窗口顶部
* 画中画窗口的生命周期一定不会比打开其的窗口的生命周期晚结束
* 画中画窗口无法被导航
* 画中画窗口的位置无法被网站设置

## 关闭画中画窗口

可能因为用户点击关闭按钮而关闭，或是调用 `Window` 接口的 `close()` 方法编程式关闭

在画中画窗口关闭时，类似与普通页面一样，可以通过监听 `pagehide` 事件其发生的时机

## 类型

```ts
interface Window {
  readonly documentPictureInPicture: DocumentPictureInPicture
}

interface DocumentPictureInPicture extends EventTarget {
  requestWindow(options?: DocumentPictureInPictureOptions): Promise<Window>
  readonly window: Window | null
  onenter
}

interface DocumentPictureInPictureOptions {
  width: number
  height: number
}

interface DocumentPictureInPictureEvent extends Event {
  constructor(type: string, eventInitDict: DocumentPictureInPictureEventInit)
  readonly window: Window
}

interface DocumentPictureInPictureEventInit extends EventInit {
  window: Window
}
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/Document_Picture-in-Picture_API>
* <https://wicg.github.io/document-picture-in-picture/>
