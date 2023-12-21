---
title: MediaStream Image Capture API
date: 2023-12-21 17:51:17
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
uniqueId: '2023-12-21 09:51:17/MediaStream Image Capture API.html'
mathJax: false
---

MediaStream Image Capture API 用于管理和配置从照相设备中拍照或录像，同时支持获取一些设备参数，如图像大小、红眼模式以及闪光灯模式等

## 初始化

调用 `ImageCapture()` 构造方法创建一个图像捕获器

需要传入一个 `MediaStreamTrack` 参数，作为目标进行捕获的视频轨道

若传入的参数表示一个视频轨道，即其 `kind` 属性为 `video`，抛出 `NotSupportedError` 异常

> 可以调用 `MediaDevices` 接口的 `getUserMedia()` 方法从媒体设备获取到媒体流，随后调用 `MediaStream` 接口的 `getVideoTracks()` 方法获取到对应媒体流的视频轨道，并将此作为参数传入 `ImageCapture()` 构造方法

创建后，传入的 `MediaStreamTrack` 参数可以通过实例的 `track` 只读属性获取到其引用

## 拍照

调用 `ImageCapture` 接口的 `takePhoto()` 方法进行拍照

方法传入一个可选的表示照相配置项的对象参数，其属性如下：

* `redEyeReduction` 参数接收一个布尔值，表示相机是否启用了红眼模式

* `imageHeight` 参数接收一个数字，表示相机设备提供的照片高度

* `imageWidth` 参数接收一个数字，表示相机设备提供的照片宽度

* `fillLightMode` 参数接收一个字符串，值为 `auto` `off` `flash` 之一，表示相机启用的闪光模式

方法返回一个兑现一个 `Blob` 实例的 `Promise`

调用 `ImageCapture` 接口的 `grabFrame()` 方法进行截取快照

方法返回一个兑现一个 `ImageBitmap` 实例的 `Promise`

两方法在当前传输视频轨道的 `readyState` 不为 `live`，抛出 `InvalidStateError` 异常

两方法在因为其他未知原因无法完成操作，抛出 `UnknownError` 异常

## 参数及配置

调用 `ImageCapture` 接口的 `getPhotoCapabilities()` 方法获取允许配置的范围及设定，返回一个对象

* `redEyeReduction` 属性返回一个字符串，值为 `never` `always` `controllable` 之一，表示相机目前的红眼模式设定

* `imageHeight` 属性返回一个对象，包含 `min` `max` `step` 等属性，表示相机设备支持的照片高度范围

* `imageWidth` 属性返回一个对象，包含 `min` `max` `step` 等属性，表示相机设备支持的照片宽度范围

* `fillLightMode` 属性返回一个字符串数组，数组各项为 `auto` `off` `flash` 之一且不会重复，表示相机支持的闪光模式

调用 `ImageCapture` 接口的 `getPhotoSettings()` 方法获取目前的配置，返回一个对象

* `redEyeReduction` 属性返回一个布尔值，表示相机是否启用了红眼模式

* `imageHeight` 属性返回一个数字，表示相机设备提供的照片高度

* `imageWidth` 属性返回一个数字，表示相机设备提供的照片宽度

* `fillLightMode` 属性返回一个字符串，值为 `auto` `off` `flash` 之一，表示相机启用的闪光模式

两方法在当前传输视频轨道的 `readyState` 不为 `live`，抛出 `InvalidStateError` 异常

两方法在因为其他未知原因无法完成操作，抛出 `OperationError` 异常

## 类型

```ts
interface ImageCapture {
  takePhoto(photoSettings?: PhotoSettings): Promise<Blob>
  getPhotoCapabilities(): Promise<PhotoCapabilities>
  getPhotoSettings(): Promise<PhotoSettings>

  grabFrame(): Promise<ImageBitmap>

  readonly track: MediaStreamTrack
}

declare var ImageCapture: {
  prototype: ImageCapture
  new (videoTrack: MediaStreamTrack): ImageCapture
}

interface PhotoCapabilities {
  redEyeReduction: RedEyeReduction
  imageHeight: MediaSettingsRange
  imageWidth: MediaSettingsRange
  fillLightMode: FillLightMode[]
}

interface PhotoSettings {
  fillLightMode: FillLightMode
  imageHeight: number
  imageWidth: number
  redEyeReduction: boolean
}

interface MediaSettingsRange {
  max: number
  min: number
  step: number
}

type RedEyeReduction = "never" | "always" | "controllable"

type FillLightMode = "auto" | "off" | "flash"
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Image_Capture_API>
* <https://w3c.github.io/mediacapture-image/>
