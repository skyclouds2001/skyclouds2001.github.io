---
title: Remote Playback API
date: 2024-01-18 21:37:47
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
uniqueId: '2024-01-18 13:37:47/Remote Playback API.html'
mathJax: false
---

Remote Playback API 允许管理与当前媒体资源连接的远程媒体设备

## 使用远程媒体设备控制

通过 `HTMLMediaElement` 接口的 `remote` 只读属性获取到与当前媒体元素相关的 `RemotePlayback` 实例

`RemotePlayback` 接口提供了实际管理与当前媒体资源连接的远程媒体设备的相关属性、方法及事件

### 状态

`RemotePlayback` 接口的 `state` 只读属性返回与当前媒体资源连接的远程媒体设备的状态

其值为以下之一的字符串：

- `connecting` 当前媒体资源正在连接到远程媒体设备
- `connected` 当前媒体资源已连接到远程媒体设备
- `disconnected` 当前媒体资源未连接到远程媒体设备（如尚未初始化，连接失败或连接终止等）

### 监测可用远程媒体设备

调用 `RemotePlayback` 接口的 `watchAvailability()` 方法开始监视可用远程媒体设备

该方法需要传递一个回调方法参数，其在远程媒体设备可用性发生变化时调用，并传入一个代表远程媒体设备可用性的布尔值

该方法返回一个兑现一个代表对应远程媒体设备的 ID 的整数的 Promise

在对应媒体元素的 `disableRemotePlayback` 属性为 `true` 时抛出 `InvalidStateError` 异常

在用户代理不支持持续监听可用远程媒体设备列表时抛出 `NotSupportedError` 异常

调用 `RemotePlayback` 接口的 `cancelWatchAvailability()` 方法取消监视可用远程媒体设备

方法可以可选地传入一个整数，代表对应远程媒体设备的 ID

在对应媒体元素的 `disableRemotePlayback` 属性为 `true` 时抛出 `InvalidStateError` 异常

在传入的代表对应远程媒体设备的 ID 不存在时抛出 `NotSupportedError` 异常

### 连接远程媒体设备

调用 `RemotePlayback` 接口的 `prompt()` 方法显示弹窗以展示可用的远程媒体设备，用户可选择用于播放当前媒体资源的远程媒体设备并给予权限

方法返回一个 Promise

若对应媒体元素的 `disableRemotePlayback` 属性为 `true`，抛出 `InvalidStateError` 异常

若对应媒体元素上（或浏览上下文）正在调用 `prompt()` 方法，抛出 `OperationError` 异常

若用户最近未和网页发生交互，抛出 `InvalidAccessError` 异常

若用户代理确信远程播放特定媒体不可行，抛出 `NotSupportedError` 异常

若远程播放不可用，抛出 `NotFoundError` 异常

> 若用户选定远程媒体设备并授予权限后：
>
> - 用户代理会开始连接远程媒体设备
> - 当前媒体元素相关的 `RemotePlayback` 实例的 `state` 设定为 `connecting`
> - 触发 `connecting` 事件
> - 完成连接后触发 `connect` 事件
>
> 若用户代理选择断开与远程媒体设备的连接
>
> - 用户代理开始断开与远程媒体设备的连接
> - 当前媒体元素相关的 `RemotePlayback` 实例的 `state` 设定为 `disconnected`
> - 触发 `disconnect` 事件

在用户代理开始连接远程媒体设备时，触发 `connecting` 事件

在用户代理连接至远程媒体设备时，触发 `connect`  事件

在用户代理断开与远程媒体设备的连接时，触发 `disconnect` 事件

## 禁用远程媒体设备控制

通过 HTML `<audio>` 和 `<video>`  媒体元素的 `disableremoteplayback` 属性设置，或 `HTMLMediaElement` 元素的 `disableRemotePlayback` 属性读取或设置是否禁用当前媒体元素的远程播放

## 类型

```ts
interface RemotePlayback extends EventTarget {
  readonly state: RemotePlaybackState;
  cancelWatchAvailability(id?: number): Promise<void>;
  prompt(): Promise<void>;
  watchAvailability(callback: RemotePlaybackAvailabilityCallback): Promise<number>;
  onconnect: ((this: RemotePlayback, ev: Event) => any) | null;
  onconnecting: ((this: RemotePlayback, ev: Event) => any) | null;
  ondisconnect: ((this: RemotePlayback, ev: Event) => any) | null;
}

interface HTMLMediaElement {
  disableRemotePlayback: boolean;
  readonly remote: RemotePlayback;
}
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/Remote_Playback_API>
* <https://w3c.github.io/remote-playback/>
