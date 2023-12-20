---
title: MediaStream Recording API
date: 2023-12-19 19:20:10
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
uniqueId: '2023-12-19 11:20:10/MediaStream Recording API.html'
mathJax: false
---

MediaStream Recording API 支持实现录制视频流的功能，录制的数据可以用于进一步分析、处理并保存至硬盘

该 API 主要通过 `MediaRecorder` 接口提供相关的功能

## 初始化录制

调用 `MediaRecorder()` 构造方法以创建一个录制器

需要传入一个 `stream` 参数，接收一个 `MediaStream` 实例，代表需要录制的媒体流

此外可以传入一个可选的配置项参数，具体属性如下：

* `mimeType` 参数接收一个字符串，需要为一个合法的 MIME 媒体类型，同时允许指定额外的编码格式，默认值为空字符串
* `audioBitsPerSecond` 参数接收一个正整数，指定录制音频的比特率
* `videoBitsPerSecond` 参数接收一个正整数，指定录制视频的比特率
* `bitsPerSecond` 参数接收一个正整数，指定默认比特率，若 `audioBitsPerSecond` 或 `videoBitsPerSecond` 未指定，对应的轨道采样率将会采用
* `audioBitrateMode` 参数，指定录制音频的比特率模式，值为 `constant`（恒定比特率）或 `variable`（变化比特率），默认为 `variable`
* `videoKeyFrameIntervalDuration` 参数接收一个时间戳，指定关键帧之间标称时间间隔，用户代理在生成关键帧时会综合考虑该参数与 `videoKeyFrameIntervalCount` 参数
* `videoKeyFrameIntervalCount` 参数接收一个正整数，指定关键帧之间帧数间隔，用户代理在生成关键帧时会综合考虑该参数与 `videoKeyFrameIntervalDuration` 参数

若传递的 `mimeType` 参数当前不受用户代理支持，抛出 `NotSupportedError` 异常

## 检测编码格式

`MediaRecorder` 接口的 `isTypeSupported()` 静态方法检测 MIME 媒体类型是否支持，即指定的 MIME 媒体类型以及编码格式能否使得用户代理成功进行录制

该方法接收一个字符串，代表需要检测的 MIME 媒体类型以及编码格式

该方法返回一个布尔值，指示该类型是否支持

## 开始录制

调用 `MediaRecorder` 接口的 `start()` 方法开始录制

默认会将捕获的数据放入到一个 Blob 实例中并在录制结束时通过 `dataavailable` 事件返回，或在调用 `requestData()` 方法时返回

可以可选的传入一个数字参数，指定单段记录的最长时间；此情况下会周期性地触发 `dataavailable` 事件，并返回在这个周期中录制的数据

若所在 `MediaRecorder` 实例的 `state` 属性不为 `inactive`，即已开始录制或已暂停录制时，抛出 `InvalidStateError` 异常

若媒体流的配置禁止录制，抛出 `SecurityError` 异常

若媒体流处于 `inactive` 状态；或 `MediaRecorder` 实例的 `videoKeyFrameIntervalDuration` 参数与 `videoKeyFrameIntervalCount` 参数均指定；或任一媒体流中的媒体轨道不支持使用当前配置进行录制，抛出 `NotSupportedError` 异常

`MediaRecorder` 接口的 `start` 事件在开始录制时触发，返回一个 `Event` 事件，如调用 `MediaRecorder.start()` 方法

## 暂停录制

调用 `MediaRecorder` 接口的 `pause()` 方法暂停录制

若所在 `MediaRecorder` 实例的 `state` 属性为 `inactive`，即未开始录制或已终止录制时，抛出 `InvalidStateError` 异常

调用 `pause()` 方法后，会先改变 `state` 属性，最后触发 `pause` 事件

`MediaRecorder` 接口的 `pause` 事件在结束录制时触发，返回一个 `Event` 事件，如调用 `MediaRecorder.pause()` 方法

## 恢复录制

调用 `MediaRecorder` 接口的 `resume()` 方法恢复录制

若所在 `MediaRecorder` 实例的 `state` 属性不为 `inactive`，即已开始录制或已暂停录制时，抛出 `InvalidStateError` 异常

调用 `resume()` 方法后，会先改变 `state` 属性，最后触发 `resume` 事件

`MediaRecorder` 接口的 `resume` 事件在结束录制时触发，返回一个 `Event` 事件，如调用 `MediaRecorder.resume()` 方法

## 结束录制

调用 `MediaRecorder` 接口的 `stop()` 方法终止录制

若所在 `MediaRecorder` 实例的 `state` 属性为 `inactive`，即未开始录制或已终止录制时，抛出 `InvalidStateError` 异常异常

调用 `stop()` 方法后，会先改变 `state` 属性，然后触发 `dataavailable` 事件，最后触发 `stop` 事件

`MediaRecorder` 接口的 `stop` 事件在结束录制时触发，返回一个 `Event` 事件，如调用 `MediaRecorder.stop()` 方法或录制中的媒体流结束；在触发此事件前触发一个 `dataavailable` 事件

## 接收数据

调用 `MediaRecorder` 接口的 `requestData()` 方法用于立即触发一个 `dataavailable` 事件

若所在 `MediaRecorder` 实例的 `state` 属性为 `inactive`，即未开始录制或已终止录制时，抛出 `InvalidStateError` 异常

`MediaRecorder` 接口的 `dataavailable` 事件在录制过程中产生数据时触发，返回一个 `BlobEvent` 事件，可能原因有：媒体流终止、调用 `requestData()` 方法或 `stop()` 方法、调用 start() 方法时传递了 `timeslice` 参数

> `BlobEvent` 事件结构：
>
> `data` 只读属性，表示与事件相关的二进制数据
>
> `timecode` 只读属性，表示生成首个 chunk 和触发 `BlobEvent` 事件的时间差

## 异常处理

`MediaRecorder` 接口的 `error` 事件在录制过程中出现异常时触发

触发 `error` 事件后，会接着触发 `dataavailable` 事件，最后触发 `stop` 事件

若媒体流的配置发生变化导致无法继续录制，通过 `error` 事件抛出 `SecurityError` 异常

若媒体流增删媒体轨道，通过 `error` 事件抛出 `InvalidModificationError` 异常

若因为其他未知原因无法继续录制，通过 `error` 事件抛出 `UnknownError` 异常

## 录制状态

`MediaRecorder` 接口的 `state` 只读属性返回一个字符串，表示当前录制的状态，值可以为如下之一：

* `inactive` 表示录制事件未发生，如尚未开始录制或录制已终止
* `recording` 表示录制已经开始并且用户代理正在捕获数据
* `paused` 表示录制已经开始，但目前被暂停，但未终止或恢复

## 录制信息

`MediaRecorder` 接口的 `stream` 只读属性返回一个 `MediaStream`，表示正在录制的目标媒体流，即初始化时传入的 `stream` 参数

`MediaRecorder` 接口的 `mimeType` 只读属性返回一个字符串，指示正在录制的 MIME 类型，与初始化时传入的 `mimeType` 参数相关或由用户代理决定

`MediaRecorder` 接口的 `audioBitsPerSecond` 只读属性返回一个正整数，指示录制音频的比特率

`MediaRecorder` 接口的 `videoBitsPerSecond` 只读属性返回一个正整数，指示录制视频的比特率

`MediaRecorder` 接口的 `audioBitrateMode` 只读属性返回一个 `constant` 或 `variable` 之一，指示录制音频的比特率模式

## 类型

```ts
interface MediaRecorder extends EventTarget {
  readonly audioBitsPerSecond: number
  readonly mimeType: string
  readonly state: RecordingState
  readonly stream: MediaStream
  readonly videoBitsPerSecond: number
  pause(): void
  requestData(): void
  resume(): void
  start(timeslice?: number): void
  stop(): void
  ondataavailable: ((this: MediaRecorder, ev: BlobEvent) => any) | null
  onerror: ((this: MediaRecorder, ev: Event) => any) | null
  onpause: ((this: MediaRecorder, ev: Event) => any) | null
  onresume: ((this: MediaRecorder, ev: Event) => any) | null
  onstart: ((this: MediaRecorder, ev: Event) => any) | null
  onstop: ((this: MediaRecorder, ev: Event) => any) | null
}

declare var MediaRecorder: {
  prototype: MediaRecorder
  new(stream: MediaStream, options?: MediaRecorderOptions): MediaRecorder
  isTypeSupported(type: string): boolean
}

interface MediaRecorderOptions {
  audioBitsPerSecond?: number
  bitsPerSecond?: number
  mimeType?: string
  videoBitsPerSecond?: number
}

type RecordingState = "inactive" | "paused" | "recording"

interface BlobEvent extends Event {
  readonly data: Blob
  readonly timecode: DOMHighResTimeStamp
}

declare var BlobEvent: {
  prototype: BlobEvent
  new(type: string, eventInitDict: BlobEventInit): BlobEvent
}

interface BlobEventInit {
  data: Blob
  timecode?: DOMHighResTimeStamp
}
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API>
* <https://w3c.github.io/mediacapture-record/>
