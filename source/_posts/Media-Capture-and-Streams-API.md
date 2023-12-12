---
title: Media Capture and Streams API
date: 2023-12-11 23:11:06
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
uniqueId: '2023-12-11 15:11:06/Media Capture and Streams API.html'
mathJax: false
---

Media Capture and Streams API 用于处理视频音频流，以及枚举本地媒体设备，它与 WebRTC API 息息相关

## 枚举本地媒体设备

该部分 API 主要提供了枚举本地媒体设备的功能，包括媒体输入设备或媒体输出设备，通过 `Navigator` 接口的 `mediaDevices` 只读属性暴露的 `MediaDevices` 实例使用

通过调用 `MediaDevices` 接口的 `enumerateDevices()` 方法获取本地媒体设备列表

方法返回一个 Promise 的 `MediaDeviceInfo` 数组

调用该方法会受到 `microphone` 和 `camera` 权限策略的限制，并且要求文档处于完全活跃状态并且当前可见

默认调用该方法仅会返回系统默认媒体设备，返回具体设备受到 `microphone` 与 `camera` 权限 API 的限制

## 监听本地媒体设备变化

当本地媒体设备列表改变时（如新的媒体设备连接到系统，或已有媒体设备从系统中移除），`MediaDevices` 接口上的 `devicechange` 事件会被触发，方法返回一个 `Event` 事件

此时可以再次调用 `MediaDevices` 接口的 `enumerateDevices()` 方法更新本地媒体设备列表

## 本地媒体设备信息

`MediaDeviceInfo` 接口表示一个本地媒体设备；特别的，`InputDeviceInfo` 接口表示一个本地媒体输入设备

`MediaDeviceInfo` 接口的 `deviceId` 只读属性返回一个字符串，代表本地媒体设备的唯一标识

`MediaDeviceInfo` 接口的 `groupId` 只读属性返回一个字符串，代表本地媒体设备的组标识，对于同一物理设备的不同媒体设备的该值相同

`MediaDeviceInfo` 接口的 `kind` 只读属性返回一个字符串枚举，值为 `videoinput` `audioinput` `audiooutput` 之一，代表本地媒体设备的类型

`MediaDeviceInfo` 接口的 `label` 只读属性返回一个字符串，代表本地媒体设备的描述，可用于向用户展示

`MediaDeviceInfo` 接口的 `toJSON()` 方法是一个序列化方法，对该媒体设备信息序列化后返回一个普通对象

`InputDeviceInfo` 接口的 `getCapabilities()` 方法描述原始音频或视频轨道的信息，返回一个 MediaTrackCapabilities 结构的对象；若未授予相应的权限，空对象将被返回

> MediaTrackCapabilities 结构如下：
>
> `width` 参数表示视频轨道的宽度
>
> `height` 参数表示视频轨道的高度
>
> `aspectRatio` 参数表示视频轨道的宽高比
>
> `frameRate` 参数表示视频轨道的帧速
>
> `facingMode` 参数表示视频轨道的摄像头朝向参数
>
> `resizeMode` 参数表示视频轨道的可裁剪模式
>
> `sampleRate` 参数表示音频轨道的采样率
>
> `sampleSize` 参数表示音频轨道的样本大小
>
> `echoCancellation` 参数表示音频轨道的是否可进行回声消除
>
> `autoGainControl` 参数表示音频轨道的是否可进行自动增益控制
>
> `noiseSuppression` 参数表示音频轨道的是否可进行噪声抑制
>
> `latency` 参数表示音频轨道的延迟时间
>
> `channelCount` 参数表示音频轨道的通道数
>
> `deviceId` 参数表示轨道相关的 `deviceId` 属性
>
> `groupId` 参数表示轨道相关的 `groupId` 属性

## 类型

```ts

```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/Media_Capture_and_Streams_API>
* <https://w3c.github.io/mediacapture-main/>
