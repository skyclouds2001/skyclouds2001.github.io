---
title: Permissions API
date: 2023-11-05 14:39:30
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
uniqueId: '2023-11-05 06:39:30/Permissions API.html'
mathJax: false
---

Permissions API 提供了编程式地检测当前浏览上下文 API 权限

可以用于确定对应的 API 是否已授予权限或被拒绝授予权限，或等待授权权限

同时 API 还会考虑其他因素，如若该 API 对 Secure Context 的要求、Permissions-Policy 的限制等待

该 API 通过 `Permissions` 接口提供相关功能，并通过 `Navigator.permissions` 和 `WorkerNavigator.permissions` 对外暴露 `Permissions` 实例

## 检测权限

调用 `Permissions` 接口的 `query()` 方法检测给定 API 的权限状态

方法传入一个 `permissionDescriptor` 的配置项，其唯一参数 `name` 反映与给定 API 相关的名称

方法返回一个 Promise 的 `PermissionStatus`，代表与给定 API 相关的权限状态

```js
const status = await navigator.permissions.query({
  name: 'geolocation',
})

console.log(status.state) // 'granted' 'denied' 'prompt'
```

`PermissionStatus` 的 `state` 属性返回一个 string，代表权限的状态，为 `'granted'` `'denied'` `'prompt'` 之一

`PermissionStatus` 的 `name` 属性返回一个 string，代表权限的名称，与 query() 方法传入的 name 参数一致

`PermissionStatus` 的 `change` 事件在权限的状态改变时触发，返回一个 `Event`

## 权限名称列表

|                  API name                   |                                Permission name                                |
|:-------------------------------------------:|:-----------------------------------------------------------------------------:|
|       Background Synchronization API        |                               `background-sync`                               |
|                Clipboard API                |                    `clipboard-read`<br/>`clipboard-write`                     |
|               Geolocation API               |                                 `geolocation`                                 |
|            Local Font Access API            |                                 `local-fonts`                                 |
|        Media Capture and Streams API        |                           `microphone`<br/>`camera`                           |
|              Notifications API              |                                `notifications`                                |
|             Payment Handler API             |                               `payment-handler`                               |
|                  Push API                   |                                    `push`                                     |
|                 Sensor API                  | `accelerometer`<br/>`gyroscope`<br/>`magnetometer`<br/>`ambient-light-sensor` |
|             Storage Access API              |                               `storage-access`                                |
|                 Storage API                 |                             `persistent-storage`                              |
|        Web Audio Output Devices API         |                              `speaker-selection`                              |
|                Web MIDI API                 |                                    `midi`                                     |
|            Window Management API            |                              `window-management`                              |

不同浏览器支持的权限名称亦不同

Firefox 参见 <https://searchfox.org/mozilla-central/source/dom/webidl/Permissions.webidl#10>

Chromium 参见 <https://chromium.googlesource.com/chromium/src/+/refs/heads/main/third_party/blink/renderer/modules/permissions/permission_descriptor.idl#6>

Webkit 参见 <https://github.com/WebKit/WebKit/blob/main/Source/WebCore/Modules/permissions/PermissionName.idl#L28>

## 类型

```ts
interface Navigator {
  readonly permissions: Permissions
}

partial interface WorkerNavigator {
  readonly permissions: Permissions
}

interface Permissions {
   query(permissionDesc: PermissionDescriptor): Promise<PermissionStatus>
}

interface PermissionDescriptor {
  name: string
}

interface PermissionStatus extends EventTarget {
  readonly state: PermissionState
  readonly name: string

  onchange: ((this: PermissionStatus, ev: Event) => any) | null
}

enum PermissionState {
  "granted",
  "denied",
  "prompt",
}
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API>
* <https://w3c.github.io/permissions/>
