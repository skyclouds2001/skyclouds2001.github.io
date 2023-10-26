---
title: Network Information API
date: 2023-10-26 12:08:55
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
uniqueId: '2023-10-26 04:08:55/Network Information API.html'
mathJax: false
---

Network Information API 允许获取网络信息和监听网络信息更改，以及 Save Data API 提供了侦测用户流量使用倾向的方法

通过 `navigator.connection` 暴露 `NetworkInformation` 实例使用

## 获取网络信息

`NetworkInformation` 接口的 `type` 属性表示当前的网络连接的类型

`NetworkInformation` 接口的 `effectiveType` 属性表示当前的网络连接的状态

`NetworkInformation` 接口的 `downlink` 属性表示当前的 downlink 速度

`NetworkInformation` 接口的 `downlinkMax` 属性表示当前最大的 downlink 速度

`NetworkInformation` 接口的 `rtt` 属性表示当前的 RTT 参数

`NetworkInformation` 接口的 `saveData` 属性表示当前的用户是否倾向于节省流量使用

```js
const type = navigator.connection.type
const effectiveType = navigator.connection.effectiveType
const downlink = navigator.connection.downlink
const downlinkMax = navigator.connection.downlinkMax
const rtt = navigator.connection.rtt
const saveData = navigator.connection.saveData
```

## 监听网络信息

`NetworkInformation` 接口的 `change` 事件在网络信息更新时触发

```js
navigator.connection.addEventListener('change', () => { /* to do something */ })
```

## 相关接口

```ts
interface Navigator {
  readonly connection: NetworkInformation
}

interface WorkerNavigator {
  readonly connection: NetworkInformation
}

interface NetworkInformation extends EventTarget {
  readonly type: ConnectionType
  readonly effectiveType: EffectiveConnectionType
  readonly downlinkMax: number
  readonly downlink: number
  readonly rtt: number
  readonly saveData: boolean
  onchange: ((this: NetworkInformation, ev: Event) => any) | null
}

interface NetworkInformationEventMap {
  change: Event
}

type ConnectionType = 'bluetooth' | 'cellular' | 'ethernet' | 'none' | 'wifi' | 'wimax' | 'other' | 'unknown'

type EffectiveConnectionType = 'slow-2g' | '2g' | '3g' | '4g'
```
