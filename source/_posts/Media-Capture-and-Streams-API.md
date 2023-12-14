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

<div style="width: 500px; height: 200px; overflow: auto;">
    <ul id="devices"></ul>
    <script type="module">
        let html = '';
        const devices = await navigator.mediaDevices.enumerateDevices();
        for (const device of devices) {
            html += '<li>' + device.label + '</li>';
        }
        document.getElementById('devices').innerHTML = html;
    </script>
</div>

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

`InputDeviceInfo` 接口的 `getCapabilities()` 方法描述原始音频或视频轨道的信息，返回一个 `MediaTrackCapabilities` 结构的对象；若未授予相应的权限，空对象将被返回

> `MediaTrackCapabilities` 结构如下：
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

## 检测用户代理支持参数

调用 `MediaDevices` 接口的 `getSupportedConstraints()` 方法获取用户代理支持识别的参数列表，返回一个 `MediaTrackSupportedConstraints` 结构的对象，对象的键名为所有受支持的参数列表，键值为 `true`

> `MediaTrackSupportedConstraints` 结构如下：
>
> 包含 `MediaTrackCapabilities` 结构中各参数

<div style="width: 500px; height: 200px; overflow: auto;">
    <ul id="constraints"></ul>
    <script type="module">
        let html = '';
        for (const constant in navigator.mediaDevices.getSupportedConstraints()) {
            html += '<li><code>' + constant + '</code></li>';
        }
        document.getElementById('constraints').innerHTML = html;
    </script>
</div>

## 获取本地媒体设备输入流

调用 `MediaDevices` 接口的 `getUserMedia()` 方法从本地媒体设备获取输入流

也可以使用该方法来请求本地媒体设备的权限，包括麦克风 `microphone` 与摄像头 `camera`

方法接收一个 `MediaStreamConstraints` 结构的对象

方法返回一个兑现包含 `MediaStream` 实例的 `Promise`

若未传入参数或传入对象参数包含任一 `audio` 参数或 `video` 参数，或传入对象参数包含不允许的参数，抛出 `TypeError`

若文档未处于完全激活状态，抛出 `InvalidStateError`

若请求媒体资源类型在当前浏览上下文中被阻止（如受权限策略限制），或被权限 API 拒绝，抛出 `NotAllowedError`

若无法获取满足条件的媒体轨道，抛出 `NotFoundError`

若不存在符合约束条件的候选设备，抛出 `OverconstrainedError`

若因为操作系统/程序/网页锁定设备导致无法从设备读取流信息，抛出 `NotReadableError`

若因为其他原因无法从设备读取流信息，抛出 `AbortError`

> `MediaStreamConstraints` 结构如下：
>
> `audio` 参数表示音频轨道相关信息，可以为一个布尔值（指定是否必须包含该轨道）或一个 `MediaTrackConstraints` 结构的对象
>
> `video` 参数表示视频轨道相关信息，可以为一个布尔值（指定是否必须包含该轨道）或一个 `MediaTrackConstraints` 结构的对象

> `MediaTrackConstraints` 结构如下：
>
> 继承自 `MediaTrackConstraintSet` 结构
>
> advanced 参数表示一个 `MediaTrackConstraintSet` 结构的对象的数组

> `MediaTrackConstraintSet` 结构如下：
>
> 包含 `MediaTrackCapabilities` 结构中各参数

## 权限策略

该 API 调用受到 `microphone` 权限策略或 `camera` 权限策略的控制，可以通过 `Permissions-Policy` 响应头指定，或通过 `<iframe>` 标签的 `allow` 属性指定

默认值均是 `self`，即允许在当前源的浏览上下文使用该 API

## 权限 API

该 API 调用需要用户授予 `microphone` 权限或 `camera` 权限，可以调用 `Permission.query()` 方法检查用户是否已授予了该权限

`camera` 权限的描述符的额外参数 `panTiltZoom`，值 `true` 比值 `false` 具有更高的优先级

## 类型

```ts
interface MediaDevices extends EventTarget {
  enumerateDevices(): Promise<MediaDeviceInfo[]>
  getSupportedConstraints(): MediaTrackSupportedConstraints
  getUserMedia(constraints?: MediaStreamConstraints): Promise<MediaStream>
  ondevicechange: ((this: MediaDevices, ev: Event) => any) | null
}

declare var MediaDevices: {
  prototype: MediaDevices
}

interface MediaDeviceInfo {
  readonly deviceId: string
  readonly groupId: string
  readonly kind: MediaDeviceKind
  readonly label: string
  toJSON(): any
}

declare var MediaDeviceInfo: {
  prototype: MediaDeviceInfo
  new(): MediaDeviceInfo
}

interface InputDeviceInfo extends MediaDeviceInfo {
  getCapabilities(): MediaTrackCapabilities
}

declare var InputDeviceInfo: {
  prototype: InputDeviceInfo
}

type MediaDeviceKind = 'audioinput' | 'audiooutput' | 'videoinput'

interface MediaTrackCapabilities {
  aspectRatio?: DoubleRange
  autoGainControl?: boolean[]
  channelCount?: ULongRange
  deviceId?: string
  displaySurface?: string
  echoCancellation?: boolean[]
  facingMode?: string[]
  frameRate?: DoubleRange
  groupId?: string
  height?: ULongRange
  noiseSuppression?: boolean[]
  sampleRate?: ULongRange
  sampleSize?: ULongRange
  width?: ULongRange
}

interface MediaTrackSupportedConstraints {
  aspectRatio?: boolean
  autoGainControl?: boolean
  channelCount?: boolean
  deviceId?: boolean
  displaySurface?: boolean
  echoCancellation?: boolean
  facingMode?: boolean
  frameRate?: boolean
  groupId?: boolean
  height?: boolean
  noiseSuppression?: boolean
  sampleRate?: boolean
  sampleSize?: boolean
  width?: boolean
}

interface MediaStreamConstraints {
  audio?: boolean | MediaTrackConstraints
  peerIdentity?: string
  preferCurrentTab?: boolean
  video?: boolean | MediaTrackConstraints
}

interface MediaTrackConstraintSet {
  aspectRatio?: ConstrainDouble
  autoGainControl?: ConstrainBoolean
  channelCount?: ConstrainULong
  deviceId?: ConstrainDOMString
  displaySurface?: ConstrainDOMString
  echoCancellation?: ConstrainBoolean
  facingMode?: ConstrainDOMString
  frameRate?: ConstrainDouble
  groupId?: ConstrainDOMString
  height?: ConstrainULong
  noiseSuppression?: ConstrainBoolean
  sampleRate?: ConstrainULong
  sampleSize?: ConstrainULong
  width?: ConstrainULong
}

interface MediaTrackConstraints extends MediaTrackConstraintSet {
  advanced?: MediaTrackConstraintSet[]
}
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/Media_Capture_and_Streams_API>
* <https://w3c.github.io/mediacapture-main/>
