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

## 相关参数

* `whiteBalanceMode` 参数，表示白平衡模式，值为 `auto` `manual` `single-shot` `continuous` 之一
* `exposureMode` 参数，表示曝光模式，值为 `auto` `manual` `single-shot` `continuous` 之一
* `focusMode` 参数，表示对焦模式，值为 `auto` `manual` `single-shot` `continuous` 之一
* `pointsOfInterest` 参数，表示兴趣点/测光中心（通过自动对焦、自动曝光、自动白平衡调整），值为一个 `Point2D` 数组

* `exposureCompensation` 参数，表示曝光补偿，值为一个数值
* `exposureTime` 参数，表示曝光时间，值为一个数值
* `colorTemperature` 参数，表示色温，值为一个数值
* `iso` 参数，表示 ISO 感光度，值为一个数值

* `brightness` 参数，表示亮度，值为一个数值
* `contrast` 参数，表示对比度，值为一个数值
* `saturation` 参数，表示饱和度，值为一个数值
* `sharpness` 参数，表示清晰度，值为一个数值

* `focusDistance` 参数，表示焦距，值为一个数值
* `pan` 参数，表示平移，值为一个数值
* `tilt` 参数，表示倾斜，值为一个数值
* `zoom` 参数，表示变焦比例，值为一个数值

* `torch` 参数，表示补光模式，值为一个布尔值

这些参数被拓展至以下一些结构：

- `MediaTrackSupportedConstraints` 结构
- `MediaTrackConstraintSet` 结构（从而拓展至 `MediaTrackConstraints` 结构）
- `MediaTrackSettings` 结构
- `MediaTrackCapabilities`（不含 `pointsOfInterest` 参数）结构

这些参数在图片捕获的媒体流中可用

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

interface MediaTrackSupportedConstraints {
  whiteBalanceMode?: boolean
  exposureMode?: boolean
  focusMode?: boolean
  pointsOfInterest?: boolean
  exposureCompensation?: boolean
  exposureTime?: boolean
  colorTemperature?: boolean
  iso?: boolean
  brightness?: boolean
  contrast?: boolean
  saturation?: boolean
  sharpness?: boolean
  focusDistance?: boolean
  pan?: boolean
  tilt?: boolean
  zoom?: boolean
  torch?: boolean
}

interface MediaTrackCapabilities {
  whiteBalanceMode?: string[]
  exposureMode?: string[]
  focusMode?: string[]
  exposureCompensation?: MediaSettingsRange
  exposureTime?: MediaSettingsRange
  colorTemperature?: MediaSettingsRange
  iso?: MediaSettingsRange
  brightness?: MediaSettingsRange
  contrast?: MediaSettingsRange
  saturation?: MediaSettingsRange
  sharpness?: MediaSettingsRange
  focusDistance?: MediaSettingsRange
  pan?: MediaSettingsRange
  tilt?: MediaSettingsRange
  zoom?: MediaSettingsRange
  torch?: boolean[]
}

interface MediaTrackConstraintSet {
  whiteBalanceMode?: ConstrainDOMString
  exposureMode?: ConstrainDOMString
  focusMode?: ConstrainDOMString
  pointsOfInterest?: ConstrainPoint2D
  exposureCompensation?: ConstrainDouble
  exposureTime?: ConstrainDouble
  colorTemperature?: ConstrainDouble
  iso?: ConstrainDouble
  brightness?: ConstrainDouble
  contrast?: ConstrainDouble
  saturation?: ConstrainDouble
  sharpness?: ConstrainDouble
  focusDistance?: ConstrainDouble
  pan?: ConstrainDouble | boolean
  tilt?: ConstrainDouble | boolean
  zoom?: ConstrainDouble | boolean
  torch?: ConstrainBoolean
}

interface MediaTrackSettings {
  whiteBalanceMode?: string
  exposureMode?: string
  focusMode?: string
  pointsOfInterest?: Point2D[]
  exposureCompensation?: number
  exposureTime?: number
  colorTemperature?: number
  iso?: number
  brightness?: number
  contrast?: number
  saturation?: number
  sharpness?: number
  focusDistance?: number
  pan?: number
  tilt?: number
  zoom?: number
  torch?: boolean
}

interface ConstrainPoint2DParameters {
  exact: Point2D[]
  ideal: Point2D[]
}

type ConstrainPoint2D = Point2D[] | ConstrainPoint2DParameters

type MeteringMode = "none" | "manual" | "single-shot" | "continuous"

interface Point2D {
  x?: number
  y?: number
}
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Image_Capture_API>
* <https://w3c.github.io/mediacapture-image/>
