---
title: Screen Capture API
date: 2023-12-18 11:06:56
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
uniqueId: '2023-12-18 03:06:56/Screen Capture API.html'
mathJax: false
---

Screen Capture API 允许网站捕获屏幕共享媒体流，实现共享屏幕功能

## 使用

调用 `MediaDevices` 接口的 `getDisplayMedia()` 方法捕获屏幕共享媒体流

方法可以传递一个可选的配置项参数，参数结构如下：

> * `video` 参数，同 `MediaDevices` 接口的 `getUserMedia()` 方法，默认为 `true`
> * `audio` 参数，同 `MediaDevices` 接口的 `getUserMedia()` 方法，默认为 `false`
> * `controller` 参数，接收一个 CaptureController 对象，可用于进一步操作捕获会话
> * `preferCurrentTab` 参数，接收一个布尔值，表示是否将当前标签页设置为最突出的选择
> * `selfBrowserSurface` 参数，接收 `exclude` 或 `include` 之一，指示是否应当允许捕获当前标签页，默认为 `exclude`
> * `systemAudio` 参数，接收 `exclude` 或 `include` 之一，指示是否应当包含系统音频，默认为 `include`
> * `surfaceSwitching` 参数，接收 `exclude` 或 `include` 之一，指示是否应当显示动态切换共享标签页的控件，默认为 `exclude`
> * `monitorTypeSurfaces` 参数，接收 `exclude` 或 `include` 之一，指示是否应当包含显示界面，默认为 `include`

方法返回一个兑现一个 `MediaStream` 的 `Promise`

若 `controller` 参数已传递给一个屏幕媒体流，或当前未处于粘性激活状态、完全激活状态、完全聚焦状态之一，方法抛出 `InvalidStateError` 异常

若 `video` 参数被置为 `false`，`audio` 参数或 `video` 参数之一包含 `advanced` 选项或 `min` 属性或 `exact` 属性，方法抛出 `TypeError` 异常

若传递的限制屏幕的参数 `max` 的值小于可约束属性支持的下限，即此时无法捕获符合参数限制的屏幕媒体流，或应用参数限制失败，方法抛出 `OverconstrainedError` 异常

若无法获得对应的屏幕媒体流，方法抛出 `NotFoundError` 异常

若用户拒绝授权使用屏幕媒体流的权限，或用户代理网页限制使用屏幕共享，方法抛出 `NotAllowedError` 异常

若因为操作系统/程序/网页限制无法提供媒体流，抛出 `NotReadableError` 异常

若因为其他未知原因无法提供媒体流，抛出 `AbortError` 异常

> CaptureController 简介：
>
> 可调用其构造方法创建一个 `CaptureController` 实例
>
> 可调用其 `setFocusBehavior()` 方法设置其聚焦策略，传入参数可以为 `focus-captured-surface`（转移焦点至捕获界面）或 `no-focus-change`（不转移焦点）

## 相关参数

* `displaySurface` 参数，指定显示界面的类型，值为 `monitor` `window` `browser` 之一
* `logicalSurface` 参数，指定是否为逻辑显示界面，返回一个布尔值
* `cursor` 参数，指定是否将光标包含在显示界面中，值为 `never` `always` `motion` 之一
* `restrictOwnAudio` 参数，控制是否尝试从移除由当前文档产生的音频，返回一个布尔值
* `suppressLocalAudioPlayback` 参数，控制是否将捕获的本地音频转发到本地扬声器设备，返回一个布尔值

这些参数被拓展至以下一些结构：

- `MediaTrackSupportedConstraints` 结构
- `MediaTrackConstraintSet` 结构（从而拓展至 `MediaTrackConstraint` 结构）
- `MediaTrackSettings` 结构
- `MediaTrackCapabilities`（不含 `restrictOwnAudio` 与 `suppressLocalAudioPlayback` 参数）结构

这些参数在屏幕共享的媒体流中可用

## 示例

<div id="screen-capture" style="width: 740px; height: 360px; overflow: auto; backdrop-filter: invert(25%); display: flex;">
    <video width="640" height="360" style="width: 640px; height: 360px;"></video>
    <button>加载</button>
    <script type="module">
        const video = document.querySelector('#screen-capture video');
        const button = document.querySelector('#screen-capture button');
        button.addEventListener('click', async () => {
          video.srcObject = await navigator.mediaDevices.getDisplayMedia({
            audio: true,
            video: true,
          });
          video.play();
        })
    </script>
</div>

## 权限策略

该 API 调用受到 `display-capture` 权限策略的控制，可以通过 `Permissions-Policy` 响应头指定，或通过 `<iframe>` 标签的 `allow` 属性指定

默认值是 `self`，即允许当前源的浏览上下文使用该 API

## 权限 API

该 API 每次调用都需要用户授予 `display-capture` 权限（即不会将该权限设置为 `granted`），可以调用 `Permission.query()` 方法检查用户是否拒绝授予该权限

## 类型

```ts
interface MediaDevices {
  getDisplayMedia(options?: DisplayMediaStreamOptions): Promise<MediaStream>
}

interface DisplayMediaStreamOptions {
  audio?: boolean | MediaTrackConstraints
  video?: boolean | MediaTrackConstraints
  controller: CaptureController
  selfBrowserSurface: SelfCapturePreferenceEnum
  systemAudio: SystemAudioPreferenceEnum
  surfaceSwitching: SurfaceSwitchingPreferenceEnum
  monitorTypeSurfaces: MonitorTypeSurfacesEnum
}

interface CaptureController extends EventTarget {
  setFocusBehavior(focusBehavior: CaptureStartFocusBehavior): void
}

declare var CaptureController: {
  prototype: CaptureController
  new(): CaptureController
}

type CaptureStartFocusBehavior = 'focus-capturing-application' | 'focus-captured-surface' | 'no-focus-change'
type SelfCapturePreferenceEnum = 'include' | 'exclude'
type SystemAudioPreferenceEnum = 'include' | 'exclude'
type SurfaceSwitchingPreferenceEnum = 'include' | 'exclude'
type MonitorTypeSurfacesEnum = 'include' | 'exclude'

interface MediaTrackSupportedConstraints {
  displaySurface?: boolean
  logicalSurface?: boolean
  cursor?: boolean
  restrictOwnAudio?: boolean
  suppressLocalAudioPlayback?: boolean
}

interface MediaTrackConstraintSet {
  displaySurface?: ConstrainDOMString
  logicalSurface?: ConstrainBoolean
  cursor?: ConstrainDOMString
  restrictOwnAudio?: ConstrainBoolean
  suppressLocalAudioPlayback?: ConstrainBoolean
}

interface MediaTrackSettings {
  displaySurface?: string
  logicalSurface?: boolean
  cursor?: string
  restrictOwnAudio?: boolean
  suppressLocalAudioPlayback?: boolean
}

interface MediaTrackCapabilities {
  displaySurface?: string
  logicalSurface?: boolean
  cursor?: string[]
}
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/Screen_Capture_API>
* <https://w3c.github.io/mediacapture-screen-share/>
