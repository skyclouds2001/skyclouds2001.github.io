---
title: Audio Output Devices API
date: 2023-12-23 14:48:40
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
uniqueId: '2023-12-23 06:48:40/Audio Output Devices API.html'
mathJax: false
---

Audio Output Devices API 允许开发者选择音频的输出设备（如麦克风，蓝牙设备等）

## 基本使用

通过调用 `MediaDevices` 接口的 `selectAudioOutput()` 方法让用户选择期望的音频输出设备

被选择的设备具有相应的权限，随后可以通过 `MediaDevices` 接口的 `enumerateDevices()` 方法选取，并通过 `HTMLMediaElement` 接口的 `setSinkId()` 方法将对应媒体元素的输出指定为用户期望的音频输出设备

当然，被选择的设备可能因为某些原因断开连接等，可以通过监听 `MediaDevices` 接口的 `devicechange` 事件在采取相应的措施

## 选取音频输出设备

`MediaDevices` 接口的 `selectAudioOutput()` 方法用于请求用户选取期望的音频输出设备，选择完成后可以通过 `MediaDevices` 接口的 `enumerateDevices()` 方法枚举到目标音频设备

方法接收一个可选的配置项参数，其 `deviceId` 参数指定一个设备 ID；若该设备已被授权，方法会直接兑现而不弹窗请求授权

方法返回一个兑现一个 `MediaDeviceInfo` 实例的 `Promise`，表示用户选取的设备的信息

若当前文档不具备粘性激活状态，抛出 `InvalidStateError` 异常

若拒绝授权使用设备，抛出 `NotAllowedError` 异常

若无法找到合法的音频输出设备，抛出 `NotFoundError` 异常

## 设置音频输出设备

`HTMLMediaElement` 接口的 `setSinkId()` 方法用于手动设置用于播放当前媒体元素的媒体输出设备

方法接收一个字符串，代表媒体输出设备的 ID

方法返回一个 Promise

若受权限策略限制或拒绝授权使用设备，抛出 `NotAllowedError` 异常

若传入参数与任一合法的音频输出设备无法匹配，抛出 `NotFoundError` 异常

若因为任何原因无法切换音频输出设备，抛出 `AbortError` 异常

`HTMLMediaElement` 接口的 `sinkId` 只读属性返回当前正在用于播放当前媒体元素的媒体输出设备的 ID，或空字符串，表示当前使用的是默认的媒体输出设备

## 权限策略

该 API 调用受到 `speaker-selection` 权限策略的控制，可以通过 `Permissions-Policy` 响应头指定，或通过 `<iframe>` 标签的 `allow` 属性指定

默认值是 `self`，即仅允许同源的浏览上下文使用该 API

## 权限 API

该 API 调用需要用户授予 `speaker-selection` 权限，可以调用 `Permission.query()` 方法检查用户是否已授予了该权限

## 类型

```ts
interface HTMLMediaElement {
  readonly sinkId: string
  setSinkId(DOMString: string): Promise<void>
}

interface MediaDevices {
  selectAudioOutput(options?: AudioOutputOptions): Promise<MediaDeviceInfo>
}

interface AudioOutputOptions {
  deviceId: string
}
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/Audio_Output_Devices_API>
* <https://w3c.github.io/mediacapture-output/>
