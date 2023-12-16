---
title: Media Capture from DOM Elements API
date: 2023-12-16 17:35:07
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
uniqueId: '2023-12-16 09:35:07/Media Capture from DOM Elements API.html'
mathJax: false
---

Media Capture from DOM Elements API 允许从 DOM 元素中捕获媒体流，包括 `<canvas>` `<audio>` `<video>` 等

## 从媒体元素捕获

通过调用 `HTMLMediaElement` 接口上的 `captureStream()` 方法获取到在媒体元素上展示的资源相应的媒体流

该方法返回一个 `MediaStream` 实例

从 `<audio>` 捕获时，返回的媒体流可能包含任意数量的音频轨道

从 `<video>` 捕获时，返回的媒体流可能包含单个视频轨道及任意数量的音频轨道

## 从画布元素捕获

通过调用 `HTMLCanvasElement` 接口上的 `captureStream()` 方法获取到在画布元素上展示的资源相应的媒体流

该方法传入一个可选的 `frameRequestRate` 参数，接收一个正数；若传入负数会抛出 `NotSupportedError` 异常

该方法返回一个 `MediaStream` 实例；特别的，返回的媒体流包含单个 `CanvasCaptureMediaStreamTrack` 视频轨道，提供了一些专属的属性及方法

默认在 `<canvas>` 元素内容更新时刷新媒体流数据，或根据 `frameRequestRate` 参数定时刷新媒体流数据

对于 `<canvas>` 元素中包含跨域的图片资源时，`SecurityError` 会被抛出

> 关于 `CanvasCaptureMediaStreamTrack` 接口
>
> 继承自 `MediaStreamTrack` 接口
>
> 其 `canvas` 只读属性返回与视频轨道绑定的 `HTMLCanvasElement` 元素
>
> 其 `requestFrame()`方法强制从 `HTMLCanvasElement` 元素捕获帧并发送到媒体流（可以利用该方法替代默认的策略，需在创建时传入参数 `0`）

## 类型

```ts
interface HTMLCanvasElement {
  captureStream(frameRequestRate?: number): MediaStream
}

interface HTMLMediaElement {
  captureStream(): MediaStream
}

interface CanvasCaptureMediaStreamTrack extends MediaStreamTrack {
  readonly canvas: HTMLCanvasElement
  requestFrame(): void
}

declare var CanvasCaptureMediaStreamTrack: {
  prototype: CanvasCaptureMediaStreamTrack
}
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/Media_Capture_and_Streams_API>
* <https://w3c.github.io/mediacapture-fromelement/>
