---
title: Battery Status API
date: 2023-10-21 22:17:43
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
uniqueId: '2023-10-21 14:17:43/Battery Status API.html'
mathJax: false
---

Battery Status API 提供了访问设备电源信息和监听电源信息变化的功能，可以用于动态根据用户设备的电源情况调整一些功能的策略

## 获取电源管理实例

使用 `Navigator` 接口的 `getBattery()` 方法获取到电源管理实例，方法返回一个 Promise 的 `BatteryManager` 实例

## 获取设备电源信息

`BatteryManager` 接口提供了访问设备电源信息的属性

`BatteryManager` 接口的 `charging` 属性返回一个 `boolean`，表示当前设备是否处于充电状态

`BatteryManager` 接口的 `chargingTime` 属性返回一个 `number`，表示当前设备充电完成所需的充电时间，若设备已充满或无法获取电源信息则返回 `0`，若设备未处于充电状态则返回 `+Infinity`

`BatteryManager` 接口的 `dischargingTime` 属性返回一个 `number`，表示当前设备至完全耗尽电量的时间，若设备处于充电状态或无法获取电源信息则返回 `+Infinity`

`BatteryManager` 接口的 `level` 属性返回一个范围从 `0.0` 到 `1.0` 之间的 number，表示当前设备电源的电量百分比，若无法获取电源信息则返回 `1.0`

## 监听设备电源信息更新

`BatteryManager` 接口提供了监听设备电源信息变化的事件

`BatteryManager` 接口的 `chargingchange` 事件在电源充电状态改变时触发，即 `charging` 属性改变时触发

`BatteryManager` 接口的 `chargingtimechange` 事件在电源充电完成时间改变时触发，即 `chargingTime` 属性改变时触发

`BatteryManager` 接口的 `dischargingtimechange` 事件在电源电量耗尽时间改变时触发，即 `dischargingTime` 属性改变时触发

`BatteryManager` 接口的 `levelchange` 事件在电源电量改变时触发，即 `level` 属性改变时触发

## 权限策略

该 API 受 `battery` 权限策略的限制（无论是通过 `Permissions-Policy` 响应头指定抑或是通过 `iframe` 元素的 `allow` 属性指定）

默认为 `self`，即允许在当前上下文或内嵌的其他同源上下文中使用

## 类型

```ts
interface Navigator {
  getBattery: () => Promise<BatteryManager>
}

interface BatteryManager extends EventTarget {
  readonly charging: boolean
  readonly chargingTime: number
  readonly dischargingTime: number
  readonly level: number
  onchargingchange: ((this: BatteryManager, ev: Event) => any) | null
  onchargingtimechange: ((this: BatteryManager, ev: Event) => any) | null
  ondischargingtimechange: ((this: BatteryManager, ev: Event) => any) | null
  onlevelchange: ((this: BatteryManager, ev: Event) => any) | null
}
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API>
* <https://w3c.github.io/battery/>
