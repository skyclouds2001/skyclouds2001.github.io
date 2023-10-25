---
title: Picture-in-Picture API
date: 2023-10-25 22:58:49
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
uniqueId: '2023-10-25 14:58:49/Picture-in-Picture API.html'
mathJax: false
---

Picture-in-Picture API 允许某个特定的视频元素管理画中画模式

## 启用画中画模式

通过调用 `HTMLVideoElement` 接口上的 `requestPictureInPicture()` 方法以启用画中画模式

方法返回一个 Promise 的 `PictureInPictureWindow`

方法可能抛出 `SecurityError` 异常，如当前特性被 Permission Policy 拒绝

```js
element.requestPictureInPicture()
```

## 停止画中画模式

通过调用 `Document` 接口上的 `exitPictureInPicture()` 方法以停止画中画模式

方法返回一个 Promise

```js
document.exitPictureInPicture()
```

## 画中画模式信息

`HTMLVideoElement` 接口上的 `disablePictureInPicture` 属性反映了当前视频元素的画中画模式是否可用，返回 `boolean` 值

`Document` 接口上的 `pictureInPictureEnabled` 只读属性反映了当前文档的画中画模式是否可用，返回 `boolean` 值

`Document` 接口或 `ShadowRoot` 接口上的 `pictureInPictureElement` 只读属性反映了当前处于画中画模式的元素，返回 `Element` 值或 `null` 值

`HTMLVideoElement` 接口上的 `enterpictureinpicture` 事件在当前元素成功启用画中画模式时触发，返回一个 `PictureInPictureEvent` 事件

`HTMLVideoElement` 接口上的 `leavepictureinpicture` 事件在当前元素成功停止画中画模式时触发，返回一个 `PictureInPictureEvent` 事件

`PictureInPictureEvent` 事件继承自 `Event` 事件，其唯一额外 `pictureInPictureWindow` 只读属性代表当前事件相关的 `PictureInPictureWindow` 实例

`PictureInPictureWindow` 接口反映了当前的画中画模式窗口，其 `width` 只读属性和 `height` 只读属性反映了窗口的宽高，其 `resize` 事件在窗口尺寸改变时触发并返回一个 `PictureInPictureEvent` 事件

## 相关接口

```ts
interface Document {
  readonly pictureInPictureElement: Element | null
  readonly pictureInPictureEnabled: boolean
  exitPictureInPicture(): Promise<void>
}

interface ShadowRoot {
  readonly pictureInPictureElement: Element | null
}

interface HTMLVideoElement {
  disablePictureInPicture: boolean
  requestPictureInPicture(): Promise<PictureInPictureWindow>
  onenterpictureinpicture: ((this: HTMLVideoElement, ev: PictureInPictureEvent) => any) | null
  onleavepictureinpicture: ((this: HTMLVideoElement, ev: PictureInPictureEvent) => any) | null
}

interface PictureInPictureEvent extends Event {
  readonly pictureInPictureWindow: PictureInPictureWindow
}

interface PictureInPictureWindow extends EventTarget {
  readonly width: number
  readonly height: number
  onresize: ((this: PictureInPictureWindow, ev: PictureInPictureEvent) => any) | null
}
```
