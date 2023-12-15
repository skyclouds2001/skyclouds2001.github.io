---
title: Media Session API
date: 2023-12-15 21:28:18
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
uniqueId: '2023-12-15 13:28:18/Media Session API.html'
mathJax: false
---

Media Session API 允许开发者显示自定义的媒体元信息，自定义可用媒体平台控件及访问平台媒体密钥；用户代理可能会将这些信息提供给设备，便于设备媒体信息 UI 界面的展示

该 API 通过 `MediaSession` 接口提供相关功能，并藉由 `Navigator` 接口的 `mediaSession` 只读属性暴露 `MediaSession` 实例供开发者使用

## 媒体播放状态

`MediaMetadata` 接口的 `playbackState` 属性读取或设置媒体播放状态，值需为 `none` `paused` `playing` 之一

`MediaMetadata` 接口的 `setPositionState()` 方法用于设置媒体的播放状态信息，包括播放速度、播放位置和媒体总时间等

该方法传入一个 `MediaPositionState` 结构的对象参数

> `MediaPositionState` 结构如下：
> - `duration` 属性返回一个数字，代表媒体资源的播放持续时间；需要为正值，可以为正无穷以表示媒体播放没有尽头
> - `playbackRate` 属性返回一个数字，代表媒体资源的播放速度；需要为正值
> - `position` 属性返回一个数字，代表媒体资源的播放位置；需要不为零

## 媒体元信息

`MediaMetadata` 接口表示但个媒体元信息

该接口的 `title` 属性读取或设置其媒体资源的名称，为一个字符串

该接口的 `artist` 属性读取或设置其媒体资源的作者，团队，创建者等的名称，为一个字符串

该接口的 `album` 属性读取或设置其媒体资源的专辑或集合的名称，为一个字符串

该接口的 `artwork` 属性读取或设置其媒体资源的图片，为一个只读 `MediaImage` 结构的对象数组

> `MediaImage` 结构如下：
> - `src` 属性返回一个字符串，代表图片的 URL
> - `sizes` 可选属性返回一个字符串，代表图片的尺寸，默认为空字符串，可用于避免用户代理不必要地缩放图像
> - `type` 可选属性返回一个字符串，代表图片的 MIME 类型，默认为空字符串，可便于用户代理忽略其不支持的 MIME 类型图像

可调用 `MediaMetadata()` 构造方法创建一个媒体元信息

构造方法可传入一个可选的对象参数，对象各参数即 `MediaMetadata` 接口的各属性

`MediaMetadata` 接口的 `metadata` 属性读取或设置浏览器当前播放的媒体资源，用于浏览器向用户设备提供相应信息，默认为 `null`

## 媒体设备状态

`MediaMetadata` 接口的 `setCameraActive()` 方法用于设置摄像头状态信息

`MediaMetadata` 接口的 `setMicrophoneActive()` 方法用于设置麦克风状态信息

两方法均需传入一个布尔类型的参数，表示媒体设备的状态

## 监听设备媒体界面控件

`MediaMetadata` 接口的 `setActionHandler()` 方法用于设置设备媒体界面控件特定事件的触发方法

方法需要传入一个字符串参数，代表需要监听的事件类型

> 允许的事件类型如下：
> - `play` 开始或恢复播放
> - `pause` 暂停播放
> - `seekbackward` 向后移动定位
> - `seekforward` 向前移动定位
> - `previoustrack` 回退到上一资源
> - `nexttrack` 前进到下一资源
> - `skipad` 跳过广告播放，可能因为设备或用户代理设置而失败
> - `stop` 停止播放
> - `seekto` 移动至指定定位
> - `togglemicrophone` 切换麦克风状态
> - `togglecamera` 切换摄像头状态
> - `hangup` 结束通话
> - `previousslide` 回退至上一幻灯片
> - `nextslide` 前进至下一幻灯片
> - `togglecamera` 切换摄像头状态

方法需要传入一个回调函数参数，该回调函数在特定事件触发时调用，并传入一个 `MediaSessionActionDetails` 结构的对象参数

> `MediaSessionActionDetails` 结构如下：
> - `action` 属性返回一个字符串，代表特定的事件
> - `fastSeek` 属性返回一个布尔值，代表是否采用快速媒体定位，在 `action` 为 `seekto` 时可能提供
> - `seekOffset` 属性返回一个数字，代表媒体定位的偏移量，在 `action` 为 `seekforward` 或 `seekbackward` 时可能提供
> - `seekTime` 属性返回一个数字，代表媒体定位的目标时间，在 `action` 为 `seekto` 时提供

## 权限策略

该 API 调用受到 `mediasession` 权限策略的控制，可以通过 `Permissions-Policy` 响应头指定，或通过 `<iframe>` 标签的 `allow` 属性指定

默认值是 `*`，即允许任意源的浏览上下文使用该 API

## 类型

```ts
interface Navigator {
  readonly mediaSession: MediaSession
}

interface MediaSession {
  metadata: MediaMetadata | null
  playbackState: MediaSessionPlaybackState
  setActionHandler(action: MediaSessionAction, handler: MediaSessionActionHandler | null): void
  setPositionState(state?: MediaPositionState): void
}

declare var MediaSession: {
  prototype: MediaSession
}

interface MediaPositionState {
  duration?: number
  playbackRate?: number
  position?: number
}

interface MediaMetadata {
  album: string
  artist: string
  artwork: ReadonlyArray<MediaImage>
  title: string
}

declare var MediaMetadata: {
  prototype: MediaMetadata
  new(init?: MediaMetadataInit): MediaMetadata
}

interface MediaMetadataInit {
  album?: string;
  artist?: string;
  artwork?: MediaImage[];
  title?: string;
}
interface MediaImage {
  sizes?: string
  src: string
  type?: string
}

type MediaSessionAction = "nexttrack" | "pause" | "play" | "previoustrack" | "seekbackward" | "seekforward" | "seekto" | "skipad" | "stop"
type MediaSessionPlaybackState = "none" | "paused" | "playing"

interface MediaSessionActionHandler {
  (details: MediaSessionActionDetails): void;
}
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/Media_Session_API>
* <https://w3c.github.io/mediasession/>
