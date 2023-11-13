---
title: DeviceOrientation Event
date: 2023-11-13 14:35:50
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
uniqueId: '2023-11-13 06:35:50/DeviceOrientation Event.html'
mathJax: false
---

DeviceOrientation Event 允许监测设备的物理朝向及物理加速度

## 物理加速度

`Window` 接口的 `devicemotion` 事件在设备的物理加速度（及旋转速率）变化时定期触发，返回一个 `DeviceMotionEvent` 事件

```js
window.addEventListener('devicemotion', (e) => {
  //
})
```

`DeviceMotionEvent` 接口的 `acceleration` 属性返回一个 `DeviceMotionEventAcceleration` 实例，表示设备的加速度（包含 x y z 三个参数）

`DeviceMotionEvent` 接口的 `accelerationIncludingGravity` 属性返回一个 `DeviceMotionEventAcceleration` 实例，表示受重力影响下设备的加速度（包含 x y z 三个参数）

`DeviceMotionEvent` 接口的 `rotationRate` 属性返回一个 `DeviceMotionEventRotationRate` 实例，表示设备的旋转角速度（包含 alpha beta gamma 三个参数）

`DeviceMotionEvent` 接口的 `interval` 属性返回一个 `number`，表示设备更新数据的间隔

## 物理朝向

`Window` 接口的 `deviceorientation` 事件在设备的物理朝向变化时定期触发，返回一个 `DeviceOrientationEvent` 事件

`Window` 接口的 `deviceorientationabsolute` 事件在设备的绝对物理朝向变化时触发，返回一个 `DeviceOrientationEvent` 事件

```js
window.addEventListener('deviceorientation', (e) => {
  //
})

window.addEventListener('deviceorientationabsolute', (e) => {
  //
})
```

`DeviceOrientationEvent` 接口的 `absolute` 属性返回一个 `boolean`，表明当前是否提供绝对方向数据（地球坐标系），或设备任意坐标系

`DeviceOrientationEvent` 接口的 `alpha` 属性返回一个范围在 `0` 至 `360` 之间的 `number`，表明设备绕 z 轴旋转的角度

`DeviceOrientationEvent` 接口的 `beta` 属性返回一个范围在 `-180` 至 `180` 之间的 `number`，表明设备绕 x 轴旋转的角度

`DeviceOrientationEvent` 接口的 `gamma` 属性返回一个范围在 `-90` 至 `90` 之间的 `number`，表明设备绕 y 轴旋转的角度

## 类型

```ts
interface Window {
  ondeviceorientation: ((this: Window, ev: DeviceOrientationEvent) => any) | null
  ondeviceorientationabsolute: ((this: Window, ev: DeviceOrientationEvent) => any) | null
  ondevicemotion: ((this: Window, ev: DeviceMotionEvent) => any) | null
}

interface DeviceOrientationEvent extends Event {
  readonly alpha: number | null
  readonly beta: number | null
  readonly gamma: number | null
  readonly absolute: boolean
}

declare var DeviceOrientationEvent: {
  new (type: string, eventInitDict?: DeviceOrientationEventInit): DeviceOrientationEvent
  prototype: DeviceOrientationEvent

  requestPermission(): Promise<PermissionState>
}

interface DeviceOrientationEventInit extends EventInit {
  alpha?: number | null
  beta?: number | null
  gamma?: number | null
  absolute?: boolean
}

interface DeviceMotionEventAcceleration {
  readonly x: number | null
  readonly y: number | null
  readonly z: number | null
}

interface DeviceMotionEventRotationRate {
  readonly alpha: number | null
  readonly beta: number | null
  readonly gamma: number | null
}

interface DeviceMotionEvent extends Event {
  readonly acceleration: DeviceMotionEventAcceleration | null
  readonly accelerationIncludingGravity: DeviceMotionEventAcceleration | null
  readonly rotationRate: DeviceMotionEventRotationRate | null
  readonly interval: number
}

declare var DeviceMotionEvent: {
  new (type: string, eventInitDict?: DeviceMotionEventInit): DeviceMotionEvent
  prototype: DeviceMotionEvent

  requestPermission(): Promise<PermissionState>
}

interface DeviceMotionEventAccelerationInit {
  x?: number | null
  y?: number | null
  z?: number | null
}

interface DeviceMotionEventRotationRateInit {
  alpha?: number | null
  beta?: number | null
  gamma?: number | null
}

interface DeviceMotionEventInit extends EventInit {
  acceleration?: DeviceMotionEventAccelerationInit
  accelerationIncludingGravity?: DeviceMotionEventAccelerationInit
  rotationRate?: DeviceMotionEventRotationRateInit
  interval?: number
}
```

## 链接

* <https://developer.mozilla.org/en-US/docs/Web/API/Device_orientation_events>
* <https://w3c.github.io/deviceorientation/>
