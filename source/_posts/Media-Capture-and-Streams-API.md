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

<div style="width: 500px; height: 200px; overflow: auto; backdrop-filter: invert(25%); display: flex">
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

> `MediaTrackCapabilities` 结构参见如下*媒体参数*章节

## 检测用户代理支持参数

调用 `MediaDevices` 接口的 `getSupportedConstraints()` 方法获取用户代理支持识别的参数列表，返回一个 `MediaTrackSupportedConstraints` 结构的对象，对象的键名为所有受支持的参数列表，键值为 `true`

> `MediaTrackSupportedConstraints` 结构参见如下*媒体参数*章节

<div style="width: 500px; height: 200px; overflow: auto; backdrop-filter: invert(25%); display: flex;">
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

也可以使用该方法来请求本地媒体设备的权限，包括麦克风 `microphone` 权限与摄像头 `camera` 权限

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

> `MediaTrackConstraints` 结构继承自 `MediaTrackConstraintSet` 结构
>
> 其 `advanced` 参数表示一个 `MediaTrackConstraintSet` 结构的对象的数组

> `MediaTrackConstraintSet` 结构参见如下*媒体参数*章节

> `OverconstrainedError` 异常继承自 `DOMException`，常用于表示所需的功能集无法满足当前 `MediaStreamTrack`
>
> 其 `constraint` 只读属性返回一个字符串，表示未满足的约束

<div style="width: 740px; height: 360px; overflow: auto; backdrop-filter: invert(25%); display: flex;">
    <video id="video" width="640" height="360" style="width: 640px; height: 360px;"></video>
    <button id="button">加载</button>
    <script type="module">
        const video = document.getElementById('video');
        const button = document.getElementById('button');
        button.addEventListener('click', async () => {
          video.srcObject = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
          });
          video.play();
        })
    </script>
</div>

## 媒体参数

* `width` 参数表示视频轨道的宽度
* `height` 参数表示视频轨道的高度
* `aspectRatio` 参数表示视频轨道的宽高比
* `frameRate` 参数表示视频轨道的帧速
* `facingMode` 参数表示视频轨道的摄像头朝向参数
* `resizeMode` 参数表示视频轨道的可裁剪模式
* `sampleRate` 参数表示音频轨道的采样率
* `sampleSize` 参数表示音频轨道的样本大小
* `echoCancellation` 参数表示音频轨道的是否可进行回声消除
* `autoGainControl` 参数表示音频轨道的是否可进行自动增益控制
* `noiseSuppression` 参数表示音频轨道的是否可进行噪声抑制
* `latency` 参数表示音频轨道的延迟时间
* `channelCount` 参数表示音频轨道的通道数
* `deviceId` 参数表示轨道相关的 `deviceId` 属性
* `groupId` 参数表示轨道相关的 `groupId` 属性

这些参数可被如下一些结构使用：

- `MediaTrackSupportedConstraints` 结构，表示受到用户代理支持的约束参数
  - `MediaDevices.getSupportedConstraints()` 方法
- `MediaTrackConstraintSet` 结构
- `MediaTrackConstraints` 结构（继承 `MediaTrackConstraintSet` 结构），表示开发者配置的约束参数范围
  -  `MediaDevices.getDisplayMedia()` 方法
  -  `MediaDevices.getUserMedia()` 方法
  - `MediaStreamTrack.getConstraints()` 方法
  - `MediaStreamTrack.applyConstraints()` 方法
- `MediaTrackSettings` 结构，表示用户代理实际使用的约束参数
  - `MediaStreamTrack.getSettings()` 方法
- `MediaTrackCapabilities` 结构，表示用户代理支持的约束参数范围
  - `MediaStreamTrack.getCapabilities()` 方法
  - `InputDeviceInfo.getCapabilities()` 方法

并且这些结构通过 Screen Capture API 和 MediaStream Image Capture API 被拓展

## 媒体流

MediaStream 接口表示一个媒体流，它可包含多个媒体轨道（音频轨道与视频轨道），它支持对其包含的媒体轨道的枚举、获取、增加及删除，以及对自身的创建和克隆等

### 创建媒体流

可以通过 `MediaDevices.getUserMedia()` `MediaDevices.getDisplayMedia()` `HTMLCanvasElement.captureStream()` `HTMLMediaElement.captureStream()` 等方法创建对应的媒体流

亦可以调用 `MediaStream()` 构造方法创建新媒体流

构造方法可以不传任何参数，创建一个空的媒体流

构造方法可以传一个 `MediaStream` 实例参数，创建的媒体流会与传入参数的媒体流共享使用所有媒体轨道

构造方法可以传一个 `MediaStreamTrack` 数组参数，创建的媒体流会使用所有传入的媒体轨道

### 媒体流信息

`MediaStream` 接口的 `id` 只读属性返回媒体流的一个唯一的 32 位标识符 UUID

`MediaStream` 接口的 `active` 只读属性标识媒体流当前是否处于活跃状态

媒体流是否处于活跃状态，取决于其包含的所有媒体轨道是否结束（`readyState` 属性是否被置为 `ended`）

### 克隆媒体流

`MediaStream` 接口的 `clone()` 方法克隆当前媒体流，同时会克隆其包含的所有媒体轨道，返回的新媒体流具有与原媒体流不同的 ID

### 增加媒体轨道

`MediaStream` 接口的 `addtrack()` 方法向媒体流中增加给定媒体轨道，需要传入一个 `MediaStreamTrack` 实例参数；若给定媒体轨道已在媒体流中，调用该方法不会产生效果

`MediaStream` 接口的 `addtrack` 事件在媒体流中增加媒体轨道时触发，返回一个 `MediaStreamTrackEvent` 事件

### 移除媒体轨道

`MediaStream` 接口的 `removetrack()` 方法向媒体流中移除给定媒体轨道，需要传入一个 `MediaStreamTrack` 实例参数；若给定媒体轨道未在媒体流中，调用该方法不会产生效果

`MediaStream` 接口的 `removetrack` 事件在媒体流中移除媒体轨道时触发，返回一个 `MediaStreamTrackEvent` 事件

### 媒体轨道改变事件

`MediaStreamTrackEvent` 事件表示媒体流的改变

其 `track` 只读属性表示产生该变化的媒体轨道，返回一个 `MediaStreamTrack` 实例

### 获取媒体轨道

`MediaStream` 接口的 `getTrackById()` 方法获取媒体流中给定 ID 的媒体轨道，若存在则返回一个 `MediaStreamTrack` 实例，反之 `null` 被返回

`MediaStream` 接口的 `getAudioTracks()` 方法获取媒体流中所有音频轨道，返回一个 `MediaStreamTrack` 数组

`MediaStream` 接口的 `getVideoTracks()` 方法获取媒体流中所有视频轨道，返回一个 `MediaStreamTrack` 数组

`MediaStream` 接口的 `getTracks()` 方法获取媒体流中所有媒体轨道，返回一个 `MediaStreamTrack` 数组

## 媒体轨道

`MediaStreamTrack` 接口表示表示一个媒体轨道，它支持对自身的克隆和暂停及获取或设置自身的配置等

### 媒体轨道信息

`MediaStreamTrack` 接口的 `id` 只读属性返回媒体轨道的一个唯一的 32 位标识符 UUID

`MediaStreamTrack` 接口的 `kind` 只读属性返回媒体轨道的类型，值为 `audio` 代表音频轨道，值为 `video` 代表视频轨道

`MediaStreamTrack` 接口的 `label` 只读属性返回媒体轨道的标签，值由用户代理生成

### 媒体轨道使用状态

`MediaStreamTrack` 接口的 `muted` 只读属性指示媒体轨道当前是否支持提供媒体数据

`MediaStreamTrack` 接口的 `mute` 事件在媒体轨道的源无法提供媒体数据时触发，返回一个 `Event` 事件

`MediaStreamTrack` 接口的 `unmute` 事件在媒体轨道的源再次能够提供媒体数据时触发，返回一个 `Event` 事件

`MediaStreamTrack` 接口的 `enabled` 属性读取或设置媒体轨道是否允许提供媒体数据；对音频轨道而言，样本值被置为 0；对视频轨道而言，像素值均为黑色

### 媒体轨道运行状态

`MediaStreamTrack` 接口的 `readyState` 只读属性返回当前媒体轨道的状态，值 `live` 指示媒体轨道正常运行，值 `ended` 指示媒体轨道已终止提供数据

`MediaStreamTrack` 接口的 `stop()` 方法终止当前媒体轨道，并且 `readyState` 属性值会置为 `ended`，但 `ended` 事件不会被触发

`MediaStreamTrack` 接口的 `ended` 事件在媒体轨道对应资源终止提供媒体数据时触发

### 克隆媒体轨道

`MediaStreamTrack` 接口的 `clone()` 方法克隆当前媒体轨道，返回的新媒体轨道具有与原媒体轨道不同的 ID

### 媒体轨道参数

`MediaStreamTrack` 接口的 `getConstraints()` 方法读取媒体轨道的约束属性，返回一个 `MediaTrackConstraints` 结构的对象

`MediaStreamTrack` 接口的 `applyConstraints()` 方法向媒体轨道应用约束属性，需要传递一个 `MediaTrackConstraints` 结构的对象参数，返回一个 `Promise`

`MediaStreamTrack` 接口的 `getCapabilities()` 方法读取媒体轨道的允许受约束属性值，返回一个 `MediaTrackCapabilities` 结构的对象

`MediaStreamTrack` 接口的 `getSettings()` 方法读取媒体轨道的受约束属性（包含由操作系统指定的默认值），返回一个 `MediaTrackSettings` 结构的对象

> `MediaTrackSettings` 结构参见如上*媒体参数*章节

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
  new(): InputDeviceInfo
}

interface OverconstrainedError extends DOMException {
  readonly constraint: string
}

declare var OverconstrainedError: {
  prototype: OverconstrainedError
  new(constraint: string, message?: string): OverconstrainedError
}

interface MediaStream extends EventTarget {
  readonly active: boolean
  readonly id: string
  addTrack(track: MediaStreamTrack): void
  clone(): MediaStream
  getAudioTracks(): MediaStreamTrack[]
  getTrackById(trackId: string): MediaStreamTrack | null
  getTracks(): MediaStreamTrack[]
  getVideoTracks(): MediaStreamTrack[]
  removeTrack(track: MediaStreamTrack): void
  onaddtrack: ((this: MediaStream, ev: MediaStreamTrackEvent) => any) | null
  onremovetrack: ((this: MediaStream, ev: MediaStreamTrackEvent) => any) | null
}

declare var MediaStream: {
  prototype: MediaStream
  new(): MediaStream
  new(stream: MediaStream): MediaStream
  new(tracks: MediaStreamTrack[]): MediaStream
}

interface MediaStreamTrack extends EventTarget {
  contentHint: string
  enabled: boolean
  readonly id: string
  readonly kind: string
  readonly label: string
  readonly muted: boolean
  readonly readyState: MediaStreamTrackState
  applyConstraints(constraints?: MediaTrackConstraints): Promise<void>
  clone(): MediaStreamTrack
  getCapabilities(): MediaTrackCapabilities
  getConstraints(): MediaTrackConstraints
  getSettings(): MediaTrackSettings
  stop(): void
  onended: ((this: MediaStreamTrack, ev: Event) => any) | null
  onmute: ((this: MediaStreamTrack, ev: Event) => any) | null
  onunmute: ((this: MediaStreamTrack, ev: Event) => any) | null
}

declare var MediaStreamTrack: {
  prototype: MediaStreamTrack
}

interface MediaStreamTrackEvent extends Event {
  readonly track: MediaStreamTrack
}

declare var MediaStreamTrackEvent: {
  prototype: MediaStreamTrackEvent
  new(type: string, eventInitDict: MediaStreamTrackEventInit): MediaStreamTrackEvent
}

interface MediaStreamTrackEventInit extends EventInit {
  track: MediaStreamTrack
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

interface MediaTrackSettings {
  aspectRatio?: number
  autoGainControl?: boolean
  channelCount?: number
  deviceId?: string
  displaySurface?: string
  echoCancellation?: boolean
  facingMode?: string
  frameRate?: number
  groupId?: string
  height?: number
  noiseSuppression?: boolean
  sampleRate?: number
  sampleSize?: number
  width?: number
}
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/Media_Capture_and_Streams_API>
* <https://w3c.github.io/mediacapture-main/>
